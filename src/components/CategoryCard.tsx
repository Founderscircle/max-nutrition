import { Link } from 'react-router-dom'
import type { ProductCategory } from '../data/products'
import { categoryLabels, categoryDescriptions } from '../data/products'
import { ArrowRight, Layers } from 'lucide-react'

const categoryIcons: Record<ProductCategory, string> = {
  formula1: '🥤',
  energy: '🍃',
  supplements: '💊',
  snacks: '🍫',
  skincare: '✨',
  bodycare: '🧴',
  sports: '⚡',
  accessories: '🫙',
}

interface CategoryCardProps {
  category: ProductCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/catalog?category=${category}`}
      className="group flex items-center gap-3 sm:gap-4 rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-2xl group-hover:scale-110 transition-transform">
        {categoryIcons[category]}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
          {categoryLabels[category]}
        </h3>
        <p className="text-sm text-slate-500 truncate">{categoryDescriptions[category]}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
  )
}

export function CategoryGrid() {
  const categories = Object.keys(categoryLabels) as ProductCategory[]

  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6">
        <Layers className="h-5 w-5 text-brand-600 shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Категорії продукції</h2>
        <span className="w-full sm:w-auto sm:ml-auto text-sm text-slate-400">{categories.length} категорій</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <CategoryCard key={cat} category={cat} />
        ))}
      </div>
    </section>
  )
}
