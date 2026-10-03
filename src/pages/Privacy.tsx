import { Link } from 'react-router-dom'
import LegalPage, { LegalList, LegalSection, legalLinkClass } from '../components/layout/LegalPage'
import { siteInfo } from '../data/site'

const hasAnalytics = Boolean(
    (import.meta.env.VITE_GA_ID as string | undefined)?.trim(),
)

export default function Privacy() {
    return (
        <LegalPage
            path="/privacy"
            title="Privacy Policy"
            subtitle="How we handle the information you share with us."
            lastUpdated="4 October 2026"
            intro={
                <>
                    <p>
                        At {siteInfo.fullName} (&ldquo;AVENTURES&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), good
                        service begins with transparency. Your privacy is an important part of the relationship
                        between you and AVENTURES.
                    </p>
                    <p>
                        This policy explains what this website collects, what we may ask for later if you choose to
                        work with us, and how that information is used and shared.
                    </p>
                </>
            }
        >
            {(site) => {
                const email = site?.email ?? siteInfo.email
                return (
                    <>
                        <LegalSection id="website" label="On this website" title="What the website collects">
                            <LegalList
                                items={[
                                    <>
                                        <strong className="font-medium text-ink">Inquiry and request forms</strong>{' '}
                                        &mdash; Contact, Custom Tour, Flights, Hotels, Cars &amp; Transfers, and Ask
                                        AVENtures. These collect your name, email, optional phone number, and the
                                        details you type in, such as destinations, travel dates, number of travelers,
                                        the visa type you are asking about, and your message.
                                    </>,
                                    <>
                                        <strong className="font-medium text-ink">Accounts</strong> &mdash; if you
                                        choose to create one for the shop, we store your name, email, phone number and
                                        profile picture when provided, and your sign-in details. You can sign up with
                                        email and password or with Google.
                                    </>,
                                    <>
                                        <strong className="font-medium text-ink">Shop cart</strong> &mdash; items you
                                        add to your cart while signed in are saved to your account. If you add an item
                                        before signing in, that one pending action is held in your browser&rsquo;s
                                        session storage until you log in.
                                    </>,
                                    <>
                                        <strong className="font-medium text-ink">Technical data</strong> &mdash;
                                        standard information our hosting providers may log, such as IP address,
                                        browser type, and pages visited.
                                    </>,
                                    ...(hasAnalytics
                                        ? [
                                              <>
                                                  <strong className="font-medium text-ink">Analytics</strong> &mdash;
                                                  aggregated usage data through Google Analytics, such as page views,
                                                  approximate location, and device type.
                                              </>,
                                          ]
                                        : []),
                                ]}
                            />
                            <p>
                                The website forms do not ask for passport details, identification documents, or payment
                                information, and the website does not take payments. Your answers in the{' '}
                                <Link to="/visa-assistance" className={legalLinkClass}>
                                    visa finder
                                </Link>{' '}
                                stay in your browser and are only sent to us if you submit a form.
                            </p>
                        </LegalSection>

                        <LegalSection id="forms" label="Form submissions" title="Where your inquiry goes">
                            <p>
                                Inquiry forms are processed by our own server and delivered by email to our team at{' '}
                                <a href={`mailto:${email}`} className={legalLinkClass}>
                                    {email}
                                </a>
                                . We do not save form submissions in our website database. Your inquiry is kept in our
                                email records so we can respond and follow up.
                            </p>
                        </LegalSection>

                        <LegalSection id="services" label="When you work with us" title="Information a service may require">
                            <p>
                                Depending on the service you choose, our team may later ask for information such as
                                identification details, passport information, application information, and other
                                documents relevant to the service.
                            </p>
                            <p>
                                For visa-related services, the information required may be more extensive because
                                applications can involve personal, family, employment, financial, educational, travel,
                                and immigration-related information. For travel services, information may be needed to
                                arrange flights, accommodations, tours, transportation, activities, or other
                                travel-related services.
                            </p>
                            <p>
                                We recognize that providing this information requires trust. We request it directly as
                                part of the service process, and only what is relevant to the service you have chosen.
                                Please take reasonable care when sending documents, sharing sensitive information, and
                                using online platforms or payment channels.
                            </p>
                        </LegalSection>

                        <LegalSection id="use" label="How we use it" title="How your information is used">
                            <p>We use information for legitimate business and service purposes, including:</p>
                            <LegalList
                                items={[
                                    'Responding to your inquiries and questions',
                                    'Preparing or coordinating the service you requested',
                                    'Arranging flights, hotels, transfers, tours, and itineraries',
                                    'Running your account and shop cart',
                                    'Maintaining records and meeting applicable requirements',
                                    'Keeping the website secure and improving it',
                                ]}
                            />
                            <p>We do not sell your personal information.</p>
                        </LegalSection>

                        <LegalSection id="sharing" label="Sharing" title="Who we share it with">
                            <LegalList
                                items={[
                                    'Service providers that run the website for us, including hosting, email delivery, database, and account sign-in providers.',
                                    'Google, if you choose to sign in with Google.',
                                    ...(hasAnalytics
                                        ? [
                                              <>
                                                  Google Analytics, which may set cookies or similar identifiers. Learn
                                                  more in{' '}
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
                                          ]
                                        : []),
                                    'Government authorities, airlines, hotels, tour operators, payment providers, or other third parties, only when a service you have engaged requires it.',
                                    'Others where required by law.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection id="choices" label="Your choices" title="Accessing or updating your information">
                            <p>
                                You can ask us to access, correct, or delete the personal information we hold about
                                you, including your account. Contact us using the details below and we will respond
                                within a reasonable time, subject to records we are required to keep.
                            </p>
                        </LegalSection>

                        <LegalSection id="contact" label="Contact" title="Questions about this policy">
                            <p>
                                Email{' '}
                                <a href={`mailto:${email}`} className={legalLinkClass}>
                                    {email}
                                </a>
                                , call{' '}
                                <a href={`tel:${siteInfo.phone}`} className={legalLinkClass}>
                                    {siteInfo.phoneDisplay}
                                </a>
                                , or visit our office at {siteInfo.address}. For how our services, fees, and refunds
                                work, see our{' '}
                                <Link to="/terms" className={legalLinkClass}>
                                    Terms &amp; Conditions
                                </Link>
                                .
                            </p>
                        </LegalSection>
                    </>
                )
            }}
        </LegalPage>
    )
}
