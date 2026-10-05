import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { AuthAlert, authFieldExtraClass, authLabelClass, authLinkClass, authPrimaryButtonClass } from '../components/auth/AuthLayout'
import { requestPasswordReset } from '../lib/authApi'
import { lineFieldClass } from '../lib/forms'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            await requestPasswordReset(email)
            navigate(`/verify-reset?email=${encodeURIComponent(email)}`, { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not send reset code')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthLayout
            seoTitle="Forgot password — AVENtures"
            seoDescription="Reset your AVENtures account password."
            path="/forgot-password"
            eyebrow="Account"
            title="Forgot Password"
            intro="Enter your email and we will send a one-time code to reset your password."
            panelEyebrow="Back on course"
            panelTitle="Let's get you back on your way."
            panelText="A quick code to your inbox and you can pick up right where you left off."
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className={authLabelClass} htmlFor="forgot-email">
                    Email address
                    <input id="forgot-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="you@example.com" />
                </label>
                {error && <AuthAlert>{error}</AuthAlert>}
                <button type="submit" disabled={submitting} className={authPrimaryButtonClass}>{submitting ? 'Sending…' : 'Send reset code'}</button>
            </form>
            <p className="mt-6 text-center text-sm text-ink/50"><Link to="/login" className={authLinkClass}>Back to log in</Link></p>
        </AuthLayout>
    )
}
