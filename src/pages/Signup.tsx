import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout, { AuthAlert, AuthDivider, authFieldExtraClass, authGoogleButtonClass, authLabelClass, authLinkClass, authPrimaryButtonClass, GoogleMark } from '../components/auth/AuthLayout'
import { useAuth } from '../lib/auth'
import { lineFieldClass } from '../lib/forms'

function safeNext(raw: string | null): string {
    if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
    return raw
}

export default function Signup() {
    const { signup, loginWithGoogle, error } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const next = safeNext(searchParams.get('next'))

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFormError(null)
        setSubmitting(true)
        try {
            await signup({ name, email, password })
            navigate(`/verify-email?email=${encodeURIComponent(email)}&next=${encodeURIComponent(next)}`, {
                replace: true,
            })
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Sign up failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthLayout
            seoTitle="Sign up — AVENtures"
            seoDescription="Create your AVENtures account."
            path="/signup"
            eyebrow="Join AVENtures"
            title="Sign Up"
            intro="Create an account with email or Google. We will ask you to verify your email before shopping."
            panelEyebrow="Your journey begins"
            panelTitle="Every AVENture starts here."
            panelText="Create an account to save pieces from the shop and keep your plans in one place."
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:space-y-3">
                <label className={authLabelClass} htmlFor="signup-name">
                    Name
                    <input id="signup-name" type="text" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="Your full name" />
                </label>
                <label className={authLabelClass} htmlFor="signup-email">
                    Email address
                    <input id="signup-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="you@example.com" />
                </label>
                <label className={authLabelClass} htmlFor="signup-password">
                    Password
                    <input id="signup-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="At least 8 characters" />
                </label>

                {(formError || error) && <AuthAlert>{formError || error}</AuthAlert>}

                <button type="submit" disabled={submitting} className={authPrimaryButtonClass}>{submitting ? 'Creating…' : 'Create account'}</button>
            </form>

            <AuthDivider />
            <button type="button" onClick={() => void loginWithGoogle()} className={authGoogleButtonClass}><GoogleMark /> Continue with Google</button>
            <p className="mt-6 text-center text-sm text-ink/50 [@media(max-height:700px)]:mt-3">Already have an account? <Link to={`/login?next=${encodeURIComponent(next)}`} className={authLinkClass}>Log in</Link></p>
        </AuthLayout>
    )
}
