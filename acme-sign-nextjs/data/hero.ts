import type { HeroData, NavLink } from '@/lib/types';

export const navLinks: NavLink[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'SERVICES',
    href: '/services',
    dropdown: [
      { label: 'Channel Signs', href: '/services/channel-signs' },
      { label: 'Dimension Signs', href: '/services/dimension-signs' },
      { label: 'Illuminated Signs', href: '/services/illuminated-signs' },
      { label: 'Safety & Parking Signs', href: '/services/safety-parking-signs' },
      { label: 'Window Graphics', href: '/services/window-graphics' },
      { label: 'Banners', href: '/services/banners' },
      { label: 'Decals & Stickers', href: '/services/decals-stickers' },
      { label: 'Apparel', href: '/services/apparel' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Artwork Guidelines', href: '/artwork-guidelines' },
      { label: 'Sign Service', href: '/sign-service' },
    ],
  },
  { label: 'VEHICLE WRAPS', href: '/vehicle-wraps' },
  { label: 'LED SIGNS', href: '/led-signs' },
  { label: 'CONTACT US', href: '/contact' },
];

export const heroData: HeroData = {
  headline: 'Let us help you make a great first impression!',
  description:
    'ACME SIGN & Graphics specializes in creating highly effective signs, programmable LED signs and displays, vehicle wrap designs, custom apparel and branding assets — for businesses of any size, at a price that fits your budget.',
  ctaLabel: 'Get a Quote',
  ctaHref: '#contact',
  cardBadge: 'Serving Atlantic Canada businesses for 20+ years',
  phone: '+1 (902) 468-5171',
  phoneHref: 'tel:+19024685171',
  slides: [
    {
      id: 0,
      label: 'LED Signs & Displays',
      imageUrl:
        'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=900&q=80',
      imageAlt: 'Programmable outdoor LED sign for business',
    },
    {
      id: 1,
      label: 'Vehicle Wraps',
      imageUrl:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      imageAlt: 'Commercial vehicle wrap for brand visibility',
    },
    {
      id: 2,
      label: 'Channel Signs',
      imageUrl:
        'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=900&q=80',
      imageAlt: 'Illuminated channel letter sign for storefront',
    },
  ],
  statsLeft: 'Trusted by businesses across Atlantic Canada',
  stats: [
    { value: '500', symbol: '+', label: 'Businesses Served' },
    { value: '100', symbol: '%', label: 'Custom Solutions' },
  ],
};
