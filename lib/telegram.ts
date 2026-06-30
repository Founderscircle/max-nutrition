function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
}

export async function sendTelegramMessage(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return false

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: html,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  return response.ok
}

export function formatInquiryMessage(payload: {
  type: 'contact' | 'product'
  name: string
  contact: string
  message: string
  productName?: string
  productSku?: string
}): string {
  const title =
    payload.type === 'product'
      ? '🛒 <b>Запит щодо продукту</b>'
      : '💬 <b>Нова заявка з сайту</b>'

  const lines = [
    title,
    '',
    `<b>Ім'я:</b> ${escapeHtml(payload.name)}`,
    `<b>Контакт:</b> ${escapeHtml(payload.contact)}`,
  ]

  if (payload.productName) {
    lines.push(`<b>Продукт:</b> ${escapeHtml(payload.productName)}`)
  }
  if (payload.productSku) {
    lines.push(`<b>Артикул:</b> ${escapeHtml(payload.productSku)}`)
  }

  lines.push('', `<b>Повідомлення:</b>`, escapeHtml(payload.message))
  lines.push('', `<i>Max Nutrition · max-nutrition.net.ua</i>`)

  return lines.join('\n')
}
