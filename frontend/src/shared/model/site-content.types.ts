export interface MediaContent {
  url?: string;
  alternativeText?: string | null;
}

export interface ActivityCard {
  number: string;
  title: string;
  description: string;
  image?: string;
}

export interface DevelopmentCard {
  title: string;
  description: string;
  technologies: string;
  cost: string;
  image?: string;
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

export interface ProductCard {
  slug: string;
  title: string;
  variant?: string;
  lead: string;
  body?: string[];
  description: string[];
  price: string;
  priceNote?: string;
  images: string[];
  imageLabels?: string[];
  kit?: ProductKitItem[];
  specs?: string[];
  theme?: 'deep' | 'teal' | 'ice' | 'sage';
  cta?: string;
  featured?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PartnerLogo {
  name: string;
  image: string;
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
    links: Array<{ label: string; href: string }>;
    contactLabel: string;
  };
  hero: {
    title: string;
    subtitle: string;
    headline: string;
    description: string;
    image: string;
    arrowImage: string;
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
    officialTitle: string;
    officialItems: string[];
  };
  achievementsTitle: string;
  achievements: Array<{ title: string; image: string }>;
  contacts: {
    title: string;
    emailLabel: string;
    emailAddress: string;
    responseText: string;
    partnersTitle: string;
    emailIcon: string;
    heroImage: string;
    partners: PartnerLogo[];
  };
}
