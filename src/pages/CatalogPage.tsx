import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import { products, categoryLabels, type ProductCategory } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { TodayBonusPromo } from '../components/TodayBonusPromo'

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') as ProductCategory | null
  const searchQuery = searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    let result = products
    if (activeCategory && categoryLabels[activeCategory]) {
      result = result.filter((p) => p.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, searchQuery])

  const categories = Object.entries(categoryLabels) as [ProductCategory, string][]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Каталог продукції</h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Замовлення через Telegram
        </p>
      </div>

      <div className="mb-8">
        <TodayBonusPromo compact />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Пошук за назвою або артикулом..."
            value={searchQuery}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams)
              if (e.target.value) params.set('q', e.target.value)
              else params.delete('q')
              setSearchParams(params)
            }}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
          />
        </div>
      </div>

      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 mb-6 overflow-x-auto pb-2 snap-x snap-mandatory">
        <Filter className="h-4 w-4 text-slate-400 shrink-0" />
        <button
          type="button"
          onClick={() => setSearchParams(searchQuery ? { q: searchQuery } : {})}
          className={`shrink-0 snap-start rounded-full px-4 py-2.5 min-h-10 text-sm font-medium transition-colors ${
            !activeCategory
              ? 'gradient-brand text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-200'
          }`}
        >
          Усі
        </button>
        {categories.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams)
              params.set('category', key)
              setSearchParams(params)
            }}
            className={`shrink-0 snap-start rounded-full px-4 py-2.5 min-h-10 text-sm font-medium transition-colors ${
              activeCategory === key
                ? 'gradient-brand text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500">Нічого не знайдено. Спробуйте інший запит або категорію.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-400 mb-6">
            Знайдено: {filtered.length} {filtered.length === 1 ? 'продукт' : filtered.length < 5 ? 'продукти' : 'продуктів'}
          </p>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
