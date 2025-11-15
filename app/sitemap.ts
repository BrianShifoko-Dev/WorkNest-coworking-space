import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/contact',
    '/about',
    '/discover',
    '/mission',
    '/get-started',
    '/office-spaces',
    '/boardrooms',
    '/pricing',
    '/faq',
    '/book-tour',
    '/kids-zone',
    '/call-pods',
    '/gallery',
    '/team',
    '/menu',
    '/reserve-table',
    '/restaurant',
    '/events',
    '/host-event',
    '/magazine',
    '/book',
    '/join',
    '/reserve-table',
    '/terms',
    '/privacy',
    '/payment-methods',
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}

