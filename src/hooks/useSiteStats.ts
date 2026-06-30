import { useEffect, useState } from 'react'
import { fetchStats, type ApiStats } from '../lib/api'
import { products } from '../data/products'

const FALLBACK_STATS: ApiStats = {
  productCount: products.length,
  categoryCount: new Set(products.map((p) => p.category)).size,
  viewsToday: 0,
  inquiriesTotal: 0,
  trendingProductIds: products.filter((p) => p.popular).slice(0, 4).map((p) => p.id),
  updatedAt: new Date().toISOString(),
  analyticsEnabled: false,
}

export function useSiteStats() {
  const [stats, setStats] = useState<ApiStats>(FALLBACK_STATS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      const data = await fetchStats()
      if (active && data) setStats(data)
      if (active) setLoading(false)
    }

    load()
    const interval = setInterval(load, 5 * 60 * 1000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  return { stats, loading }
}
