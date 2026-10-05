import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout, { AuthAlert, authFieldExtraClass, authLabelClass, authLinkClass, authPrimaryButtonClass } from '../components/auth/AuthLayout'
import { verifyResetOtp } from '../lib/authApi'
import { useAuth } from '../lib/auth'
import { lineFieldClass } from '../lib/forms'

export default function VerifyReset() {
    const { setVerificationCode } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') ?? ''

    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | null>(null)
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
            await verifyResetOtp({ email, otp })
            setVerificationCode(otp)
            navigate(`/reset-password?email=${encodeURIComponent(email)}`, { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid code')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthLayout
            seoTitle="Verify reset code — AVENtures"
            seoDescription="Enter your AVENtures password reset code."
            path="/verify-reset"
            eyebrow="Account"
            title="Verify Reset Code"
            intro={<>Enter the reset code sent to <span className="font-medium text-royal">{email || 'your email'}</span>.</>}
            panelEyebrow="Back on course"
            panelTitle="Let's get you back on your way."
            panelText="Enter the code from your inbox to choose a new password."
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className={authLabelClass} htmlFor="reset-otp">
                    Reset code
                    <input id="reset-otp" type="text" required inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => setOtp(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="Enter your code" />
                </label>
                {error && <AuthAlert>{error}</AuthAlert>}
                <button type="submit" disabled={submitting} className={authPrimaryButtonClass}>{submitting ? 'Checking…' : 'Continue'}</button>
            </form>
            <p className="mt-6 text-center text-sm text-ink/50"><Link to="/forgot-password" className={authLinkClass}>Request a new code</Link></p>
        </AuthLayout>
    )
}
