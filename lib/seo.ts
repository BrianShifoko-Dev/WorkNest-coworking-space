import { Metadata } from 'next'

export const siteConfig = {
  name: 'The WorkNest',
  title: 'The WorkNest - Premium Coworking Space in Eldoret, Kenya',
  description: 'Discover Eldoret\'s premier coworking space offering private offices, boardrooms, event venues, and a vibrant professional community. Flexible workspace solutions for entrepreneurs, startups, and established businesses in Kenya.',
  url: 'https://worknest.co.ke',
  keywords: [
    'coworking space Eldoret',
    'office space Eldoret',
    'shared workspace Kenya',
    'private office Eldoret',
    'meeting rooms Eldoret',
    'event space Eldoret',
    'business center Eldoret',
    'virtual office Kenya',
    'startup office Eldoret',
    'flexible workspace Kenya',
  ],
  location: {
    city: 'Eldoret',
    region: 'Uasin Gishu County',
    country: 'Kenya',
    address: 'Eldoret, Kenya', // Update with actual address
  },
  contact: {
    phone: '+254 XXX XXX XXX', // Update with actual phone
    email: 'info@worknest.co.ke', // Update with actual email
  },
  social: {
    twitter: '@worknest',
    facebook: 'worknest',
    instagram: 'worknest',
    linkedin: 'company/worknest',
  },
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  openGraph = {},
  path = '',
}: {
  title: string
  description: string
  keywords?: string[]
  openGraph?: Record<string, any>
  path?: string
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`
  const url = `${siteConfig.url}${path}`

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_KE',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og-image.jpg'],
      creator: `@${siteConfig.social.twitter}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Structured data for LocalBusiness
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CoworkingSpace',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.5143, // Update with actual coordinates
      longitude: 35.2698,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'High-Speed WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Meeting Rooms', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Private Offices', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Event Space', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kids Zone', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    ],
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter}`,
      `https://www.facebook.com/profile.php?id=61583324491287`,
      `https://www.instagram.com/the_worknest_eldoret/`,
      `https://linkedin.com/company/${siteConfig.social.linkedin}`,
    ],
  }
}

