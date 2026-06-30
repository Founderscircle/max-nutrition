import { useEffect, useRef } from 'react'
import { shouldUseLightEffects } from '../../hooks/useLightEffects'

type GlowMode = 'default' | 'contrast'

function parseRgb(color: string): [number, number, number] | null {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

function isTealBackground(color: string): boolean {
  const rgb = parseRgb(color)
  if (!rgb) return false
  const [r, g, b] = rgb
  if (g < 100 || b < 100) return false
  return g > r && b > r - 30 && g + b > r * 2.2
}

function detectGlowMode(x: number, y: number): GlowMode {
  const stack = document.elementsFromPoint(x, y)

  for (const el of stack) {
    if (!(el instanceof HTMLElement)) continue
    if (el.closest('.cursor-glow-orb')) continue

    let node: HTMLElement | null = el
    while (node && node !== document.documentElement) {
      const cn = node.className
      if (typeof cn === 'string') {
        if (
          cn.includes('gradient-hero') ||
          cn.includes('gradient-brand') ||
          /\bbg-brand-/.test(cn) ||
          /\bbg-teal-/.test(cn) ||
          /\bfrom-brand-/.test(cn) ||
          /\bto-brand-/.test(cn)
        ) {
          return 'contrast'
        }
      }

      const bg = getComputedStyle(node).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && isTealBackground(bg)) {
        return 'contrast'
      }

      const bgImage = getComputedStyle(node).backgroundImage
      if (bgImage?.includes('gradient') && /brand|teal|#0d9488|#14b8a6|#f0fdfa|#ecfeff/i.test(bgImage)) {
        return 'contrast'
      }

      node = node.parentElement
    }
  }
  return 'default'
}

export function CursorGlow() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldUseLightEffects()) return

    const orb = orbRef.current
    if (!orb) return

    let frame = 0
    let mode: GlowMode = 'default'

    const onMove = (e: MouseEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        orb.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`

        const next = detectGlowMode(e.clientX, e.clientY)
        if (next !== mode) {
          mode = next
          orb.dataset.mode = mode
        }
        frame = 0
      })
    }

    orb.dataset.mode = 'default'
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  if (shouldUseLightEffects()) return null

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 cursor-glow-orb"
      data-mode="default"
      style={{ width: 0, height: 0 }}
    >
      <div className="cursor-glow-outer" />
      <div className="cursor-glow-core" />
      <div className="cursor-glow-highlight" />
    </div>
  )
}
