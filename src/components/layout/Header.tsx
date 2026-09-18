import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BrandLogo from '../ui/BrandLogo'

const landingLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Destinations', to: '/#destinations' },
  { label: 'Contact', to: '/#contact' },
]

function linkClass(active: boolean) {
  return `font-serif text-base tracking-wide transition-colors ${
    active ? 'text-gold' : 'text-silver/75 hover:text-gold'
  }`
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  const scrollHomeToTop = () => {
    if (location.pathname !== '/') return
    if (location.hash) {
      window.history.replaceState(null, '', '/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div
        className={`site-container flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Link to="/" aria-label="AVENtures home" onClick={scrollHomeToTop}>
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {landingLinks.map((link) => {
            if (link.to.startsWith('/#')) {
              const hash = link.to.slice(1)
              return (
                <a
                  key={link.label}
                  href={onHome ? hash : `/${hash}`}
                  className={linkClass(false)}
                >
                  {link.label}
                </a>
              )
            }
            return (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => linkClass(isActive)}
                onClick={scrollHomeToTop}
              >
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-white transition-colors hover:text-gold md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="site-container flex flex-col gap-5 py-6">
              {landingLinks.map((link) => {
                if (link.to.startsWith('/#')) {
                  const hash = link.to.slice(1)
                  return (
                    <a
                      key={link.label}
                      href={onHome ? hash : `/${hash}`}
                      className="font-serif text-base text-silver/75"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                }
                return (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `font-serif text-base ${isActive ? 'text-gold' : 'text-silver/75'}`
                    }
                    onClick={() => {
                      scrollHomeToTop()
                      setOpen(false)
                    }}
                  >
                    {link.label}
                  </NavLink>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
