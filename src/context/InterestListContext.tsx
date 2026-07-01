import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  type InterestListItem,
  makeInterestListKey,
} from '../types/interest-list'

const STORAGE_KEY = 'mn-interest-list-v1'

interface AddItemInput {
  productId: string
  name: string
  sku: string
  flavorLabel?: string
  image?: string
  quantity?: number
}

interface InterestListContextValue {
  items: InterestListItem[]
  totalCount: number
  addItem: (input: AddItemInput) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearList: () => void
}

const InterestListContext = createContext<InterestListContextValue | null>(null)

function loadItems(): InterestListItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as InterestListItem[]
    return Array.isArray(parsed) ? parsed.filter((item) => item.key && item.quantity > 0) : []
  } catch {
    return []
  }
}

export function InterestListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InterestListItem[]>(loadItems)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((input: AddItemInput) => {
    const quantity = Math.max(1, input.quantity ?? 1)
    const key = makeInterestListKey(input.productId, input.sku)

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [
        ...prev,
        {
          key,
          productId: input.productId,
          name: input.name,
          sku: input.sku,
          flavorLabel: input.flavorLabel,
          image: input.image,
          quantity,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((item) => item.key !== key))
      return
    }

    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item)),
    )
  }, [])

  const clearList = useCallback(() => {
    setItems([])
  }, [])

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, totalCount, addItem, removeItem, updateQuantity, clearList }),
    [items, totalCount, addItem, removeItem, updateQuantity, clearList],
  )

  return (
    <InterestListContext.Provider value={value}>{children}</InterestListContext.Provider>
  )
}

export function useInterestList(): InterestListContextValue {
  const context = useContext(InterestListContext)
  if (!context) {
    throw new Error('useInterestList must be used within InterestListProvider')
  }
  return context
}
