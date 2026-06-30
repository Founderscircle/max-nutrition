import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getProductById } from '../lib/products'
import { checkRateLimit, incrementInquiries } from '../lib/redis'
import { formatInquiryMessage, isTelegramConfigured, sendTelegramMessage } from '../lib/telegram'
import { getClientIp, handleOptions, setCors } from '../lib/http'
import type { InquiryPayload } from '../lib/types'

function isValidPayload(body: unknown): body is InquiryPayload {
  if (!body || typeof body !== 'object') return false
  const data = body as InquiryPayload
  return (
    (data.type === 'contact' || data.type === 'product') &&
    typeof data.name === 'string' &&
    data.name.trim().length >= 2 &&
    typeof data.contact === 'string' &&
    data.contact.trim().length >= 3 &&
    typeof data.message === 'string' &&
    data.message.trim().length >= 5
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return
  setCors(res)

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!isTelegramConfigured()) {
    res.status(503).json({
      error: 'Сервіс тимчасово недоступний. Напишіть нам у Telegram.',
    })
    return
  }

  const ip = getClientIp(req)
  const allowed = await checkRateLimit(`inquiry:${ip}`, 5, 3600)
  if (!allowed) {
    res.status(429).json({ error: 'Забагато запитів. Спробуйте пізніше або напишіть у Telegram.' })
    return
  }

  if (!isValidPayload(req.body)) {
    res.status(400).json({ error: 'Перевірте заповнення форми.' })
    return
  }

  const payload = req.body
  let productName = payload.productName
  let productSku = payload.productSku

  if (payload.type === 'product' && payload.productId) {
    const product = getProductById(payload.productId)
    if (product) {
      productName = product.name
      productSku = product.sku
    }
  }

  const sent = await sendTelegramMessage(
    formatInquiryMessage({
      type: payload.type,
      name: payload.name.trim(),
      contact: payload.contact.trim(),
      message: payload.message.trim(),
      productName,
      productSku,
    }),
  )

  if (!sent) {
    res.status(502).json({ error: 'Не вдалося надіслати заявку. Спробуйте Telegram.' })
    return
  }

  await incrementInquiries()

  res.status(200).json({ ok: true, message: 'Заявку надіслано. Ми зв\'яжемось з вами найближчим часом.' })
}
