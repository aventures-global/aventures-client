import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { HomePageContent } from '../../types/sitePages'

// import { ArrowLeft } from 'lucide-react'
// import { useRef, type ReactNode } from 'react'

/*
const team = [
    { name: 'Avery Reyes', role: 'Travel Designer', initials: 'AR' },
    { name: 'Marco Santos', role: 'Journey Specialist', initials: 'MS' },
    { name: 'Nia Bennett', role: 'Client Experience', initials: 'NB' },
]
*/

export default function About({ content }: { content: HomePageContent['story'] }) {
    /*
    const teamRef = useRef<HTMLDivElement>(null)
    const moveTeam = (direction: -1 | 1) => {
        teamRef.current?.scrollBy({
            left: direction * Math.min(teamRef.current.clientWidth * 0.82, 420),
            behavior: 'smooth',
        })
    }
    */

    return (
        <section id="about" className="bg-white py-24 sm:py-32">
            <div className="site-container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">{content.eyebrow}</p>
                    <h2 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">
                        {content.title}
                    </h2>
                    <div className="mx-auto mt-6 h-px w-16 bg-gold-deep" />
                    <p className="mt-7 text-base leading-8 text-ink/70 sm:text-lg">
                        {content.body}
                    </p>
                    <Link
                        to="/about"
                        className="mt-8 inline-flex items-center gap-3 border-b border-gold-deep pb-1.5 text-sm font-medium uppercase tracking-[0.18em] text-royal transition-colors hover:text-gold-deep"
                    >
                        {content.linkLabel}
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>

            {/*
            <div className="mt-24 bg-royal py-16 sm:mt-28 sm:py-20">
                <div className="site-container">
                    <div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">People behind every plan</p>
                            <h2 className="mt-3 font-noto-serif text-4xl text-cream sm:text-5xl">Meet the Team</h2>
                        </div>
                    </div>

                    <div className="relative mt-10 sm:px-16">
                        <TeamArrow label="Previous team members" onClick={() => moveTeam(-1)} className="left-0">
                            <ArrowLeft size={20} />
                        </TeamArrow>
                        <motion.div
                            ref={teamRef}
                            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.13 } },
                            }}
                        >
                            {team.map((member) => (
                                <motion.article
                                    key={member.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 38 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                                        },
                                    }}
                                    className="group w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 bg-[#12305b] sm:w-80"
                                >
                                    <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#0d3473]">
                                    <div className="absolute inset-5 rounded-xl border border-cream/10" />
                                    <span className="font-noto-serif text-6xl text-cream/25 transition duration-500 group-hover:scale-110 group-hover:text-gold/70">
                                        {member.initials}
                                    </span>
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071b3c]/95 via-[#0b2854]/75 to-transparent px-5 pb-5 pt-24">
                                            <h3 className="font-noto-serif text-xl text-cream">{member.name}</h3>
                                            <div className="mt-1 flex items-center justify-between gap-4">
                                                <p className="text-sm text-cream/65">{member.role}</p>
                                                <span className="text-[10px] uppercase tracking-[0.16em] text-gold">AVENTURES</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                        <TeamArrow label="Next team members" onClick={() => moveTeam(1)} className="right-0">
                            <ArrowRight size={20} />
                        </TeamArrow>
                    </div>
                </div>
            </div>
            */}
        </section>
    )
}

/*
function TeamArrow({
    children,
    label,
    onClick,
    className = '',
}: {
    children: ReactNode
    label: string
    onClick: () => void
    className?: string
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/35 bg-royal/75 text-cream shadow-lg backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-royal sm:flex ${className}`}
        >
            {children}
        </button>
    )
}
*/
