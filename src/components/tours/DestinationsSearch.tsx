import { Check, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { useId, useState } from 'react'
import { REGION_OPTIONS, type TourRegion } from '../../lib/tourSearch'

type DestinationsSearchProps = {
    query: string
    onQueryChange: (query: string) => void
    selectedRegions: TourRegion[]
    onRegionsChange: (regions: TourRegion[]) => void
}

export default function DestinationsSearch({ query, onQueryChange, selectedRegions, onRegionsChange }: DestinationsSearchProps) {
    const searchId = useId()
    const regionsId = useId()
    const [regionsOpen, setRegionsOpen] = useState(false)
    const toggleRegion = (region: TourRegion) => {
        onRegionsChange(
            selectedRegions.includes(region)
                ? selectedRegions.filter((item) => item !== region)
                : [...selectedRegions, region],
        )
    }

    return (
        <div className="relative">
            <div className="flex flex-col items-stretch gap-2.5">
            <div className="relative min-w-0 flex-1">
                <label htmlFor={searchId} className="sr-only">Search destinations</label>
                <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-royal/70" aria-hidden />
                <input id={searchId} type="text" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by place, trip, or highlight…" autoComplete="off" className="w-full rounded-xl border border-royal/15 bg-white/80 py-3.5 pr-11 pl-11 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-royal/50 focus:shadow-[0_0_0_3px_rgba(22,55,101,0.08)]" />
                {query && <button type="button" onClick={() => onQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-ink/45 transition hover:text-royal" aria-label="Clear search"><X size={16} strokeWidth={1.5} /></button>}
            </div>

                <div className="relative w-full shrink-0 sm:hidden">
                    <button
                        type="button"
                        aria-expanded={regionsOpen}
                        aria-controls={regionsId}
                        onClick={() => setRegionsOpen(true)}
                        className={`flex h-[46px] w-full items-center justify-between gap-3 rounded-xl border bg-white/80 px-3.5 text-left transition ${regionsOpen ? 'border-royal/50 shadow-[0_0_0_3px_rgba(22,55,101,0.08)]' : 'border-royal/15 hover:border-royal/40'}`}
                    >
                        <span><span className="block text-[9px] uppercase tracking-[0.18em] text-ink/40">Regions</span><span className="mt-0.5 block text-xs font-medium text-royal">{selectedRegions.length ? `${selectedRegions.length} selected` : 'Any region'}</span></span>
                        <ChevronDown size={15} className="text-royal/55" aria-hidden />
                    </button>

                    {regionsOpen && (
                        <div id={regionsId} className="absolute left-0 top-[calc(100%+0.6rem)] z-30 w-full rounded-xl border border-royal/12 bg-[#faf7f0] p-3 shadow-[0_18px_50px_rgba(7,24,49,0.2)]" aria-label="Filter by region">
                            <div className="flex items-center justify-between border-b border-royal/10 px-1 pb-2.5">
                                <div><p className="text-xs font-medium text-royal">Select regions</p><p className="mt-0.5 text-[10px] text-ink/45">Choose as many as you like</p></div>
                                <button type="button" onClick={() => setRegionsOpen(false)} className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-royal/60 transition hover:bg-royal/5 hover:text-royal" aria-label="Minimize region options">Minimize <ChevronUp size={13} /></button>
                            </div>
                            <div className="mt-2 grid max-h-52 gap-1 overflow-y-auto">
                                {REGION_OPTIONS.filter((option) => option.id !== 'all').map((option) => {
                                    const region = option.id as TourRegion
                                    const selected = selectedRegions.includes(region)
                                    return (
                                        <button key={option.id} type="button" aria-pressed={selected} onClick={() => toggleRegion(region)} className={`flex min-h-10 items-center justify-between rounded-lg px-3 text-left text-sm transition ${selected ? 'bg-royal text-white' : 'text-royal/75 hover:bg-royal/5 hover:text-royal'}`}>
                                            {option.label}
                                            <span className={`flex h-5 w-5 items-center justify-center rounded border ${selected ? 'border-gold bg-gold text-royal' : 'border-royal/20'}`}>{selected && <Check size={13} strokeWidth={2.2} />}</span>
                                        </button>
                                    )
                                })}
                            </div>
                            {selectedRegions.length > 0 && <button type="button" onClick={() => onRegionsChange([])} className="mt-2 inline-flex min-h-9 items-center gap-1.5 px-2 text-xs font-medium text-royal/55 transition hover:text-royal"><X size={13} />Clear regions</button>}
                        </div>
                    )}
                </div>

                <div className="hidden items-center gap-3 sm:flex" aria-label="Filter by region">
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-royal/55">Regions</span>
                    <div className="flex flex-wrap gap-2">
                        {REGION_OPTIONS.filter((option) => option.id !== 'all').map((option) => {
                            const region = option.id as TourRegion
                            const selected = selectedRegions.includes(region)
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => toggleRegion(region)}
                                    className={`rounded-full border px-4 py-2 text-xs font-medium transition ${selected ? 'border-royal bg-royal text-white shadow-sm' : 'border-royal/20 bg-white/65 text-royal/75 hover:border-royal/45 hover:bg-white/85 hover:text-royal'}`}
                                >
                                    {option.label}
                                </button>
                            )
                        })}
                        {selectedRegions.length > 0 && <button type="button" onClick={() => onRegionsChange([])} className="inline-flex items-center gap-1 px-1 text-xs font-medium text-royal/55 transition hover:text-royal"><X size={13} />Clear</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
