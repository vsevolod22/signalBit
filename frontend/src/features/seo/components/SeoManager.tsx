import { useEffect } from 'react';

import type { SiteContent } from '@/shared/model/site-content';

interface SeoManagerProps {
  content: SiteContent;
}

function getOrCreateMeta(attribute: 'name' | 'property', value: string): HTMLMetaElement {
  const selector = `meta[${attribute}="${value}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing !== null) {
    return existing;
  }

  const meta = document.createElement('meta');
  meta.setAttribute(attribute, value);
  document.head.append(meta);
  return meta;
}

function setMeta(attribute: 'name' | 'property', name: string, content: string): void {
  getOrCreateMeta(attribute, name).content = content;
}

function getCanonicalUrl(configuredUrl: string | undefined): string {
  const pageUrl = new URL(window.location.href);
  pageUrl.hash = '';
  pageUrl.search = '';

  if (configuredUrl === undefined) {
    return pageUrl.href;
  }

  try {
    return new URL(configuredUrl, pageUrl.origin).href;
  } catch {
    return pageUrl.href;
  }
}

function getAbsoluteUrl(value: string, baseUrl: string): string {
  try {
    return new URL(value, baseUrl).href;
  } catch {
    return value;
  }
}

function setCanonicalUrl(url: string): void {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const canonical = existing ?? document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = url;
  if (existing === null) {
    document.head.append(canonical);
  }
}

function setStructuredData(content: SiteContent, canonicalUrl: string, socialImage: string): void {
  const scriptId = 'site-structured-data';
  const existing = document.getElementById(scriptId);
  const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${canonicalUrl}#organization`,
        name: content.seo.organizationName,
        legalName: content.seo.legalName,
        url: canonicalUrl,
        logo: socialImage,
        email: content.contacts.emailAddress,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'RU',
          streetAddress: content.seo.organizationAddress,
        },
        description: content.seo.organizationDescription,
      },
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: content.seo.organizationName,
        inLanguage: 'ru-RU',
        publisher: { '@id': `${canonicalUrl}#organization` },
      },
    ],
  });

  if (existing === null) {
    document.head.append(script);
  }
}

export function SeoManager({ content }: SeoManagerProps): null {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(content.seo.canonicalUrl);
    const socialImage = getAbsoluteUrl(content.seo.socialImage, canonicalUrl);

    document.title = content.seo.title;
    setCanonicalUrl(canonicalUrl);
    setMeta('name', 'description', content.seo.description);
    setMeta('name', 'keywords', content.seo.keywords);
    setMeta('name', 'robots', content.seo.robots);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', content.seo.organizationName);
    setMeta('property', 'og:title', content.seo.socialTitle);
    setMeta('property', 'og:description', content.seo.socialDescription);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', socialImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', content.seo.socialTitle);
    setMeta('name', 'twitter:description', content.seo.socialDescription);
    setMeta('name', 'twitter:image', socialImage);
    setStructuredData(content, canonicalUrl, socialImage);
  }, [content]);

  return null;
}
