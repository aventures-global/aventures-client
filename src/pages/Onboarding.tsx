import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { FormspreeHoneypot, submitFormspree, type SubmitStatus } from '../lib/formspree'
import type { SiteInfo } from '../types/content'

const services = ['Visa assistance', 'Vacation package', 'Flights', 'Hotel / accommodation', 'Transportation', 'Tour / itinerary', 'Complete travel assistance', 'I’m not sure yet']
const destinations = ['United States', 'Japan', 'Korea', 'Europe', 'Boracay', 'Siargao', 'Other', 'I’m still deciding']
const groups = ['Solo', 'Couple', 'Family', 'Friends', 'Group', 'Company / organization']
const budgets = ['Under ₱30,000', '₱30,000–₱50,000', '₱50,000–₱100,000', '₱100,000+', 'Not sure yet']

export default function Onboarding() {
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [step, setStep] = useState(0)
    const [service, setService] = useState('')
    const [destination, setDestination] = useState('')
    const [departure, setDeparture] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [group, setGroup] = useState('')
    const [adults, setAdults] = useState('1')
    const [children, setChildren] = useState('0')
    const [budget, setBudget] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState<SubmitStatus>('idle')

    useEffect(() => { void getSite().then(setSite) }, [])
    const choices = [service, destination, departure || returnDate, group, budget]
    const canContinue = step >= 5 || Boolean(choices[step])

    async function submit(event: FormEvent) {
        event.preventDefault()
        setStatus('sending')
        const result = await submitFormspree({ service, destination, departure, returnDate, group, adults, children, budget, name, email, phone, _subject: `New AVENture onboarding — ${name}` })
        setStatus(result === 'mailto' ? 'error' : result)
    }

    return (
        <div className="luxury-paper font-poppins min-h-svh">
            <Seo title="Start Your AVENture" description="A guided inquiry for travel and visa clients." path="/onboarding" />
            <Header />
            <main className="site-container py-28 sm:py-36">
                <div className="mx-auto max-w-4xl">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">Start your AVENture</p>
                    <div className="mt-3 flex items-end justify-between gap-6"><h1 className="font-noto-serif text-4xl text-royal sm:text-6xl">Tell us where your journey begins.</h1><span className="shrink-0 text-xs text-ink/40">{Math.min(step + 1, 6)} / 6</span></div>
                    <div className="mt-8 h-1 overflow-hidden rounded-full bg-royal/10"><div className="h-full bg-[#9b7512] transition-all duration-500" style={{ width: `${((step + 1) / 6) * 100}%` }} /></div>

                    <form onSubmit={submit} className="mt-12 min-h-[28rem] rounded-xl border border-royal/10 bg-white/55 p-6 shadow-[0_20px_60px_rgba(22,55,101,0.08)] sm:p-10">
                        <FormspreeHoneypot />
                        {step === 0 && <ChoiceStep title="What do you need help with?" options={services} value={service} onChange={setService} />}
                        {step === 1 && <ChoiceStep title="Where would you like to go?" options={destinations} value={destination} onChange={setDestination} />}
                        {step === 2 && <div><StepTitle>When would you like to travel?</StepTitle><div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="text-sm text-ink/55">Departure<input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className="mt-2 w-full border border-royal/15 bg-white/70 p-3 text-ink" /></label><label className="text-sm text-ink/55">Return<input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-2 w-full border border-royal/15 bg-white/70 p-3 text-ink" /></label></div></div>}
                        {step === 3 && <div><ChoiceStep title="Who are you traveling with?" options={groups} value={group} onChange={setGroup} /><div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-sm text-ink/55">Adults<input type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} className="mt-2 w-full border border-royal/15 bg-white/70 p-3" /></label><label className="text-sm text-ink/55">Children<input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} className="mt-2 w-full border border-royal/15 bg-white/70 p-3" /></label></div></div>}
                        {step === 4 && <ChoiceStep title="What budget are you considering?" options={budgets} value={budget} onChange={setBudget} />}
                        {step === 5 && <div><StepTitle>Where can we reach you?</StepTitle><p className="mt-3 text-sm text-ink/50">Review your selections, then send your AVENture to our team.</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="border-b border-royal/30 bg-transparent py-3 outline-none focus:border-[#9b7512]" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border-b border-royal/30 bg-transparent py-3 outline-none focus:border-[#9b7512]" /><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact number" className="border-b border-royal/30 bg-transparent py-3 outline-none focus:border-[#9b7512]" /></div><div className="mt-8 grid gap-2 text-sm text-ink/55 sm:grid-cols-2"><p><strong className="text-royal">Help:</strong> {service}</p><p><strong className="text-royal">Destination:</strong> {destination}</p><p><strong className="text-royal">Travelers:</strong> {group}, {adults} adult(s), {children} child(ren)</p><p><strong className="text-royal">Budget:</strong> {budget}</p></div></div>}

                        <div className="mt-12 flex items-center justify-between border-t border-royal/10 pt-6">
                            <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-sm text-royal disabled:invisible"><ArrowLeft size={15} />Back</button>
                            {step < 5 ? <button type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} className="inline-flex items-center gap-2 bg-royal px-6 py-3 text-sm text-white disabled:opacity-35">Continue <ArrowRight size={15} /></button> : <button disabled={status === 'sending'} className="inline-flex items-center gap-2 bg-royal px-6 py-3 text-sm text-white">{status === 'sending' ? 'Sending…' : 'Submit My AVENture'} <Check size={15} /></button>}
                        </div>
                        {status === 'sent' && <p className="mt-5 text-center text-sm text-royal">Your AVENture was submitted. Our team will contact you shortly.</p>}
                        {status === 'error' && <p className="mt-5 text-center text-sm text-red-700">We could not submit the form. Please contact us directly.</p>}
                    </form>
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}

function StepTitle({ children }: { children: ReactNode }) { return <h2 className="font-noto-serif text-3xl text-royal sm:text-4xl">{children}</h2> }
function ChoiceStep({ title, options, value, onChange }: { title: string; options: string[]; value: string; onChange: (value: string) => void }) {
    return <div><StepTitle>{title}</StepTitle><div className="mt-8 grid gap-3 sm:grid-cols-2">{options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={`flex items-center justify-between border p-4 text-left text-sm transition ${value === option ? 'border-royal bg-royal text-white' : 'border-royal/15 bg-white/50 text-royal hover:border-royal/40'}`}>{option}{value === option && <Check size={16} className="text-gold" />}</button>)}</div></div>
}
