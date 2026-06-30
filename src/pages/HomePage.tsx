import { Link } from 'react-router-dom'
import { Send, Shield, BookOpen, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { siteConfig, getTelegramLink } from '../config/site'
import { getPopularProducts } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { CategoryGrid } from '../components/CategoryCard'
import { HeroVisual } from '../components/HeroVisual'
import { SectionOrb } from '../components/effects/SectionOrb'

const features = [
  {
    icon: Shield,
    title: 'Відповідність правилам',
    text: 'Сайт-візитка без цін та комерційної реклами згідно з вимогами Herbalife в Україні.',
  },
  {
    icon: BookOpen,
    title: 'Повний каталог',
    text: 'Детальна інформація про продукцію: склад, спосіб застосування, опис.',
  },
  {
    icon: MessageCircle,
    title: 'Консультація в Telegram',
    text: 'Персональна консультація та оформлення замовлення через месенджер.',
  },
]

export function HomePage() {
  const popular = getPopularProducts()

  return (
    <>
      <section className="gradient-hero relative overflow-hidden">
        <SectionOrb variant="mint" size="lg" className="-top-16 -right-24 hidden sm:block" />
        <SectionOrb variant="aqua" size="md" className="bottom-10 -left-16 hidden sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700 mb-6">
                <CheckCircle2 className="h-4 w-4" />
                Незалежний дистриб'ютор · Україна
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Продукція{' '}
                <span className="text-gradient">Herbalife</span>
                <br />
                для здорового життя
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
                Ознайомтесь з асортиментом продукції Herbalife Nutrition.
                Отримайте персональну консультацію та оформіть замовлення через Telegram.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 rounded-xl gradient-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Переглянути каталог
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href={getTelegramLink('Вітаю! Хочу отримати консультацію щодо продукції Herbalife.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
                >
                  <Send className="h-5 w-5 text-brand-600" />
                  Консультація в Telegram
                </a>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 mb-4">
                <f.icon className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <CategoryGrid />
      </section>

      <section className="relative bg-white/80 backdrop-blur-sm border-y border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Популярна продукція</h2>
            <Link
              to="/catalog"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Увесь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl gradient-brand p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Потрібна консультація?
            </h2>
            <p className="text-brand-100 max-w-xl mx-auto mb-8">
              Консультант {siteConfig.distributor.names[0]} допоможе підібрати
              продукцію та оформити замовлення. Зв'яжіться з нами в Telegram.
            </p>
            <a
              href={getTelegramLink('Вітаю! Хочу отримати консультацію та дізнатися про умови замовлення.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Send className="h-5 w-5" />
              Написати в {siteConfig.telegram.displayName}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
