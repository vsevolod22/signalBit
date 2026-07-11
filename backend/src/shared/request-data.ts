type RequestData = Record<string, unknown>;

interface RequestContext {
  request: {
    body?: unknown;
  };
}

function asRequestData(value: unknown): RequestData | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return null;
  }

  return Object.fromEntries(Object.entries(value));
}

export function getRequestData(ctx: RequestContext): RequestData {
  const body = asRequestData(ctx.request.body) ?? {};
  return asRequestData(body.data) ?? body;
}

export function normalizeString(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}
