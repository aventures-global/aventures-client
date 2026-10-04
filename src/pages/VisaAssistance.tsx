import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode, type RefCallback } from 'react'
import { Link } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { getSeoForPath } from '../data/seo'
import { useStickyCover } from '../lib/useStickyCover'
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

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const STARTING_POINT_DISCLAIMER =
    'Your answers are only a starting point. The appropriate visa category depends on your individual circumstances and the specific purpose of your intended travel.'

export default function VisaAssistance() {
    const seo = getSeoForPath('/visa-assistance')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [history, setHistory] = useState<Step[]>([{ kind: 'intro' }])
    const step = history[history.length - 1]
    const reduceMotion = useReducedMotion()
    const [finderRef, finderTop] = useStickyCover<HTMLElement>()

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    const recommended = step.kind === 'result' ? step.visa : null
    const isIntro = step.kind === 'intro'

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path="/visa-assistance" />
            <Header />
            <main className="flex-1">
                <section
                    ref={finderRef}
                    className={`${reduceMotion ? 'relative' : 'sticky z-0'} flex min-h-[490px] items-center bg-oat ${
                        reduceMotion
                            ? ''
                            : 'transition-[padding] duration-[600ms] ease-[cubic-bezier(0.22,0.7,0.2,1)]'
                    } ${isIntro ? 'pt-20' : 'py-24 sm:py-28'}`}
                    style={reduceMotion ? undefined : { top: finderTop }}
                    aria-labelledby="visa-finder-title"
                >
                    <img
                        src="/assets/images/visa-services.jpg?v=1"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,49,0.23),rgba(10,35,70,0.32),rgba(5,18,38,0.45))]" />
                    <div className="site-container relative z-10">
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, ease: EASE }}
                        >
                            <FinderCard
                                step={step}
                                onAdvance={(next) => setHistory((prev) => [...prev, next])}
                                onBack={() => setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))}
                                onStartOver={() => setHistory([{ kind: 'intro' }, { kind: 'purpose' }])}
                            />
                        </motion.div>
                    </div>
                </section>

                <section className="relative z-10 bg-white pb-20 pt-24 shadow-[0_-24px_50px_-30px_rgba(22,55,101,0.35)] sm:pb-24 sm:pt-32">
                    <div className="site-container">
                        <ExploreAll recommended={recommended} />
                    </div>
                </section>
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
    const titleRef = useRef<HTMLHeadingElement>(null)
    const isIntro = step.kind === 'intro'
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

    useEffect(() => {
        if (!isIntro || !hasInteracted.current) return
        const node = titleRef.current
        if (!node) return
        node.focus({ preventScroll: true })
        const card = node.closest('section')
        if (card && card.getBoundingClientRect().top < 96) {
            card.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' })
        }
    }, [isIntro, reduceMotion])

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
            <div>
                <p className="mt-3 text-sm leading-7 text-ink/60">Three questions, or browse every service below.</p>
                <button type="button" onClick={() => go({ kind: 'purpose' })} className={`${primaryButtonClass} mt-5 w-full`}>
                    Start
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
            className="mx-auto max-w-6xl scroll-mt-28 rounded-xl border border-royal/10 bg-white/55 px-5 shadow-[0_20px_60px_rgba(22,55,101,0.08)] backdrop-blur-sm sm:px-8"
        >
            <AnimatedHeight watch={stepKey} reduceMotion={reduceMotion}>
                <div className={isIntro ? 'flex min-h-[260px] flex-col justify-center' : 'py-7 sm:py-8'}>
                    <header className={isIntro ? undefined : 'mb-6 border-b border-royal/10 pb-5'}>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9b7512]">Visa services</p>
                        <h1
                            ref={titleRef}
                            id="visa-finder-title"
                            tabIndex={-1}
                            className="mt-2 font-noto-serif text-[clamp(1.15rem,5.7vw,1.875rem)] leading-tight text-royal outline-none sm:text-4xl"
                        >
                            Where is your AVENture taking you?
                        </h1>
                    </header>
                    <AnimatePresence mode="popLayout" initial={false}>
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
                </div>
            </AnimatedHeight>
        </section>
    )
}

const EXPAND_EASE = [0.22, 0.7, 0.2, 1] as const

function AnimatedHeight({
    children,
    watch,
    reduceMotion,
}: {
    children: ReactNode
    watch: string
    reduceMotion: boolean | null
}) {
    const innerRef = useRef<HTMLDivElement>(null)
    const allowMotion = useRef(false)
    const heightRef = useRef<number | 'auto'>('auto')
    const [motionState, setMotionState] = useState<{ height: number | 'auto'; duration: number }>({
        height: 'auto',
        duration: 0,
    })

    useLayoutEffect(() => {
        const el = innerRef.current
        if (!el) return
        const apply = () => {
            const next = el.offsetHeight
            const current = heightRef.current
            if (current === next) return
            const from = typeof current === 'number' ? current : next
            const delta = Math.abs(next - from)
            const duration =
                !allowMotion.current || reduceMotion || delta < 8
                    ? 0
                    : Math.min(0.6, Math.max(0.3, delta / 620))
            heightRef.current = next
            setMotionState({ height: next, duration })
        }
        apply()
        const observer = new ResizeObserver(apply)
        observer.observe(el)
        const frame = requestAnimationFrame(() => {
            allowMotion.current = true
        })
        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [watch, reduceMotion])

    return (
        <motion.div
            initial={false}
            animate={{ height: motionState.height }}
            transition={{ duration: motionState.duration, ease: EXPAND_EASE }}
            className="overflow-hidden"
        >
            <div ref={innerRef}>{children}</div>
        </motion.div>
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
            <ul aria-labelledby={headingId} className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {options.map((option) => {
                    const checked = option.id === selectedId
                    return (
                        <li key={option.id}>
                            <button
                                type="button"
                                aria-pressed={checked}
                                onClick={() => onChoose(option.id)}
                                className={`flex h-full min-h-12 w-full cursor-pointer items-center gap-3 border px-4 py-3 text-left text-sm leading-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
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

            <button type="button" onClick={onBack} className={`${quietButtonClass} mt-6`}>
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
        <div className="mx-auto max-w-2xl">
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
        <div className="mx-auto max-w-2xl">
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

const visaCategory: Record<VisaId, string> = {
    tourist: 'Visit',
    fiance: 'Family',
    k2: 'Family',
    j1: 'Exchange',
    r1: 'Religious',
    r2: 'Religious',
    p1: 'Performance',
    p2: 'Performance',
    e2: 'Investment',
}

function ExploreAll({ recommended }: { recommended: VisaId | null }) {
    const reduceMotion = useReducedMotion()
    const visaCardClass =
        'group relative flex h-full w-full flex-col rounded-[3px] border border-royal/15 bg-cream px-5 py-6 transition-colors duration-300 hover:border-[#9b7512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal'
    const arrowClass =
        'shrink-0 text-royal/30 transition duration-300 group-hover:translate-x-0.5 group-hover:text-[#9b7512]'

    return (
        <section aria-labelledby="explore-all-title" className="mx-auto max-w-5xl">
            <motion.div
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
            >
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">Visa services</p>
                <h2 id="explore-all-title" className="mt-2 font-noto-serif text-2xl text-ink sm:text-3xl">
                    Explore All AVENTURES Services
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-balance font-noto-serif text-lg italic leading-relaxed text-ink/70">
                    Answer a few questions. Find your direction. Start your AVENture.
                </p>
            </motion.div>
            <motion.ul
                className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
                {visaServices.map((service) => {
                    const isRecommended = service.id === recommended
                    return (
                        <motion.li key={service.id} variants={fadeUp} className="flex">
                            <Link
                                to={service.href}
                                className={`${visaCardClass} ${isRecommended ? 'border-l-2 border-l-[#9b7512]' : ''}`}
                            >
                                <span className="pr-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#9b7512]">
                                    {visaCategory[service.id]}
                                </span>
                                {isRecommended && (
                                    <span className="mt-2 pr-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#9b7512]">
                                        Suggested for you
                                    </span>
                                )}
                                <span className="mt-3 pr-6 font-noto-serif text-lg leading-snug text-royal sm:text-xl">
                                    {service.title}
                                </span>
                                <span className="mt-2.5 text-sm leading-6 text-ink/60">{service.description}</span>
                                <ArrowRight
                                    aria-hidden="true"
                                    size={15}
                                    strokeWidth={1.5}
                                    className={`absolute top-6 right-5 ${arrowClass}`}
                                />
                            </Link>
                        </motion.li>
                    )
                })}
            </motion.ul>
            <motion.ul
                className="mt-12 grid gap-4 sm:grid-cols-2"
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
                {extraExploreLinks.map((link) => (
                    <motion.li key={link.id} variants={fadeUp} className="flex">
                        <Link
                            to={link.href}
                            className="group flex h-full w-full items-center justify-between gap-6 rounded-[3px] border border-royal/10 bg-white px-6 py-5 transition-colors duration-300 hover:border-[#9b7512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                        >
                            <span className="min-w-0">
                                <span className="block font-noto-serif text-lg leading-snug text-ink">{link.label}</span>
                                <span className="mt-1.5 block text-sm leading-6 text-ink/55">{link.note}</span>
                            </span>
                            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} className={arrowClass} />
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    )
}
