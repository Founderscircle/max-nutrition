import { Link } from 'react-router-dom'
import { Leaf, Send } from 'lucide-react'
import { siteConfig, getTelegramLink } from '../config/site'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto safe-bottom">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-brand">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              {siteConfig.tagline}. Інформаційний сайт-візитка з каталогом продукції.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Навігація</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="text-slate-500 hover:text-brand-600 transition-colors">Каталог</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-brand-600 transition-colors">Про нас</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-brand-600 transition-colors">Контакти</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-brand-600 transition-colors">Політика конфіденційності</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-brand-600 transition-colors">Умови використання</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Зв'язок</h3>
            <a
              href={getTelegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm"
            >
              <Send className="h-4 w-4" />
              {siteConfig.telegram.displayName}
            </a>
            <p className="text-sm text-slate-500 mt-3">{siteConfig.distributor.city}, {siteConfig.distributor.country}</p>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">Важлива інформація:</strong>{' '}
            {siteConfig.legal.companyNote}{' '}
            {siteConfig.legal.noPricesNote}{' '}
            {siteConfig.legal.medicalNote}{' '}
            Результати індивідуальні. Перед вживанням проконсультуйтесь зі спеціалістом.{' '}
            <a
              href={siteConfig.legal.officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 underline underline-offset-2"
            >
              {siteConfig.legal.officialSiteLabel}
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}. Усі права захищені.
        </p>
      </div>
    </footer>
  )
}
