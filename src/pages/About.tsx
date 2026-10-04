import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Compass, Eye, Heart, Mail, MapPin, Phone, Plane, ShieldCheck } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import JourneyCta from '../components/ui/JourneyCta'
import { aboutTabs, founderStory, originStory, transparency, whyAventures, type AboutTabId } from '../data/about'

function tabFromHash(): AboutTabId {
    const hash = window.location.hash.slice(1) as AboutTabId
    return aboutTabs.some((tab) => tab.id === hash) ? hash : 'why-us'
}

export default function About() {
    const [activeTab, setActiveTab] = useState<AboutTabId>(tabFromHash)

    useEffect(() => {
        const syncTab = () => setActiveTab(tabFromHash())
        window.addEventListener('hashchange', syncTab)
        return () => window.removeEventListener('hashchange', syncTab)
    }, [])

    const selectTab = (id: AboutTabId) => {
        setActiveTab(id)
        window.history.replaceState(null, '', `${window.location.pathname}#${id}`)
    }

    return (
        <PageShell appearance="paper" title="About AVENTURES" eyebrow="Our story, our purpose" description="Meet AVENTURES, discover our story, and learn how we approach travel and visa assistance with care and transparency.">
            <p className="mb-10 max-w-2xl text-base leading-8 text-ink/65 sm:text-lg">
                More than a travel agency, we are people who understand what it means to plan, prepare, hope, and finally go.
            </p>

            <nav aria-label="About AVENTURES sections" className="sticky top-[var(--header-height,4rem)] z-20 mb-4 bg-oat/95 pt-2 backdrop-blur-xl sm:mb-8">
                <div className="grid grid-cols-2 border-b border-royal/20 sm:grid-cols-4">
                    {aboutTabs.map((tab) => (
                        <button key={tab.id} type="button" aria-pressed={activeTab === tab.id} onClick={() => selectTab(tab.id)} className={`relative -mb-px flex min-h-14 items-center justify-center border-b-2 px-3 text-center text-[11px] font-medium uppercase tracking-[0.1em] transition-colors sm:text-xs ${activeTab === tab.id ? 'border-gold-deep text-royal' : 'border-transparent text-royal/50 hover:text-royal'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="animate-[fade-in_300ms_ease-out]">
                {activeTab === 'why-us' && <WhyUs />}
                {activeTab === 'behind-the-dream' && <BehindTheDream />}
                {activeTab === 'origin' && <Origin />}
                {activeTab === 'transparency' && <Transparency />}
            </div>

            <div className="relative left-1/2 -mb-24 w-screen -translate-x-1/2"><JourneyCta /></div>
        </PageShell>
    )
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
    return (
        <header className="grid gap-6 border-b border-royal/15 pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-14">
            <div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">{eyebrow}</p><h2 className="mt-4 max-w-xl font-noto-serif text-3xl leading-tight text-royal sm:text-5xl">{title}</h2></div>
            <div className="max-w-2xl text-base leading-8 text-ink/65 sm:text-lg">{children}</div>
        </header>
    )
}

function WhyUs() {
    const icons = [Plane, ShieldCheck, Compass, ArrowRight, Heart]
    return (
        <section id="why-us" className="pt-16 sm:pt-24">
            <header className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">{whyAventures.eyebrow}</p>
                <h2 className="mt-4 font-noto-serif text-3xl leading-tight text-royal sm:text-5xl">{whyAventures.title}</h2>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-ink/65 sm:text-lg">{whyAventures.intro}</p>
            </header>
            <div className="mt-20 sm:mt-28">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-deep">How we help</p>
                <h3 className="mt-3 font-noto-serif text-3xl text-royal">Support for every step of the journey</h3>
            </div>
            <div className="mt-7 border-y border-royal/15 px-1 sm:px-0 lg:grid lg:grid-cols-5">
                {whyAventures.pillars.map((pillar, index) => {
                    const Icon = icons[index]
                    return <article key={pillar.title} className={`py-7 sm:py-8 lg:px-6 ${index > 0 ? 'border-t border-royal/10 lg:border-l lg:border-t-0' : ''}`}><Icon className="text-gold-deep" size={21} strokeWidth={1.5} /><h3 className="mt-5 font-noto-serif text-xl text-royal">{pillar.title}</h3><p className="mt-2 text-sm leading-7 text-ink/60">{pillar.description}</p></article>
                })}
            </div>
            <div className="border-b border-royal/15 py-12 sm:py-14">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-deep">The AVENTURES standard</p>
                <p className="mt-3 font-noto-serif text-2xl text-royal">What you can expect</p>
                <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">{whyAventures.promise.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-ink/70"><span className="text-gold-deep" aria-hidden>◆</span>{item}</li>)}</ul>
            </div>
            <div className="py-14 text-center sm:py-18">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-deep">Why we do this</p>
                <blockquote className="mx-auto mt-4 max-w-3xl font-noto-serif text-2xl leading-relaxed text-royal sm:text-3xl">“Your plans matter. Your journey matters. Your AVENture matters.”</blockquote>
            </div>
        </section>
    )
}

function BehindTheDream() {
    return (
        <section id="behind-the-dream" className="py-16 sm:py-24">
            <SectionIntro eyebrow={founderStory.eyebrow} title={founderStory.title}><p>{founderStory.intro}</p></SectionIntro>
            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-16">
                <figure className="border border-royal/10 bg-white p-3 shadow-[0_18px_45px_rgba(22,55,101,0.14)] sm:p-4">
                    <div className="overflow-hidden bg-royal">
                        <img src="/assets/images/mskayce.png" alt="Mary Kathleen Kayce Avendula, CEO of AVENTURES" className="aspect-[4/3] w-full object-cover object-center" />
                    </div>
                    <figcaption className="px-2 pb-5 pt-5 sm:px-3 sm:pb-6 sm:pt-6">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold-deep">The woman behind AVENTURES</p>
                        <h3 className="mt-2 font-noto-serif text-2xl font-semibold text-royal">{founderStory.name}</h3>
                        <p className="mt-1 text-sm text-ink/55">{founderStory.role}</p>
                    </figcaption>
                </figure>
                <div className="space-y-10 lg:flex lg:h-full lg:flex-col lg:justify-center lg:gap-10 lg:space-y-0">
                        <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">From dreaming to living the dream</p><p className="mt-4 leading-8 text-ink/65">{founderStory.story}</p></div>
                        <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">Why her story matters</p><p className="mt-4 leading-8 text-ink/65">{founderStory.whyItMatters}</p></div>
                </div>
            </div>
            <blockquote className="mx-auto mt-16 max-w-4xl text-center font-noto-serif text-2xl font-semibold italic leading-relaxed text-royal sm:text-3xl">“{founderStory.quote}”</blockquote>
        </section>
    )
}

function Origin() {
    return (
        <section id="origin" className="py-16 sm:py-24">
            <SectionIntro eyebrow={originStory.eyebrow} title={originStory.title}><p>{originStory.intro}</p><p className="mt-5">{originStory.story}</p></SectionIntro>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{originStory.values.map((value, index) => <article key={value.title} className="rounded-2xl border border-royal/10 bg-white p-5 shadow-sm"><span className="font-noto-serif text-2xl text-gold-deep/60">0{index + 1}</span><h3 className="mt-8 font-noto-serif text-xl text-royal">{value.title}</h3><p className="mt-2 text-sm leading-6 text-ink/55">{value.description}</p></article>)}</div>
            <div className="mt-10 grid overflow-hidden rounded-3xl border border-royal/10 shadow-sm md:grid-cols-2">
                <article className="bg-royal p-7 sm:p-10"><Compass className="text-gold" strokeWidth={1.4} /><p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Our mission</p><p className="mt-4 font-noto-serif text-xl leading-8 text-cream">{originStory.mission}</p></article>
                <article className="bg-cream p-7 sm:p-10"><Eye className="text-royal" strokeWidth={1.4} /><p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-royal/60">Our vision</p><p className="mt-4 font-noto-serif text-xl leading-8 text-royal">{originStory.vision}</p></article>
            </div>
        </section>
    )
}

function Transparency() {
    return (
        <section id="transparency" className="py-16 sm:py-24">
            <SectionIntro eyebrow={transparency.eyebrow} title={transparency.title}><p>{transparency.intro}</p><p className="mt-5 font-serif text-xl text-gold">{transparency.principle}</p></SectionIntro>
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-8">
                    <article className="rounded-2xl border border-royal/10 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">Office & contact</p><address className="mt-6 space-y-4 not-italic text-sm text-ink/70"><p className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-gold-deep" size={17} />{transparency.contact.address}</p><a className="flex items-center gap-3 transition hover:text-royal" href={`mailto:${transparency.contact.email}`}><Mail className="shrink-0 text-gold-deep" size={17} />{transparency.contact.email}</a><a className="flex items-center gap-3 transition hover:text-royal" href="tel:+19162687731"><Phone className="shrink-0 text-gold-deep" size={17} />{transparency.contact.phone}</a></address></article>
                    <article className="rounded-2xl bg-royal p-6 sm:p-8"><ShieldCheck className="text-gold" /><h3 className="mt-5 font-noto-serif text-2xl text-cream">An important promise</h3><p className="mt-4 text-sm leading-7 text-cream/70">We help you prepare. We do not make the decision for you.</p></article>
                </div>
                <div className="space-y-8">
                    <article><h3 className="font-noto-serif text-2xl text-royal">U.S. visa assistance scope</h3><div className="mt-5 flex flex-wrap gap-2">{transparency.visas.map((visa) => <span key={visa} className="rounded-full border border-royal/10 bg-white px-3.5 py-2 text-xs text-ink/65 shadow-sm">{visa}</span>)}</div></article>
                    <article><h3 className="font-noto-serif text-2xl text-royal">What we can help with</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{transparency.support.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-ink/65"><Check className="mt-1 shrink-0 text-gold-deep" size={14} />{item}</li>)}</ul></article>
                    <article className="border-l-2 border-gold-deep/60 pl-5"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">Visa disclaimer</p><p className="mt-3 text-sm leading-7 text-ink/55">{transparency.disclaimer}</p></article>
                </div>
            </div>
            <p className="mt-10 border-t border-royal/10 pt-6 text-xs leading-6 text-ink/45">Information on this website is for general informational purposes and does not replace official U.S. government guidance or individualized legal advice. Always verify current information through official government sources.</p>
        </section>
    )
}
