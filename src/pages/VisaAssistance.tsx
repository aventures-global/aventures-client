import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const support = [
    'A clear checklist based on your destination and travel purpose',
    'Guidance while organizing application documents',
    'A careful review before your application is submitted',
    'Travel planning support alongside your visa preparation',
]

export default function VisaAssistance() {
    return (
        <PageShell
            title="Visa Assistance"
            eyebrow="Travel with clarity"
            description="Practical visa document guidance and application preparation support from AVENtures Global."
        >
            <div className="grid max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <p className="max-w-2xl text-base leading-8 text-silver/80">
                        Visa requirements can feel complicated. Our team helps you understand the process, prepare the right documents, and move forward with greater confidence.
                    </p>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
                        Final requirements and approval decisions remain with the relevant embassy or consulate. AVENTURES provides preparation guidance and does not guarantee visa approval.
                    </p>
                    <Link
                        to="/#contact"
                        className="mt-8 inline-flex items-center gap-3 rounded-[3px] border-2 border-gold-deep bg-gold-deep px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:brightness-110"
                    >
                        Start Your Inquiry
                        <ArrowRight size={17} />
                    </Link>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                    <h2 className="font-noto-serif text-2xl text-white">How we can help</h2>
                    <ul className="mt-6 space-y-5">
                        {support.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-silver/80">
                                <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageShell>
    )
}
