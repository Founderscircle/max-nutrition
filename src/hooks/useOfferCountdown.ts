import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mn-bonus-offer-v1'
const DURATION_MS = 24 * 60 * 60 * 1000

function readOfferStart(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const startedAt = JSON.parse(raw)?.startedAt
    return typeof startedAt === 'number' ? startedAt : null
  } catch {
    return null
  }
}

function writeOfferStart(startedAt: number) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ startedAt }))
}

/** Персональне вікно 24 год — зберігається в браузері користувача. */
export function getOrStartOfferWindow(): number {
  const existing = readOfferStart()
  if (existing !== null && Date.now() < existing + DURATION_MS) {
    return existing
  }

  const startedAt = Date.now()
  writeOfferStart(startedAt)
  return startedAt
}

function getRemainingSeconds(startedAt: number): number {
  return Math.max(0, Math.floor((startedAt + DURATION_MS - Date.now()) / 1000))
}

export function useOfferCountdown() {
  const [remaining, setRemaining] = useState(() =>
    getRemainingSeconds(getOrStartOfferWindow()),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getRemainingSeconds(getOrStartOfferWindow()))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return {
    hours: Math.floor(remaining / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    isActive: remaining > 0,
  }
}
