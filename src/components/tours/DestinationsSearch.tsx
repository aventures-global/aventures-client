import { Search, X } from 'lucide-react'
import { useId } from 'react'
import {
  DURATION_OPTIONS,
  REGION_OPTIONS,
  SORT_OPTIONS,
  hasActiveFilters,
  type TourSearchFilters,
} from '../../lib/tourSearch'

type DestinationsSearchProps = {
  filters: TourSearchFilters
  onChange: (next: TourSearchFilters) => void
  onClear: () => void
  resultCount: number
  totalCount: number
}

const selectClass =
  'w-full cursor-pointer appearance-none rounded-xl border border-white/12 bg-ink-soft/80 bg-[length:12px] bg-[position:right_1rem_center] bg-no-repeat px-4 py-3 pr-10 text-sm text-silver outline-none transition focus:border-gold/45 [background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%23ffd700%27 stroke-opacity=%270.7%27 stroke-width=%271.4%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E")]'

export default function DestinationsSearch({
  filters,
  onChange,
  onClear,
  resultCount,
  totalCount,
}: DestinationsSearchProps) {
  const searchId = useId()
  const regionId = useId()
  const durationId = useId()
  const sortId = useId()
  const active = hasActiveFilters(filters)

  return (
    <div className="space-y-5">
      <div className="relative">
        <label htmlFor={searchId} className="sr-only">
          Search destinations
        </label>
        <Search
          size={18}
          strokeWidth={1.5}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70"
          aria-hidden
        />
        <input
          id={searchId}
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Search by place, trip, or highlight…"
          autoComplete="off"
          className="w-full rounded-xl border border-white/12 bg-ink-soft/80 py-3.5 pr-11 pl-11 text-sm text-silver outline-none transition placeholder:text-muted/70 focus:border-gold/45"
        />
        {filters.query ? (
          <button
            type="button"
            onClick={() => onChange({ ...filters, query: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted transition hover:text-gold"
            aria-label="Clear search"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor={regionId} className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-gold/70">
            Region
          </label>
          <select
            id={regionId}
            value={filters.region}
            onChange={(event) =>
              onChange({
                ...filters,
                region: event.target.value as TourSearchFilters['region'],
              })
            }
            className={selectClass}
          >
            {REGION_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={durationId}
            className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-gold/70"
          >
            Duration
          </label>
          <select
            id={durationId}
            value={filters.duration}
            onChange={(event) =>
              onChange({
                ...filters,
                duration: event.target.value as TourSearchFilters['duration'],
              })
            }
            className={selectClass}
          >
            {DURATION_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={sortId} className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-gold/70">
            Sort
          </label>
          <select
            id={sortId}
            value={filters.sort}
            onChange={(event) =>
              onChange({
                ...filters,
                sort: event.target.value as TourSearchFilters['sort'],
              })
            }
            className={selectClass}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
        <p className="text-sm text-muted" aria-live="polite">
          {resultCount === totalCount
            ? `${totalCount} journey${totalCount === 1 ? '' : 's'}`
            : `${resultCount} of ${totalCount} journeys`}
        </p>
        {active ? (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-gold transition hover:text-ivory"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
