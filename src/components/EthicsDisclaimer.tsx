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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ethics-disclaimer-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
        <div className="gradient-brand px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 id="ethics-disclaimer-title" className="text-lg font-bold">
                Важлива інформація
              </h2>
              <p className="text-sm text-brand-100 mt-0.5">
                {siteConfig.name} · незалежний дистриб'ютор
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4 text-sm text-slate-600 leading-relaxed">
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
              className="inline-flex items-center gap-1.5 mt-2 font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2"
            >
              {siteConfig.legal.officialSiteLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={accept}
            className="flex-1 rounded-xl gradient-brand px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:shadow-xl transition-all"
          >
            Я розумію та бажаю продовжити
          </button>
          <a
            href={siteConfig.legal.officialSiteUrl}
            className="flex-1 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 text-center hover:border-brand-200 hover:text-brand-700 transition-colors"
          >
            На офіційний сайт
          </a>
        </div>
      </div>
    </div>
  )
}
