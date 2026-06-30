interface SectionOrbProps {
  className?: string
  variant?: 'mint' | 'teal' | 'aqua'
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 220, md: 320, lg: 420 }
const variants = {
  mint: 'from-teal-200/40 via-emerald-100/30 to-cyan-100/20',
  teal: 'from-brand-300/35 via-brand-200/25 to-teal-100/15',
  aqua: 'from-cyan-200/35 via-brand-100/25 to-emerald-50/20',
}

/** Статичний декоративний orb — тільки CSS, без JS-циклів */
export function SectionOrb({ className = '', variant = 'teal', size = 'md' }: SectionOrbProps) {
  const px = sizes[size]

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div
        className={`rounded-full blur-2xl bg-gradient-to-br ${variants[variant]} section-orb-drift`}
        style={{ width: px, height: px }}
      />
    </div>
  )
}
