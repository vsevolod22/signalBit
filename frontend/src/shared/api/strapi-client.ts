import type { HttpMethod } from '@/shared/api/http';
import { ACCEPT_JSON_HEADERS, HTTP_METHOD, JSON_HEADERS } from '@/shared/api/http';
import type { MediaContent } from '@/shared/model/site-content';

export const STRAPI_API_URL = normalizeApiUrl(import.meta.env.VITE_STRAPI_API_URL);
const STRAPI_REQUEST_TIMEOUT_MS = 4_000;

export class StrapiHttpError extends Error {
  public constructor(public readonly status: number) {
    super(`Strapi responded with HTTP ${status}.`);
    this.name = 'StrapiHttpError';
  }
}

export class StrapiNetworkError extends Error {
  public readonly cause: unknown;

  public constructor(cause: unknown) {
    super('Could not reach Strapi CMS.');
    this.name = 'StrapiNetworkError';
    this.cause = cause;
  }
}

export class StrapiJsonError extends Error {
  public readonly cause: unknown;

  public constructor(cause: unknown) {
    super('Strapi returned invalid JSON.');
    this.name = 'StrapiJsonError';
    this.cause = cause;
  }
}

interface StrapiRequestOptions {
  apiUrl?: string;
  body?: unknown;
  method?: HttpMethod;
  signal?: AbortSignal;
}

function normalizeApiUrl(value: string | undefined): string | undefined {
  const normalized = value?.trim().replace(/\/+$/, '');
  const isMissingUrl = normalized === '' || normalized === undefined;
  return isMissingUrl ? undefined : normalized;
}

function buildAbsoluteMediaUrl(apiUrl: string, mediaUrl: string): string {
  const normalizedMediaPath = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
  return `${apiUrl}${normalizedMediaPath}`;
}

export function getOptionalMediaUrl(
  media: MediaContent | null | undefined,
  fallback?: string,
  apiUrl = STRAPI_API_URL,
): string | undefined {
  const mediaUrl = media?.url;
  if (typeof mediaUrl !== 'string' || mediaUrl.length === 0) {
    return fallback || undefined;
  }

  if (/^https?:\/\//i.test(mediaUrl)) {
    return mediaUrl;
  }

  if (apiUrl === undefined) {
    return fallback || undefined;
  }

  return buildAbsoluteMediaUrl(apiUrl, mediaUrl);
}

export function getMediaUrl(media: MediaContent | null | undefined, fallback: string, apiUrl = STRAPI_API_URL): string {
  return getOptionalMediaUrl(media, fallback, apiUrl) ?? fallback;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

interface RequestSignalContext {
  cleanup: () => void;
  signal: AbortSignal;
}

function createRequestSignal(parentSignal: AbortSignal | undefined): RequestSignalContext {
  const controller = new AbortController();
  const abortFromParent = (): void => controller.abort(parentSignal?.reason);
  const timeout = setTimeout(() => {
    controller.abort(new DOMException('Strapi request timed out.', 'TimeoutError'));
  }, STRAPI_REQUEST_TIMEOUT_MS);

  if (parentSignal?.aborted === true) {
    abortFromParent();
  } else {
    parentSignal?.addEventListener('abort', abortFromParent, { once: true });
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout);
      parentSignal?.removeEventListener('abort', abortFromParent);
    },
  };
}

export async function requestStrapi(path: string, options: StrapiRequestOptions = {}): Promise<Response> {
  const { apiUrl = STRAPI_API_URL, body, method = HTTP_METHOD.GET, signal } = options;

  if (apiUrl === undefined) {
    throw new Error('Strapi CMS URL is not configured.');
  }

  try {
    const requestSignal = createRequestSignal(signal);
    const hasBody = body !== undefined;
    const headers = hasBody ? JSON_HEADERS : ACCEPT_JSON_HEADERS;
    const serializedBody = hasBody ? JSON.stringify(body) : undefined;
    let response: Response;
    try {
      response = await fetch(`${apiUrl}${path}`, {
        method,
        signal: requestSignal.signal,
        headers,
        body: serializedBody,
      });
    } finally {
      requestSignal.cleanup();
    }

    if (!response.ok) {
      throw new StrapiHttpError(response.status);
    }

    return response;
  } catch (error: unknown) {
    if (isAbortError(error) || error instanceof StrapiHttpError) {
      throw error;
    }
    throw new StrapiNetworkError(error);
  }
}

export async function fetchStrapiJson(path: string, signal: AbortSignal, apiUrl = STRAPI_API_URL): Promise<unknown> {
  const response = await requestStrapi(path, { apiUrl, signal });

  try {
    return await response.json();
  } catch (error: unknown) {
    throw new StrapiJsonError(error);
  }
}
