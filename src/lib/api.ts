export interface InquiryListItem {
  name: string
  sku: string
  flavorLabel?: string
  quantity: number
}

export interface InquiryFormData {
  type: 'contact' | 'product' | 'list'
  name: string
  contact: string
  message: string
  productId?: string
  productName?: string
  productSku?: string
  listItems?: InquiryListItem[]
}

export interface SiteStats {
  productCount: number
  categoryCount: number
  viewsToday: number
  inquiriesTotal: number
  trendingProductIds: string[]
  updatedAt: string
}

export interface ApiStats extends SiteStats {
  analyticsEnabled: boolean
}

const API_BASE = '/api'

async function parseJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { error?: string }
  if (!response.ok) {
    throw new Error(data.error ?? 'Помилка сервера')
  }
  return data
}

export async function fetchStats(): Promise<ApiStats | null> {
  try {
    const response = await fetch(`${API_BASE}/stats`)
    if (!response.ok) return null
    return parseJson<ApiStats>(response)
  } catch {
    return null
  }
}

export async function submitInquiry(data: InquiryFormData): Promise<string> {
  const response = await fetch(`${API_BASE}/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await parseJson<{ message: string }>(response)
  return result.message
}

export async function trackPageView(path: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'page', path }),
    })
  } catch {
    // Analytics is best-effort
  }
}

export async function trackProductView(productId: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', productId }),
    })
  } catch {
    // Analytics is best-effort
  }
}
