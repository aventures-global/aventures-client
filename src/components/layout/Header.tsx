import { LogOut, Menu, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { useCart } from '../../lib/cartContext'
import BrandLogo from '../ui/BrandLogo'

const landingLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', hash: 'contact' },
] as const

const HASH_SECTIONS = ['about', 'services', 'contact'] as const
type HashSection = (typeof HASH_SECTIONS)[number]

function isHashSection(value: string): value is HashSection {
  return (HASH_SECTIONS as readonly string[]).includes(value)
}

function linkClass(active: boolean) {
  return `font-serif text-base tracking-wide transition-colors ${
    active ? 'text-gold' : 'text-silver/75 hover:text-gold'
  }`
}

function mobileLinkClass(active: boolean) {
  return `flex min-h-11 items-center font-serif text-base ${
    active ? 'text-gold' : 'text-silver/80'
  }`
}

function initialsFromName(name?: string) {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'G'
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase()
}

function CartBadge({
  count,
  className = '',
}: {
  count: number
  className?: string
}) {
  if (count <= 0) return null
  const label = count > 99 ? '99+' : String(count)
  return (
    <span
      className={`flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white ${className}`}
      aria-hidden
    >
      {label}
    </span>
  )
}

function AccountMenu({
  name,
  email,
  itemCount,
  onLogout,
}: {
  name?: string
  email?: string
  itemCount: number
  onLogout: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const initials = initialsFromName(name)

  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const avatarAria =
    itemCount > 0 && !menuOpen
      ? `Account menu, ${itemCount} item${itemCount === 1 ? '' : 's'} in cart`
      : 'Account menu'

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={avatarAria}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((value) => !value)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 bg-ink-card text-xs font-semibold tracking-wide text-gold transition hover:border-gold hover:bg-ink-soft"
      >
        {initials}
        {!menuOpen ? (
          <CartBadge
            count={itemCount}
            className="absolute -right-1 -top-1"
          />
        ) : null}
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Account"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-[calc(100%+0.5rem)] z-[90] w-56 overflow-hidden rounded-xl border border-white/12 bg-ink-soft shadow-xl shadow-black/40"
          >
            <div className="border-b border-white/10 px-3.5 py-3">
              <p className="truncate text-sm font-medium text-white">{name}</p>
              {email ? (
                <p className="mt-0.5 truncate text-xs text-silver/55">{email}</p>
              ) : null}
            </div>

            <Link
              to="/cart"
              role="menuitem"
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-silver/85 transition hover:bg-white/5 hover:text-gold"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingBag size={15} strokeWidth={1.5} aria-hidden />
              <span className="flex-1">Cart</span>
              <CartBadge count={itemCount} />
            </Link>

            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-silver/85 transition hover:bg-white/5 hover:text-gold"
              onClick={() => {
                setMenuOpen(false)
                onLogout()
              }}
            >
              <LogOut size={15} strokeWidth={1.5} aria-hidden />
              Log out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<HashSection | null>(null)
  const location = useLocation()
  const onHome = location.pathname === '/'
  const { user, isLoggedIn, logout } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setDrawerOpen(false), [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null)
      return
    }

    const hashId = location.hash.replace(/^#/, '')
    if (isHashSection(hashId)) {
      setActiveSection(hashId)
    }

    let cancelled = false
    let observer: IntersectionObserver | null = null
    let retryId = 0
    const ratios = new Map<string, number>()

    const applyBest = () => {
      let bestId: HashSection | null = null
      let bestRatio = 0
      for (const id of HASH_SECTIONS) {
        const ratio = ratios.get(id) ?? 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = id
        }
      }
      if (bestRatio > 0.08) {
        setActiveSection(bestId)
      } else if (window.scrollY < 140) {
        setActiveSection(null)
      }
    }

    const setup = () => {
      if (cancelled) return
      const elements = HASH_SECTIONS.map((id) =>
        document.getElementById(id),
      ).filter((el): el is HTMLElement => Boolean(el))

      if (elements.length < HASH_SECTIONS.length) {
        retryId = window.setTimeout(setup, 120)
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            )
          }
          applyBest()
        },
        {
          root: null,
          rootMargin: '-22% 0px -48% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        },
      )

      for (const el of elements) observer.observe(el)
    }

    setup()

    return () => {
      cancelled = true
      window.clearTimeout(retryId)
      observer?.disconnect()
    }
  }, [location.pathname, location.hash])

  const scrollHomeToTop = () => {
    if (location.pathname !== '/') return
    if (location.hash) {
      window.history.replaceState(null, '', '/')
    }
    setActiveSection(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onHashClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    setDrawerOpen(false)
    if (isHashSection(id)) setActiveSection(id)
    if (!onHome) return
    event.preventDefault()
    window.history.replaceState(null, '', `/#${id}`)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const isNavActive = (to: string, isActive: boolean) => {
    if (to === '/') {
      return location.pathname === '/' && activeSection === null
    }
    return (
      isActive ||
      (to === '/shop' && location.pathname.startsWith('/shop')) ||
      (to === '/destinations' && location.pathname.startsWith('/destinations'))
    )
  }

  const isHashActive = (hash: HashSection) => {
    if (hash === 'about' && location.pathname === '/about') return true
    if (location.pathname !== '/') return false
    return activeSection === hash
  }
  const accountAction = isLoggedIn ? (
    <AccountMenu
      name={user?.name}
      email={user?.email}
      itemCount={itemCount}
      onLogout={logout}
    />
  ) : (
    <Link
      to="/login"
      className="text-sm text-silver/75 transition-colors hover:text-gold"
    >
      Log in
    </Link>
  )

  const header = (
    <header
      className={`fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${
        scrolled || drawerOpen
          ? 'border-b border-white/10 bg-ink/95 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/55 to-transparent'
      }`}
    >
      <div
        className={`site-container flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Link to="/" aria-label="AVENtures home" onClick={scrollHomeToTop}>
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {landingLinks.map((link) => {
              if ('hash' in link) {
                return (
                  <Link
                    key={link.label}
                    to={`/#${link.hash}`}
                    className={linkClass(isHashActive(link.hash))}
                    aria-current={isHashActive(link.hash) ? 'page' : undefined}
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
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    linkClass(isNavActive(link.to, isActive))
                  }
                  onClick={scrollHomeToTop}
                >
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          <span
            aria-hidden
            className="hidden h-4 w-px shrink-0 bg-white/25 lg:block"
          />

          {accountAction}
          <button
            type="button"
            className="relative z-[81] -mr-1 flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition-colors hover:text-gold lg:hidden"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((value) => !value)}
          >
            {drawerOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-ink lg:hidden"
          >
            <div className="site-container flex flex-col gap-1 py-4">
              {landingLinks.map((link) => {
                if ('hash' in link) {
                  return (
                    <Link
                      key={link.label}
                      to={`/#${link.hash}`}
                      className={mobileLinkClass(isHashActive(link.hash))}
                      aria-current={isHashActive(link.hash) ? 'page' : undefined}
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
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      mobileLinkClass(isNavActive(link.to, isActive))
                    }
                    onClick={() => {
                      scrollHomeToTop()
                      setDrawerOpen(false)
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
