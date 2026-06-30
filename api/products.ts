import type { VercelRequest, VercelResponse } from '@vercel/node'
import { products } from '../lib/products'
import { handleOptions, setCors } from '../lib/http'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return
  setCors(res)

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json({ products })
}
