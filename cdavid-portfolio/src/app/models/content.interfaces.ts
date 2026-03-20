export interface HeroContent {
  brandName: string;
  brandAccent: string;
  fullName: string;
  typedItems: string[];
  description: string;
  profileImage: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary: { text: string; link: string };
  socialLinks: { icon: string; url: string }[];
}

export interface AboutContent {
  profileImage: string;
  name: string;
  profession: string;
  email: string;
  phone: string;
  location: string;
  sectionBadge: string;
  sectionHeading: string;
  descriptionParagraphs: string[];
  stats: { number: string; label: string }[];
  details: { label: string; value: string }[];
}

export interface StatItem {
  icon: string;
  endValue: number;
  label: string;
}

export interface StatsContent {
  items: StatItem[];
}

export interface SkillItem {
  name: string;
  percentage: number;
  tooltip: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface SkillsContent {
  sectionTitle: string;
  sectionDescription: string;
  categories: SkillCategory[];
}

export interface PortfolioItem {
  image: string;
  category: string;
  filterClass: string;
  title: string;
}

export interface PortfolioFilter {
  label: string;
  filterValue: string;
}

export interface PortfolioContent {
  sectionTitle: string;
  sectionDescription: string;
  filters: PortfolioFilter[];
  items: PortfolioItem[];
}

export interface ReferenceItem {
  image: string;
  name: string;
  position: string;
}

export interface ServicesContent {
  sectionTitle: string;
  sectionDescription: string;
  items: ReferenceItem[];
}

export interface TestimonialItem {
  quote: string;
  clientImage: string;
  clientName: string;
  clientPosition: string;
  highlight: boolean;
}

export interface TestimonialsContent {
  sectionTitle: string;
  sectionDescription: string;
  items: TestimonialItem[];
}

export interface ContactContent {
  sectionTitle: string;
  sectionDescription: string;
  infoTitle: string;
  infoDescription: string;
  location: { line1: string; line2: string };
  phones: string[];
  emails: string[];
  formTitle: string;
  formDescription: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface HeaderContent {
  navItems: NavItem[];
  socialLinks: { icon: string; url: string }[];
}

export interface FooterContent {
}

export interface PortfolioSiteContent {
  hero: HeroContent;
  about: AboutContent;
  stats: StatsContent;
  skills: SkillsContent;
  portfolio: PortfolioContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  header: HeaderContent;
  footer: FooterContent;
}
