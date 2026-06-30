/** Вимикає важкі ефекти на мобільних, touch-пристроях і при reduced-motion */
export function shouldUseLightEffects(): boolean {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 768
  )
}
