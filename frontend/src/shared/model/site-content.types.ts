export interface MediaContent {
  url?: string;
  alternativeText?: string | null;
}

export interface ImagePosition {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface ActivityCard {
  number: string;
  title: string;
  description: string;
  image?: string;
  imagePosition?: ImagePosition;
}

export interface DevelopmentCard {
  title: string;
  description: string;
  technologies: string;
  cost: string;
  image?: string;
  imagePosition?: ImagePosition;
}

export interface EducationProgramDetail {
  label: string;
  value: string;
}

export interface EducationOutcomeSegment {
  emphasized?: boolean;
  text: string;
}

export interface EducationProgramOutcome {
  segments: EducationOutcomeSegment[];
}

export interface EducationProgram {
  audience: 'children' | 'adults';
  title: string;
  subtitle: string;
  details: EducationProgramDetail[];
  directions: string[];
  outcomes: EducationProgramOutcome[];
  image: string;
  theme: 'dark' | 'light';
}

export interface EducationContent {
  title: string;
  programs: EducationProgram[];
  ctaLabel: string;
  introTitle: string;
  introText: string;
  stats: StatItem[];
}

export interface ProductKitItem {
  title: string;
  description?: string;
}

export interface ProductCharacteristic {
  name: string;
  value?: string;
  unit?: string;
  section?: boolean;
}

export interface ProductCatalogItem {
  code: string;
  name: string;
  description?: string;
  kitTitle?: string;
  kit: ProductKitItem[];
  priceLabel?: string;
  price?: string;
  characteristicsButtonLabel?: string;
  characteristicsTitle?: string;
  characteristicNameLabel?: string;
  characteristicValueLabel?: string;
  characteristicUnitLabel?: string;
  characteristics: ProductCharacteristic[];
}

export interface ProductCard {
  slug: string;
  title: string;
  variant?: string;
  slideType?: 'standard' | 'catalog';
  catalogItems?: ProductCatalogItem[];
  lead: string;
  body?: string[];
  description: string[];
  price: string;
  priceNote?: string;
  images: string[];
  imagePositions?: Array<ImagePosition | undefined>;
  imageLabels?: string[];
  kit?: ProductKitItem[];
  kitTitle?: string;
  specs?: string[];
  specsTitle?: string;
  theme?: 'deep' | 'teal' | 'ice' | 'sage';
  cta?: string;
  featured?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundImagePosition?: ImagePosition;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PartnerLogo {
  name: string;
  image: string;
  imagePosition?: ImagePosition;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  robots: string;
  socialTitle: string;
  socialDescription: string;
  socialImage: string;
  organizationName: string;
  legalName: string;
  organizationDescription: string;
  organizationAddress: string;
}

export interface SiteContent {
  seo: SeoContent;
  navigation: {
    logo: string;
    logoPosition?: ImagePosition;
    links: Array<{ label: string; href: string }>;
    contactLabel: string;
  };
  hero: {
    title: string;
    subtitle: string;
    headline: string;
    description: string;
    image: string;
    imagePosition?: ImagePosition;
    arrowImage: string;
    arrowImagePosition?: ImagePosition;
  };
  activityTitle: string;
  activityCards: ActivityCard[];
  developmentTitle: string;
  developments: DevelopmentCard[];
  education: EducationContent;
  productsTitle: string;
  productsNote: string;
  products: ProductCard[];
  about: {
    title: string;
    paragraphs: string[];
    stats: StatItem[];
    photo: string;
    photoPosition?: ImagePosition;
    officialTitle: string;
    officialItems: string[];
  };
  achievementsTitle: string;
  achievements: Array<{ title: string; image: string; imagePosition?: ImagePosition }>;
  contacts: {
    title: string;
    emailLabel: string;
    emailAddress: string;
    responseText: string;
    partnersTitle: string;
    emailIcon: string;
    emailIconPosition?: ImagePosition;
    heroImage: string;
    heroImagePosition?: ImagePosition;
    partners: PartnerLogo[];
  };
}
