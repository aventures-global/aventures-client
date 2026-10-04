import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Compass, Plane, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import BrandLogo from '../components/ui/BrandLogo'
import { FormHoneypot, lineFieldClass, submitInquiry, type InquiryPayload, type SubmitStatus } from '../lib/forms'

const SERVICES = ['Visa assistance', 'Vacation package', 'Flights', 'Hotel / accommodation', 'Transportation', 'Tour / itinerary', 'Complete travel assistance', 'I’m not sure yet']
const DESTINATIONS = ['United States', 'Japan', 'Korea', 'Europe', 'Boracay', 'Siargao', 'Other', 'I’m still deciding']
const GROUPS = ['Solo', 'Couple', 'Family', 'Friends', 'Group', 'Company / organization']
const BUDGETS = ['Under ₱30,000', '₱30,000–₱50,000', '₱50,000–₱100,000', '₱100,000+', 'Not sure yet']
const INTERESTS = ['Beaches', 'Nature', 'Adventure', 'Food', 'Nightlife', 'Shopping', 'Culture', 'Architecture', 'Theme parks', 'Family activities', 'Relaxation', 'Photography', 'Famous tourist attractions', 'Hidden gems']
const ACCOMMODATIONS = ['Budget-friendly', 'Comfortable / mid-range', 'Premium', 'Luxury', 'Resort', 'No preference']
const ACCOMMODATION_NEEDS = ['Location', 'Comfort', 'Amenities', 'Price', 'Family-friendly', 'Romantic', 'Accessibility', 'No preference']
const TRANSPORTATION = ['Airport transfer', 'Private car', 'Van', 'Group transportation', 'Rental vehicle', 'Public transportation guidance', 'Not sure yet']
const VISA_TYPES = ['Tourist Visa', 'K-1 / K-2', 'J-1', 'R-1 / R-2', 'P-1 / P-2', 'E-2', 'I’m not sure']
const VISA_STATUSES = ['Haven’t started', 'Researching requirements', 'Preparing documents', 'Application already started', 'Preparing for appointment / interview', 'Previously denied', 'Other']

type StepId = 'service' | 'destination' | 'dates' | 'travelers' | 'budget' | 'accommodation' | 'itinerary' | 'flights' | 'transportation' | 'visa' | 'review' | 'contact'
type FormData = {
    service: string; destination: string; otherDestination: string; departure: string; returnDate: string; flexibleDates: string; duration: string
    group: string; adults: string; children: string; groupSize: string; budget: string; budgetType: string
    accommodation: string; accommodationNeeds: string[]; interests: string[]; hasPlans: string; plannedPlaces: string
    flightPriority: string; cabin: string; baggage: string; transportation: string[]
    visaType: string; visaPurpose: string; visaStatus: string; passportStatus: string; passportExpiry: string; previousVisa: string; appointment: string; visaHelp: string
    name: string; email: string; phone: string; contactMethod: string
}

const INITIAL: FormData = {
    service: '', destination: '', otherDestination: '', departure: '', returnDate: '', flexibleDates: '', duration: '',
    group: '', adults: '1', children: '0', groupSize: '', budget: '', budgetType: '', accommodation: '', accommodationNeeds: [],
    interests: [], hasPlans: '', plannedPlaces: '', flightPriority: '', cabin: '', baggage: '', transportation: [], visaType: '', visaPurpose: '',
    visaStatus: '', passportStatus: '', passportExpiry: '', previousVisa: '', appointment: '', visaHelp: '', name: '', email: '', phone: '', contactMethod: '',
}

const fieldClass = lineFieldClass

const DESTINATION_MATCHES: [string, RegExp][] = [
    ['United States', /\b(united states|usa|u\.s\.a?\.?)\b/i],
    ['Japan', /\b(japan|tokyo|kyoto|osaka)\b/i],
    ['Korea', /\b(korea|seoul|busan|jeju)\b/i],
    ['Europe', /\beurope\b/i],
    ['Boracay', /\bboracay\b/i],
    ['Siargao', /\bsiargao\b/i],
]

function initialData(prefill: string | null): FormData {
    const place = prefill?.trim()
    if (!place) return INITIAL
    const match = DESTINATION_MATCHES.find(([, pattern]) => pattern.test(place))?.[0]
    return match ? { ...INITIAL, destination: match } : { ...INITIAL, destination: 'Other', otherDestination: place }
}

export default function Onboarding() {
    const [searchParams] = useSearchParams()
    const leave = useLeaveOnboarding()
    const [data, setData] = useState<FormData>(() => initialData(searchParams.get('destination')))
    const [stepIndex, setStepIndex] = useState(0)
    const [status, setStatus] = useState<SubmitStatus>('idle')
    const set = <K extends keyof FormData>(key: K, value: FormData[K]) => setData((current) => ({ ...current, [key]: value }))

    const steps = useMemo<StepId[]>(() => {
        const result: StepId[] = ['service', 'destination', 'dates', 'travelers', 'budget']
        if (['Hotel / accommodation', 'Vacation package', 'Complete travel assistance'].includes(data.service)) result.push('accommodation')
        if (['Tour / itinerary', 'Vacation package', 'Complete travel assistance'].includes(data.service)) result.push('itinerary')
        if (['Flights', 'Vacation package', 'Complete travel assistance'].includes(data.service)) result.push('flights')
        if (['Transportation', 'Vacation package', 'Complete travel assistance'].includes(data.service)) result.push('transportation')
        if (data.service === 'Visa assistance') result.push('visa')
        result.push('review', 'contact')
        return result
    }, [data.service])
    const step = steps[Math.min(stepIndex, steps.length - 1)]
    const destination = data.destination === 'Other' ? data.otherDestination : data.destination
    const valid = step === 'service' ? !!data.service
        : step === 'destination' ? !!data.destination && (data.destination !== 'Other' || !!data.otherDestination.trim())
        : step === 'dates' ? !!(data.departure || data.duration) && !!data.flexibleDates
        : step === 'travelers' ? !!data.group && !travelersIssue(data)
        : step === 'budget' ? !!data.budget && !!data.budgetType
        : step === 'accommodation' ? !!data.accommodation
        : step === 'itinerary' ? !!data.interests.length && !!data.hasPlans && (data.hasPlans !== 'Yes' || !!data.plannedPlaces.trim())
        : step === 'flights' ? !!data.flightPriority && !!data.cabin && !!data.baggage
        : step === 'transportation' ? !!data.transportation.length
        : step === 'visa' ? !!data.visaType && !!data.visaStatus
        : true

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('sending')
        const result = await submitInquiry(event.currentTarget, buildPayload(data, destination, steps))
        setStatus(result)
        if (result === 'sent') window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (status === 'sent') return <SuccessPage firstName={data.name.trim().split(/\s+/)[0]} email={data.email.trim()} />
    const next = () => setStepIndex((current) => Math.min(steps.length - 1, current + 1))

    return <ImmersiveShell>
        <Seo title="Start Your AVENture" description="A guided planning experience for travel and visa clients." path="/start-your-aventure" />
        <main className="relative z-10 h-svh px-4 pt-20 pb-3 sm:px-8 sm:pt-24 sm:pb-6 lg:px-12"><div className="h-full w-full max-w-[61rem] sm:grid sm:grid-cols-[12.5rem_minmax(0,38rem)] sm:gap-16 lg:gap-20">
            <StepRail steps={steps} current={stepIndex} onSelect={setStepIndex} />
            <section className="flex h-full min-h-0 flex-col sm:h-[calc(100svh-6.75rem)] sm:max-h-[44rem]">
                <div className="shrink-0 border-b border-royal/12 pb-5">
                    <Link to="/" onClick={leave} className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-royal/60 transition hover:text-[#9b7512]"><ArrowLeft size={14} />Back to page</Link>
                    <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#9b7512] sm:text-xs"><Plane size={14} />Start your AVENture</p>
                    <div className="mt-2 flex items-end justify-between gap-4"><h1 className="font-noto-serif text-2xl leading-tight text-royal sm:text-3xl">Tell us about your Journey</h1><span className="shrink-0 text-xs text-royal/45">{stepIndex + 1} / {steps.length}</span></div>
                </div>
            <form onSubmit={submit} className="min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pr-1 [scrollbar-color:rgba(22,55,101,0.25)_transparent] sm:pt-5 sm:pr-4">
                <FormHoneypot />
                <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28 }}>
                    {step === 'service' && <Choice title="What can AVENtures help you with?" options={SERVICES} value={data.service} onChange={(v) => set('service', v)} />}
                    {step === 'destination' && <><Choice title="Where would you like to go?" options={DESTINATIONS} value={data.destination} onChange={(v) => set('destination', v)} />{data.destination === 'Other' && <Field label="Tell us the destination"><input autoFocus value={data.otherDestination} onChange={(e) => set('otherDestination', e.target.value)} className={fieldClass} placeholder="City or country" /></Field>}</>}
                    {step === 'dates' && <Dates data={data} set={set} />}
                    {step === 'travelers' && <Travelers data={data} set={set} />}
                    {step === 'budget' && <><Choice title="What budget are you working with?" options={BUDGETS} value={data.budget} onChange={(v) => set('budget', v)} /><Subheading>Is that budget per person or for everyone?</Subheading><Hint>Please select one option.</Hint><Pills options={['Per person', 'Entire group']} value={data.budgetType} onChange={(v) => set('budgetType', v)} /></>}
                    {step === 'accommodation' && <><Title>What kind of stay feels right?</Title><Hint>Please select one option.</Hint><Single options={ACCOMMODATIONS} value={data.accommodation} onChange={(v) => set('accommodation', v)} /><Subheading>What matters most?</Subheading><Multi options={ACCOMMODATION_NEEDS} values={data.accommodationNeeds} onChange={(v) => set('accommodationNeeds', v)} exclusive="No preference" /></>}
                    {step === 'itinerary' && <><Title>What kind of AVENture are you looking for?</Title><Multi options={INTERESTS} values={data.interests} onChange={(v) => set('interests', v)} columns="sm:grid-cols-3" /><Subheading>Do you already have places you want to visit?</Subheading><Hint>Please select one option.</Hint><Pills options={['Yes', 'No', 'I need recommendations']} value={data.hasPlans} onChange={(v) => set('hasPlans', v)} />{data.hasPlans === 'Yes' && <textarea value={data.plannedPlaces} onChange={(e) => set('plannedPlaces', e.target.value)} className={`${fieldClass} mt-5 resize-y`} rows={3} placeholder="Places, landmarks, or activities" />}</>}
                    {step === 'flights' && <Flights data={data} set={set} />}
                    {step === 'transportation' && <><Title>How should we help you get around?</Title><Multi options={TRANSPORTATION} values={data.transportation} onChange={(v) => set('transportation', v)} /></>}
                    {step === 'visa' && <Visa data={data} set={set} />}
                    {step === 'review' && <Review data={data} destination={destination} />}
                    {step === 'contact' && <Contact data={data} set={set} />}
                </motion.div>
                <div className="mt-7 flex items-center justify-between border-t border-royal/10 pt-4">
                    <button type="button" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={stepIndex === 0} className="inline-flex items-center gap-2 cursor-pointer text-sm text-royal disabled:invisible"><ArrowLeft size={15} />Back</button>
                    {step !== 'contact' ? <button type="button" disabled={!valid} onClick={next} className="inline-flex items-center cursor-pointer gap-2 bg-royal px-6 py-3 text-sm text-white transition hover:bg-[#0e274b] disabled:opacity-35">Continue <ArrowRight size={15} /></button> : <button disabled={status === 'sending' || !data.name || !data.email} className="inline-flex items-center gap-2 bg-royal px-6 py-3 text-sm text-white transition hover:bg-[#0e274b] disabled:opacity-35">{status === 'sending' ? 'Sending…' : 'Submit My AVENture'} <Check size={15} /></button>}
                </div>
                {status === 'error' && <p className="mt-5 text-center text-sm text-red-700">We could not submit your AVENture. Please try again or contact us directly.</p>}
            </form></section>
        </div></main>
    </ImmersiveShell>
}

function useLeaveOnboarding() {
    const navigate = useNavigate()
    const location = useLocation()
    // 'default' means onboarding was the first page loaded, so there is no in-app page to return to.
    return (event: MouseEvent<HTMLAnchorElement>) => {
        if (location.key === 'default') return
        event.preventDefault()
        navigate(-1)
    }
}

function displayDate(iso: string) {
    return iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }) : ''
}

function buildPayload(data: FormData, destination: string, steps: StepId[]): InquiryPayload {
    const [firstName, ...rest] = data.name.trim().split(/\s+/)
    const has = (step: StepId) => steps.includes(step)
    return {
        kind: 'onboarding',
        firstName, lastName: rest.join(' '), email: data.email, phone: data.phone, contactMethod: data.contactMethod,
        service: data.service, destination,
        departure: displayDate(data.departure), returnDate: displayDate(data.returnDate), flexibleDates: data.flexibleDates, duration: formatDuration(data.duration),
        group: data.group, adults: data.adults, children: data.children, groupSize: SIZED_GROUPS.includes(data.group) ? data.groupSize : '',
        budget: data.budget, budgetType: data.budgetType,
        ...(has('accommodation') ? { accommodation: data.accommodation, accommodationNeeds: data.accommodationNeeds.join(', ') } : {}),
        ...(has('itinerary') ? { interests: data.interests.join(', '), hasPlans: data.hasPlans, plannedPlaces: data.hasPlans === 'Yes' ? data.plannedPlaces : '' } : {}),
        ...(has('flights') ? { flightPriority: data.flightPriority, cabin: data.cabin, baggage: data.baggage } : {}),
        ...(has('transportation') ? { transportation: data.transportation.join(', ') } : {}),
        ...(has('visa') ? {
            visaType: data.visaType, visaPurpose: data.visaType === 'I’m not sure' ? data.visaPurpose : '', visaStatus: data.visaStatus,
            passportStatus: data.passportStatus, passportExpiry: displayDate(data.passportExpiry), previousVisa: data.previousVisa, appointment: data.appointment, visaHelp: data.visaHelp,
        } : {}),
    }
}

function ImmersiveShell({ children }: { children: ReactNode }) {
    const leave = useLeaveOnboarding()
    return <div className="relative h-svh overflow-hidden bg-oat font-poppins text-royal">
        <div className="fixed inset-0 bg-[url('/assets/images/onboarding-flight-map.png')] bg-cover bg-[62%_center] sm:bg-center" />
        <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(249,245,235,0.98)_0%,rgba(249,245,235,0.9)_34%,rgba(249,245,235,0.3)_62%,rgba(249,245,235,0.06)_100%)]" />
        <div className="fixed top-5 left-10 z-[60] hidden sm:block lg:left-16"><BrandLogo dark markClassName="h-7 w-7" textClassName="text-lg" /></div>
        <Link to="/" onClick={leave} aria-label="Close onboarding" title="Close" className="fixed top-4 right-5 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-royal/15 bg-oat/75 text-royal shadow-sm backdrop-blur-sm transition hover:border-[#9b7512] hover:bg-[#9b7512] hover:text-white sm:right-10 lg:right-16"><X size={18} /></Link>
        {children}
    </div>
}

const STEP_LABELS: Record<StepId, string> = {
    service: 'Your needs', destination: 'Destination', dates: 'Travel dates', travelers: 'Travelers', budget: 'Budget',
    accommodation: 'Accommodation', itinerary: 'Itinerary', flights: 'Flights', transportation: 'Transportation', visa: 'Visa assistance', review: 'Review', contact: 'Contact',
}

function StepRail({ steps, current, onSelect }: { steps: StepId[]; current: number; onSelect: (index: number) => void }) {
    const visibleSteps = steps.slice(0, current + 1)
    return <aside className="mt-4 hidden w-[200px] pr-4 sm:block">
        <p className="text-[10px] font-medium uppercase tracking-[0.21em] text-[#9b7512]">Journey overview</p>
        <ol className="relative mt-5 space-y-4">
            {visibleSteps.length > 1 && <span aria-hidden className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-[#9b7512]/35" />}
            {visibleSteps.map((item, index) => {
                const active = index === current
                return <li key={item} className="relative z-10"><button type="button" onClick={() => onSelect(index)} className="flex w-full items-center gap-3 text-left" aria-current={active ? 'step' : undefined}><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${active ? 'border-[#9b7512] bg-[#9b7512] text-white shadow-[0_0_0_3px_rgba(155,117,18,0.1)]' : 'border-royal bg-royal text-white'}`}>{active ? <Plane size={10} /> : <Check size={10} />}</span><div><p className="text-[8px] leading-none uppercase tracking-[0.14em] text-royal/40">Step {String(index + 1).padStart(2, '0')}</p><p className={`mt-px text-xs leading-tight ${active ? 'font-medium text-royal' : 'text-royal/60'}`}>{STEP_LABELS[item]}</p></div></button></li>
            })}
        </ol>
    </aside>
}

function Title({ children }: { children: ReactNode }) { return <h2 className="font-poppins text-xl font-medium leading-tight text-royal sm:text-2xl">{children}</h2> }
function Hint({ children }: { children: ReactNode }) { return <p className="mt-3 text-sm leading-6 text-ink/50">{children}</p> }
function Subheading({ children }: { children: ReactNode }) { return <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#9b7512]">{children}</h3> }
function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) { return <label className="mt-3 block text-sm text-ink/55">{label}{optional && <span className="ml-1.5 text-xs text-ink/35">(optional)</span>}{children}</label> }
function Choice({ title, options, value, onChange }: { title: string; options: string[]; value: string; onChange: (v: string) => void }) { return <><Title>{title}</Title><Hint>Please select one option.</Hint><Single options={options} value={value} onChange={onChange} /></> }
function Single({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) { return <div className="mt-4 flex flex-wrap gap-2.5">{options.map((option) => <Option key={option} selected={value === option} onClick={() => onChange(option)}>{option}</Option>)}</div> }
function Multi({ options, values, onChange, exclusive, columns: _columns = 'sm:grid-cols-2' }: { options: string[]; values: string[]; onChange: (v: string[]) => void; exclusive?: string; columns?: string }) { const toggle = (option: string) => onChange(values.includes(option) ? values.filter((item) => item !== option) : option === exclusive ? [option] : [...values.filter((item) => item !== exclusive), option]); return <><Hint>Please select all that apply.</Hint><div className="mt-3 flex flex-wrap gap-2.5">{options.map((option) => <Option key={option} selected={values.includes(option)} onClick={() => toggle(option)}>{option}</Option>)}</div></> }
function Option({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) { return <button type="button" aria-pressed={selected} onClick={onClick} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-5 py-2 text-left text-xs font-medium transition ${selected ? 'border-royal bg-royal text-white shadow-sm' : 'border-royal/20 bg-white/45 text-royal/75 hover:border-royal/45 hover:bg-white/65 hover:text-royal'}`}>{children}{selected && <Check size={13} strokeWidth={2.2} className="text-gold" />}</button> }
function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) { return <div className="mt-4 flex flex-wrap gap-2">{options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={`rounded-full border px-5 py-2 text-xs transition ${value === option ? 'border-royal bg-royal text-white' : 'border-royal/15 bg-white/60 text-royal'}`}>{option}</button>)}</div> }

function formatDuration(value: string) { const days = Number(value); return Number.isFinite(days) && days > 0 ? `${days} day${days === 1 ? '' : 's'} / ${Math.max(0, days - 1)} night${days === 2 ? '' : 's'}` : '' }
function toIso(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` }
function addDays(iso: string, days: number) { const [y, m, d] = iso.split('-').map(Number); return toIso(new Date(y, m - 1, d + days)) }
function daysBetween(from: string, to: string) { const [fy, fm, fd] = from.split('-').map(Number); const [ty, tm, td] = to.split('-').map(Number); return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86_400_000) }
function CalendarField({ label, value, onChange, min }: { label: string; value: string; onChange: (value: string) => void; min?: string }) {
    const rootRef = useRef<HTMLDivElement>(null)
    const selected = value ? new Date(`${value}T00:00:00`) : null
    const [open, setOpen] = useState(false)
    const [view, setView] = useState<'days' | 'months'>('days')
    const [month, setMonth] = useState(() => selected ?? new Date())
    useEffect(() => {
        if (!open) return
        const close = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false) }
        const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
        document.addEventListener('pointerdown', close)
        window.addEventListener('keydown', escape)
        return () => { document.removeEventListener('pointerdown', close); window.removeEventListener('keydown', escape) }
    }, [open])
    const year = month.getFullYear()
    const monthIndex = month.getMonth()
    const firstDay = new Date(year, monthIndex, 1).getDay()
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    const iso = (day: number) => `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const todayIso = toIso(new Date())
    return <div ref={rootRef} className="relative mt-3">
        <label className="block text-sm text-ink/55">{label}</label>
        <button type="button" onClick={() => { setView('days'); if (!selected && min) setMonth(new Date(`${min}T00:00:00`)); setOpen((current) => !current) }} className={`${fieldClass} flex items-center justify-between text-left`} aria-expanded={open}>
            <span className={selected ? 'text-ink' : 'text-ink/40'}>{selected ? selected.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}</span>
            <CalendarDays size={17} className="text-[#9b7512]" />
        </button>
        {open && <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="absolute top-[calc(100%+0.5rem)] left-0 z-50 w-[18rem] rounded-xl border border-royal/12 bg-[#faf7f0] p-4 shadow-[0_20px_55px_rgba(22,55,101,0.2)]">
            <div className="flex items-center justify-between"><button type="button" onClick={() => setMonth(view === 'months' ? new Date(year - 1, monthIndex, 1) : new Date(year, monthIndex - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-full text-royal transition hover:bg-royal/5" aria-label={view === 'months' ? 'Previous year' : 'Previous month'}><ChevronLeft size={16} /></button><button type="button" onClick={() => setView((current) => current === 'days' ? 'months' : 'days')} className="rounded-md px-3 py-1 font-noto-serif text-base text-royal transition hover:bg-royal/5" aria-label={view === 'days' ? 'Choose month and year' : 'Return to days'}>{view === 'days' ? month.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' }) : year}</button><button type="button" onClick={() => setMonth(view === 'months' ? new Date(year + 1, monthIndex, 1) : new Date(year, monthIndex + 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-full text-royal transition hover:bg-royal/5" aria-label={view === 'months' ? 'Next year' : 'Next month'}><ChevronRight size={16} /></button></div>
            {view === 'days' ? <><div className="mt-3 grid grid-cols-7 text-center text-[9px] font-medium uppercase tracking-wider text-[#9b7512]">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`} className="py-1">{day}</span>)}</div><div className="mt-1 grid grid-cols-7 gap-1">{Array.from({ length: firstDay }, (_, index) => <span key={`empty-${index}`} />)}{Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => { const dayIso = iso(day); const active = dayIso === value; const isToday = dayIso === todayIso; const disabled = !!min && dayIso < min; return <button key={day} type="button" disabled={disabled} onClick={() => { onChange(dayIso); setOpen(false) }} className={`flex aspect-square items-center justify-center rounded-full text-xs transition ${disabled ? 'cursor-not-allowed text-royal/20' : active ? 'bg-royal text-white shadow-sm' : isToday ? 'border border-[#9b7512] text-[#9b7512]' : 'text-royal/75 hover:bg-[#9b7512]/10 hover:text-royal'}`}>{day}</button> })}</div></> : <div className="mt-4 grid grid-cols-3 gap-2">{Array.from({ length: 12 }, (_, index) => new Date(year, index, 1)).map((optionMonth, index) => { const active = index === monthIndex; return <button key={index} type="button" onClick={() => { setMonth(new Date(year, index, 1)); setView('days') }} className={`rounded-lg px-2 py-3 text-xs font-medium transition ${active ? 'bg-royal text-white' : 'text-royal/70 hover:bg-[#9b7512]/10 hover:text-royal'}`}>{optionMonth.toLocaleDateString('en-PH', { month: 'short' })}</button> })}</div>}
            {value && <button type="button" onClick={() => { onChange(''); setOpen(false) }} className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-royal/45 hover:text-[#9b7512]">Clear date</button>}
        </motion.div>}
    </div>
}
function Dates({ data, set }: { data: FormData; set: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) {
    const today = toIso(new Date())
    const returnFor = (departure: string, duration: string) => { const days = Number(duration); return Number.isInteger(days) && days >= 2 ? addDays(departure, days - 1) : '' }
    const changeDeparture = (departure: string) => {
        set('departure', departure)
        if (!departure) return
        if (data.duration) set('returnDate', returnFor(departure, data.duration))
        else if (data.returnDate && data.returnDate <= departure) set('returnDate', '')
        else if (data.returnDate) set('duration', String(daysBetween(departure, data.returnDate) + 1))
    }
    const changeReturn = (returnDate: string) => {
        set('returnDate', returnDate)
        if (returnDate && data.departure) set('duration', String(daysBetween(data.departure, returnDate) + 1))
    }
    const changeDuration = (duration: string) => {
        set('duration', duration)
        if (data.departure) set('returnDate', returnFor(data.departure, duration))
    }
    return <><Title>When are you planning to travel?</Title><Hint>These are inquiry preferences; no availability check is made yet.</Hint><div className="mt-2 grid gap-4 sm:grid-cols-2"><CalendarField label="Preferred departure" value={data.departure} min={today} onChange={changeDeparture} /><CalendarField label="Preferred return" value={data.returnDate} min={addDays(data.departure || today, 1)} onChange={changeReturn} /></div><Subheading>Or preferred trip length</Subheading><div className="mt-2 max-w-xs"><input type="number" min="1" inputMode="numeric" value={data.duration} onChange={(e) => changeDuration(e.target.value)} className={`${fieldClass} number-no-spinner`} placeholder="Number of days" />{data.duration && <p className="mt-2 text-xs text-royal/55">That is {formatDuration(data.duration)}.</p>}</div><Subheading>Are your dates flexible?</Subheading><Pills options={['Yes', 'No', 'Not sure yet']} value={data.flexibleDates} onChange={(v) => set('flexibleDates', v)} /></> }
function travelerCounts(adults: string, children: string) {
    const a = Number(adults)
    const c = Number(children || '0')
    return Number.isInteger(a) && Number.isInteger(c) && c >= 0 ? { a, c } : null
}
function travelersIssue(data: FormData) {
    const counts = travelerCounts(data.adults, data.children)
    if (!counts) return 'Please enter whole numbers for adults and children.'
    const { a, c } = counts
    if (a < 1) return 'At least one adult must be traveling.'
    if (data.group === 'Solo' && (a !== 1 || c > 0)) return 'Solo trips are for one adult only. Remove the children, or choose Family.'
    if (data.group === 'Couple' && (a !== 2 || c > 0)) return 'Couple trips are for two adults.'
    if (['Family', 'Friends', 'Group', 'Company / organization'].includes(data.group) && a + c <= 2 && !(data.group === 'Family' && c > 0)) return `${data.group} trips need at least 3 travelers. Adjust the numbers, or choose Solo or Couple.`
    return null
}
function groupFor(current: string, adults: string, children: string) {
    const counts = travelerCounts(adults, children)
    if (!counts || counts.a < 1) return current
    const { a, c } = counts
    if (a === 1 && c === 0) return 'Solo'
    if (a === 2 && c === 0) return 'Couple'
    if (a + c === 2) return 'Family'
    if (['Solo', 'Couple'].includes(current)) return c > 0 ? 'Family' : 'Group'
    return current || 'Group'
}
const SIZED_GROUPS = ['Group', 'Company / organization']
const GROUP_SIZE_MINIMUMS: Record<string, number> = { '10+': 10, '20+': 20 }
function groupSizeFor(adults: string, children: string) {
    const counts = travelerCounts(adults, children)
    if (!counts) return ''
    const total = counts.a + counts.c
    return total >= 20 ? '20+' : total >= 10 ? '10+' : 'Custom'
}
function Travelers({ data, set }: { data: FormData; set: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) {
    const issue = data.group ? travelersIssue(data) : null
    const chooseGroup = (group: string) => {
        set('group', group)
        if (group === 'Solo') { set('adults', '1'); set('children', '0') }
        if (group === 'Couple') { set('adults', '2'); set('children', '0') }
        if (SIZED_GROUPS.includes(group)) set('groupSize', groupSizeFor(data.adults, data.children))
    }
    const changeCount = (key: 'adults' | 'children', value: string) => {
        set(key, value)
        const adults = key === 'adults' ? value : data.adults
        const children = key === 'children' ? value : data.children
        const group = groupFor(data.group, adults, children)
        set('group', group)
        if (SIZED_GROUPS.includes(group)) set('groupSize', groupSizeFor(adults, children))
    }
    const chooseGroupSize = (size: string) => {
        set('groupSize', size)
        const minimum = GROUP_SIZE_MINIMUMS[size]
        const counts = travelerCounts(data.adults, data.children)
        if (minimum && counts && counts.a + counts.c < minimum) set('adults', String(minimum - counts.c))
    }
    return <><Choice title="Who are you traveling with?" options={GROUPS} value={data.group} onChange={chooseGroup} /><div className="mt-3 grid gap-4 sm:grid-cols-2"><Field label="Number of adults"><input type="number" min="1" value={data.adults} onChange={(e) => changeCount('adults', e.target.value)} className={`${fieldClass} number-no-spinner`} /></Field><Field label="Number of children"><input type="number" min="0" value={data.children} onChange={(e) => changeCount('children', e.target.value)} className={`${fieldClass} number-no-spinner`} /></Field></div>{issue && <p role="alert" className="mt-3 text-sm text-red-700">{issue}</p>}{SIZED_GROUPS.includes(data.group) && <><Subheading>Approximate group size</Subheading><Pills options={['10+', '20+', 'Custom']} value={data.groupSize} onChange={chooseGroupSize} /></>}</> }
function Flights({ data, set }: { data: FormData; set: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) { return <><Title>How would you like to fly?</Title><Subheading>Flight priority</Subheading><Hint>Please select one option.</Hint><Single options={['Cheapest available', 'Direct flights preferred', 'Layovers are okay', 'Shortest travel time', 'Flexible']} value={data.flightPriority} onChange={(v) => set('flightPriority', v)} /><Subheading>Cabin</Subheading><Hint>Please select one option.</Hint><Pills options={['Economy', 'Premium Economy', 'Business', 'First Class', 'No preference']} value={data.cabin} onChange={(v) => set('cabin', v)} /><Subheading>Baggage</Subheading><Hint>Please select one option.</Hint><Pills options={['Carry-on only', 'Checked baggage', 'Not sure yet']} value={data.baggage} onChange={(v) => set('baggage', v)} /></> }

function Visa({ data, set }: { data: FormData; set: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) {
    const suggestions: Record<string, string> = { Tourism: 'Tourist Visa', 'Fiancé(e) / dependent': 'K-1 / K-2', 'Exchange program': 'J-1', 'Religious work': 'R-1 / R-2', 'Performance / athletics': 'P-1 / P-2', Investment: 'E-2' }
    return <><Title>Tell us about your visa journey.</Title><Subheading>Visa service</Subheading><Hint>Please select one option.</Hint><Single options={VISA_TYPES} value={data.visaType} onChange={(v) => set('visaType', v)} />{data.visaType === 'I’m not sure' && <div className="mt-6 rounded-xl border border-[#9b7512]/25 bg-[#fffaf0] p-5"><div className="flex items-center gap-2 text-royal"><Compass size={18} className="text-[#9b7512]" /><h3 className="font-medium">Visa Finder</h3></div><Hint>What is the main purpose of your travel? Please select one option.</Hint><Pills options={Object.keys(suggestions)} value={data.visaPurpose} onChange={(v) => set('visaPurpose', v)} />{data.visaPurpose && <p className="mt-4 text-sm text-royal">A likely starting point is <strong>{suggestions[data.visaPurpose]}</strong>. Our team will confirm the right category.</p>}</div>}<Subheading>Where are you currently in the process?</Subheading><Hint>Please select one option.</Hint><Single options={VISA_STATUSES} value={data.visaStatus} onChange={(v) => set('visaStatus', v)} /><Subheading>Basic inquiry details</Subheading><div className="mt-4 grid gap-5 sm:grid-cols-2"><Field label="Passport status"><input value={data.passportStatus} onChange={(e) => set('passportStatus', e.target.value)} className={fieldClass} placeholder="Valid, applying, renewing…" /></Field><CalendarField label="Passport expiration" value={data.passportExpiry} onChange={(value) => set('passportExpiry', value)} /><Field label="Previous visa application"><input value={data.previousVisa} onChange={(e) => set('previousVisa', e.target.value)} className={fieldClass} placeholder="Yes, no, or details" /></Field><Field label="Existing appointment"><input value={data.appointment} onChange={(e) => set('appointment', e.target.value)} className={fieldClass} placeholder="Date or not scheduled" /></Field></div><textarea value={data.visaHelp} onChange={(e) => set('visaHelp', e.target.value)} rows={3} className={`${fieldClass} mt-5 resize-y`} placeholder="What type of assistance would help most?" /><p className="mt-3 text-xs text-ink/40">No sensitive document uploads are required.</p></>
}

function Review({ data, destination }: { data: FormData; destination: string }) {
    const rows = [['Service', data.service], ['Destination', destination], ['Dates', `${data.departure || formatDuration(data.duration)}${data.returnDate ? ` to ${data.returnDate}` : ''} · ${data.flexibleDates}`], ['Travelers', `${data.group} · ${data.adults} adult(s), ${data.children} child(ren)`], ['Budget', `${data.budget} · ${data.budgetType}`], ['Accommodation', data.accommodation], ['Travel interests', data.interests.join(', ')], ['Flights', [data.flightPriority, data.cabin, data.baggage].filter(Boolean).join(' · ')], ['Transportation', data.transportation.join(', ')], ['Visa', [data.visaType, data.visaStatus].filter(Boolean).join(' · ')] ]
    return <><Title>Review your AVENture</Title><Hint>Make sure everything looks right before adding your contact details.</Hint><dl className="mt-8 divide-y divide-royal/10 rounded-xl border border-royal/10 bg-white/45 px-5">{rows.filter(([, value]) => value).map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr]"><dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#9b7512]">{label}</dt><dd className="text-sm leading-6 text-royal">{value}</dd></div>)}</dl></>
}
function Contact({ data, set }: { data: FormData; set: <K extends keyof FormData>(key: K, value: FormData[K]) => void }) { return <><Title>Where can we reach you?</Title><Hint>We’ll use these details only to respond to your inquiry. Your name and email are required.</Hint><div className="mt-3 grid items-end gap-4 sm:grid-cols-2"><Field label="Full name"><input required value={data.name} onChange={(e) => set('name', e.target.value)} className={fieldClass} /></Field><Field label="Email address"><input required type="email" value={data.email} onChange={(e) => set('email', e.target.value)} className={fieldClass} /></Field><Field label="Contact number" optional><input value={data.phone} onChange={(e) => set('phone', e.target.value)} className={fieldClass} /></Field><Field label="Preferred contact method" optional><input value={data.contactMethod} onChange={(e) => set('contactMethod', e.target.value)} className={fieldClass} placeholder="Messenger, Viber, phone call…" /></Field></div></> }

const NEXT_STEPS = [
    ['Review', 'Our team reads through your journey details.'],
    ['Reach out', 'We contact you to refine dates, budget, and preferences.'],
    ['Proposal', 'You receive a plan and quote shaped around you.'],
]
const CHECKLIST = ['Check passport validity and entry rules', 'Keep copies of important documents', 'Review travel insurance and health needs', 'Confirm flights, stays, and transfers', 'Prepare local currency and emergency contacts', 'Leave room for unexpected discoveries']

function SuccessPage({ firstName, email }: { firstName: string; email: string }) {
    return <ImmersiveShell>
        <Seo title="Your AVENture Is Underway" description="Your inquiry has been sent to AVENtures." path="/start-your-aventure" />
        <main className="relative z-10 h-svh overflow-hidden">
            <div className="flex h-full items-center px-5 pt-20 pb-8 sm:px-10 lg:px-16 [@media(480px<height<=640px)]:pt-16 [@media(height<=480px)]:pt-14 [@media(height<=480px)]:pb-4">
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[36rem]">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9b7512] text-white shadow-[0_0_0_6px_rgba(155,117,18,0.12)]"><Check size={17} strokeWidth={2.2} /></span>
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">Inquiry received</p>
                    </div>
                    <h1 className="mt-6 font-noto-serif text-4xl leading-[1.08] text-royal sm:[@media(height>640px)]:text-5xl [@media(height<=640px)]:mt-4 [@media(height<=640px)]:text-3xl">Your AVENture starts here.</h1>
                    <p className="mt-4 max-w-md text-sm leading-7 text-ink/60 [@media(height<=640px)]:mt-3 [@media(height<=640px)]:leading-6">
                        {firstName ? `Thank you, ${firstName}. ` : 'Thank you. '}Our team will review your details and reach out{email ? <> to <span className="font-medium text-royal">{email}</span></> : null} with the next steps.
                    </p>

                    <ol className="mt-8 grid overflow-hidden rounded-xl max-sm:hidden [@media(height<=800px)]:hidden border border-royal/10 bg-white/55 backdrop-blur-sm sm:grid-cols-3">
                        {NEXT_STEPS.map(([title, text], index) => <li key={title} className={`p-4 ${index ? 'border-t border-royal/10 sm:border-t-0 sm:border-l' : ''}`}>
                            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9b7512]">Step {String(index + 1).padStart(2, '0')}</p>
                            <p className="mt-1.5 text-sm font-medium text-royal">{title}</p>
                            <p className="mt-1 text-xs leading-5 text-ink/55">{text}</p>
                        </li>)}
                    </ol>

                    <div className="mt-8 [@media(height<=640px)]:hidden max-sm:[@media(height<=900px)]:hidden">
                        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#9b7512]">While you wait</p>
                        <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                            {CHECKLIST.map((item) => <li key={item} className="flex gap-2.5 text-[13px] leading-5 text-ink/65"><Check size={14} strokeWidth={2.2} className="mt-0.5 shrink-0 text-[#9b7512]" />{item}</li>)}
                        </ul>
                    </div>

                    <div className="mt-9 flex flex-wrap gap-3 border-t border-royal/10 pt-7 [@media(height<=640px)]:mt-6 [@media(height<=640px)]:pt-5">
                        <Link to="/destinations" className="inline-flex items-center gap-2 bg-royal px-4 py-3 text-sm text-white transition hover:bg-[#0e274b] sm:px-6">Explore destinations <ArrowRight size={15} /></Link>
                        <Link to="/" className="inline-flex items-center border border-royal/20 bg-white/50 px-4 py-3 text-sm text-royal transition hover:border-royal/45 hover:bg-white/75 sm:px-6">Return home</Link>
                    </div>
                </motion.section>
            </div>
        </main>
    </ImmersiveShell>
}
