import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useId, useRef, useState, type RefCallback } from 'react'
import { Link } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { getSeoForPath } from '../data/seo'
import {
    ASK_AVENTURES_HREF,
    START_VISA_ASSISTANCE_HREF,
    askAboutVisaHref,
    extraExploreLinks,
    getVisaService,
    purposeQuestion,
    readinessNote,
    readinessQuestions,
    roleQuestions,
    visaServices,
    type PathId,
    type Readiness,
    type VisaId,
} from '../data/visaFinder'
import type { SiteInfo } from '../types/content'

type Step =
    | { kind: 'intro' }
    | { kind: 'purpose' }
    | { kind: 'role'; path: PathId }
    | { kind: 'readiness'; visa: VisaId }
    | { kind: 'result'; visa: VisaId; readiness: Readiness }
    | { kind: 'unsure' }

const TOTAL_QUESTIONS = 3

const primaryButtonClass =
    'group inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-royal bg-royal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white'

const secondaryButtonClass =
    'inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-royal/70 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-royal transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white'

const quietButtonClass =
    'inline-flex items-center gap-2 text-sm font-medium text-royal/80 underline-offset-4 transition-colors hover:text-gold-deep hover:underline'

const STARTING_POINT_DISCLAIMER =
    'Your answers are only a starting point. The appropriate visa category depends on your individual circumstances and the specific purpose of your intended travel.'

export default function VisaAssistance() {
    const seo = getSeoForPath('/visa-assistance')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [history, setHistory] = useState<Step[]>([{ kind: 'intro' }])
    const step = history[history.length - 1]

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    const recommended = step.kind === 'result' ? step.visa : null

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path="/visa-assistance" />
            <Header />
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Visa Services</p>
                    <h1 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">
                        Where Is Your AVENture Taking You?
                    </h1>
                    <p className="mt-6 font-noto-serif text-lg italic text-royal sm:text-xl">
                        &ldquo;No complicated terms. Just answer what feels right for your journey.&rdquo;
                    </p>
                </header>

                <FinderCard
                    step={step}
                    onAdvance={(next) => setHistory((prev) => [...prev, next])}
                    onBack={() => setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))}
                    onStartOver={() => setHistory([{ kind: 'intro' }, { kind: 'purpose' }])}
                />

                <ExploreAll recommended={recommended} />

                <p className="mx-auto mt-16 max-w-2xl text-center font-noto-serif text-lg text-ink/70">
                    Answer a few questions. Find your direction. Start your AVENture.
                </p>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}

type FinderCardProps = {
    step: Step
    onAdvance: (next: Step) => void
    onBack: () => void
    onStartOver: () => void
}

function FinderCard({ step, onAdvance, onBack, onStartOver }: FinderCardProps) {
    const reduceMotion = useReducedMotion()
    const hasInteracted = useRef(false)
    const [purposeId, setPurposeId] = useState<string | null>(null)
    const [roleId, setRoleId] = useState<string | null>(null)
    const [readinessId, setReadinessId] = useState<Readiness | null>(null)

    const go = (next: Step) => {
        hasInteracted.current = true
        onAdvance(next)
    }
    const back = () => {
        hasInteracted.current = true
        onBack()
    }

    /** Runs when each step's heading mounts, after the previous step's exit animation. */
    const headingRef = useCallback(
        (node: HTMLHeadingElement | null) => {
            if (!node || !hasInteracted.current) return
            node.focus({ preventScroll: true })
            const card = node.closest('section')
            if (card && card.getBoundingClientRect().top < 96) {
                card.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' })
            }
        },
        [reduceMotion],
    )

    const advanceTimer = useRef<number | null>(null)
    useEffect(() => () => {
        if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }, [])

    /** Holds the checked state on screen briefly so the choice registers before the step changes. */
    const choose = (record: () => void, next: Step) => {
        if (advanceTimer.current) return
        record()
        advanceTimer.current = window.setTimeout(() => {
            advanceTimer.current = null
            go(next)
        }, reduceMotion ? 0 : 180)
    }

    const startOver = () => {
        hasInteracted.current = true
        setPurposeId(null)
        setRoleId(null)
        setReadinessId(null)
        onStartOver()
    }

    let body
    if (step.kind === 'intro') {
        body = (
            <div className="text-center">
                <h2 ref={headingRef} tabIndex={-1} className="font-noto-serif text-2xl text-ink outline-none sm:text-3xl">
                    Let&rsquo;s find your AVENture
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-ink/60">
                    Three short questions. You can also browse every service below.
                </p>
                <button type="button" onClick={() => go({ kind: 'purpose' })} className={`${primaryButtonClass} mt-7`}>
                    Let&rsquo;s Find Your AVENture
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        )
    } else if (step.kind === 'purpose') {
        body = (
            <QuestionStep
                headingRef={headingRef}
                number={1}
                title={purposeQuestion.title}
                options={purposeQuestion.options}
                selectedId={purposeId}
                onChoose={(id) => {
                    const option = purposeQuestion.options.find((o) => o.id === id)!
                    choose(
                        () => {
                            if (id !== purposeId) {
                                setRoleId(null)
                                setReadinessId(null)
                            }
                            setPurposeId(id)
                        },
                        option.path ? { kind: 'role', path: option.path } : { kind: 'unsure' },
                    )
                }}
                onBack={back}
            />
        )
    } else if (step.kind === 'role') {
        const question = roleQuestions[step.path]
        body = (
            <QuestionStep
                headingRef={headingRef}
                number={2}
                title={question.title}
                options={question.options}
                selectedId={roleId}
                onChoose={(id) => {
                    const option = question.options.find((o) => o.id === id)!
                    choose(
                        () => {
                            if (id !== roleId) setReadinessId(null)
                            setRoleId(id)
                        },
                        option.visa ? { kind: 'readiness', visa: option.visa } : { kind: 'unsure' },
                    )
                }}
                onBack={back}
            />
        )
    } else if (step.kind === 'readiness') {
        const question = readinessQuestions[step.visa]
        body = (
            <QuestionStep
                headingRef={headingRef}
                number={3}
                title={question.title}
                options={question.options}
                selectedId={readinessId}
                onChoose={(id) => {
                    const readiness = id as Readiness
                    choose(() => setReadinessId(readiness), { kind: 'result', visa: step.visa, readiness })
                }}
                onBack={back}
            />
        )
    } else if (step.kind === 'result') {
        body = (
            <MatchResult
                headingRef={headingRef}
                visa={step.visa}
                readiness={step.readiness}
                onBack={back}
                onStartOver={startOver}
            />
        )
    } else {
        body = <UnsureResult headingRef={headingRef} onBack={back} onStartOver={startOver} />
    }

    const stepKey =
        step.kind === 'role' ? `role-${step.path}` : step.kind === 'readiness' ? `readiness-${step.visa}` : step.kind

    return (
        <section
            aria-label="Visa finder"
            className="mx-auto mt-12 max-w-[40rem] scroll-mt-28 border border-royal/15 bg-white/70 px-6 py-8 shadow-[0_18px_40px_-28px_rgba(22,55,101,0.45)] sm:px-10 sm:py-10"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={stepKey}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                >
                    {body}
                </motion.div>
            </AnimatePresence>
        </section>
    )
}

type QuestionStepProps = {
    headingRef: RefCallback<HTMLHeadingElement>
    number: number
    title: string
    options: { id: string; label: string }[]
    selectedId: string | null
    onChoose: (id: string) => void
    onBack: () => void
}

function QuestionStep({ headingRef, number, title, options, selectedId, onChoose, onBack }: QuestionStepProps) {
    const headingId = useId()

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-royal">
                    Question {number} of {TOTAL_QUESTIONS}
                </p>
                <div className="flex w-28 gap-1.5" aria-hidden>
                    {Array.from({ length: TOTAL_QUESTIONS }, (_, index) => (
                        <span
                            key={index}
                            className={`h-1 flex-1 rounded-full ${index < number ? 'bg-gold-deep' : 'bg-royal/15'}`}
                        />
                    ))}
                </div>
            </div>

            <h2
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                className="mt-5 font-noto-serif text-2xl text-ink outline-none sm:text-[1.7rem]"
            >
                {title}
            </h2>
            <ul aria-labelledby={headingId} className="mt-6 space-y-2.5">
                {options.map((option) => {
                    const checked = option.id === selectedId
                    return (
                        <li key={option.id}>
                            <button
                                type="button"
                                aria-pressed={checked}
                                onClick={() => onChoose(option.id)}
                                className={`flex min-h-12 w-full cursor-pointer items-center gap-3 border px-4 py-3 text-left text-sm leading-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
                                    checked
                                        ? 'border-royal bg-royal/[0.06] text-ink'
                                        : 'border-royal/15 bg-white/60 text-ink/75 hover:border-royal/40'
                                }`}
                            >
                                <span
                                    aria-hidden
                                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                                        checked ? 'border-royal bg-royal text-cream' : 'border-royal/30'
                                    }`}
                                >
                                    {checked && <Check size={12} strokeWidth={3} />}
                                </span>
                                <span>{option.label}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>

            <button type="button" onClick={onBack} className={`${quietButtonClass} mt-8`}>
                <ArrowLeft size={16} />
                Back
            </button>
        </div>
    )
}

type ResultNavProps = {
    headingRef: RefCallback<HTMLHeadingElement>
    onBack: () => void
    onStartOver: () => void
}

function ResultNav({ onBack, onStartOver }: Omit<ResultNavProps, 'headingRef'>) {
    return (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={onBack} className={quietButtonClass}>
                <ArrowLeft size={16} />
                Back
            </button>
            <button type="button" onClick={onStartOver} className={quietButtonClass}>
                <RotateCcw size={15} />
                Start over
            </button>
        </div>
    )
}

function MatchResult({
    headingRef,
    visa,
    readiness,
    onBack,
    onStartOver,
}: ResultNavProps & { visa: VisaId; readiness: Readiness }) {
    const service = getVisaService(visa)
    const ready = readiness === 'yes' || readiness === 'arranging'

    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-royal">Your AVENture result</p>
            <h2 ref={headingRef} tabIndex={-1} className="mt-3 font-noto-serif text-2xl text-ink outline-none sm:text-3xl">
                Here&rsquo;s Where Your Answers Lead.
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink/60">
                Based on the answers you provided, the AVENTURES service most closely related to your stated purpose
                is:
            </p>
            <div className="mt-5 border-l-2 border-gold-deep bg-royal/[0.04] px-5 py-5">
                <p className="font-noto-serif text-2xl text-royal sm:text-[1.7rem]">{service.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink/75">{service.description}</p>
            </div>
            <p className="mt-5 text-sm leading-7 text-ink/60">
                Explore this section to learn more about the visa, its purpose, and the information you should know
                before moving forward.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink/80">
                <span className="font-medium text-royal">Your next step: </span>
                {readinessNote(visa, readiness)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to={service.href} className={primaryButtonClass}>
                    Explore {service.shortLabel}
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                {ready ? (
                    <Link to={START_VISA_ASSISTANCE_HREF} className={secondaryButtonClass}>
                        Start Visa Assistance
                    </Link>
                ) : (
                    <Link to={askAboutVisaHref(service)} className={secondaryButtonClass}>
                        Ask AVENTURES
                    </Link>
                )}
            </div>
            <ResultNav onBack={onBack} onStartOver={onStartOver} />
            <p className="mt-8 border-t border-royal/10 pt-5 text-xs leading-6 text-ink/50">{STARTING_POINT_DISCLAIMER}</p>
        </div>
    )
}

function UnsureResult({ headingRef, onBack, onStartOver }: ResultNavProps) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-royal">Not sure or still confused?</p>
            <h2 ref={headingRef} tabIndex={-1} className="mt-3 font-noto-serif text-2xl text-ink outline-none sm:text-3xl">
                That&rsquo;s completely okay.
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
                Sometimes your situation does not fit neatly into one answer, and you may simply need someone to
                explain your options.
            </p>
            <p className="mt-6 border-l-2 border-gold-deep pl-4 font-noto-serif text-lg italic text-royal">
                &ldquo;When you&rsquo;re unsure about the path, ask before you move forward.&rdquo;
            </p>
            <div className="mt-8">
                <Link to={ASK_AVENTURES_HREF} className={primaryButtonClass}>
                    Ask AVENTURES
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
            <ResultNav onBack={onBack} onStartOver={onStartOver} />
            <p className="mt-8 border-t border-royal/10 pt-5 text-xs leading-6 text-ink/50">{STARTING_POINT_DISCLAIMER}</p>
        </div>
    )
}

function ExploreAll({ recommended }: { recommended: VisaId | null }) {
    const rowClass =
        'group flex min-h-14 items-center justify-between gap-3 border px-4 py-3 text-sm transition-colors hover:border-gold-deep'

    return (
        <section aria-labelledby="explore-all-title" className="mx-auto mt-16 max-w-5xl">
            <h2 id="explore-all-title" className="text-center font-noto-serif text-2xl text-ink sm:text-3xl">
                Explore All AVENTURES Services
            </h2>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {visaServices.map((service) => {
                    const isRecommended = service.id === recommended
                    return (
                        <li key={service.id}>
                            <Link
                                to={service.href}
                                className={`${rowClass} ${
                                    isRecommended ? 'border-royal bg-royal/[0.06]' : 'border-royal/15 bg-white/55'
                                }`}
                            >
                                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                    <span className="font-medium text-ink">{service.title}</span>
                                    {isRecommended && (
                                        <span className="rounded-full bg-gold-deep px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                                            Recommended
                                        </span>
                                    )}
                                </span>
                                <ArrowRight
                                    size={16}
                                    className="shrink-0 text-royal/50 transition group-hover:translate-x-0.5 group-hover:text-gold-deep"
                                />
                            </Link>
                        </li>
                    )
                })}
                {extraExploreLinks.map((link) => (
                    <li key={link.id}>
                        <Link to={link.href} className={`${rowClass} border-royal/15 bg-white/55`}>
                            <span className="font-medium text-royal">{link.label}</span>
                            <ArrowRight
                                size={16}
                                className="shrink-0 text-royal/50 transition group-hover:translate-x-0.5 group-hover:text-gold-deep"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
