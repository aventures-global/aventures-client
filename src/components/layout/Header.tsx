import { LogOut, Menu, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
    useEffect,
    useId,
    useRef,
    useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { useCart } from '../../lib/cartContext'
import BrandLogo from '../ui/BrandLogo'

const landingLinks = [
    { label: 'Home', to: '/' },
    { label: 'Destination', to: '/destinations' },
    { label: 'Visa Services', to: '/visa-assistance' },
    { label: 'About Us', to: '/about' },
    { label: 'Shop', to: '/shop' },
] as const

/** Routes already on the cream palette; they use the light header from the top. */
const LIGHT_PAGES = new Set(['/faq'])

function linkClass(active: boolean, dark: boolean) {
    return `font-noto-serif text-base tracking-wide transition-colors ${
        active
            ? 'text-gold-deep'
            : dark
              ? 'text-black/75 hover:text-[#9b7512]'
              : 'text-silver/75 hover:text-[#ffbf2f]'
    }`
}

function mobileLinkClass(active: boolean) {
    return `flex min-h-11 items-center font-noto-serif text-base ${
        active ? 'text-[#9b7512]' : 'text-ink/75 hover:text-[#9b7512]'
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
    onLogout: () => void | Promise<void>
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
                                void onLogout()
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
    const [pastHero, setPastHero] = useState(false)
    const reduceMotion = useReducedMotion()
    const location = useLocation()
    const onHome = location.pathname === '/'
    const onDestinationsIndex = location.pathname === '/destinations'
    const onDestinationDetail = location.pathname.startsWith('/destinations/')
    const hasEditorialHero = onHome || onDestinationDetail
    const lightPage = LIGHT_PAGES.has(location.pathname)
    const { user, isLoggedIn, logout } = useAuth()
    const { itemCount } = useCart()
    const overHomeHero = hasEditorialHero && !pastHero
    const lightNavigation = pastHero || onDestinationsIndex

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24)
            const heroThreshold = onHome ? 0.9 : 0.7
            setPastHero(hasEditorialHero && window.scrollY >= window.innerHeight * heroThreshold)
            setPastHero(lightPage || (onHome && window.scrollY >= window.innerHeight * 0.9))
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [hasEditorialHero, onHome])
    }, [onHome, lightPage])

    useEffect(() => setDrawerOpen(false), [location.pathname])

    const scrollHomeToTop = () => {
        if (location.pathname !== '/') return
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const isNavActive = (to: string, isActive: boolean) => {
        if (to === '/') {
            return location.pathname === '/'
        }
        return (
            isActive ||
            (to === '/shop' && location.pathname.startsWith('/shop')) ||
            (to === '/destinations' && location.pathname.startsWith('/destinations')) ||
            (to === '/visa-assistance' && location.pathname === '/visa-assistance') ||
            (to === '/about' && location.pathname === '/about')
        )
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
            className={`inline-flex min-h-10 items-center justify-center border-2 px-4 font-sans text-sm tracking-wide transition-colors ${
                overHomeHero
                    ? 'border-[#ddab12] text-[#e1b21d] hover:bg-[#ddab12] hover:text-white'
                    : lightNavigation
                    ? 'border-royal text-royal hover:bg-royal hover:text-cream'
                    : 'border-white text-white hover:border-gold-deep hover:bg-gold-deep hover:text-white'
            }`}
        >
            Log In
        </Link>
    )

    const header = (
        <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-0 top-0 z-[80] border-b pt-[env(safe-area-inset-top,0px)] transition-colors duration-500 ${
                overHomeHero
                    ? 'border-transparent bg-transparent'
                    : lightNavigation
                      ? 'border-royal/10 bg-oat/90 shadow-[0_8px_30px_rgba(22,55,101,0.06)] backdrop-blur-md'
                      : 'border-white/10 bg-ink/95 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md'
            }`}
        >
            <div
                className={`flex w-full items-center gap-8 px-6 transition-all duration-300 sm:px-8 lg:px-10 xl:px-14 2xl:px-20 ${
                    scrolled ? 'py-3' : 'py-5'
                }`}
            >
                <Link className="justify-self-start" to="/" aria-label="AVENtures home" onClick={scrollHomeToTop}>
                    <BrandLogo dark={lightNavigation} />
                </Link>

                <div className="ml-auto flex items-center gap-4 sm:gap-5">
                    <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7">
                        {landingLinks.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    linkClass(isNavActive(link.to, isActive), lightNavigation)
                                }
                                onClick={scrollHomeToTop}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                    {isLoggedIn ? accountAction : <div className="hidden xl:block">{accountAction}</div>}
                    <button
                        type="button"
                        className={`relative z-[81] -mr-1 flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors hover:text-gold xl:hidden ${
                            lightNavigation ? 'text-black' : 'text-white'
                        }`}
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
                        className="border-t border-royal/10 bg-oat/95 shadow-[0_18px_40px_rgba(22,55,101,0.14)] backdrop-blur-md xl:hidden"
                    >
                        <div className="site-container flex flex-col gap-1 py-4">
                            {landingLinks.map((link) => {
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
                            <div className="mt-4 border-t border-royal/15 pt-4">
                                {!isLoggedIn ? (
                                    <Link
                                        to="/login"
                                        onClick={() => setDrawerOpen(false)}
                                        className="inline-flex min-h-11 items-center justify-center border-2 border-royal px-5 font-sans text-sm tracking-wide text-royal transition hover:border-gold-deep hover:bg-gold-deep hover:text-white"
                                    >
                                        Log In
                                    </Link>
                                ) : (
                                    <Link
                                        to="/cart"
                                        onClick={() => setDrawerOpen(false)}
                                        className="inline-flex min-h-11 items-center text-sm font-medium text-royal transition hover:text-[#9b7512]"
                                    >
                                        View Cart
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )

    return createPortal(header, document.body)
}
