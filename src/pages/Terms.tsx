import { Link } from 'react-router-dom'
import LegalPage, { LegalList, LegalSection, legalLinkClass } from '../components/layout/LegalPage'
import { siteInfo } from '../data/site'

const beforePayment = [
    { term: 'Service scope', detail: 'What AVENTURES will and will not provide as part of the service.' },
    {
        term: 'Fees and charges',
        detail: 'What you are paying for and, where applicable, which fees are paid to third parties or government agencies.',
    },
    { term: 'Terms & Conditions', detail: 'The rules and responsibilities that apply to the specific service.' },
    {
        term: 'Refund and cancellation policy',
        detail: 'Whether a payment may be refundable, non-refundable, subject to deductions, or affected by cancellation deadlines.',
    },
    { term: 'Service limitations', detail: "The matters that are outside AVENTURES' control or authority." },
]

export default function Terms() {
    return (
        <LegalPage
            path="/terms"
            title="Terms & Conditions"
            subtitle="Understanding your rights, responsibilities, and what to expect."
            lastUpdated="4 October 2026"
            intro={
                <p>
                    Every service comes with expectations and responsibilities. This page gives a general overview of
                    how {siteInfo.fullName} approaches service terms, refunds, cancellations, service limitations, and
                    client responsibilities. Before you proceed with a service or make a payment, you should have the
                    opportunity to understand the conditions that apply to your particular request.
                </p>
            }
        >
            {(site) => {
                const email = site?.email ?? siteInfo.email
                return (
                    <>
                        <LegalSection id="website" label="Using this website" title="How our services start">
                            <p>
                                This website lets you browse destinations, visa information, and our shop, and send us
                                inquiries. Flights, hotels, cars and transfers, custom tours, and visa assistance are
                                arranged by request: submitting a form starts a conversation with our team. It is not a
                                booking, a reservation, or a commitment to pay.
                            </p>
                            <p>
                                The website does not take payments. Prices shown online, including &ldquo;from&rdquo;
                                prices, are starting estimates. Your final quotation depends on travel dates, number of
                                travelers, availability, and your requested customizations, and is confirmed with you
                                directly. Shop checkout is not yet available.
                            </p>
                            <p>
                                Visa information on this site is general guidance only and is not legal advice.
                            </p>
                        </LegalSection>

                        <LegalSection id="service-terms" label="Service-specific terms" title="Different services, different terms">
                            <p>
                                Our services differ, so there is no single set of terms that applies identically to
                                every client or every service. A visa assistance service may have different conditions
                                from a tour package. A customized itinerary may have different booking and cancellation
                                conditions from an airfare arrangement. A third-party hotel, airline, tour operator, or
                                other provider may also have its own terms that apply to a booking.
                            </p>
                            <p>
                                Visa assistance may involve application preparation, document coordination,
                                appointment-related assistance, and other services within the agreed scope. Travel
                                arrangements may involve airlines, hotels, transportation providers, tour operators,
                                activity providers, or other third parties whose schedules, availability, and policies
                                can affect the service.
                            </p>
                            <p>
                                The terms that apply to your service are sent to you by our team as part of the service
                                process, before you pay.
                            </p>
                        </LegalSection>

                        <LegalSection id="before-payment" label="Before you pay" title="Know what you are agreeing to">
                            <p>Before payment, we will make the following available to you for your service:</p>
                            <dl className="space-y-4">
                                {beforePayment.map((item) => (
                                    <div key={item.term} className="border-l-2 border-gold-deep/60 pl-4">
                                        <dt className="font-medium text-ink">{item.term}</dt>
                                        <dd className="mt-1">{item.detail}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p>
                                If you do not understand a condition, ask before making your payment. We would rather
                                you ask questions first than discover later that an important condition was
                                misunderstood.
                            </p>
                        </LegalSection>

                        <LegalSection id="refunds" label="Refunds & cancellations" title="Conditions vary by service">
                            <p>
                                Some services may have cancellation periods, administrative fees, non-refundable
                                components, supplier-imposed penalties, or other conditions. Certain payments may be
                                connected to third-party providers whose own refund and cancellation rules apply.
                            </p>
                            <p>
                                For visa-related services, fees may cover professional assistance, preparation,
                                administrative work, or other services that may already have been performed. Government
                                fees and third-party fees are subject to their own rules. For travel services, the
                                airline, hotel, tour operator, transportation provider, or other supplier may have
                                separate cancellation and refund policies.
                            </p>
                            <p>
                                AVENTURES does not have one universal refund policy. The refund and cancellation terms
                                for your specific service are disclosed before payment.
                            </p>
                        </LegalSection>

                        <LegalSection id="limitations" label="Service limitations" title="What we can and cannot control">
                            <p>
                                AVENTURES provides travel planning, booking assistance, visa assistance, document
                                guidance, coordination, and other services within the agreed scope of each service.
                                Some decisions and outcomes remain outside our authority.
                            </p>
                            <p>
                                For visa services, the relevant embassy, consulate, immigration authority, or government
                                agency makes the decision. AVENTURES cannot guarantee:
                            </p>
                            <LegalList
                                items={[
                                    'Visa approval or issuance',
                                    'Entry into a country or a particular immigration outcome',
                                    'A specific government processing time or appointment availability',
                                    'Third-party availability, schedules, or outcomes',
                                ]}
                            />
                            <p>
                                Government policies, airline changes, weather, emergencies, destination restrictions,
                                processing delays, supplier decisions, or other events may also affect a journey.
                            </p>
                        </LegalSection>

                        <LegalSection id="responsibilities" label="Your responsibilities" title="Transparency works both ways">
                            <p>As a client, you are responsible for:</p>
                            <LegalList
                                items={[
                                    'Providing information that is accurate, complete, and truthful',
                                    'Reviewing information and documents prepared for you, and telling us if something is incorrect or changes',
                                    'Meeting applicable deadlines and providing requested documents',
                                    'Reading the terms provided to you and asking questions when something is unclear',
                                    'For visa services, the truthfulness and accuracy of the information in your application',
                                    'For travel services, reviewing your itinerary, travel documents, passport validity, and entry requirements',
                                ]}
                            />
                            <p className="font-noto-serif text-lg italic text-royal">
                                Good preparation is a shared responsibility.
                            </p>
                        </LegalSection>

                        <LegalSection id="notice" label="Important notice" title="This page and your service agreement">
                            <p>
                                This page provides general information. It does not replace the specific terms,
                                service agreement, refund policy, cancellation policy, or other documents provided to
                                you for a particular service. Those documents govern the applicable transaction or
                                service relationship and should be reviewed carefully before payment.
                            </p>
                            <p>
                                For how we handle personal information, see our{' '}
                                <Link to="/privacy" className={legalLinkClass}>
                                    Privacy Policy
                                </Link>
                                . Questions about these terms:{' '}
                                <a href={`mailto:${email}`} className={legalLinkClass}>
                                    {email}
                                </a>{' '}
                                or{' '}
                                <a href={`tel:${siteInfo.phone}`} className={legalLinkClass}>
                                    {siteInfo.phoneDisplay}
                                </a>
                                .
                            </p>
                        </LegalSection>
                    </>
                )
            }}
        </LegalPage>
    )
}
