import { Info } from 'lucide-react'
import { siteConfig } from '../config/site'

export function LegalBanner() {
  return (
    <div className="bg-brand-800 text-white text-center py-2 px-4 text-xs sm:text-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-center gap-2">
        <Info className="h-3.5 w-3.5 shrink-0 opacity-80" />
        <span>
          Інформаційний сайт незалежного дистриб'ютора · Без цін та реклами · Замовлення через{' '}
          <strong>Telegram</strong> · {siteConfig.legal.orderNote.split('.')[0]}
        </span>
      </div>
    </div>
  )
}
