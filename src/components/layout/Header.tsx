import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BrandLogo from '../ui/BrandLogo'

const landingLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
  { label: 'Destinations', hash: 'destinations' },
  { label: 'Contact', hash: 'contact' },
] as const

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

  useEffect(() => setOpen(false), [location.pathname])

  const scrollHomeToTop = () => {
    if (location.pathname !== '/') return
    if (location.hash) {
      window.history.replaceState(null, '', '/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onHashClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false)
    if (!onHome) return
    event.preventDefault()
    window.history.replaceState(null, '', `/#${id}`)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const header = (
    <header
      className={`fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink/95 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/55 to-transparent'
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
            if ('hash' in link) {
              return (
                <Link
                  key={link.label}
                  to={`/#${link.hash}`}
                  className={linkClass(false)}
                  onClick={(event) => onHashClick(event, link.hash)}
                >
                  {link.label}
                </Link>
              )
            }
            return (
              <NavLink
                key={link.label}
                to={link.to}
                end
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
          className="relative z-[81] -mr-2 flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition-colors hover:text-gold md:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-ink md:hidden"
          >
            <div className="site-container flex flex-col gap-1 py-4">
              {landingLinks.map((link) => {
                if ('hash' in link) {
                  return (
                    <Link
                      key={link.label}
                      to={`/#${link.hash}`}
                      className="flex min-h-11 items-center font-serif text-base text-silver/80"
                      onClick={(event) => onHashClick(event, link.hash)}
                    >
                      {link.label}
                    </Link>
                  )
                }
                return (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `flex min-h-11 items-center font-serif text-base ${
                        isActive ? 'text-gold' : 'text-silver/80'
                      }`
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
    </header>
  )

  return createPortal(header, document.body)
}
