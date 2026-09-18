import PageShell from '../components/layout/PageShell'

const faqs = [
  {
    question: 'How do I start planning a trip?',
    answer:
      'Send a note through the contact form, email, or phone. Tell us where you want to go, when, and who is traveling — we will shape the itinerary from there.',
  },
  {
    question: 'Do you book flights and hotels as well as tours?',
    answer:
      'Yes. Airfare, stays, transfers, and the days in between are arranged as one trip, not as separate bookings you have to piece together.',
  },
  {
    question: 'Can you help with visas?',
    answer:
      'We provide document guidance and application support so borders do not slow the plan. Share your passport details and destination when you inquire.',
  },
  {
    question: 'Where is AVENtures based?',
    answer:
      'We plan from Sacramento, California, for journeys across the Philippines, Asia, the Middle East, Europe, and beyond.',
  },
  {
    question: 'Are your trips only group tours?',
    answer:
      'No. Signature Experiences are ready-made journeys, and we also build private itineraries around your dates, pace, and company.',
  },
]

export default function Faq() {
  return (
    <PageShell title="FAQs" eyebrow="Support">
      <dl className="max-w-2xl space-y-8">
        {faqs.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl text-white">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-silver/80">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  )
}
