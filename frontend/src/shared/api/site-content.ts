import { DEFAULT_SITE_CONTENT } from '@/shared/model/site-content';
import type { DevelopmentCard, MediaContent, ProductCard, SiteContent } from '@/shared/model/site-content';

export const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL ?? 'http://localhost:1337';

interface CmsActivityField {
  title?: string;
  description?: string;
  image?: MediaContent | null;
}

interface CmsDevelopment {
  title?: string;
  description?: string;
  technologies?: string;
  cost?: string;
  image?: MediaContent | null;
}

interface CmsProduct {
  slug?: string;
  headline?: string;
  leadHighlight?: string;
  leadText?: string;
  descriptionBlocks?: string[];
  price?: string;
  gallery?: MediaContent[] | null;
}

interface CmsSiteContent {
  activityFields?: CmsActivityField[];
  services?: CmsDevelopment[];
  products?: CmsProduct[];
  aboutCompany?: {
    missionTitle?: string;
    paragraphs?: string[];
    photo?: MediaContent | null;
    officialTitle?: string;
    officialItems?: string[];
    stats?: Array<{ value?: string; text?: string }>;
  } | null;
  contactSetting?: {
    questionTitle?: string;
    emailLabel?: string;
    emailAddress?: string;
    responseText?: string;
    partnersTitle?: string;
    emailIcon?: MediaContent | null;
    rightImage?: MediaContent | null;
    partnerLogos?: Array<{ name?: string; image?: MediaContent | null }>;
  } | null;
  siteNavigation?: {
    contactLabel?: string;
    logo?: MediaContent | null;
    links?: Array<{ label?: string }>;
  } | null;
}

interface CmsResponse {
  data?: CmsSiteContent;
}

export interface LoadedSiteContent {
  content: SiteContent;
  source: 'strapi' | 'mock';
}

export function getMediaUrl(media: MediaContent | null | undefined, fallback: string): string {
  if (typeof media?.url !== 'string' || media.url.length === 0) {
    return fallback;
  }

  if (media.url.startsWith('http')) {
    return media.url;
  }

  return `${STRAPI_API_URL}${media.url}`;
}

function mapActivityFields(fields: CmsActivityField[] | undefined): SiteContent['activityCards'] {
  if (!fields?.length) {
    return DEFAULT_SITE_CONTENT.activityCards;
  }

  return fields.slice(0, 4).map((field, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: field.title ?? DEFAULT_SITE_CONTENT.activityCards[index]?.title ?? '',
    description: field.description ?? DEFAULT_SITE_CONTENT.activityCards[index]?.description ?? '',
    image: getMediaUrl(field.image, DEFAULT_SITE_CONTENT.activityCards[index]?.image ?? ''),
  }));
}

function mapDevelopments(items: CmsDevelopment[] | undefined): DevelopmentCard[] {
  if (!items?.length) {
    return DEFAULT_SITE_CONTENT.developments;
  }

  return items.slice(0, 4).map((item, index) => ({
    title: item.title ?? DEFAULT_SITE_CONTENT.developments[index]?.title ?? '',
    description: item.description ?? DEFAULT_SITE_CONTENT.developments[index]?.description ?? '',
    technologies: item.technologies ?? DEFAULT_SITE_CONTENT.developments[index]?.technologies ?? '',
    cost: item.cost ?? DEFAULT_SITE_CONTENT.developments[index]?.cost ?? '',
    image: getMediaUrl(item.image, DEFAULT_SITE_CONTENT.developments[index]?.image ?? ''),
  }));
}

function mapProducts(products: CmsProduct[] | undefined): ProductCard[] {
  if (!products?.length) {
    return DEFAULT_SITE_CONTENT.products;
  }

  return DEFAULT_SITE_CONTENT.products.map((fallbackProduct) => {
    const cmsProduct = products.find((product) => product.slug === fallbackProduct.slug);

    if (cmsProduct === undefined) {
      return fallbackProduct;
    }

    const gallery = cmsProduct.gallery ?? [];

    return {
      ...fallbackProduct,
      title: cmsProduct.headline ?? fallbackProduct.title,
      lead: [cmsProduct.leadHighlight, cmsProduct.leadText].filter(Boolean).join(' ') || fallbackProduct.lead,
      description: cmsProduct.descriptionBlocks?.length ? cmsProduct.descriptionBlocks : fallbackProduct.description,
      price: cmsProduct.price ?? fallbackProduct.price,
      images: fallbackProduct.images.map((fallbackImage, index) => getMediaUrl(gallery[index], fallbackImage)),
    };
  });
}

function mergeCmsContent(cms: CmsSiteContent): SiteContent {
  const about = cms.aboutCompany;
  const contacts = cms.contactSetting;

  return {
    ...DEFAULT_SITE_CONTENT,
    navigation: {
      ...DEFAULT_SITE_CONTENT.navigation,
      logo: getMediaUrl(cms.siteNavigation?.logo, DEFAULT_SITE_CONTENT.navigation.logo),
      contactLabel: cms.siteNavigation?.contactLabel ?? DEFAULT_SITE_CONTENT.navigation.contactLabel,
    },
    activityCards: mapActivityFields(cms.activityFields),
    developments: mapDevelopments(cms.services),
    products: mapProducts(cms.products),
    about: {
      ...DEFAULT_SITE_CONTENT.about,
      title: about?.missionTitle ?? DEFAULT_SITE_CONTENT.about.title,
      paragraphs: about?.paragraphs?.length ? about.paragraphs : DEFAULT_SITE_CONTENT.about.paragraphs,
      photo: getMediaUrl(about?.photo, DEFAULT_SITE_CONTENT.about.photo),
      officialTitle: about?.officialTitle ?? DEFAULT_SITE_CONTENT.about.officialTitle,
      officialItems: about?.officialItems?.length ? about.officialItems : DEFAULT_SITE_CONTENT.about.officialItems,
      stats: about?.stats?.length
        ? about.stats.map((stat, index) => ({
            value: stat.value ?? DEFAULT_SITE_CONTENT.about.stats[index]?.value ?? '',
            label: stat.text ?? DEFAULT_SITE_CONTENT.about.stats[index]?.label ?? '',
          }))
        : DEFAULT_SITE_CONTENT.about.stats,
    },
    contacts: {
      ...DEFAULT_SITE_CONTENT.contacts,
      title: contacts?.questionTitle ?? DEFAULT_SITE_CONTENT.contacts.title,
      emailLabel: contacts?.emailLabel ?? DEFAULT_SITE_CONTENT.contacts.emailLabel,
      emailAddress: contacts?.emailAddress ?? DEFAULT_SITE_CONTENT.contacts.emailAddress,
      responseText: contacts?.responseText ?? DEFAULT_SITE_CONTENT.contacts.responseText,
      partnersTitle: contacts?.partnersTitle ?? DEFAULT_SITE_CONTENT.contacts.partnersTitle,
      emailIcon: getMediaUrl(contacts?.emailIcon, DEFAULT_SITE_CONTENT.contacts.emailIcon),
      heroImage: getMediaUrl(contacts?.rightImage, DEFAULT_SITE_CONTENT.contacts.heroImage),
      partners: contacts?.partnerLogos?.length
        ? contacts.partnerLogos.map((partner, index) => ({
            name: partner.name ?? DEFAULT_SITE_CONTENT.contacts.partners[index]?.name ?? '',
            image: getMediaUrl(partner.image, DEFAULT_SITE_CONTENT.contacts.partners[index]?.image ?? ''),
          }))
        : DEFAULT_SITE_CONTENT.contacts.partners,
    },
  };
}

async function fetchCmsContent(): Promise<CmsSiteContent> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 1800);

  try {
    const response = await fetch(`${STRAPI_API_URL}/api/site-content`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to load Strapi content.');
    }

    const result = (await response.json()) as CmsResponse;

    return result.data ?? {};
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function loadSiteContent(): Promise<LoadedSiteContent> {
  try {
    const cmsContent = await fetchCmsContent();

    return {
      content: mergeCmsContent(cmsContent),
      source: 'strapi',
    };
  } catch {
    return {
      content: DEFAULT_SITE_CONTENT,
      source: 'mock',
    };
  }
}
