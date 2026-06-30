import { Link } from 'react-router-dom'
import { Eye, Package, MessageSquare, TrendingUp } from 'lucide-react'
import { useSiteStats } from '../hooks/useSiteStats'
import { getProductById } from '../data/products'

function shortName(name: string, max = 28): string {
  if (name.length <= max) return name
  return `${name.slice(0, max).trim()}…`
}

export function SiteStatsBar() {
  const { stats } = useSiteStats()

  const trending = stats.trendingProductIds
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 4)

  return (
    <section className="border-y border-slate-200/80 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-4 w-4 text-brand-600 shrink-0" />
              <strong className="text-slate-800">{stats.productCount}</strong> продуктів
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-brand-600 shrink-0" />
              <strong className="text-slate-800">{stats.viewsToday}</strong> переглядів сьогодні
            </span>
            {stats.inquiriesTotal > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-brand-600 shrink-0" />
                <strong className="text-slate-800">{stats.inquiriesTotal}</strong> заявок
              </span>
            )}
          </div>

          {trending.length > 0 && (
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 text-sm text-slate-500 mb-2">
                <TrendingUp className="h-4 w-4 shrink-0" />
                Зараз цікавлять:
              </span>
              <div className="-mx-4 px-4 flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-thin sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0">
                {trending.map((product) => (
                  <Link
                    key={product!.id}
                    to={`/catalog/${product!.id}`}
                    title={product!.name}
                    className="shrink-0 snap-start rounded-full bg-brand-50 px-3 py-2 text-sm text-brand-700 hover:bg-brand-100 transition-colors max-w-[220px] sm:max-w-xs truncate min-h-9 flex items-center"
                  >
                    <span className="sm:hidden">{shortName(product!.name, 22)}</span>
                    <span className="hidden sm:inline">{shortName(product!.name, 36)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
