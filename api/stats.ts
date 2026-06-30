import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getCategoryCount, products } from '../lib/products'
import {
  getInquiriesTotal,
  getTrendingProductIds,
  getViewsToday,
  isRedisConfigured,
} from '../lib/redis'
import { handleOptions, setCors } from '../lib/http'
import type { SiteStats } from '../lib/types'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return
  setCors(res)

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const [viewsToday, inquiriesTotal, trendingProductIds] = await Promise.all([
    getViewsToday(),
    getInquiriesTotal(),
    getTrendingProductIds(4),
  ])

  const stats: SiteStats = {
    productCount: products.length,
    categoryCount: getCategoryCount(),
    viewsToday: viewsToday ?? 0,
    inquiriesTotal: inquiriesTotal ?? 0,
    trendingProductIds:
      trendingProductIds.length > 0
        ? trendingProductIds
        : products.filter((p) => p.popular).slice(0, 4).map((p) => p.id),
    updatedAt: new Date().toISOString(),
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  res.status(200).json({
    ...stats,
    analyticsEnabled: isRedisConfigured(),
  })
}
