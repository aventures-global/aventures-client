import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout, { AuthAlert, authFieldExtraClass, authLabelClass, authLinkClass, authPrimaryButtonClass } from '../components/auth/AuthLayout'
import { resetPassword } from '../lib/authApi'
import { useAuth } from '../lib/auth'
import { lineFieldClass } from '../lib/forms'

export default function ResetPassword() {
    const { otp } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') ?? ''

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    if (!otp || !email) {
        return <Navigate to="/forgot-password" replace />
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (password !== confirm) {
            setError('Passwords do not match')
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            await resetPassword({ email, otp: otp!, password })
            navigate('/login', { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not reset password')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthLayout
            seoTitle="Set new password — AVENtures"
            seoDescription="Choose a new password for your AVENtures account."
            path="/reset-password"
            eyebrow="Account"
            title="Set New Password"
            intro={<>Choose a new password for <span className="font-medium text-royal">{email}</span>.</>}
            panelEyebrow="Back on course"
            panelTitle="A fresh start for your account."
            panelText="Pick a new password and you will be back to planning in no time."
        >
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className={authLabelClass} htmlFor="new-password">
                    New password
                    <input id="new-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="At least 8 characters" />
                </label>
                <label className={authLabelClass} htmlFor="confirm-password">
                    Confirm password
                    <input id="confirm-password" type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className={`${lineFieldClass} ${authFieldExtraClass}`} placeholder="Repeat your new password" />
                </label>
                {error && <AuthAlert>{error}</AuthAlert>}
                <button type="submit" disabled={submitting} className={authPrimaryButtonClass}>{submitting ? 'Saving…' : 'Update password'}</button>
            </form>
            <p className="mt-6 text-center text-sm text-ink/50"><Link to="/login" className={authLinkClass}>Back to log in</Link></p>
        </AuthLayout>
    )
}
