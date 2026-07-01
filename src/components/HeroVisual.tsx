import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getPopularProducts } from '../data/products'

const heroProduct =
  getPopularProducts().find((p) => p.category === 'formula1') ?? getPopularProducts()[0]

export function HeroVisual() {
  if (!heroProduct) return null

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-200/40 via-teal-100/30 to-cyan-100/20 blur-2xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 sm:bg-white/40 shadow-xl shadow-brand-900/10">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent z-10 pointer-events-none" />

        <img
          src={heroProduct.image}
          alt={heroProduct.name}
          className="aspect-[3/4] w-full object-cover object-center sm:aspect-[4/5] lg:aspect-[5/6]"
          loading="eager"
          fetchPriority="high"
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
          <span className="inline-block rounded-full bg-white/25 px-3 py-1 text-xs font-semibold text-white border border-white/30 mb-3">
            Формула 1
          </span>
          <p className="text-white font-bold text-lg sm:text-xl leading-snug drop-shadow-sm line-clamp-2">
            {heroProduct.name}
          </p>
          <p className="mt-1 text-sm text-white/85 leading-relaxed line-clamp-2">
            {heroProduct.shortDescription}
          </p>
          <Link
            to="/catalog?category=formula1"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-brand-700 shadow-lg hover:bg-white transition-colors"
          >
            Коктейлі та протеїн
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
