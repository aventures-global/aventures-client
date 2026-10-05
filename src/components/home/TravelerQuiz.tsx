import {
    ArrowLeft,
    ArrowRight,
    Check,
    Compass,
    Heart,
    Mountain,
    RotateCcw,
    Sparkles,
    Users,
    Utensils,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'

type TravelerKind = 'city' | 'nature' | 'foodie' | 'family' | 'romantic' | 'adventure' | 'entertainment'
type Scores = Partial<Record<TravelerKind, number>>
type Answer = { label: string; scores: Scores }
type Question = { eyebrow: string; title: string; prompt: string; icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; answers: Answer[] }

const questions: Question[] = [
    {
        eyebrow: 'Your ideal view',
        title: 'What would you rather wake up to?',
        prompt: 'Choose the view that feels most like the start of a great trip.',
        icon: Compass,
        answers: [
            { label: 'The energy of a busy city', scores: { city: 3, entertainment: 1 } },
            { label: 'Nature in every direction', scores: { nature: 3, adventure: 1 } },
            { label: 'A little city and a little nature', scores: { city: 2, nature: 2 } },
            { label: 'Wherever everyone has the most fun', scores: { family: 3, entertainment: 1 } },
        ],
    },
    {
        eyebrow: 'Your perfect food day',
        title: 'What sounds most delicious?',
        prompt: 'Food can be the main event—or the perfect companion to the day.',
        icon: Utensils,
        answers: [
            { label: 'Trying the dishes everyone talks about', scores: { foodie: 3, adventure: 1 } },
            { label: 'Balancing good food with plenty of exploring', scores: { foodie: 2, city: 2 } },
            { label: 'Finding beautiful cafés worth sharing', scores: { foodie: 3, romantic: 1 } },
            { label: 'Choosing something the whole group will enjoy', scores: { family: 3, foodie: 1 } },
        ],
    },
    {
        eyebrow: 'Let’s go shopping',
        title: 'Where would we find you?',
        prompt: 'Pick the shopping pace that fits naturally into your holiday.',
        icon: Sparkles,
        answers: [
            { label: 'Browsing colorful local markets', scores: { foodie: 2, adventure: 1 } },
            { label: 'Exploring malls and shopping districts', scores: { city: 3, entertainment: 1 } },
            { label: 'A little shopping between the sights', scores: { city: 2, foodie: 1 } },
            { label: 'Skipping the shops to keep exploring', scores: { adventure: 3, nature: 1 } },
        ],
    },
    {
        eyebrow: 'Who’s coming with you?',
        title: 'Who shares the journey?',
        prompt: 'The right travel companion can change the whole shape of a trip.',
        icon: Users,
        answers: [
            { label: 'My partner', scores: { romantic: 4 } },
            { label: 'My family', scores: { family: 4 } },
            { label: 'A group of friends', scores: { entertainment: 3, adventure: 1 } },
            { label: 'Just me', scores: { adventure: 2, nature: 1, city: 1 } },
        ],
    },
    {
        eyebrow: 'Your adventure level',
        title: 'How bold should the itinerary feel?',
        prompt: 'There is an adventure for every pace—from unhurried to unforgettable.',
        icon: Mountain,
        answers: [
            { label: 'Slow, easy, and completely relaxing', scores: { nature: 3, romantic: 1 } },
            { label: 'Gentle discoveries with time to breathe', scores: { foodie: 1, nature: 1, city: 1 } },
            { label: 'A good mix of comfort and adventure', scores: { adventure: 3, nature: 1 } },
            { label: 'High-energy and story-worthy', scores: { adventure: 4, entertainment: 1 } },
        ],
    },
    {
        eyebrow: 'Your perfect night',
        title: 'How does the day end?',
        prompt: 'When the sun goes down, choose the evening you would look forward to.',
        icon: Heart,
        answers: [
            { label: 'A memorable dinner, then time to relax', scores: { romantic: 3, foodie: 1 } },
            { label: 'Music, nightlife, and somewhere lively', scores: { entertainment: 3, city: 1 } },
            { label: 'A show, attraction, or special event', scores: { entertainment: 3, family: 1 } },
            { label: 'A peaceful evening somewhere beautiful', scores: { nature: 3, romantic: 1 } },
        ],
    },
    {
        eyebrow: 'Pick your travel mood',
        title: 'What should this trip give you?',
        prompt: 'Go with the feeling you most want to bring home.',
        icon: Sparkles,
        answers: [
            { label: 'Space to slow down and reset', scores: { nature: 3, romantic: 1 } },
            { label: 'The satisfaction of seeing everything', scores: { city: 3, adventure: 1 } },
            { label: 'Experiences I cannot get at home', scores: { adventure: 3, foodie: 1 } },
            { label: 'Great memories with my favorite people', scores: { family: 3, romantic: 1 } },
        ],
    },
]

type Recommendation = { name: string; place: string; image: string; href: string }
type Result = { title: string; label: string; description: string; recommendations: Recommendation[] }

const results: Record<TravelerKind, Result> = {
    city: {
        title: 'The City Explorer',
        label: 'Culture · Energy · Discovery',
        description: 'You feel most alive where every street leads to something new—landmark sights, local neighborhoods, late dinners, and a city rhythm that keeps unfolding.',
        recommendations: [
            { name: 'Japan', place: 'Tradition meets modern energy', image: '/assets/images/japan-tradition.jpg', href: '/destinations/japan-tradition' },
            { name: 'South Korea', place: 'Culture, style, and city nights', image: '/assets/images/south-korea-kwave.jpg', href: '/destinations/south-korea-kwave' },
            { name: 'Europe', place: 'Storied capitals and rail journeys', image: '/assets/images/europe-journeys.jpg', href: '/destinations/europe-journeys' },
        ],
    },
    nature: {
        title: 'The Nature Escaper',
        label: 'Stillness · Scenery · Space',
        description: 'You travel to breathe differently. Open water, green landscapes, unhurried mornings, and places that make the everyday world feel wonderfully far away suit you best.',
        recommendations: [
            { name: 'Palawan', place: 'Lagoons and island horizons', image: '/assets/images/philippine-discovery.jpg', href: '/destinations/philippine-discovery' },
            { name: 'Siargao', place: 'Island calm and coastal life', image: '/assets/images/siargao-island.jpg', href: '/destinations/siargao-island' },
            { name: 'Hokkaido', place: 'Seasonal landscapes and quiet beauty', image: '/assets/images/hokkaido-seasons.jpg', href: '/destinations/hokkaido-seasons' },
        ],
    },
    foodie: {
        title: 'The Foodie Explorer',
        label: 'Flavor · Markets · Culture',
        description: 'For you, a destination is best understood one table at a time. Markets, neighborhood favorites, café discoveries, and meals with a story belong at the heart of the itinerary.',
        recommendations: [
            { name: 'Thailand', place: 'Street food and vibrant flavors', image: '/assets/images/thailand-calling.jpg', href: '/destinations/thailand-calling' },
            { name: 'Japan', place: 'Seasonal dining and craft', image: '/assets/images/japan-tradition.jpg', href: '/destinations/japan-tradition' },
            { name: 'South Korea', place: 'Markets, cafés, and shared tables', image: '/assets/images/south-korea-kwave.jpg', href: '/destinations/south-korea-kwave' },
        ],
    },
    family: {
        title: 'The Family Memory Maker',
        label: 'Togetherness · Ease · Joy',
        description: 'The best trip is one everyone talks about afterward. You value comfortable pacing, something for every age, and simple moments that become favorite family stories.',
        recommendations: [
            { name: 'Bohol', place: 'Nature and easy family discovery', image: '/assets/images/bohol-countryside.jpg', href: '/destinations/bohol-countryside' },
            { name: 'California', place: 'Coastal drives and family favorites', image: '/assets/images/california-coast.jpg', href: '/destinations/california-coast' },
            { name: 'Cebu', place: 'Island adventures for every pace', image: '/assets/images/cebutour.jpg', href: '/destinations/cebu-tour' },
        ],
    },
    romantic: {
        title: 'The Romantic Getaway Traveler',
        label: 'Connection · Beauty · Time',
        description: 'You are looking for a trip that leaves room for two—beautiful settings, thoughtful details, memorable meals, and enough quiet time to enjoy being somewhere together.',
        recommendations: [
            { name: 'Boracay', place: 'Sunsets and effortless island days', image: '/assets/images/boracay-serenity.jpg', href: '/destinations/boracay-serenity' },
            { name: 'Europe', place: 'Timeless streets and intimate escapes', image: '/assets/images/europe-journeys.jpg', href: '/destinations/europe-journeys' },
            { name: 'Jeju', place: 'Coastal scenery and peaceful stays', image: '/assets/images/jeju-island.jpg', href: '/destinations/jeju-island' },
        ],
    },
    adventure: {
        title: 'The Adventure Seeker',
        label: 'Energy · Wonder · Stories',
        description: 'You want to come home with a story. Wild landscapes, active days, unexpected discoveries, and the thrill of trying something new are what make travel feel worthwhile.',
        recommendations: [
            { name: 'Coron', place: 'Lagoons, reefs, and island trails', image: '/assets/images/coron-lagoons.jpg', href: '/destinations/coron-lagoons' },
            { name: 'Siargao', place: 'Surf, islands, and open roads', image: '/assets/images/siargao-island.jpg', href: '/destinations/siargao-island' },
            { name: 'Komodo', place: 'Untamed islands and rare encounters', image: '/assets/images/labuan-bajo-komodo.jpg', href: '/destinations/labuan-bajo-komodo' },
        ],
    },
    entertainment: {
        title: 'The Entertainment Seeker',
        label: 'Energy · Events · Nightlife',
        description: 'You like a destination with something happening. Shows, attractions, music, nightlife, and shared experiences give your itinerary the kind of energy you remember.',
        recommendations: [
            { name: 'United States', place: 'Big sights and bigger experiences', image: '/assets/images/usa-dream-big.jpg', href: '/destinations/usa-dream-big' },
            { name: 'South Korea', place: 'Pop culture and lively districts', image: '/assets/images/south-korea-kwave.jpg', href: '/destinations/south-korea-kwave' },
            { name: 'Japan', place: 'Immersive attractions and city lights', image: '/assets/images/japan-tradition.jpg', href: '/destinations/japan-tradition' },
        ],
    },
}

function getResult(answers: number[]): TravelerKind {
    const scores = Object.fromEntries(Object.keys(results).map((kind) => [kind, 0])) as Record<TravelerKind, number>
    answers.forEach((answerIndex, questionIndex) => {
        const answer = questions[questionIndex]?.answers[answerIndex]
        if (!answer) return
        Object.entries(answer.scores).forEach(([kind, score]) => {
            scores[kind as TravelerKind] += score ?? 0
        })
    })
    return (Object.entries(scores) as [TravelerKind, number][]).sort((a, b) => b[1] - a[1])[0][0]
}

export default function TravelerQuiz() {
    const reduceMotion = useReducedMotion()
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [complete, setComplete] = useState(false)
    const resultKind = useMemo(() => getResult(answers), [answers])
    const result = results[resultKind]
    const selected = answers[step]
    const question = questions[step]
    const QuestionIcon = question.icon

    const choose = (answerIndex: number) => {
        setAnswers((current) => {
            const next = [...current]
            next[step] = answerIndex
            return next
        })
    }
    const next = () => {
        if (selected === undefined) return
        if (step === questions.length - 1) setComplete(true)
        else setStep((current) => current + 1)
    }
    const back = () => {
        if (step > 0) setStep((current) => current - 1)
    }
    const restart = () => {
        setAnswers([])
        setStep(0)
        setComplete(false)
    }

    return (
        <section id="traveler-quiz" className="relative overflow-hidden bg-oat py-24 sm:py-32" aria-labelledby="traveler-quiz-title">
            <div aria-hidden className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(22,55,101,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(22,55,101,0.45)_1px,transparent_1px)] [background-size:64px_64px]" />
            <div aria-hidden className="absolute -right-36 -top-36 h-[30rem] w-[30rem] rounded-full border border-[#9b7512]/10" />
            <div aria-hidden className="absolute -right-20 -top-20 h-[22rem] w-[22rem] rounded-full border border-royal/10" />

            <div className="site-container relative">
                {!complete ? (
                    <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-20">
                        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9b7512]">A quick travel personality quiz</p>
                            <h2 id="traveler-quiz-title" className="mt-4 max-w-xl font-noto-serif text-4xl leading-tight text-royal sm:text-5xl">What kind of traveler are you?</h2>
                            <p className="mt-6 max-w-lg text-sm leading-7 text-ink/60 sm:text-base sm:leading-8">There is no right or wrong way to travel. Follow your instincts and discover the destinations and experiences that may suit you best.</p>

                            <div className="mt-9 flex items-center gap-4">
                                <span className="font-noto-serif text-3xl text-royal">{String(step + 1).padStart(2, '0')}</span>
                                <div className="h-px flex-1 bg-royal/15"><motion.div className="h-px bg-[#9b7512]" animate={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
                                <span className="text-xs text-royal/40">{String(questions.length).padStart(2, '0')}</span>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {questions.map((item, index) => (
                                    <button key={item.eyebrow} type="button" onClick={() => index <= answers.length && setStep(index)} disabled={index > answers.length} aria-label={`Go to question ${index + 1}`} className={`h-2 rounded-full transition-all ${index === step ? 'w-8 bg-[#9b7512]' : answers[index] !== undefined ? 'w-2 bg-royal' : 'w-2 bg-royal/15'}`} />
                                ))}
                            </div>
                        </motion.div>

                        <div className="min-h-[34rem] border-t border-royal/15 pt-7 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div key={step} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9b7512]/25 text-[#9b7512]"><QuestionIcon size={18} strokeWidth={1.6} /></div>
                                    <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#9b7512]">{question.eyebrow}</p>
                                    <h3 className="mt-2 font-noto-serif text-3xl text-ink sm:text-4xl">{question.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-ink/50">{question.prompt}</p>

                                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                        {question.answers.map((answer, index) => {
                                            const active = selected === index
                                            return (
                                                <button key={answer.label} type="button" onClick={() => choose(index)} aria-pressed={active} className={`group flex min-h-14 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-xs leading-5 transition sm:min-h-20 sm:gap-4 sm:rounded-xl sm:px-5 sm:py-4 sm:text-sm sm:leading-6 ${active ? 'border-royal bg-royal text-white shadow-[0_12px_30px_rgba(22,55,101,0.14)]' : 'border-royal/15 bg-white/55 text-royal/75 hover:border-royal/40 hover:bg-white/85'}`}>
                                                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium transition sm:h-7 sm:w-7 sm:text-[10px] ${active ? 'border-gold bg-gold text-royal' : 'border-royal/20 text-royal/45 group-hover:border-royal/50'}`}>{active ? <Check size={12} /> : String.fromCharCode(65 + index)}</span>
                                                    {answer.label}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className="mt-8 flex items-center justify-between">
                                        <button type="button" onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-royal/50 transition hover:text-royal disabled:pointer-events-none disabled:opacity-0"><ArrowLeft size={15} /> Back</button>
                                        <button type="button" onClick={next} disabled={selected === undefined} className="group inline-flex items-center gap-2 rounded-[3px] bg-royal px-6 py-3 text-xs font-medium uppercase tracking-[0.13em] text-cream transition hover:bg-[#9b7512] disabled:cursor-not-allowed disabled:opacity-35">{step === questions.length - 1 ? 'Reveal my style' : 'Next question'}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9b7512]">Your travel personality</p>
                            <h2 id="traveler-quiz-title" className="mt-4 font-noto-serif text-4xl text-royal sm:text-6xl">{result.title}</h2>
                            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-royal/45">{result.label}</p>
                            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ink/60 sm:text-base sm:leading-8">{result.description}</p>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-3">
                            {result.recommendations.map((destination, index) => (
                                <motion.article key={destination.href} initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12, duration: 0.55 }} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-royal">
                                    <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071831]/95 via-[#071831]/25 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                        <p className="text-[9px] uppercase tracking-[0.18em] text-gold">{destination.place}</p>
                                        <div className="mt-1 flex items-end justify-between gap-3"><h3 className="font-noto-serif text-2xl">{destination.name}</h3><ArrowRight size={17} className="mb-1 transition-transform group-hover:translate-x-1" /></div>
                                    </div>
                                    <Link to={destination.href} aria-label={`Explore ${destination.name}`} className="absolute inset-0" />
                                </motion.article>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                            <Link to="/destinations" className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-royal px-7 py-3.5 text-xs font-medium uppercase tracking-[0.13em] text-cream transition hover:bg-[#9b7512] sm:w-auto">Explore destinations <ArrowRight size={15} /></Link>
                            <Link to="/destinations" className="inline-flex w-full items-center justify-center rounded-[3px] border border-royal/25 bg-white/45 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.13em] text-royal transition hover:border-royal hover:bg-white sm:w-auto">View travel packages</Link>
                            <Link to={`/start-your-aventure?traveler=${resultKind}`} className="inline-flex w-full items-center justify-center rounded-[3px] border border-[#9b7512]/35 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.13em] text-[#9b7512] transition hover:bg-[#9b7512] hover:text-white sm:w-auto">Start your AVENture</Link>
                        </div>
                        <button type="button" onClick={restart} className="mx-auto mt-7 flex items-center gap-2 text-xs text-royal/45 transition hover:text-royal"><RotateCcw size={14} /> Retake the quiz</button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
