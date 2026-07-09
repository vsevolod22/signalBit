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

export interface ProductCard {
  slug: string;
  title: string;
  lead: string;
  description: string[];
  price: string;
  images: string[];
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

export interface SiteContent {
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
  productsTitle: string;
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
