/**
 * Імпорт каталогу з Greenvibe GraphQL + перевірка зображень.
 * Запуск: node scripts/import-catalog.mjs
 */
import { writeFileSync } from 'fs'

const CATEGORY_URLS = [
  ['formula1', 'https://greenvibe.com.ua/koktejli-dlja-shudnennja.html'],
  ['energy', 'https://greenvibe.com.ua/detoks-napoji.html'],
  ['snacks', 'https://greenvibe.com.ua/zdorovi-perekusy.html'],
  ['supplements', 'https://greenvibe.com.ua/vitaminy-ta-imunitet.html'],
  ['skincare', 'https://greenvibe.com.ua/kosmetyka-ta-dogljad.html'],
  ['sports', 'https://greenvibe.com.ua/sportyvne-harchuvannja.html'],
  ['accessories', 'https://greenvibe.com.ua/shejkery-ta-aksesuary.html'],
]

const SKIP_SKUS = new Set(['br_base', 'br_expanded', 'br_improved', 'lw_base', 'lw_expanded'])

const POPULAR = new Set([
  '005K', '1636', '0242', '2600', '3151', '0260', '2039', '486K', '0006', '178K',
])

function cleanImage(url) {
  if (!url) return ''
  return url.replace(/\/cache\/[a-f0-9]+\//, '/').replace(/\.webp$/, '.jpg')
}

function slugify(name, sku) {
  const base = name
    .replace(/\(.*?\)\s*$/, '')
    .toLowerCase()
    .replace(/herbalife/gi, '')
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 55)
  return `${base}-${sku.toLowerCase()}`.replace(/-+/g, '-')
}

function inferCategory(name, sku) {
  const n = name.toLowerCase()
  if (/шейкер|ложк|aksesuar|9b48|100m|8697/i.test(n + sku)) return 'accessories'
  if (/herbalife24|486k|488k|402k|403k|креатин|prolong|rebuild/i.test(n + sku)) return 'sports'
  if (/skin|hl\/skin|крем|гель|лосьйон|маска|сироватка|тонізувальний|очищувальн/i.test(n))
    return /шампунь|кондиціонер|рук та тіла/i.test(n) ? 'bodycare' : 'skincare'
  if (/шампунь|кондиціонер|aloe 250/i.test(n)) return 'bodycare'
  if (/батончик|чіпси|кава|латте/i.test(n)) return 'snacks'
  if (/алое|чай|liftoff|енергетичн/i.test(n)) return 'energy'
  if (/формула 1|формула 3|коктейль|protein|bake mix|вечірній|550 г/i.test(n)) return 'formula1'
  if (/дієтична|вітамін|формула 2|добавка|niteworks|immune|омега|кальцій|клітковина|вівсяно/i.test(n))
    return 'supplements'
  return 'supplements'
}

function buildDescription(name) {
  if (/формула 1/i.test(name))
    return `${name} — збалансований білковий коктейль Herbalife Nutrition з вітамінами та мінералами. Підтримує програму здорового харчування та контролю ваги.`
  if (/алое/i.test(name))
    return `${name} — рослинний напій на основі алое вера для підтримки травлення та гідратації протягом дня.`
  if (/чай/i.test(name))
    return `${name} — тонізуючий трав'яний концентрат. Додається до води для щоденного вживання.`
  if (/skin|hl\/skin/i.test(name))
    return `${name} — засіб лінійки догляду за шкірою Herbalife для щоденного ритуалу краси.`
  if (/herbalife24|486|488|402|403/i.test(name))
    return `${name} — продукт лінійки Herbalife24 для спортсменів та активного способу життя.`
  return `${name} — оригінальна продукція Herbalife Nutrition. Підходить як частина збалансованого харчування. Для консультації та замовлення зверніться до дистриб'ютора.`
}

async function gql(query) {
  const res = await fetch('https://greenvibe.com.ua/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  return res.json()
}

function extractPrimarySku(sku) {
  return sku.match(/[0-9]{3,4}K?/)?.[0] ?? sku.split('-')[0]
}

function buildFlavors(item) {
  const option = item.configurable_options?.find((o) => o.label === 'Смак') ?? item.configurable_options?.[0]
  if (!item.variants?.length) return null

  return item.variants.map((variant) => {
    const attr = variant.attributes?.find((a) => option?.values?.some((v) => v.value_index === a.value_index))
    return {
      label: attr?.label || variant.product.name,
      sku: extractPrimarySku(variant.product.sku),
      image: cleanImage(variant.product.image?.url || variant.product.small_image?.url),
    }
  })
}

async function fetchAllGreenvibe() {
  const items = []
  for (let page = 1; page <= 5; page++) {
    const data = await gql(`{
      products(filter: {}, pageSize: 50, currentPage: ${page}) {
        total_count
        items {
          sku name
          __typename
          image { url }
          small_image { url }
          description { html }
          ... on ConfigurableProduct {
            configurable_options {
              label
              attribute_code
              values { label value_index }
            }
            variants {
              product {
                sku name
                image { url }
                small_image { url }
              }
              attributes { label value_index }
            }
          }
        }
      }
    }`)
    const batch = data?.data?.products?.items ?? []
    items.push(...batch)
    if (items.length >= (data?.data?.products?.total_count ?? 0)) break
  }
  return items.filter((p) => !SKIP_SKUS.has(p.sku))
}

async function imageOk(url) {
  if (!url) return false
  try {
    const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } })
    return r.ok
  } catch {
    return false
  }
}

async function main() {
  const gv = await fetchAllGreenvibe()
  console.error(`Greenvibe: ${gv.length} products`)

  const products = []
  for (const g of gv) {
    const flavors = g.__typename === 'ConfigurableProduct' ? buildFlavors(g) : null
    if (g.__typename === 'ConfigurableProduct' && !flavors?.length) continue

    const primarySku = flavors?.length ? extractPrimarySku(g.sku) : extractPrimarySku(g.sku)
    const primaryFlavor = flavors?.find((f) => f.sku === primarySku) ?? flavors?.[0]
    const image =
      primaryFlavor?.image || cleanImage(g.image?.url || g.small_image?.url)
    const category = inferCategory(g.name, primarySku)
    const plainDesc = g.description?.html?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const name = g.name.replace(/\s*\(.*?\)\s*$/, '').trim() || g.name

    const product = {
      id: slugify(name, primarySku),
      sku: primarySku,
      name,
      category,
      shortDescription: plainDesc?.slice(0, 120) || buildDescription(g.name).split('.')[0] + '.',
      description: plainDesc?.slice(0, 600) || buildDescription(g.name),
      benefits: [
        'Оригінальна продукція Herbalife Nutrition',
        'Підтримка здорового способу життя',
        'Консультація та замовлення через Telegram',
      ],
      usage: 'Вживайте згідно з інструкцією на упаковці або рекомендаціями консультанта.',
      image,
      popular:
        POPULAR.has(primarySku) ||
        POPULAR.has(g.sku) ||
        flavors?.some((f) => POPULAR.has(f.sku)),
    }

    if (flavors?.length) product.flavors = flavors
    products.push(product)
  }

  // Перевірка зображень
  const broken = []
  for (const p of products) {
    if (!(await imageOk(p.image))) broken.push(p)
  }
  console.error(`Broken images: ${broken.length}`)

  writeFileSync('src/data/products.generated.json', JSON.stringify(products, null, 2))
  console.error(`Saved ${products.length} products`)
}

main().catch(console.error)
