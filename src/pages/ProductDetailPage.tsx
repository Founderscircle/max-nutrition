import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Send, ArrowLeft, Check, Info } from 'lucide-react'
import { getProductById, categoryLabels } from '../data/products'
import { getProductTelegramMessage, getTelegramLink, siteConfig } from '../config/site'
import { ProductImage } from '../components/ProductImage'
import { FlavorPicker } from '../components/FlavorPicker'
import { QuantityPicker } from '../components/QuantityPicker'
import { AddToListButton } from '../components/AddToListButton'
import { useProductTracking } from '../hooks/usePageTracking'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const defaultFlavor =
    product?.flavors?.find((f) => f.sku === product.sku) ?? product?.flavors?.[0]
  const [selectedFlavor, setSelectedFlavor] = useState(defaultFlavor)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setSelectedFlavor(
      product?.flavors?.find((f) => f.sku === product.sku) ?? product?.flavors?.[0],
    )
    setQuantity(1)
  }, [product?.id, product?.flavors, product?.sku])

  useProductTracking(product?.id)

  if (!product) return <Navigate to="/catalog" replace />

  const activeSku = selectedFlavor?.sku ?? product.sku
  const activeImage = selectedFlavor?.image || product.image

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 sm:px-6">
      <Link
        to="/catalog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад до каталогу
      </Link>

      <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
        <div className="relative aspect-square max-h-[70vh] sm:max-h-none mx-auto w-full lg:mx-0 rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
          <ProductImage
            src={activeImage}
            alt={product.name}
            category={product.category}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-brand-700 max-w-full truncate">
              {categoryLabels[product.category]}
            </span>
            {product.popular && (
              <span className="rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white">
                Популярне
              </span>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm text-slate-400 font-mono break-all">{activeSku}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 break-words">{product.name}</h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{product.description}</p>

          {product.flavors && product.flavors.length > 1 && (
            <FlavorPicker
              flavors={product.flavors}
              selectedSku={activeSku}
              onSelect={setSelectedFlavor}
            />
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Кількість</p>
              <QuantityPicker value={quantity} onChange={setQuantity} />
            </div>
            <div className="pt-6">
              <AddToListButton
                productId={product.id}
                name={product.name}
                sku={activeSku}
                flavorLabel={selectedFlavor?.label}
                image={activeImage}
                quantity={quantity}
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-brand-50 border border-brand-100 p-4 flex gap-3">
            <Info className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm text-brand-800">
              Ціни на сайті не вказані відповідно до правил дистрибуції Herbalife в Україні.
              Для отримання інформації про наявність та умови замовлення зверніться до консультанта в Telegram.
            </p>
          </div>

          <a
            href={getTelegramLink(
              getProductTelegramMessage(product.name, activeSku, selectedFlavor?.label),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-6 sm:px-8 py-3.5 sm:py-4 min-h-11 text-sm sm:text-base font-bold text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Send className="h-5 w-5" />
            Замовити консультацію в Telegram
          </a>

          <div className="mt-8">
            <h2 className="font-semibold text-slate-900 mb-3">Переваги</h2>
            <ul className="space-y-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {product.ingredients && (
            <div className="mt-6">
              <h2 className="font-semibold text-slate-900 mb-2">Склад</h2>
              <p className="text-sm text-slate-600">{product.ingredients}</p>
            </div>
          )}

          <div className="mt-6">
            <h2 className="font-semibold text-slate-900 mb-2">Спосіб застосування</h2>
            <p className="text-sm text-slate-600">{product.usage}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-slate-50 border border-slate-200 p-5">
        <p className="text-xs text-slate-500 leading-relaxed">
          {siteConfig.legal.companyNote} Продукція не є лікарським засобом.
          Перед вживанням рекомендуємо консультацію зі спеціалістом.
          Результати можуть відрізнятися залежно від індивідуальних особливостей.
        </p>
      </div>
    </div>
  )
}
