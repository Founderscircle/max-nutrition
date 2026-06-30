import type { VercelRequest, VercelResponse } from '@vercel/node'
import { products } from '../lib/products'

const SITE_URL = process.env.SITE_URL ?? 'https://max-nutrition.net.ua'

const staticPaths = ['/', '/catalog', '/about', '/contact', '/privacy', '/terms']

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const urls = [
    ...staticPaths.map((path) => ({
      loc: `${SITE_URL}${path === '/' ? '' : path}`,
      changefreq: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? '1.0' : '0.7',
    })),
    ...products.map((product) => ({
      loc: `${SITE_URL}/catalog/${product.id}`,
      changefreq: 'weekly',
      priority: '0.8',
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
  res.status(200).send(xml)
}
