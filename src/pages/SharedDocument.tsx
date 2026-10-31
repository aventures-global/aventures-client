import { Download, FileWarning, Link2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { apiFetch, getApiUrl } from '../lib/apiClient'
import type { SiteInfo } from '../types/content'

type ShareLookup = {
    share: {
        id: string
        expiresAt: string
        downloadCount: number
        maxDownloads: number | null
        file: {
            id: string
            displayName: string
            contentType: string
            sizeBytes: number
        }
    }
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function SharedDocument() {
    const { token = '' } = useParams()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [data, setData] = useState<ShareLookup | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)
        void apiFetch<ShareLookup>(`/api/document-shares/${encodeURIComponent(token)}`)
            .then((result) => {
                if (!cancelled) setData(result)
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setData(null)
                    setError(err.message || 'This share link is unavailable')
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })
        return () => {
            cancelled = true
        }
    }, [token])

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo
                title="Shared document — AVENtures"
                description="Download a file shared with you by AVENtures."
                path={`/shared/${token}`}
                noIndex
            />
            <Header />
            <main className="flex-1">
                <div className="site-container pb-24 pt-36 sm:pt-40">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep">Shared file</p>
                    <h1 className="mt-4 font-noto-serif text-4xl text-royal sm:text-5xl">Document download</h1>

                    <div className="mt-10 max-w-xl border border-royal/10 bg-white px-6 py-10 shadow-[0_12px_35px_rgba(22,55,101,0.07)]">
                        {loading ? (
                            <div className="h-28 animate-pulse bg-royal/10" />
                        ) : error || !data ? (
                            <div className="text-center">
                                <FileWarning size={28} className="mx-auto text-royal/45" strokeWidth={1.4} />
                                <p className="mt-4 font-medium text-royal">Link unavailable</p>
                                <p className="mt-2 text-sm text-ink/55">
                                    {error ?? 'This share link is invalid, expired, or revoked.'}
                                </p>
                                <Link
                                    to="/"
                                    className="mt-6 inline-flex text-sm text-royal underline decoration-gold-deep underline-offset-4"
                                >
                                    Back to home
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-start gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal/[0.07] text-royal">
                                        <Link2 size={20} strokeWidth={1.4} />
                                    </span>
                                    <div className="min-w-0">
                                        <h2 className="truncate font-medium text-royal">{data.share.file.displayName}</h2>
                                        <p className="mt-1 text-sm text-ink/55">
                                            {formatBytes(data.share.file.sizeBytes)} · expires{' '}
                                            {new Date(data.share.expiresAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={getApiUrl(`/api/document-shares/${encodeURIComponent(token)}/download`)}
                                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-gold-deep hover:text-royal"
                                >
                                    <Download size={16} strokeWidth={1.6} />
                                    Download
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {site ? <Footer site={site} /> : null}
        </div>
    )
}
