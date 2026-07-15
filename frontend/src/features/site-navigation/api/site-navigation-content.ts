import { z } from 'zod';
import { getMediaUrl } from '@/shared/api/strapi-client';
import { strapiMediaSchema } from '@/shared/api/strapi-schemas';
import type { SiteContent } from '@/shared/model/site-content';

export const siteNavigationCmsSchema = z
  .object({
    contactLabel: z.string().optional(),
    logo: strapiMediaSchema.nullable().optional(),
    links: z.array(z.object({ label: z.string().optional(), sectionIndex: z.number().int().optional() })).optional(),
  })
  .nullable()
  .optional();

export type SiteNavigationCmsDto = z.infer<typeof siteNavigationCmsSchema>;

function mapNavigationLinks(
  cms: SiteNavigationCmsDto,
  fallback: SiteContent['navigation']['links'],
): SiteContent['navigation']['links'] {
  const cmsLinks = cms?.links;
  const hasCmsLinks = cmsLinks !== undefined && cmsLinks.length > 0;
  if (!hasCmsLinks) {
    return fallback;
  }

  const educationLinkIndex = fallback.findIndex((link) => link.href === '#education');
  const cmsHasEducationLink = educationLinkIndex < 0 || cmsLinks.length >= fallback.length;

  return fallback.map((fallbackLink, index) => ({
    ...fallbackLink,
    label:
      fallbackLink.href === '#education' && !cmsHasEducationLink
        ? fallbackLink.label
        : (cmsLinks[index > educationLinkIndex && !cmsHasEducationLink ? index - 1 : index]?.label ??
          fallbackLink.label),
  }));
}

export function mapSiteNavigationContent(
  cms: SiteNavigationCmsDto,
  fallback: SiteContent['navigation'],
  apiUrl?: string,
): SiteContent['navigation'] {
  return {
    ...fallback,
    logo: getMediaUrl(cms?.logo, fallback.logo, apiUrl),
    contactLabel: cms?.contactLabel ?? fallback.contactLabel,
    links: mapNavigationLinks(cms, fallback.links),
  };
}
