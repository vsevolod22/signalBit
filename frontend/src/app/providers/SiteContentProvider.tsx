import { createContext, useContext } from 'react';
import type { PropsWithChildren, ReactElement } from 'react';

import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';
import { useSiteContentQuery } from '@/app/api/site-content';
import type { SiteContent } from '@/shared/model/site-content';

type SiteContentSource = 'mock' | 'strapi';

interface SiteContentContextValue {
  content: SiteContent;
  error: Error | null;
  source: SiteContentSource;
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

  return (
    <SiteContentContext.Provider value={{ content, error, source }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContentContextValue {
  const context = useContext(SiteContentContext);

  if (context === null) {
    throw new Error('useSiteContent must be used within SiteContentProvider.');
  }

  return context;
}
