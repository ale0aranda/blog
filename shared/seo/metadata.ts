import type { Metadata } from 'next';

import { site } from '../../config/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: site.title,
    template: `%s · ${site.title}`
  },

  description: site.description,

  applicationName: site.name,

  authors: [
    {
      name: site.author
    }
  ],

  creator: site.author,

  keywords: [
    'Alejandro Aranda',
    'Student',
    'Software Engineering',
    'Cybersecurity',
    'Pentesting',
    'Linux',
    'Python',
    'TypeScript',
    'Next.js',
    'Open Source'
  ],

  alternates: {
    canonical: '/'
  },

  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description
  },

  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description
  },

  robots: {
    index: true,
    follow: true
  },

  icons: {
    icon: '/favicon.ico'
  }
};
