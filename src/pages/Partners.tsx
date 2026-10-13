import { useEffect, useState } from 'react'
import { getPartners } from '../api'
import PageShell from '../components/layout/PageShell'
import PartnerCard from '../components/partners/PartnerCard'
import type { Partner } from '../types/content'

export default function Partners() {
    /** `null` while loading. */
    const [partners, setPartners] = useState<Partner[] | null>(null)

    useEffect(() => {
        getPartners()
            .then(setPartners)
            .catch(() => setPartners([]))
    }, [])

    return (
        <PageShell title="Our Partners" eyebrow="Trusted Partners">
            <p className="max-w-2xl text-base leading-8 text-ink/65 sm:text-lg">
                AVENTURES works alongside established firms so every visa, transition, and journey is handled
                with care.
            </p>

            <div className="mt-12">
                {partners === null ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="skeleton-shimmer h-72 rounded-2xl" />
                        ))}
                    </div>
                ) : partners.length === 0 ? (
                    <p className="text-sm text-ink/55">No partners to show yet.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {partners.map((partner) => (
                            <PartnerCard key={partner.id} partner={partner} />
                        ))}
                    </div>
                )}
            </div>
        </PageShell>
    )
}
