import { ArrowRight, X } from 'lucide-react'
import { motion, useDragControls } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { FormHoneypot, submitInquiry, type SubmitStatus } from '../lib/forms'
import type { SiteInfo } from '../types/content'

const fieldClass = 'w-full border-0 border-b border-royal/25 bg-transparent px-0 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-[#9b7512]'

export default function Inquire({ modal = false }: { modal?: boolean }) {
    const navigate = useNavigate()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches)
    const dragControls = useDragControls()

    useEffect(() => { void getSite().then(setSite) }, [])
    useEffect(() => {
        const media = window.matchMedia('(max-width: 639px)')
        const update = () => setIsMobile(media.matches)
        update()
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])
    useEffect(() => {
        if (!modal) return
        const root = document.documentElement
        const previousBehavior = root.style.scrollBehavior
        const previousOverflow = document.body.style.overflow
        const y = window.scrollY
        root.style.scrollBehavior = 'auto'
        document.body.style.overflow = 'hidden'
        const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') navigate(-1) }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = previousOverflow
            window.scrollTo({ top: y, left: 0, behavior: 'instant' })
            root.style.scrollBehavior = previousBehavior
            window.removeEventListener('keydown', onKey)
        }
    }, [modal, navigate])

    const close = () => navigate(-1)
    const card = site ? <ConsultationForm onClose={modal ? close : undefined} embedded={modal && isMobile} /> : <div className="h-[34rem] animate-pulse rounded-xl bg-white/70" />

    if (modal) {
        if (isMobile) {
            return (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Book a consultation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed inset-0 z-[100] flex items-end bg-[#071831]/72 backdrop-blur-sm"
                    onPointerDown={(event) => { if (event.target === event.currentTarget) close() }}
                >
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 330 }}
                        drag="y"
                        dragControls={dragControls}
                        dragListener={false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.65 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 110 || info.velocity.y > 700) close()
                        }}
                        className="max-h-[92dvh] w-full overflow-hidden rounded-t-[1.5rem] bg-[#faf7f0] shadow-[0_-20px_60px_rgba(7,24,49,0.28)]"
                    >
                        <div
                            className="flex h-9 touch-none cursor-grab items-center justify-center active:cursor-grabbing"
                            onPointerDown={(event) => dragControls.start(event)}
                            aria-hidden="true"
                        >
                            <span className="h-1.5 w-11 rounded-full bg-royal/20" />
                        </div>
                        <div className="max-h-[calc(92dvh-2.25rem)] overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom,0px)]">
                            {card}
                        </div>
                    </motion.div>
                </motion.div>
            )
        }

        return (
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Book a consultation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed inset-0 z-[100] overflow-y-auto bg-[#071831]/72 p-4 backdrop-blur-sm sm:p-8"
                onMouseDown={(event) => { if (event.target === event.currentTarget) navigate(-1) }}
            >
                <div className="flex min-h-full items-center justify-center" onMouseDown={(event) => { if (event.target === event.currentTarget) navigate(-1) }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.985 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="w-full max-w-3xl"
                    >
                        {card}
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="luxury-paper font-poppins min-h-svh">
            <Seo title="Book a Consultation — AVENtures" description="Talk with AVENtures about your travel plans and the services you need." path="/inquire" />
            <Header />
            <main className="site-container py-32 sm:py-40">{card}</main>
            {site && <Footer site={site} />}
        </div>
    )
}

function ConsultationForm({ onClose, embedded = false }: { onClose?: () => void; embedded?: boolean }) {
    const [searchParams] = useSearchParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [service, setService] = useState(searchParams.get('service') ?? '')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<SubmitStatus>('idle')

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('sending')
        const [firstName, ...rest] = name.trim().split(/\s+/)
        const result = await submitInquiry(event.currentTarget, {
            kind: 'consultation',
            firstName,
            lastName: rest.join(' ') || undefined,
            email,
            phone: phone.trim() || undefined,
            service: service.trim() || undefined,
            message,
        })
        if (result === 'sent') {
            setName('')
            setEmail('')
            setPhone('')
            setService('')
            setMessage('')
        }
        setStatus(result)
    }

    return (
        <section className={`relative bg-[#faf7f0] p-6 sm:p-10 ${embedded ? '' : 'rounded-xl border border-royal/10 shadow-2xl'}`}>
            {onClose && <button type="button" onClick={onClose} aria-label="Close consultation" className="absolute right-4 top-4 rounded-full p-2 text-royal/55 transition hover:bg-royal/5 hover:text-royal"><X size={20} /></button>}
            <p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">Book a consultation</p>
            <h1 className="mt-3 max-w-2xl font-noto-serif text-3xl leading-tight text-royal sm:text-4xl">Have a specific service in mind and ready to get started?</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/55">Best for clients who have questions, are unsure which service they need, or want to discuss their plans first.</p>
            <form onSubmit={submit} className="mt-8 space-y-5">
                <FormHoneypot />
                <div className="grid gap-5 sm:grid-cols-2"><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={fieldClass} /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className={fieldClass} /></div>
                <div className="grid gap-5 sm:grid-cols-2"><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact number" className={fieldClass} /><input value={service} onChange={(e) => setService(e.target.value)} placeholder="Service in mind (optional)" className={fieldClass} /></div>
                <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what you would like to discuss" className={`${fieldClass} resize-y`} />
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2"><p className="text-xs text-ink/40">We’ll use these details only to respond to your inquiry.</p><button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 bg-royal px-6 py-3 text-sm text-white transition hover:bg-[#0e274b] disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Book consultation'} <ArrowRight size={15} /></button></div>
                {status === 'sent' && <p className="text-sm text-royal">Thank you. We’ll be in touch shortly.</p>}
                {status === 'error' && <p className="text-sm text-red-700">Something went wrong. Please try again.</p>}
            </form>
        </section>
    )
}
