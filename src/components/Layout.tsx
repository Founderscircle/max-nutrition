import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { LegalBanner } from './LegalBanner'
import { SiteEffects } from './effects/SiteEffects'

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteEffects />
      <div className="relative z-10 flex min-h-screen flex-col">
        <LegalBanner />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
