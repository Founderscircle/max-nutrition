export interface InterestListItem {
  key: string
  productId: string
  name: string
  sku: string
  flavorLabel?: string
  image?: string
  quantity: number
}

export function makeInterestListKey(productId: string, sku: string): string {
  return `${productId}:${sku}`
}
