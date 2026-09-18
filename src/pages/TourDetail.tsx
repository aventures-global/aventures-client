import { ArrowLeft, Clock3, MapPin, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSite, getTourBySlug } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import SafeImage from '../components/ui/SafeImage'
import SectionTabs from '../components/tours/SectionTabs'
import type { SiteInfo, Tour } from '../types/content'
import NotFound from './NotFound'

const coverFocus: Record<string, string> = {
  'philippine-discovery': 'object-[center_18%]',
  'cebu-tour': 'object-[center_38%]',
  'boracay-serenity': 'object-[82%_58%]',
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'trips', label: 'Organized Trips' },
  { id: 'flights', label: 'Flights' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'cars', label: 'Cars' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function TourDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [tour, setTour] = useState<Tour | null | undefined>(undefined)
  const [site, setSite] = useState<SiteInfo | null>(null)
  const [tab, setTab] = useState<TabId>('overview')

  useEffect(() => {
    if (!slug) {
      setTour(null)
      return
    }
    setTour(undefined)
    setTab('overview')
    void Promise.all([getTourBySlug(slug), getSite()]).then(([tourData, siteData]) => {
      setTour(tourData)
      setSite(siteData)
    })
  }, [slug])

  if (tour === undefined) {
    return (
      <div className="min-h-svh bg-ink">
        <Header />
        <div className="relative h-[52svh] skeleton-shimmer" />
        <div className="site-container grid gap-10 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="space-y-3">
            <div className="h-4 w-40 skeleton-shimmer rounded" />
            <div className="h-4 w-32 skeleton-shimmer rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-5 w-2/3 skeleton-shimmer rounded" />
            <div className="h-4 w-full skeleton-shimmer rounded" />
            <div className="h-4 w-5/6 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (tour === null) {
    return <NotFound />
  }

  const inquireHref = `/?tour=${encodeURIComponent(tour.title)}#contact`

  return (
    <div className="min-h-svh max-w-full overflow-x-clip bg-ink">
      <Header />
      <div className="relative h-[70svh] overflow-hidden lg:h-[62svh]">
        <div className="absolute inset-0">
          <SafeImage
            src={tour.coverImage}
            alt=""
            className="h-full w-full"
            imgClassName={`object-cover ${coverFocus[tour.id] ?? 'object-center'}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/50" />

        <div className="site-container relative z-10 flex h-full flex-col justify-end">
          <div className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="hidden h-56 lg:block" aria-hidden />
            <div className="pb-8 lg:pb-10">
              <Link
                to="/destinations"
                className="mb-4 inline-flex items-center gap-2 text-sm text-white/90 transition hover:text-gold"
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
                Back to destinations
              </Link>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
              >
                {tour.title}
              </motion.h1>
              <p className="mt-2 text-base text-white/80 sm:text-lg">{tour.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="site-container min-w-0 pb-20">
        <div className="grid min-w-0 items-stretch gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="relative z-10 flex min-w-0 flex-col overflow-hidden rounded-3xl lg:-mt-56 lg:h-[calc(100%+14rem)]">
            <div aria-hidden className="h-44 shrink-0 bg-gold-band lg:h-56" />
            <aside className="flex min-h-[22rem] flex-1 flex-col gap-7 bg-[#242424] px-6 py-8 sm:px-7">
              <dl className="space-y-5">
                <div>
                  <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold/70">
                    <MapPin size={12} strokeWidth={1.6} />
                    Location
                  </dt>
                  <dd className="mt-1.5 text-sm text-silver/90">{tour.location}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold/70">
                    <Clock3 size={12} strokeWidth={1.6} />
                    Duration
                  </dt>
                  <dd className="mt-1.5 text-sm text-silver/90">{tour.duration}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold/70">
                    <Sparkles size={12} strokeWidth={1.6} />
                    Price
                  </dt>
                  <dd className="mt-1.5 text-sm text-silver/90">{tour.startingPrice}</dd>
                </div>
              </dl>

              <a
                href={inquireHref}
                className="btn-gold inline-flex w-fit rounded-xl px-6 py-3 text-sm"
              >
                Inquire
              </a>
            </aside>
          </div>

          <div className="min-w-0 max-w-full pt-8 lg:pt-10">
            <SectionTabs
              label="Destination sections"
              tabs={TABS}
              value={tab}
              onChange={(id) => setTab(id)}
            />

            <div className="pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.28 }}
                  className="min-w-0 max-w-full"
                >
                  {tab === 'overview' && <OverviewPanel tour={tour} onSeeTrips={() => setTab('trips')} />}
                  {tab === 'trips' && <TripsPanel tour={tour} inquireHref={inquireHref} />}
                  {tab === 'flights' && (
                    <ComingSoonPanel
                      title="Flights"
                      body={`Airfare into ${tour.location} is arranged privately for each departure. Share your dates and preferred cabin, and we will source the most comfortable routing.`}
                      inquireHref={inquireHref}
                      extraHref="/flights"
                      extraLabel="Flights desk"
                    />
                  )}
                  {tab === 'hotels' && (
                    <ComingSoonPanel
                      title="Hotels"
                      body="Stays are selected for setting, quiet, and ease of movement — not a public inventory list. Tell us how you like to sleep and we will shortlist the right rooms."
                      inquireHref={inquireHref}
                      extraHref="/hotels"
                      extraLabel="Hotels desk"
                    />
                  )}
                  {tab === 'cars' && (
                    <ComingSoonPanel
                      title="Cars"
                      body="Airport greetings, private cars, and island transfers sit behind this tab. Until live booking opens, we arrange vehicles by inquiry alongside the journey."
                      inquireHref={inquireHref}
                      extraHref="/cars"
                      extraLabel="Cars desk"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {site && <Footer site={site} />}
    </div>
  )
}

function OverviewPanel({
  tour,
  onSeeTrips,
}: {
  tour: Tour
  onSeeTrips: () => void
}) {
  const gallery = tour.gallery.slice(0, 3)

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-gold">{tour.location}</p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-silver/90">
          {tour.shortDescription} This {tour.duration.toLowerCase()} itinerary is paced
          for discovery rather than haste, with a host who stays with you from arrival
          to departure.
        </p>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-gold-gradient">Highlights</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {tour.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-white/8 bg-ink-card/60 px-4 py-3.5 text-sm text-silver/90"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5">
          {gallery.map((src, index) => (
            <SafeImage
              key={`${src}-${index}`}
              src={src}
              alt=""
              className="aspect-[4/3] rounded-xl border border-white/8"
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onSeeTrips}
        className="text-sm text-gold transition hover:text-ivory"
      >
        View organized trips →
      </button>
    </div>
  )
}

function TripsPanel({ tour, inquireHref }: { tour: Tour; inquireHref: string }) {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/8 bg-ink-card/70 p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Signature journey</p>
        <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{tour.title}</h2>
        <p className="mt-2 text-sm text-silver/75">{tour.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs">
          <span className="rounded-full border border-gold/30 px-3.5 py-1.5 text-gold">
            {tour.duration}
          </span>
          <span className="rounded-full border border-white/15 px-3.5 py-1.5 text-white">
            {tour.startingPrice}
          </span>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-silver/85">{tour.shortDescription}</p>
      </div>

      <div>
        <h3 className="font-serif text-xl text-gold-gradient">Itinerary</h3>
        <ol className="mt-5 space-y-5">
          {tour.itinerary.map((day) => (
            <li key={day.day} className="border-l border-gold/30 pl-4">
              <p className="text-xs uppercase tracking-wider text-gold">Day {day.day}</p>
              <p className="mt-1 font-medium text-white">{day.title}</p>
              <p className="mt-1 text-sm text-muted">{day.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Inclusions
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-silver/85">
            {tour.inclusions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Exclusions
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-silver/85">
            {tour.exclusions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-gold/20 p-6 sm:p-7">
        <h3 className="font-serif text-xl text-gold-gradient">Prefer a custom pace?</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          Dates, room categories, and side trips can be reshaped around your group. This
          itinerary is the starting sketch — not a fixed departure.
        </p>
        <a href={inquireHref} className="btn-gold mt-5 inline-flex rounded-xl px-7 py-3 text-sm">
          Inquire about this tour
        </a>
      </div>
    </div>
  )
}

function ComingSoonPanel({
  title,
  body,
  inquireHref,
  extraHref,
  extraLabel,
}: {
  title: string
  body: string
  inquireHref: string
  extraHref: string
  extraLabel: string
}) {
  return (
    <div className="max-w-xl py-6">
      <p className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Coming soon</p>
      <h2 className="mt-3 font-serif text-3xl text-gold-gradient">{title}</h2>
      <span className="mt-5 block h-px w-16 bg-gold/40" />
      <p className="mt-5 text-sm leading-relaxed text-silver/80">{body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={inquireHref} className="btn-gold inline-flex rounded-xl px-6 py-3 text-sm">
          Inquire
        </a>
        <Link
          to={extraHref}
          className="inline-flex rounded-xl border border-white/15 px-6 py-3 text-sm text-silver/80 transition hover:border-gold/40 hover:text-white"
        >
          {extraLabel}
        </Link>
      </div>
    </div>
  )
}
