import catalog from './products.generated.json'

export type ProductCategory =
  | 'formula1'
  | 'energy'
  | 'supplements'
  | 'snacks'
  | 'skincare'
  | 'bodycare'
  | 'sports'
  | 'accessories'

export interface Product {
  id: string
  sku: string
  name: string
  category: ProductCategory
  shortDescription: string
  description: string
  benefits: string[]
  ingredients?: string
  usage: string
  image: string
  popular?: boolean
}

export const categoryLabels: Record<ProductCategory, string> = {
  formula1: 'Коктейлі та протеїн',
  energy: 'Детокс-напої та енергія',
  supplements: 'Вітаміни та добавки',
  snacks: 'Перекуси',
  skincare: 'Догляд за шкірою',
  bodycare: 'Догляд за тілом',
  sports: 'Herbalife24 / Спорт',
  accessories: 'Шейкери та аксесуари',
}

export const categoryDescriptions: Record<ProductCategory, string> = {
  formula1: 'Формула 1, протеїнові суміші та коктейлі для контролю ваги',
  energy: 'Алое вера, трав\'яний чай, Liftoff та енергетичні напої',
  supplements: 'Вітаміни, мінерали, імунітет, серце, кістки та метаболізм',
  snacks: 'Протеїнові батончики, чіпси та кава',
  skincare: 'Лінійки Herbalife SKIN та HL/Skin для обличчя',
  bodycare: 'Herbal Aloe — догляд за тілом та волоссям',
  sports: 'Herbalife24 — спортивне харчування',
  accessories: 'Шейкери, мірні ложки та аксесуари',
}

export const products = catalog as Product[]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular)
}
