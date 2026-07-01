import type { ProductFlavor } from '../data/products'

interface FlavorPickerProps {
  flavors: ProductFlavor[]
  selectedSku: string
  onSelect: (flavor: ProductFlavor) => void
}

export function FlavorPicker({ flavors, selectedSku, onSelect }: FlavorPickerProps) {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-slate-900 mb-3">Смак</p>
      <div className="flex flex-wrap gap-2">
        {flavors.map((flavor) => {
          const selected = flavor.sku === selectedSku
          return (
            <button
              key={flavor.sku}
              type="button"
              onClick={() => onSelect(flavor)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                selected
                  ? 'border-brand-600 bg-brand-600 text-white shadow-sm shadow-brand-600/25'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {flavor.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
