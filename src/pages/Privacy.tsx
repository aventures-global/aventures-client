import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { siteInfo } from '../data/site'

const hasAnalytics = Boolean(
  (import.meta.env.VITE_GA_ID as string | undefined)?.trim(),
)

export default function Privacy() {
  return (
    <PageShell title="Privacy Policy" eyebrow="Legal">
      <div className="prose-invert max-w-2xl space-y-8 text-sm leading-relaxed text-silver/85">
        <p>
          AVENtures Global Resources and Travel Agency (“we”, “us”) respects your privacy.
          This page explains what we collect when you use{' '}
          <Link to="/" className="text-gold hover:text-ivory">
            this website
          </Link>{' '}
          and how we use it.
        </p>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">What we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white">Contact and service requests</strong> — name,
              email, optional phone, and the details you enter on our inquiry and request
              forms (destinations, travel dates, party size, and free-text notes).
            </li>
            <li>
              <strong className="text-white">Technical data</strong> — standard server and
              browser information that hosting providers may log (IP address, browser type,
              pages visited).
            </li>
            {hasAnalytics && (
              <li>
                <strong className="text-white">Analytics</strong> — aggregated usage data via
                Google Analytics (page views, approximate location, device type) when
                analytics is enabled on this site.
              </li>
            )}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">How we use it</h2>
          <p>
            We use your information to respond to travel inquiries, arrange flights, hotels,
            transfers, and itineraries, and to improve the website. We do not sell your
            personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Form submissions</h2>
          <p>
            Inquiry forms on this site are delivered through Formspree, a third-party form
            service. Submissions are sent to our team at{' '}
            <a
              href={`mailto:${siteInfo.email}`}
              className="text-gold hover:text-ivory"
            >
              {siteInfo.email}
            </a>
            . See{' '}
            <a
              href="https://formspree.io/legal/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:text-ivory"
            >
              Formspree’s privacy policy
            </a>{' '}
            for how they process form data.
          </p>
        </section>

        {hasAnalytics && (
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white">Analytics</h2>
            <p>
              We use Google Analytics to understand how visitors use the site. Google may
              set cookies or similar identifiers. You can learn more in{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-ivory"
              >
                Google’s privacy policy
              </a>
              .
            </p>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-white">Contact</h2>
          <p>
            Questions about this policy or your data:{' '}
            <a
              href={`mailto:${siteInfo.email}`}
              className="text-gold hover:text-ivory"
            >
              {siteInfo.email}
            </a>
            , or call {siteInfo.phoneDisplay}. Our office is at {siteInfo.address}.
          </p>
        </section>

        <p className="text-xs text-muted">Last updated: 20 September 2026</p>
      </div>
    </PageShell>
  )
}
