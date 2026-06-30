import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getProductById } from '../lib/products'
import { checkRateLimit, incrementViewsToday, trackProductView } from '../lib/redis'
import { getClientIp, handleOptions, setCors } from '../lib/http'
import type { TrackPayload } from '../lib/types'

function isValidPayload(body: unknown): body is TrackPayload {
  if (!body || typeof body !== 'object') return false
  const data = body as TrackPayload
  return (
    (data.type === 'page' || data.type === 'product') &&
    (data.type !== 'product' || typeof data.productId === 'string')
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return
  setCors(res)

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const ip = getClientIp(req)
  const allowed = await checkRateLimit(`track:${ip}`, 120, 3600)
  if (!allowed) {
    res.status(429).json({ ok: false })
    return
  }

  if (!isValidPayload(req.body)) {
    res.status(400).json({ error: 'Invalid payload' })
    return
  }

  const payload = req.body

  if (payload.type === 'product' && payload.productId) {
    if (!getProductById(payload.productId)) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    await trackProductView(payload.productId)
  }

  const viewsToday = await incrementViewsToday()

  res.status(200).json({ ok: true, viewsToday: viewsToday ?? 0 })
}
