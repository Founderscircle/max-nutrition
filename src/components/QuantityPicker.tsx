import { Minus, Plus } from 'lucide-react'

interface QuantityPickerProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
}

export function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantityPickerProps) {
  const buttonClass =
    size === 'sm'
      ? 'h-8 w-8'
      : 'h-10 w-10'
  const valueClass = size === 'sm' ? 'w-8 text-sm' : 'w-10 text-base'

  return (
    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${buttonClass} flex items-center justify-center rounded-l-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors`}
        aria-label="Зменшити кількість"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`${valueClass} text-center font-semibold text-slate-900 tabular-nums`}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${buttonClass} flex items-center justify-center rounded-r-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors`}
        aria-label="Збільшити кількість"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
