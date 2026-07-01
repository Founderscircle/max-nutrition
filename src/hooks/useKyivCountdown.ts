import { useEffect, useState } from 'react'

function getRemainingSeconds(): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date())

  const value = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0)

  const elapsed = value('hour') * 3600 + value('minute') * 60 + value('second')
  return 24 * 3600 - elapsed
}

export function useKyivCountdown() {
  const [remaining, setRemaining] = useState(getRemainingSeconds)

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemainingSeconds()), 1000)
    return () => clearInterval(timer)
  }, [])

  return {
    hours: Math.floor(remaining / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  }
}
