import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout, { AuthAlert, authFieldExtraClass, authLabelClass, authLinkClass, authPrimaryButtonClass } from '../components/auth/AuthLayout'
import { resendVerificationEmail, verifyEmailOtp } from '../lib/authApi'
import { useAuth } from '../lib/auth'
import { lineFieldClass } from '../lib/forms'

function safeNext(raw: string | null): string {
    if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
    return raw
}

export default function VerifyEmail() {
    const { refresh } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') ?? ''
    const next = safeNext(searchParams.get('next'))

    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (!email) {
            setError('Missing email address')
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            await verifyEmailOtp({ email, otp })
            await refresh()
            navigate(next, { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed')
        } finally {
            setSubmitting(false)
        }
    }

    async function handleResend() {
        if (!email) return
        setMessage(null)
        setError(null)
        try {
            await resendVerificationEmail(email)
            setMessage('A new code was sent to your email.')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not resend code')
        }
    }

    return (
        <AuthLayout
            seoTitle="Verify email — AVENtures"
            seoDescription="Verify your AVENtures account email."
            path="/verify-email"
            eyebrow="Account"
            title="Verify Email"
            intro={<>Enter the one-time code we sent to <span className="font-medium text-royal">{email || 'your email'}</span>.</>}
            panelEyebrow="Almost there"
            panelTitle="One last check before you go."
            panelText="Confirm your email so we can keep your account and orders safe."
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className={authLabelClass} htmlFor="verify-otp">
                    Verification code
                    <input id="verify-otp" type="text" required inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => setOtp(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="Enter your code" />
                </label>
                {error && <AuthAlert>{error}</AuthAlert>}
                {message && <AuthAlert tone="success">{message}</AuthAlert>}
                <button type="submit" disabled={submitting} className={authPrimaryButtonClass}>{submitting ? 'Verifying…' : 'Verify email'}</button>
            </form>
            <button type="button" onClick={() => void handleResend()} className={`mt-5 w-full text-center text-sm ${authLinkClass}`}>Resend code</button>
            <p className="mt-4 text-center text-sm text-ink/50"><Link to="/login" className={authLinkClass}>Back to log in</Link></p>
        </AuthLayout>
    )
}
