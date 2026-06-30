import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  if (!redis) redis = new Redis({ url, token })
  return redis
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function incrementViewsToday(): Promise<number | null> {
  const client = getRedis()
  if (!client) return null
  const key = `stats:views:${todayKey()}`
  const count = await client.incr(key)
  if (count === 1) await client.expire(key, 60 * 60 * 48)
  return count
}

export async function getViewsToday(): Promise<number | null> {
  const client = getRedis()
  if (!client) return null
  const value = await client.get<number>(`stats:views:${todayKey()}`)
  return value ?? 0
}

export async function trackProductView(productId: string): Promise<void> {
  const client = getRedis()
  if (!client) return
  const day = todayKey()
  await client.zincrby(`stats:product-views:${day}`, 1, productId)
  await client.expire(`stats:product-views:${day}`, 60 * 60 * 48)
  await client.zincrby('stats:product-views:all', 1, productId)
}

export async function getTrendingProductIds(limit = 4): Promise<string[]> {
  const client = getRedis()
  if (!client) return []
  const day = todayKey()
  const today = await client.zrange<string[]>(`stats:product-views:${day}`, 0, limit - 1, {
    rev: true,
  })
  if (today.length >= limit) return today
  const allTime = await client.zrange<string[]>(
    'stats:product-views:all',
    0,
    limit - 1,
    { rev: true },
  )
  const merged = [...today]
  for (const id of allTime) {
    if (!merged.includes(id) && merged.length < limit) merged.push(id)
  }
  return merged
}

export async function incrementInquiries(): Promise<number | null> {
  const client = getRedis()
  if (!client) return null
  return client.incr('stats:inquiries:total')
}

export async function getInquiriesTotal(): Promise<number | null> {
  const client = getRedis()
  if (!client) return null
  const value = await client.get<number>('stats:inquiries:total')
  return value ?? 0
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<boolean> {
  const client = getRedis()
  if (!client) return true
  const redisKey = `ratelimit:${key}`
  const count = await client.incr(redisKey)
  if (count === 1) await client.expire(redisKey, windowSec)
  return count <= limit
}

export function isRedisConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}
