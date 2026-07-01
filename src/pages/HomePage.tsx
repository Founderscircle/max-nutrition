import { Link } from 'react-router-dom'
import { Send, ArrowRight, CheckCircle2 } from 'lucide-react'
import { siteConfig, getTelegramLink } from '../config/site'
import { getPopularProducts, getProductById } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { CategoryGrid } from '../components/CategoryCard'
import { HeroVisual } from '../components/HeroVisual'
import { SectionOrb } from '../components/effects/SectionOrb'
import { SiteStatsBar } from '../components/SiteStatsBar'
import { useSiteStats } from '../hooks/useSiteStats'

export function HomePage() {
  const { stats } = useSiteStats()
  const trending = stats.trendingProductIds
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
  const popular = trending.length >= 4 ? trending.slice(0, 4) : getPopularProducts()

  return (
    <>
      <section className="gradient-hero relative overflow-hidden" data-glow-zone="contrast">
        <SectionOrb variant="mint" size="lg" className="-top-16 -right-24 hidden sm:block" />
        <SectionOrb variant="aqua" size="md" className="bottom-10 -left-16 hidden sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in-up order-2 lg:order-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-700 mb-4 sm:mb-6">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Незалежний дистриб'ютор
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Продукція{' '}
                <span className="text-gradient">Herbalife</span>
                <br />
                для здорового життя
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
                Ознайомтесь з асортиментом продукції Herbalife Nutrition.
                Отримайте персональну консультацію та оформіть замовлення через Telegram.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/catalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-6 py-3.5 min-h-11 text-base font-semibold text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Переглянути каталог
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href={getTelegramLink('Вітаю! Хочу отримати консультацію щодо продукції Herbalife.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3.5 min-h-11 text-base font-semibold text-slate-700 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
                >
                  <Send className="h-5 w-5 text-brand-600 shrink-0" />
                  <span className="truncate">Написати в Telegram</span>
                </a>
              </div>
            </div>

            <div className="animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: '150ms' }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      <SiteStatsBar />

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6">
        <CategoryGrid />
      </section>

      <section className="relative bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Зараз цікавлять</h2>
            <Link
              to="/catalog"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0"
            >
              Увесь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} animate />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl gradient-brand p-6 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="relative">
            <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Потрібна консультація?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8">
              Консультант {siteConfig.distributor.names[0]} допоможе підібрати
              продукцію та оформити замовлення. Напишіть у Telegram або зберіть кошик у каталозі.
            </p>
            <a
              href={getTelegramLink('Вітаю! Хочу отримати консультацію та дізнатися про умови замовлення.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3.5 sm:py-4 min-h-11 text-sm sm:text-base font-bold text-brand-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Send className="h-5 w-5 shrink-0" />
              <span className="truncate">Написати в Telegram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
