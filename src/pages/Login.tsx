import { Eye, EyeOff, MapPin, Plane, Sparkles, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import BrandLogo from '../components/ui/BrandLogo'
import { useAuth } from '../lib/auth'
import { lineFieldClass } from '../lib/forms'

function safeNext(raw: string | null): string {
    if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
    return raw
}

function GoogleMark() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.37l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.39 13.92A6.01 6.01 0 0 1 6.08 12c0-.67.11-1.32.31-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.54l3.35-2.62Z" />
            <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
        </svg>
    )
}

export default function Login() {
    const { login, loginWithGoogle, error } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const next = safeNext(searchParams.get('next'))
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFormError(null)
        setSubmitting(true)
        try {
            await login({ email, password })
            navigate(next, { replace: true })
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed'
            setFormError(message)
            if (message.toLowerCase().includes('verif')) {
                navigate(`/verify-email?email=${encodeURIComponent(email)}`, { replace: true })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="luxury-paper h-svh overflow-hidden font-poppins">
            <Seo title="Log in — AVENtures" description="Log in to your AVENtures account." path="/login" noIndex />
            <Link to="/" aria-label="Close login and return home" title="Return home" className="fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-royal/15 bg-oat/80 text-royal shadow-sm backdrop-blur-md transition hover:border-[#9b7512] hover:bg-[#9b7512] hover:text-white sm:top-7 sm:right-8">
                <X size={18} />
            </Link>

            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }} className="grid h-svh overflow-hidden lg:grid-cols-[minmax(25rem,0.95fr)_minmax(32rem,1.05fr)]">
                <section className="relative hidden h-svh overflow-hidden bg-royal p-12 text-cream lg:flex lg:flex-col xl:p-16">
                    <img src="/assets/images/onboarding-flight-map.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(7,28,61,0.68),rgba(22,55,101,0.82)_58%,rgba(8,31,66,0.97))]" />
                    <div className="absolute -right-32 -bottom-32 h-[34rem] w-[34rem] rounded-full border border-gold/15" />
                    <div className="absolute -right-20 -bottom-20 h-[27rem] w-[27rem] rounded-full border border-gold/10" />

                    <div className="relative">
                        <Link to="/" aria-label="AVENtures home"><BrandLogo markClassName="h-11 w-11" textClassName="text-2xl" /></Link>
                    </div>

                    <div className="relative mt-auto max-w-xl pb-4">
                        <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-gold"><Sparkles size={13} /> Your journey, remembered</p>
                        <div className="my-8 flex items-center gap-3" aria-hidden>
                            <span className="h-2.5 w-2.5 rounded-full border-2 border-gold bg-royal" />
                            <span className="w-24 border-t border-dashed border-gold/65" />
                            <Plane size={20} className="rotate-12 text-gold" />
                            <span className="w-24 border-t border-dashed border-gold/65" />
                            <MapPin size={19} className="text-gold" />
                        </div>
                        <p className="font-noto-serif text-5xl leading-[1.08] xl:text-6xl">Your journey continues here.</p>
                        <p className="mt-6 max-w-md text-sm leading-7 text-cream/65">Sign in to continue your AVENture, revisit your saved pieces, and keep the journey moving.</p>
                    </div>
                </section>

                <section className="relative flex h-svh items-center overflow-hidden px-6 py-16 sm:px-12 sm:py-20 lg:px-16 xl:px-24 [@media(max-height:700px)]:py-10">
                    <Link to="/" aria-label="AVENtures home" className="absolute top-5 left-6 lg:hidden [@media(max-height:700px)]:top-3"><BrandLogo dark markClassName="h-9 w-9" textClassName="text-xl" /></Link>
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mx-auto w-full max-w-md">
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">Welcome back</p>
                        <h1 className="mt-2 font-noto-serif text-4xl text-royal sm:text-5xl [@media(max-height:700px)]:text-3xl">Sign In</h1>
                        <p className="mt-3 text-sm leading-6 text-ink/50 [@media(max-height:700px)]:hidden">Use your email and password, or continue with Google.</p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:space-y-3">
                            <label className="block text-xs font-medium uppercase tracking-[0.12em] text-royal/60" htmlFor="login-email">
                                Email address
                                <input id="login-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${lineFieldClass} mt-1 normal-case tracking-normal [@media(max-height:700px)]:py-2`} placeholder="you@example.com" />
                            </label>
                            <label className="relative block text-xs font-medium uppercase tracking-[0.12em] text-royal/60" htmlFor="login-password">
                                Password
                                <input id="login-password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${lineFieldClass} mt-1 pr-10 normal-case tracking-normal [@media(max-height:700px)]:py-2`} placeholder="Enter your password" />
                                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-0 bottom-2.5 flex h-8 w-8 items-center justify-center text-royal/45 transition hover:text-royal" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                            </label>

                            {(formError || error) && <p role="alert" className="rounded-lg border border-red-900/15 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-800">{formError || error}</p>}

                            <div className="flex justify-end"><Link to="/forgot-password" className="text-xs font-medium text-[#9b7512] underline-offset-4 transition hover:text-royal hover:underline">Forgot password?</Link></div>
                            <button type="submit" disabled={submitting} className="w-full rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition hover:bg-[#9b7512] disabled:cursor-wait disabled:opacity-60">{submitting ? 'Signing in…' : 'Log in'}</button>
                        </form>

                        <div className="my-5 flex items-center gap-3 [@media(max-height:700px)]:my-3" aria-hidden><span className="h-px flex-1 bg-royal/10" /><span className="text-[9px] uppercase tracking-[0.18em] text-ink/35">or</span><span className="h-px flex-1 bg-royal/10" /></div>
                        <button type="button" onClick={() => void loginWithGoogle()} className="flex w-full items-center justify-center gap-3 rounded-[3px] border border-royal/20 bg-white/55 px-6 py-3.5 text-sm font-medium text-royal transition hover:border-royal/45 hover:bg-white"><GoogleMark /> Continue with Google</button>
                        <p className="mt-6 text-center text-sm text-ink/50 [@media(max-height:700px)]:mt-3">New here? <Link to={`/signup?next=${encodeURIComponent(next)}`} className="font-medium text-[#9b7512] underline-offset-4 transition hover:text-royal hover:underline">Create an account</Link></p>
                    </motion.div>
                </section>
            </motion.main>
        </div>
    )
}
