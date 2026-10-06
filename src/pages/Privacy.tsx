import LegalPage, { LegalList, legalLinkClass } from '../components/layout/LegalPage'
import { useSitePage } from '../hooks/useSitePage'

const hasAnalytics = Boolean(
    (import.meta.env.VITE_GA_ID as string | undefined)?.trim(),
)

const analyticsExtras = hasAnalytics
    ? {
          website: (
              <LegalList
                  items={[
                      <>
                          <strong className="font-medium text-ink">Analytics</strong> &mdash; aggregated usage data
                          through Google Analytics, such as page views, approximate location, and device type.
                      </>,
                  ]}
              />
          ),
          sharing: (
              <LegalList
                  items={[
                      <>
                          Google Analytics, which may set cookies or similar identifiers. Learn more in{' '}
                          <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              rel="noreferrer"
                              className={legalLinkClass}
                          >
                              Google&rsquo;s privacy policy
                          </a>
                          .
                      </>,
                  ]}
              />
          ),
      }
    : undefined

export default function Privacy() {
    const content = useSitePage('privacy')
    return <LegalPage path="/privacy" title="Privacy Policy" content={content} sectionExtras={analyticsExtras} />
}
