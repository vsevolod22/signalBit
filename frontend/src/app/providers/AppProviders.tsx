import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren, ReactElement } from 'react';

import { StrapiValidationError } from '@/app/api/site-content';
import { StrapiHttpError } from '@/shared/api/strapi-client';
import { MUTATION_RETRY_LIMIT, QUERY_CACHE_TIME, QUERY_RETRY_LIMIT } from '@/shared/config/query';

function isNonRetryableQueryError(error: unknown): boolean {
  const isValidationError = error instanceof StrapiValidationError;
  const isClientHttpError = error instanceof StrapiHttpError && error.status < 500;
  return isValidationError || isClientHttpError;
}

function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  const isRetryLimitReached = failureCount >= QUERY_RETRY_LIMIT;
  return !isRetryLimitReached && !isNonRetryableQueryError(error);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CACHE_TIME.DEFAULT_STALE,
      gcTime: typeof window === 'undefined' ? Number.POSITIVE_INFINITY : QUERY_CACHE_TIME.DEFAULT_GARBAGE_COLLECTION,
      retry: shouldRetryQuery,
      retryDelay: (attemptIndex) => Math.min(400 * 2 ** attemptIndex, 1_600),
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: MUTATION_RETRY_LIMIT },
  },
});

export function AppProviders({ children }: PropsWithChildren): ReactElement {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
