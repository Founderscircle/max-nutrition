import { Link } from 'react-router-dom'
import { Eye, Package, MessageSquare, TrendingUp } from 'lucide-react'
import { useSiteStats } from '../hooks/useSiteStats'
import { getProductById } from '../data/products'

export function SiteStatsBar() {
  const { stats } = useSiteStats()

  const trending = stats.trendingProductIds
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <section className="border-y border-slate-200/80 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-4 w-4 text-brand-600" />
              <strong className="text-slate-800">{stats.productCount}</strong> продуктів
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-brand-600" />
              <strong className="text-slate-800">{stats.viewsToday}</strong> переглядів сьогодні
            </span>
            {stats.inquiriesTotal > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-brand-600" />
                <strong className="text-slate-800">{stats.inquiriesTotal}</strong> заявок
              </span>
            )}
          </div>

          {trending.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 text-slate-500">
                <TrendingUp className="h-4 w-4" />
                Зараз цікавлять:
              </span>
              {trending.map((product) => (
                <Link
                  key={product!.id}
                  to={`/catalog/${product!.id}`}
                  className="rounded-full bg-brand-50 px-3 py-1 text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  {product!.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
