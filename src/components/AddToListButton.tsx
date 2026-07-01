import { useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import { useInterestList } from '../context/InterestListContext'

interface AddToListButtonProps {
  productId: string
  name: string
  sku: string
  flavorLabel?: string
  image?: string
  quantity?: number
  compact?: boolean
  className?: string
}

export function AddToListButton({
  productId,
  name,
  sku,
  flavorLabel,
  image,
  quantity = 1,
  compact = false,
  className = '',
}: AddToListButtonProps) {
  const { addItem } = useInterestList()
  const [added, setAdded] = useState(false)

  function handleClick() {
    addItem({ productId, name, sku, flavorLabel, image, quantity })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 font-medium transition-all ${
        added
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100'
      } ${compact ? 'h-11 text-xs sm:text-sm' : 'h-11 px-4 text-sm'} ${className}`}
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Додано</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">В кошик</span>
        </>
      )}
    </button>
  )
}
