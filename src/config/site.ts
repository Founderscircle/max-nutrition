export const siteConfig = {
  name: 'Max Nutrition',
  tagline: 'Незалежний дистриб\'ютор Herbalife',
  telegram: {
    username: 'max_nutrition_herbalife',
    displayName: '@max_nutrition_herbalife',
  },
  distributor: {
    names: ['Максим Іващенко'],
    country: 'Україна',
    email: 'info@max-nutrition.net.ua',
    phone: '+380 XX XXX XX XX',
  },
  legal: {
    officialSiteUrl: 'https://www.herbalife.com/uk-ua/',
    officialSiteLabel: 'Офіційний сайт Herbalife Nutrition',
    disclaimerVersion: '1',
    companyNote:
      'Цей веб-сайт є інформаційним ресурсом незалежного дистриб\'ютора Herbalife. Не є офіційним сайтом компанії Herbalife Nutrition.',
    noPricesNote:
      'На сайті не розміщено цін та комерційної реклами відповідно до правил дистрибуції Herbalife в Україні.',
    orderNote:
      'Замовлення приймаються виключно через особисту консультацію в Telegram після узгодження деталей.',
    medicalNote:
      'Продукція Herbalife Nutrition не є лікарським засобом і не призначена для діагностики, лікування або профілактики захворювань.',
  },
} as const

export function getTelegramLink(message?: string): string {
  const base = `https://t.me/${siteConfig.telegram.username}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function getProductTelegramMessage(productName: string, sku: string): string {
  return `Вітаю! Цікавить продукт: ${productName} (${sku}). Будь ласка, надайте консультацію щодо наявності та умов замовлення.`
}
