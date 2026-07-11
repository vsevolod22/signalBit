import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren, ReactElement } from 'react';

import { loadSiteContent } from '@/shared/api/site-content';
import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';
import type { SiteContent } from '@/shared/model/site-content';

type SiteContentSource = 'mock' | 'strapi';

interface SiteContentContextValue {
  content: SiteContent;
  source: SiteContentSource;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: PropsWithChildren): ReactElement {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [source, setSource] = useState<SiteContentSource>('mock');

  useEffect(() => {
    let isMounted = true;

    loadSiteContent(DEFAULT_SITE_CONTENT).then((loadedContent) => {
      if (!isMounted) {
        return;
      }

      setContent(loadedContent.content);
      setSource(loadedContent.source);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return <SiteContentContext.Provider value={{ content, source }}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContentContextValue {
  const context = useContext(SiteContentContext);

  if (context === null) {
    throw new Error('useSiteContent must be used within SiteContentProvider.');
  }

  return context;
}
