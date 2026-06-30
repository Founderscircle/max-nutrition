import catalog from '../src/data/products.generated.json'
import type { Product } from './types'

export const products = catalog as Product[]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getCategoryCount(): number {
  return new Set(products.map((p) => p.category)).size
}
