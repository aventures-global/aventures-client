import { Search, X } from 'lucide-react'
import { useId } from 'react'
import { REGION_OPTIONS, type TourRegion } from '../../lib/tourSearch'

type DestinationsSearchProps = {
    query: string
    onQueryChange: (query: string) => void
    selectedRegions: TourRegion[]
    onRegionsChange: (regions: TourRegion[]) => void
}

export default function DestinationsSearch({ query, onQueryChange, selectedRegions, onRegionsChange }: DestinationsSearchProps) {
    const searchId = useId()
    const toggleRegion = (region: TourRegion) => {
        onRegionsChange(
            selectedRegions.includes(region)
                ? selectedRegions.filter((item) => item !== region)
                : [...selectedRegions, region],
        )
    }

    return (
        <div>
            <div className="relative">
                <label htmlFor={searchId} className="sr-only">Search destinations</label>
                <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-royal/70" aria-hidden />
                <input id={searchId} type="text" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by place, trip, or highlight…" autoComplete="off" className="w-full rounded-xl border border-royal/15 bg-white/80 py-3.5 pr-11 pl-11 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-royal/50 focus:shadow-[0_0_0_3px_rgba(22,55,101,0.08)]" />
                {query && <button type="button" onClick={() => onQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-ink/45 transition hover:text-royal" aria-label="Clear search"><X size={16} strokeWidth={1.5} /></button>}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Filter by region">
                {REGION_OPTIONS.filter((option) => option.id !== 'all').map((option) => {
                    const region = option.id as TourRegion
                    const selected = selectedRegions.includes(region)
                    return (
                        <button key={option.id} type="button" aria-pressed={selected} onClick={() => toggleRegion(region)} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition ${selected ? 'border-royal bg-royal text-white shadow-sm' : 'border-royal/15 bg-white/55 text-royal/70 hover:border-royal/40 hover:text-royal'}`}>
                            {option.label}
                            {selected && <X size={12} strokeWidth={1.8} aria-hidden />}
                        </button>
                    )
                })}
                {selectedRegions.length > 1 && <button type="button" onClick={() => onRegionsChange([])} className="ml-1 inline-flex min-h-9 items-center gap-1 text-xs font-medium text-royal/55 transition hover:text-royal"><X size={13} />Clear regions</button>}
            </div>
        </div>
    )
}
