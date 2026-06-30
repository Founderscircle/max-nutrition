/** Вимикає важкі ефекти на мобільних, touch-пристроях, reduced-motion та слабких GPU */
export function shouldUseLightEffects(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  if (window.matchMedia('(pointer: coarse)').matches) return true
  if (window.innerWidth < 768) return true
  // Chrome на macOS інколи повільно малює великі blur-шари
  if (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) return true
  return false
}
