import { useEffect, useState } from 'react'
import { AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../config/site'

const STORAGE_KEY = `mn-disclaimer-v${siteConfig.legal.disclaimerVersion}`

export function EthicsDisclaimer() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY)
    if (!accepted) setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  function accept() {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto safe-top safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ethics-disclaimer-title"
    >
      <div className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up max-h-[100dvh] sm:max-h-[calc(100dvh-2rem)] flex flex-col">
        <div className="gradient-brand px-5 sm:px-6 py-4 sm:py-5 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/20 shrink-0">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h2 id="ethics-disclaimer-title" className="text-base sm:text-lg font-bold">
                Важлива інформація
              </h2>
              <p className="text-xs sm:text-sm text-brand-100 mt-0.5 truncate">
                {siteConfig.name} · незалежний дистриб'ютор
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-4 text-sm text-slate-600 leading-relaxed overflow-y-auto flex-1">
          <p className="font-medium text-slate-800">
            Ви переходите на інформаційний сайт-візитку незалежного дистриб'ютора Herbalife Nutrition.
            Цей ресурс <strong>не є офіційним веб-сайтом</strong> компанії Herbalife.
          </p>

          <ul className="space-y-2.5">
            <li className="flex gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{siteConfig.legal.noPricesNote}</span>
            </li>
            <li className="flex gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{siteConfig.legal.orderNote}</span>
            </li>
            <li className="flex gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                {siteConfig.legal.medicalNote} Результати індивідуальні.
                Перед вживанням проконсультуйтесь зі спеціалістом.
              </span>
            </li>
          </ul>

          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-slate-700">
              Для офіційної інформації про компанію, продукти та політику Herbalife Nutrition
              відвідайте корпоративний сайт:
            </p>
            <a
              href={siteConfig.legal.officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2 break-words"
            >
              {siteConfig.legal.officialSiteLabel}
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col gap-3 shrink-0 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={accept}
            className="w-full rounded-xl gradient-brand px-5 py-3.5 min-h-11 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:shadow-xl transition-all"
          >
            Я розумію та бажаю продовжити
          </button>
          <a
            href={siteConfig.legal.officialSiteUrl}
            className="w-full rounded-xl border border-slate-200 px-5 py-3.5 min-h-11 text-sm font-semibold text-slate-700 text-center hover:border-brand-200 hover:text-brand-700 transition-colors flex items-center justify-center"
          >
            На офіційний сайт
          </a>
        </div>
      </div>
    </div>
  )
}
