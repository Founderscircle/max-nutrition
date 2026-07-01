import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'
import { categoryLabels } from '../data/products'
import { ProductImage } from './ProductImage'
import { AddToListButton } from './AddToListButton'

interface ProductCardProps {
  product: Product
  index?: number
  animate?: boolean
}

export function ProductCard({ product, index = 0, animate = false }: ProductCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-brand-600/5 hover:border-brand-200 transition-all duration-300${animate ? ' animate-fade-in-up' : ''}`}
      style={animate ? { animationDelay: `${index * 40}ms` } : undefined}
    >
      <Link to={`/catalog/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-brand-700 shadow-sm max-w-full truncate">
            {categoryLabels[product.category]}
          </span>
          {product.popular && (
            <span className="rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Популярне
            </span>
          )}
          {product.flavors && product.flavors.length > 1 && (
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
              {product.flavors.length}{' '}
              {product.flavors.length >= 5 ? 'смаків' : 'смаки'}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-slate-400 font-mono mb-1">{product.sku}</p>
        <Link to={`/catalog/${product.id}`}>
          <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link
            to={`/catalog/${product.id}`}
            className="flex h-11 items-center justify-center gap-1 rounded-xl border border-slate-200 px-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span className="truncate">Детальніше</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
          <AddToListButton
            productId={product.id}
            name={product.name}
            sku={product.sku}
            image={product.image}
            compact
            className="w-full"
          />
        </div>
      </div>
    </article>
  )
}
