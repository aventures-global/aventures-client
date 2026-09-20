import { Link, useLocation } from 'react-router-dom'
import type { SiteInfo } from '../../types/content'
import BrandLogo from '../ui/BrandLogo'
import { FacebookIcon, InstagramIcon } from '../ui/SocialIcons'

type FooterProps = {
  site: SiteInfo
}

function displayHandle(handle: string) {
  const value = handle.replace(/^@/, '')
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear()
  const location = useLocation()
  const onHome = location.pathname === '/'
  const handle = displayHandle(site.socialHandles.facebook)

  const hashHref = (hash: string) => (onHome ? hash : `/${hash}`)

  const goHome = () => {
    if (!onHome) return
    if (location.hash) {
      window.history.replaceState(null, '', '/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navClass = 'text-sm text-white/80 transition-colors hover:text-white'
  const headingClass = 'mb-4 text-sm font-semibold text-white'

  return (
    <footer className="bg-[#242424]">
      <div className="site-container flex flex-col gap-12 py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20 lg:py-16">
        <div className="max-w-md">
          <Link to="/" aria-label="AVENtures home" onClick={goHome}>
            <BrandLogo
              markClassName="h-12 w-12"
              textClassName="text-2xl"
              tagline={site.tagline}
            />
          </Link>

          <div className="mt-8 space-y-3">
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-white/85 hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink">
                <FacebookIcon size={15} />
              </span>
              {handle}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-white/85 hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink">
                <InstagramIcon size={15} />
              </span>
              {handle}
            </a>
          </div>

          <p className="mt-8 text-xs text-white/45">
            © {year}, {site.fullName}
          </p>
        </div>

        <div className="flex gap-16 sm:gap-24">
          <nav aria-label="Navigation">
            <h2 className={headingClass}>Navigation</h2>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className={navClass} onClick={goHome}>
                  Home
                </Link>
              </li>
              <li>
                <a href={hashHref('#services')} className={navClass}>
                  Services
                </a>
              </li>
              <li>
                <Link to="/destinations" className={navClass}>
                  Destinations
                </Link>
              </li>
              <li>
                <a href={hashHref('#why')} className={navClass}>
                  Why travel with us?
                </a>
              </li>
              <li>
                <a href={hashHref('#about')} className={navClass}>
                  About us
                </a>
              </li>
              <li>
                <a href={hashHref('#contact')} className={navClass}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Other links">
            <h2 className={headingClass}>Other Links</h2>
            <ul className="space-y-2.5">
              <li>
                <Link to="/faq" className={navClass}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={navClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className={navClass}>
                  Sitemaps
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
