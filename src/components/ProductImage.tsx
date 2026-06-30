import { useState } from 'react'
import { Leaf } from 'lucide-react'
import type { ProductCategory } from '../data/products'

const categoryGradients: Record<ProductCategory, string> = {
  formula1: 'from-teal-100 to-emerald-50',
  energy: 'from-cyan-100 to-teal-50',
  supplements: 'from-amber-50 to-teal-50',
  snacks: 'from-orange-50 to-amber-50',
  skincare: 'from-pink-50 to-teal-50',
  bodycare: 'from-sky-50 to-teal-50',
  sports: 'from-violet-50 to-teal-50',
  accessories: 'from-slate-100 to-slate-50',
}

interface ProductImageProps {
  src: string
  alt: string
  category: ProductCategory
  className?: string
}

export function ProductImage({ src, alt, category, className = '' }: ProductImageProps) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${categoryGradients[category]} ${className}`}
      >
        <div className="text-center p-4">
          <Leaf className="h-10 w-10 text-brand-400 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">Herbalife</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}
