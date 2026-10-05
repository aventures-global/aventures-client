import { MapPin, Plane, Sparkles, X } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import BrandLogo from '../ui/BrandLogo'

export const authLabelClass = 'block text-xs font-medium uppercase tracking-[0.12em] text-royal/60'
export const authFieldExtraClass = 'mt-1 normal-case tracking-normal [@media(max-height:700px)]:py-2'
export const authPrimaryButtonClass =
    'w-full rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition hover:bg-[#9b7512] disabled:cursor-wait disabled:opacity-60'
export const authLinkClass = 'font-medium text-[#9b7512] underline-offset-4 transition hover:text-royal hover:underline'

export const authGoogleButtonClass =
    'flex w-full items-center justify-center gap-3 rounded-[3px] border border-royal/20 bg-white/55 px-6 py-3.5 text-sm font-medium text-royal transition hover:border-royal/45 hover:bg-white'

export function AuthDivider() {
    return <div className="my-5 flex items-center gap-3 [@media(max-height:700px)]:my-3" aria-hidden><span className="h-px flex-1 bg-royal/10" /><span className="text-[9px] uppercase tracking-[0.18em] text-ink/35">or</span><span className="h-px flex-1 bg-royal/10" /></div>
}

export function GoogleMark() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.37l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.39 13.92A6.01 6.01 0 0 1 6.08 12c0-.67.11-1.32.31-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.54l3.35-2.62Z" />
            <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
        </svg>
    )
}

export function AuthAlert({ children, tone = 'error' }: { children: ReactNode; tone?: 'error' | 'success' }) {
    const toneClass = tone === 'error' ? 'border-red-900/15 bg-red-50 text-red-800' : 'border-emerald-900/15 bg-emerald-50 text-emerald-800'
    return <p role={tone === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-3 py-2.5 text-xs leading-5 ${toneClass}`}>{children}</p>
}

type AuthLayoutProps = {
    seoTitle: string
    seoDescription: string
    path: string
    eyebrow: string
    title: string
    intro?: ReactNode
    panelEyebrow: string
    panelTitle: string
    panelText: string
    children: ReactNode
}

export default function AuthLayout({ seoTitle, seoDescription, path, eyebrow, title, intro, panelEyebrow, panelTitle, panelText, children }: AuthLayoutProps) {
    return (
        <div className="luxury-paper min-h-svh font-poppins">
            <Seo title={seoTitle} description={seoDescription} path={path} noIndex />
            <Link to="/" aria-label="Close and return home" title="Return home" className="fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-royal/15 bg-oat/80 text-royal shadow-sm backdrop-blur-md transition hover:border-[#9b7512] hover:bg-[#9b7512] hover:text-white sm:top-7 sm:right-8">
                <X size={18} />
            </Link>

            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }} className="grid min-h-svh lg:grid-cols-[minmax(25rem,0.95fr)_minmax(32rem,1.05fr)]">
                <section className="relative hidden h-svh overflow-hidden bg-royal p-12 text-cream lg:sticky lg:top-0 lg:flex lg:flex-col xl:p-16">
                    <img src="/assets/images/onboarding-flight-map.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(7,28,61,0.68),rgba(22,55,101,0.82)_58%,rgba(8,31,66,0.97))]" />
                    <div className="absolute -right-32 -bottom-32 h-[34rem] w-[34rem] rounded-full border border-gold/15" />
                    <div className="absolute -right-20 -bottom-20 h-[27rem] w-[27rem] rounded-full border border-gold/10" />

                    <div className="relative">
                        <Link to="/" aria-label="AVENtures home"><BrandLogo markClassName="h-11 w-11" textClassName="text-2xl" /></Link>
                    </div>

                    <div className="relative mt-auto max-w-xl pb-4">
                        <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-gold"><Sparkles size={13} /> {panelEyebrow}</p>
                        <div className="my-8 flex items-center gap-3" aria-hidden>
                            <span className="h-2.5 w-2.5 rounded-full border-2 border-gold bg-royal" />
                            <span className="w-24 border-t border-dashed border-gold/65" />
                            <Plane size={20} className="rotate-12 text-gold" />
                            <span className="w-24 border-t border-dashed border-gold/65" />
                            <MapPin size={19} className="text-gold" />
                        </div>
                        <p className="font-noto-serif text-5xl leading-[1.08] xl:text-6xl">{panelTitle}</p>
                        <p className="mt-6 max-w-md text-sm leading-7 text-cream/65">{panelText}</p>
                    </div>
                </section>

                <section className="relative flex min-h-svh items-center px-6 py-20 sm:px-12 lg:px-16 xl:px-24 [@media(max-height:700px)]:py-14">
                    <Link to="/" aria-label="AVENtures home" className="absolute top-5 left-6 lg:hidden [@media(max-height:700px)]:top-3"><BrandLogo dark markClassName="h-9 w-9" textClassName="text-xl" /></Link>
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mx-auto w-full max-w-md">
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">{eyebrow}</p>
                        <h1 className="mt-2 font-noto-serif text-4xl text-royal sm:text-5xl [@media(max-height:700px)]:text-3xl">{title}</h1>
                        {intro ? <p className="mt-3 text-sm leading-6 text-ink/50">{intro}</p> : null}
                        {children}
                    </motion.div>
                </section>
            </motion.main>
        </div>
    )
}
