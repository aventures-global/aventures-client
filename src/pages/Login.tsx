import { Eye, EyeOff } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout, { AuthAlert, AuthDivider, authFieldExtraClass, authGoogleButtonClass, authLabelClass, authLinkClass, authPrimaryButtonClass, GoogleMark } from '../components/auth/AuthLayout'
import { useAuth } from '../lib/auth'
import { lineFieldClass } from '../lib/forms'

function safeNext(raw: string | null): string {
    if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
    return raw
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
        <AuthLayout
            seoTitle="Log in — AVENtures"
            seoDescription="Log in to your AVENtures account."
            path="/login"
            eyebrow="Welcome back"
            title="Sign In"
            intro="Use your email and password, or continue with Google."
            panelEyebrow="Your journey, remembered"
            panelTitle="Your journey continues here."
            panelText="Sign in to continue your AVENture, revisit your saved pieces, and keep the journey moving."
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:space-y-3">
                <label className={authLabelClass} htmlFor="login-email">
                    Email address
                    <input id="login-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="you@example.com" />
                </label>
                <label className={`relative ${authLabelClass}`} htmlFor="login-password">
                    Password
                    <input id="login-password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass} pr-10`} placeholder="Enter your password" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-0 bottom-2.5 flex h-8 w-8 items-center justify-center text-royal/45 transition hover:text-royal" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                </label>

                {(formError || error) && <AuthAlert>{formError || error}</AuthAlert>}

                <div className="flex justify-end"><Link to="/forgot-password" className={`text-xs ${authLinkClass}`}>Forgot password?</Link></div>
                <button type="submit" disabled={submitting} className={authPrimaryButtonClass}>{submitting ? 'Signing in…' : 'Log in'}</button>
            </form>

            <AuthDivider />
            <button type="button" onClick={() => void loginWithGoogle()} className={authGoogleButtonClass}><GoogleMark /> Continue with Google</button>
            <p className="mt-6 text-center text-sm text-ink/50 [@media(max-height:700px)]:mt-3">New here? <Link to={`/signup?next=${encodeURIComponent(next)}`} className={authLinkClass}>Create an account</Link></p>
        </AuthLayout>
    )
}
