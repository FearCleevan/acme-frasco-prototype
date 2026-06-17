export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export interface SlideItem {
  id: number;
  label: string;
  imageUrl: string;
  imageAlt: string;
}

export interface StatItem {
  value: string;
  symbol: string;
  label: string;
}

export interface HeroData {
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cardBadge: string;
  phone: string;
  phoneHref: string;
  slides: SlideItem[];
  statsLeft: string;
  stats: StatItem[];
}
