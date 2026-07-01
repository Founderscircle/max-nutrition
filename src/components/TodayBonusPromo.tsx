import { Link } from 'react-router-dom'
import { Gift, BookOpen } from 'lucide-react'
import { siteConfig } from '../config/site'
import { useOfferCountdown } from '../hooks/useOfferCountdown'

interface TodayBonusPromoProps {
  compact?: boolean
  showCatalogLink?: boolean
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/90 text-lg sm:text-xl font-bold text-brand-800 tabular-nums shadow-sm">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] sm:text-xs text-brand-700/80 font-medium">{label}</span>
    </div>
  )
}

export function TodayBonusPromo({ compact = false, showCatalogLink = false }: TodayBonusPromoProps) {
  const { hours, minutes, seconds } = useOfferCountdown()
  const { todayBonus } = siteConfig.legal

  if (compact) {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-orange-50 to-brand-50 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Gift className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 text-sm sm:text-base">{todayBonus.title}</p>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-600 line-clamp-2">
                {todayBonus.description}
              </p>
            </div>
          </div>
          <div className="shrink-0 self-center sm:self-auto text-center sm:text-right">
            <p className="text-[10px] sm:text-xs font-medium text-slate-500 mb-2">
              {todayBonus.timerLabel}
            </p>
            <div className="flex items-center gap-2">
              <TimeBlock value={hours} label="год" />
              <span className="text-brand-400 font-bold pb-4">:</span>
              <TimeBlock value={minutes} label="хв" />
              <span className="text-brand-400 font-bold pb-4">:</span>
              <TimeBlock value={seconds} label="сек" />
            </div>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">{todayBonus.disclaimer}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-orange-50/80 to-brand-50 p-5 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 mb-3">
            <Gift className="h-3.5 w-3.5" />
            {todayBonus.badge}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{todayBonus.title}</h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            {todayBonus.description}
          </p>
          <div className="mt-4 flex items-start gap-2 text-sm text-slate-700">
            <BookOpen className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
            <span>{todayBonus.bonusName}</span>
          </div>
        </div>

        <div className="shrink-0 text-center">
          <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
            {todayBonus.timerLabel}
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <TimeBlock value={hours} label="годин" />
            <span className="text-xl text-brand-400 font-bold pb-5">:</span>
            <TimeBlock value={minutes} label="хвилин" />
            <span className="text-xl text-brand-400 font-bold pb-5">:</span>
            <TimeBlock value={seconds} label="секунд" />
          </div>
        </div>
      </div>

      <p className="mt-5 pt-4 border-t border-amber-200/60 text-xs text-slate-500 leading-relaxed">
        {todayBonus.disclaimer}
      </p>

      {showCatalogLink && (
        <Link
          to="/catalog"
          className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
        >
          Перейти до каталогу →
        </Link>
      )}
    </div>
  )
}
