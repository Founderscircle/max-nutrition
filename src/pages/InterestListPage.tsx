import { Link } from 'react-router-dom'
import { Send, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useInterestList } from '../context/InterestListContext'
import { ProductImage } from '../components/ProductImage'
import { QuantityPicker } from '../components/QuantityPicker'
import { InquiryForm } from '../components/InquiryForm'
import { getInterestListTelegramMessage, getTelegramLink, siteConfig } from '../config/site'
import { getProductById } from '../data/products'

export function InterestListPage() {
  const { items, totalCount, updateQuantity, removeItem, clearList } = useInterestList()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 sm:px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-slate-900">Ваш список порожній</h1>
        <p className="mt-3 text-slate-600">
          Додайте продукти, які вас цікавлять, і надішліть список консультанту в Telegram для
          консультації та узгодження замовлення.
        </p>
        <Link
          to="/catalog"
          className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:shadow-xl transition-all"
        >
          Перейти до каталогу
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Мій список</h1>
          <p className="mt-2 text-slate-600">
            {totalCount} {totalCount === 1 ? 'позиція' : totalCount < 5 ? 'позиції' : 'позицій'} ·
            надішліть список для консультації в Telegram
          </p>
        </div>
        <button
          type="button"
          onClick={clearList}
          className="self-start text-sm text-slate-500 hover:text-red-600 transition-colors"
        >
          Очистити список
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
        {siteConfig.legal.orderNote} Ціни та умови замовлення узгоджуються під час консультації.
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((item) => {
          const product = getProductById(item.productId)
          return (
            <li
              key={item.key}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Link
                to={`/catalog/${item.productId}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100"
              >
                <ProductImage
                  src={item.image || product?.image || ''}
                  alt={item.name}
                  category={product?.category ?? 'supplements'}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/catalog/${item.productId}`}
                  className="font-semibold text-slate-900 hover:text-brand-700 line-clamp-2 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-xs text-slate-400 font-mono">
                  {item.sku}
                  {item.flavorLabel ? ` · ${item.flavorLabel}` : ''}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <QuantityPicker
                    size="sm"
                    value={item.quantity}
                    onChange={(qty) => updateQuantity(item.key, qty)}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Видалити
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Надіслати список</h2>
        <p className="mt-2 text-sm text-slate-600">
          Відкриється Telegram з готовим повідомленням. Консультант отримає перелік продуктів і
          кількість, після чого зв'яжеться з вами для узгодження деталей.
        </p>
        <a
          href={getTelegramLink(getInterestListTelegramMessage(items))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-6 py-4 min-h-11 text-sm sm:text-base font-bold text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Send className="h-5 w-5" />
          Надіслати в Telegram
        </a>
        <Link
          to="/catalog"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 min-h-11 text-sm font-semibold text-slate-700 hover:border-brand-200 transition-colors"
        >
          Додати ще продукти
        </Link>
      </div>

      <div className="mt-6">
        <InquiryForm
          type="list"
          listItems={items}
          hideTelegramLink
          title="Або залишити контакт"
          description="Консультант отримає ваш список і зв'яжеться з вами — навіть якщо ви не відкрили Telegram."
          onSuccess={clearList}
        />
      </div>
    </div>
  )
}
