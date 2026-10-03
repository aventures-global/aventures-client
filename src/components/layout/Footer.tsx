import { Mail, MapPin, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { memo } from 'react'
import type { SiteInfo } from '../../types/content'
import BrandLogo from '../ui/BrandLogo'
import { FacebookIcon, InstagramIcon } from '../ui/SocialIcons'

type FooterProps = {
    site: SiteInfo
}

const navigation = [
    { label: 'Home', to: '/' },
    { label: 'Destination', to: '/destinations' },
    { label: 'Visa Services', to: '/visa-assistance' },
    { label: 'About Us', to: '/about' },
    { label: 'Shop', to: '/shop' },
] as const

const otherLinks = [
    { label: 'FAQs', to: '/faq' },
    { label: 'Ask AVENtures', to: '/ask' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Sitemaps', to: '/sitemap' },
] as const

function displayHandle(handle: string) {
    const value = handle.replace(/^@/, '')
    return value.charAt(0).toUpperCase() + value.slice(1)
}

function Footer({ site }: FooterProps) {
    const year = new Date().getFullYear()
    const location = useLocation()
    const onHome = location.pathname === '/'

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
        <footer className="bg-[#0e274b]">
            <div className="site-container flex flex-col gap-12 py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20 lg:py-16">
                <div className="max-w-md">
                    <Link to="/" aria-label="AVENtures home" onClick={goHome}>
                        <BrandLogo
                            markClassName="h-12 w-12"
                            textClassName="text-2xl"
                            tagline={site.tagline}
                        />
                    </Link>

                    <address className="mt-10 space-y-4 text-sm not-italic text-white/80">
                        <a
                            href={`mailto:${site.email}`}
                            className="flex items-start gap-3 transition-colors hover:text-white"
                        >
                            <Mail size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
                            <span>{site.email}</span>
                        </a>
                        <a
                            href={`tel:${site.phone}`}
                            className="flex items-start gap-3 transition-colors hover:text-white"
                        >
                            <Phone size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
                            <span>{site.phoneDisplay}</span>
                        </a>
                        <p className="flex items-start gap-3">
                            <MapPin size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
                            <span>
                                {site.addressLines.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </span>
                        </p>
                    </address>
                </div>

                <div className="flex flex-wrap gap-x-16 gap-y-10 sm:gap-x-20">
                    <nav aria-label="Navigation">
                        <h2 className={headingClass}>Navigation</h2>
                        <ul className="space-y-2.5">
                            {navigation.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className={navClass}
                                        onClick={link.to === '/' ? goHome : undefined}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Other links">
                        <h2 className={headingClass}>Other Links</h2>
                        <ul className="space-y-2.5">
                            {otherLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className={navClass}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Social media">
                        <h2 className={headingClass}>Social</h2>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href={site.facebookUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`${navClass} inline-flex items-center gap-2.5`}
                                >
                                    <FacebookIcon size={16} className="shrink-0 text-white/80" />
                                    {displayHandle(site.socialHandles.facebook)}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={site.instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`${navClass} inline-flex items-center gap-2.5`}
                                >
                                    <InstagramIcon size={16} className="shrink-0 text-white/80" />
                                    {displayHandle(site.socialHandles.instagram)}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="border-t border-white/15">
                <p className="site-container py-5 text-xs text-white/45">
                    © {year}, {site.fullName}
                </p>
            </div>
        </footer>
    )
}

export default memo(Footer)
