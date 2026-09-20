import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { aboutPage } from '../data/about'

export default function About() {
  return (
    <PageShell title="About us" eyebrow={aboutPage.eyebrow}>
      <div className="max-w-2xl space-y-12 text-sm leading-relaxed text-silver/85 sm:text-base">
        <section className="space-y-4">
          <p>{aboutPage.intro}</p>
          <p>{aboutPage.story}</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            {aboutPage.specialtiesIntro}
          </h2>
          <ul className="flex flex-wrap gap-x-1 gap-y-2">
            {aboutPage.specialties.map((item, index) => (
              <li key={item.id} className="flex items-center gap-1 text-silver/90">
                {index > 0 && (
                  <span aria-hidden className="mr-1 text-white/25">
                    ·
                  </span>
                )}
                {item.href ? (
                  <Link to={item.href} className="text-gold transition hover:text-ivory">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            {aboutPage.servicesIntro}
          </h2>
          <ul className="space-y-5">
            {aboutPage.services.map((service) => (
              <li key={service.id}>
                <h3 className="font-serif text-base text-gold sm:text-lg">{service.title}</h3>
                <p className="mt-1.5 text-silver/80">{service.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8">
          <h2 className="font-serif text-xl text-gold-gradient sm:text-2xl">
            {aboutPage.ctaTitle}
          </h2>
          <p className="mt-3 max-w-lg text-silver/80">{aboutPage.ctaBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/#contact"
              className="btn-gold inline-flex justify-center rounded-xl px-7 py-3 text-base"
            >
              {aboutPage.ctaPrimary}
            </Link>
            <Link
              to="/destinations"
              className="inline-flex justify-center rounded-xl border border-white/20 px-7 py-3 font-serif text-base text-white transition-colors hover:border-gold/50 hover:text-gold"
            >
              {aboutPage.ctaSecondary}
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
