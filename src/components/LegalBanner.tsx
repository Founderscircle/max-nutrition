import { Info } from 'lucide-react'

export function LegalBanner() {
  return (
    <div className="bg-brand-800 text-white py-2 px-4 text-xs sm:text-sm safe-top">
      <div className="mx-auto max-w-6xl flex flex-wrap items-start sm:items-center justify-center gap-x-2 gap-y-1 text-left sm:text-center">
        <Info className="h-3.5 w-3.5 shrink-0 opacity-80 mt-0.5 sm:mt-0" />
        <span className="min-w-0 text-balance">
          <span className="sm:hidden">
            Незалежний дистриб'ютор · Без цін · Замовлення через <strong>Telegram</strong>
          </span>
          <span className="hidden sm:inline">
            Інформаційний сайт незалежного дистриб'ютора · Без цін та реклами · Замовлення через{' '}
            <strong>Telegram</strong>
          </span>
        </span>
      </div>
    </div>
  )
}
