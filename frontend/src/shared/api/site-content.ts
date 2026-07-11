import type { DevelopmentCard, MediaContent, ProductCard, SiteContent } from '@/shared/model/site-content';

export const STRAPI_API_URL: string | undefined = import.meta.env.VITE_STRAPI_API_URL;

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

  if (STRAPI_API_URL === undefined) {
    return fallback;
  }

  return `${STRAPI_API_URL}${media.url}`;
}

function mapActivityFields(fields: CmsActivityField[] | undefined, fallback: SiteContent): SiteContent['activityCards'] {
  if (!fields?.length) {
    return fallback.activityCards;
  }

  return fields.slice(0, 4).map((field, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: field.title ?? fallback.activityCards[index]?.title ?? '',
    description: field.description ?? fallback.activityCards[index]?.description ?? '',
    image: getMediaUrl(field.image, fallback.activityCards[index]?.image ?? ''),
  }));
}

function mapDevelopments(items: CmsDevelopment[] | undefined, fallback: SiteContent): DevelopmentCard[] {
  if (!items?.length) {
    return fallback.developments;
  }

  return items.slice(0, 4).map((item, index) => ({
    title: item.title ?? fallback.developments[index]?.title ?? '',
    description: item.description ?? fallback.developments[index]?.description ?? '',
    technologies: item.technologies ?? fallback.developments[index]?.technologies ?? '',
    cost: item.cost ?? fallback.developments[index]?.cost ?? '',
    image: getMediaUrl(item.image, fallback.developments[index]?.image ?? ''),
  }));
}

function mapProducts(products: CmsProduct[] | undefined, fallback: SiteContent): ProductCard[] {
  if (!products?.length) {
    return fallback.products;
  }

  return fallback.products.map((fallbackProduct) => {
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

function mergeCmsContent(cms: CmsSiteContent, fallback: SiteContent): SiteContent {
  const about = cms.aboutCompany;
  const contacts = cms.contactSetting;

  return {
    ...fallback,
    navigation: {
      ...fallback.navigation,
      logo: getMediaUrl(cms.siteNavigation?.logo, fallback.navigation.logo),
      contactLabel: cms.siteNavigation?.contactLabel ?? fallback.navigation.contactLabel,
    },
    activityCards: mapActivityFields(cms.activityFields, fallback),
    developments: mapDevelopments(cms.services, fallback),
    products: mapProducts(cms.products, fallback),
    about: {
      ...fallback.about,
      title: about?.missionTitle ?? fallback.about.title,
      paragraphs: about?.paragraphs?.length ? about.paragraphs : fallback.about.paragraphs,
      photo: getMediaUrl(about?.photo, fallback.about.photo),
      officialTitle: about?.officialTitle ?? fallback.about.officialTitle,
      officialItems: about?.officialItems?.length ? about.officialItems : fallback.about.officialItems,
      stats: about?.stats?.length
        ? about.stats.map((stat, index) => ({
            value: stat.value ?? fallback.about.stats[index]?.value ?? '',
            label: stat.text ?? fallback.about.stats[index]?.label ?? '',
          }))
        : fallback.about.stats,
    },
    contacts: {
      ...fallback.contacts,
      title: contacts?.questionTitle ?? fallback.contacts.title,
      emailLabel: contacts?.emailLabel ?? fallback.contacts.emailLabel,
      emailAddress: contacts?.emailAddress ?? fallback.contacts.emailAddress,
      responseText: contacts?.responseText ?? fallback.contacts.responseText,
      partnersTitle: contacts?.partnersTitle ?? fallback.contacts.partnersTitle,
      emailIcon: getMediaUrl(contacts?.emailIcon, fallback.contacts.emailIcon),
      heroImage: getMediaUrl(contacts?.rightImage, fallback.contacts.heroImage),
      partners: contacts?.partnerLogos?.length
        ? contacts.partnerLogos.map((partner, index) => ({
            name: partner.name ?? fallback.contacts.partners[index]?.name ?? '',
            image: getMediaUrl(partner.image, fallback.contacts.partners[index]?.image ?? ''),
          }))
        : fallback.contacts.partners,
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

export async function loadSiteContent(fallback: SiteContent): Promise<LoadedSiteContent> {
  if (STRAPI_API_URL === undefined) {
    return { content: fallback, source: 'mock' };
  }

  try {
    const cmsContent = await fetchCmsContent();

    return {
      content: mergeCmsContent(cmsContent, fallback),
      source: 'strapi',
    };
  } catch {
    return {
      content: fallback,
      source: 'mock',
    };
  }
}
