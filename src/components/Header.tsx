import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Leaf, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig, getTelegramLink } from '../config/site'

const navLinks = [
  { to: '/', label: 'Головна' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'Про мене' },
  { to: '/contact', label: 'Контакти' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 glass safe-top">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-brand shadow-md shadow-brand-600/20 transition-transform group-hover:scale-105">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 text-left">
            <span className="block truncate text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {siteConfig.name}
            </span>
            <span className="block truncate text-xs text-brand-600 font-medium">
              Незалежний дистриб'ютор
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getTelegramLink('Вітаю! Хочу отримати консультацію щодо продукції Herbalife.')}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition-all hover:shadow-lg hover:shadow-brand-600/30 hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
            Telegram
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200/60 px-4 py-4 space-y-1 max-h-[calc(100dvh-4.5rem)] overflow-y-auto safe-bottom">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3.5 text-base font-medium min-h-11 ${
                location.pathname === link.to
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getTelegramLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl gradient-brand px-4 py-3.5 text-base font-semibold text-white mt-2 min-h-11"
          >
            <Send className="h-4 w-4" />
            Написати в Telegram
          </a>
        </nav>
      )}
    </header>
  )
}
