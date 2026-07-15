import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, useContext } from 'react';
import { useSiteContentQuery } from '@/app/api/site-content';
import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';
import type { SiteContent } from '@/shared/model/site-content';

type SiteContentSource = 'mock' | 'strapi';
type SiteContentStatus = 'fallback' | 'loading' | 'ready';

interface SiteContentContextValue {
  content: SiteContent;
  error: Error | null;
  source: SiteContentSource;
  status: SiteContentStatus;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function getContentSource(isCmsContentLoaded: boolean): SiteContentSource {
  return isCmsContentLoaded ? 'strapi' : 'mock';
}

function getQueryError(error: unknown): Error | null {
  return error instanceof Error ? error : null;
}

export function SiteContentProvider({ children }: PropsWithChildren): ReactElement {
  const siteContentQuery = useSiteContentQuery(DEFAULT_SITE_CONTENT);
  const content = siteContentQuery.data ?? DEFAULT_SITE_CONTENT;
  const error = getQueryError(siteContentQuery.error);
  const source = getContentSource(siteContentQuery.isSuccess);
  const isLoading = siteContentQuery.isPending && siteContentQuery.fetchStatus === 'fetching';
  const status: SiteContentStatus = isLoading ? 'loading' : siteContentQuery.isSuccess ? 'ready' : 'fallback';

  return (
    <SiteContentContext.Provider value={{ content, error, source, status }}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContentContextValue {
  const context = useContext(SiteContentContext);

  if (context === null) {
    throw new Error('useSiteContent must be used within SiteContentProvider.');
  }

  return context;
}
