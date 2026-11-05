import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { useAuth } from '../lib/auth'
import { updateMe, type PreferredCurrency } from '../lib/userApi'
import type { SiteInfo } from '../types/content'

const fieldClass =
    'mt-1.5 w-full rounded-[3px] border border-royal/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-royal/40'
const labelClass = 'block text-[11px] font-medium uppercase tracking-[0.2em] text-royal/55'
const primaryButtonClass =
    'inline-flex items-center justify-center gap-2 rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-gold-deep hover:text-royal disabled:cursor-wait disabled:opacity-70'

export default function Profile() {
    const { isLoggedIn, isLoading, appUser, token, setAppUser } = useAuth()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [preferredCurrency, setPreferredCurrency] = useState<PreferredCurrency>('USD')
    const [saving, setSaving] = useState(false)
    const [notice, setNotice] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    useEffect(() => {
        if (!appUser) return
        setFirstName(appUser.firstName ?? '')
        setLastName(appUser.lastName ?? '')
        setPhone(appUser.phone ?? '')
        setPreferredCurrency(appUser.preferredCurrency === 'PHP' ? 'PHP' : 'USD')
    }, [appUser])

    if (!isLoading && !isLoggedIn) {
        return <Navigate to="/login?next=/profile" replace />
    }

    async function handleSave(event: FormEvent) {
        event.preventDefault()
        if (!token) return

        setSaving(true)
        setNotice(null)
        setError(null)
        try {
            const updated = await updateMe(token, {
                firstName: firstName.trim() || null,
                lastName: lastName.trim() || null,
                phone: phone.trim() || null,
                preferredCurrency,
            })
            setAppUser(updated)
            setNotice('Profile saved')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to save profile')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title="Your profile — AVENtures" description="Manage your AVENtures account details." path="/profile" noIndex />
            <Header />

            <main className="flex-1">
                <div className="site-container pb-10 pt-36 sm:pt-40">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep">Account</p>
                    <h1 className="mt-4 font-noto-serif text-5xl text-royal sm:text-6xl">Your profile</h1>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
                        Update how we address you and choose how you prefer to pay online. Quotes stay priced in USD;
                        Stripe handles conversion when you choose PHP.
                    </p>
                </div>

                <div className="site-container pb-24">
                    {isLoading || !appUser ? (
                        <div className="h-64 max-w-xl animate-pulse bg-royal/10" />
                    ) : (
                        <form
                            onSubmit={(event) => void handleSave(event)}
                            className="max-w-xl border border-royal/10 bg-white px-6 py-8 shadow-[0_12px_35px_rgba(22,55,101,0.07)] sm:px-8"
                        >
                            <div>
                                <label className={labelClass} htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    value={appUser.email ?? ''}
                                    readOnly
                                    className={`${fieldClass} cursor-not-allowed bg-oat/50 text-ink/55`}
                                />
                                <p className="mt-1.5 text-xs text-ink/45">Managed by your sign-in account.</p>
                            </div>

                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass} htmlFor="firstName">
                                        First name
                                    </label>
                                    <input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        className={fieldClass}
                                        autoComplete="given-name"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="lastName">
                                        Last name
                                    </label>
                                    <input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        className={fieldClass}
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className={labelClass} htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    className={fieldClass}
                                    autoComplete="tel"
                                    placeholder="+63…"
                                />
                            </div>

                            <fieldset className="mt-6">
                                <legend className={labelClass}>Preferred payment currency</legend>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    {(
                                        [
                                            { value: 'USD', title: 'US Dollar', hint: 'Pay in USD at checkout' },
                                            { value: 'PHP', title: 'Philippine Peso', hint: 'Stripe may offer PHP' },
                                        ] as const
                                    ).map((option) => {
                                        const selected = preferredCurrency === option.value
                                        return (
                                            <label
                                                key={option.value}
                                                className={`cursor-pointer rounded-[3px] border px-4 py-3 transition ${
                                                    selected
                                                        ? 'border-royal bg-royal/[0.05]'
                                                        : 'border-royal/15 hover:border-royal/30'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="preferredCurrency"
                                                    value={option.value}
                                                    checked={selected}
                                                    onChange={() => setPreferredCurrency(option.value)}
                                                    className="sr-only"
                                                />
                                                <span className="block font-medium text-royal">{option.title}</span>
                                                <span className="mt-0.5 block text-xs text-ink/50">{option.hint}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            </fieldset>

                            {notice ? <p className="mt-5 text-sm text-emerald-700">{notice}</p> : null}
                            {error ? <p className="mt-5 text-sm text-red-600">{error}</p> : null}

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <button type="submit" disabled={saving} className={primaryButtonClass}>
                                    {saving ? 'Saving…' : 'Save profile'}
                                </button>
                                <Link to="/cart" className="text-sm text-royal/65 underline-offset-4 hover:text-gold-deep hover:underline">
                                    View cart
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            {site ? <Footer site={site} /> : null}
        </div>
    )
}
