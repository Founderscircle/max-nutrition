export interface Product {
  id: string
  sku: string
  name: string
  category: string
  shortDescription: string
  description: string
  benefits: string[]
  ingredients?: string
  usage: string
  image: string
  popular?: boolean
}

export interface SiteStats {
  productCount: number
  categoryCount: number
  viewsToday: number
  inquiriesTotal: number
  trendingProductIds: string[]
  updatedAt: string
}

export interface InquiryListItem {
  name: string
  sku: string
  flavorLabel?: string
  quantity: number
}

export interface InquiryPayload {
  type: 'contact' | 'product' | 'list'
  name: string
  contact: string
  message: string
  productId?: string
  productName?: string
  productSku?: string
  listItems?: InquiryListItem[]
}

export interface TrackPayload {
  type: 'page' | 'product'
  path?: string
  productId?: string
}
