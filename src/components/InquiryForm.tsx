import { useState, type FormEvent } from 'react'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { submitInquiry, type InquiryFormData, type InquiryListItem } from '../lib/api'
import { getInterestListTelegramMessage, getTelegramLink, siteConfig } from '../config/site'

interface InquiryFormProps {
  type?: 'contact' | 'product' | 'list'
  productId?: string
  productName?: string
  productSku?: string
  productFlavor?: string
  listItems?: InquiryListItem[]
  title?: string
  description?: string
  compact?: boolean
  hideTelegramLink?: boolean
  onSuccess?: () => void
}

export function InquiryForm({
  type = 'contact',
  productId,
  productName,
  productSku,
  productFlavor,
  listItems,
  title = 'Залишити заявку',
  description = 'Заповніть форму — консультант зв\'яжеться з вами найближчим часом.',
  compact = false,
  hideTelegramLink = false,
  onSuccess,
}: InquiryFormProps) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  function buildMessage(): string {
    if (type === 'list' && listItems?.length) {
      return getInterestListTelegramMessage(listItems)
    }
    if (type === 'product' && productName) {
      const flavorPart = productFlavor ? `, смак: ${productFlavor}` : ''
      return `Цікавить продукт: ${productName}${flavorPart}${productSku ? ` (${productSku})` : ''}.`
    }
    return 'Прошу зв\'язатися зі мною для консультації.'
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setStatus('loading')
    setFeedback('')

    const payload: InquiryFormData = {
      type,
      name: name.trim(),
      contact: contact.trim(),
      message: buildMessage(),
      productId,
      productName,
      productSku,
      listItems: type === 'list' ? listItems : undefined,
    }

    try {
      const result = await submitInquiry(payload)
      setStatus('success')
      setFeedback(result)
      setName('')
      setContact('')
      onSuccess?.()
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Не вдалося надіслати заявку')
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-6 ${compact ? '' : 'p-8'}`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900">Заявку надіслано</h3>
            <p className="mt-1 text-sm text-emerald-700">{feedback}</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-4 inline-flex items-center rounded-lg px-3 py-2 min-h-10 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              Надіслати ще одну
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl bg-white border border-slate-200 ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-8'}`}>
      <div className="mb-6">
        <h2 className={`font-bold text-slate-900 ${compact ? 'text-lg' : 'text-xl'}`}>{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Ваше ім'я</span>
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Олена"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Телефон або Telegram</span>
            <input
              type="text"
              required
              minLength={3}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+380... або @username"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-base sm:text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600 rounded-lg bg-red-50 border border-red-100 px-4 py-3">
            {feedback}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-1">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-6 py-3.5 min-h-11 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:shadow-xl disabled:opacity-70 transition-all"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Надіслати заявку
          </button>
          {!hideTelegramLink && (
            <a
              href={getTelegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 min-h-11 text-sm font-semibold text-slate-700 hover:border-brand-200 transition-colors"
            >
              <span className="truncate">Або {siteConfig.telegram.displayName}</span>
            </a>
          )}
        </div>
      </form>
    </div>
  )
}
