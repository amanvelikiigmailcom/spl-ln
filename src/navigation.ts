import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Features',
      href: getPermalink('/#features'),
    },
    {
      text: 'How it Works',
      href: getPermalink('/#how-it-works'),
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Resources',
      links: [
        { text: 'Help Center', href: getPermalink('/help') },
        { text: 'Security', href: getPermalink('/security') },
        { text: 'Press', href: getPermalink('/press') },
        { text: 'Careers', href: getPermalink('/careers') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
  ],
  actions: [
    {
      variant: 'primary' as const,
      text: 'Start Free',
      href: 'https://siplinx-ai.vercel.app/download',
      icon: 'tabler:brand-apple',
      class: 'header-dl-btn',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: getPermalink('/#features') },
        { text: 'How it Works', href: getPermalink('/#how-it-works') },
        { text: 'Pricing', href: getPermalink('/pricing') },
        { text: 'Download', href: getPermalink('/download') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Careers', href: getPermalink('/careers') },
        { text: 'Press', href: getPermalink('/press') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: getPermalink('/help') },
        { text: 'Security', href: getPermalink('/security') },
        { text: 'Community', href: '#' },
        { text: 'Status', href: '#' },
        { text: 'Contact Us', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} <a class="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent font-semibold" href="/">Siplinx AI</a> · All rights reserved.
  `,
};
