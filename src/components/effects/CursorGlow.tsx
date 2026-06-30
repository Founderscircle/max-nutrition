import { useEffect, useRef } from 'react'
import { shouldUseLightEffects } from '../../hooks/useLightEffects'

type GlowMode = 'default' | 'contrast'

const CONTRAST_SELECTOR =
  '[data-glow-zone="contrast"], .gradient-brand, .gradient-hero, .bg-brand-800, .bg-brand-700, .bg-brand-900'

/** Швидка перевірка без getComputedStyle — лише closest по відомих класах/data-атрибутах */
function detectGlowMode(x: number, y: number): GlowMode {
  const el = document.elementFromPoint(x, y)
  if (!el || !(el instanceof Element)) return 'default'
  if (el.closest('.cursor-glow-orb')) return 'default'
  return el.closest(CONTRAST_SELECTOR) ? 'contrast' : 'default'
}

export function CursorGlow() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldUseLightEffects()) return

    const orb = orbRef.current
    if (!orb) return

    let posFrame = 0
    let modeFrame = 0
    let mode: GlowMode = 'default'
    let lastModeCheck = 0
    const MODE_CHECK_MS = 120

    const onMove = (e: MouseEvent) => {
      if (!posFrame) {
        posFrame = requestAnimationFrame(() => {
          orb.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
          posFrame = 0
        })
      }

      const now = performance.now()
      if (now - lastModeCheck < MODE_CHECK_MS || modeFrame) return
      lastModeCheck = now

      modeFrame = requestAnimationFrame(() => {
        const next = detectGlowMode(e.clientX, e.clientY)
        if (next !== mode) {
          mode = next
          orb.dataset.mode = mode
        }
        modeFrame = 0
      })
    }

    orb.dataset.mode = 'default'
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (posFrame) cancelAnimationFrame(posFrame)
      if (modeFrame) cancelAnimationFrame(modeFrame)
    }
  }, [])

  if (shouldUseLightEffects()) return null

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 cursor-glow-orb"
      data-mode="default"
      style={{ width: 0, height: 0, willChange: 'transform' }}
    >
      <div className="cursor-glow-outer" />
      <div className="cursor-glow-core" />
      <div className="cursor-glow-highlight" />
    </div>
  )
}
