import Fuse from 'fuse.js'

export type SearchableFaq = { id: string; question: string; answer: string }

const STOP_WORDS = new Set([
    'a', 'an', 'and', 'are', 'can', 'do', 'does', 'for', 'how', 'i', 'in', 'is', 'it', 'me', 'my',
    'of', 'on', 'or', 'the', 'to', 'what', 'when', 'where', 'which', 'who', 'why', 'with', 'you', 'your',
])

/** Matches scoring below this share of the best match are treated as noise. */
const RELATIVE_CUTOFF = 0.45

function normalize(text: string) {
    return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

function tokenize(query: string) {
    const words = normalize(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean)
    const meaningful = words.filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    return meaningful.length > 0 ? meaningful : words
}

/**
 * Ranks FAQs by closeness to `query`. Each word is matched fuzzily (typos and partial
 * words count), questions weigh more than answers, and FAQs matching more of the words
 * rank higher. FAQs matching none of the words, or far weaker than the best match, are dropped.
 */
export function searchFaqs<T extends SearchableFaq>(faqs: T[], query: string): T[] {
    const trimmed = query.trim()
    if (!trimmed) return []

    const fuse = new Fuse(faqs, {
        keys: [
            { name: 'question', weight: 0.7 },
            { name: 'answer', weight: 0.3 },
        ],
        includeScore: true,
        ignoreLocation: true,
        ignoreFieldNorm: true,
        ignoreDiacritics: true,
        threshold: 0.34,
        minMatchCharLength: 2,
    })

    const tokens = tokenize(trimmed)
    const scores = new Map<string, number>()

    for (const token of tokens) {
        for (const result of fuse.search(token)) {
            const closeness = 1 - (result.score ?? 1)
            scores.set(result.item.id, (scores.get(result.item.id) ?? 0) + closeness)
        }
    }

    const phrase = normalize(trimmed)
    const ranked = faqs.flatMap((faq) => {
        const tokenScore = scores.get(faq.id)
        if (tokenScore === undefined) return []
        let score = tokenScore / tokens.length
        if (normalize(faq.question).includes(phrase)) score += 1
        else if (normalize(faq.answer).includes(phrase)) score += 0.4
        return [{ faq, score }]
    })

    ranked.sort((a, b) => b.score - a.score)
    const cutoff = (ranked[0]?.score ?? 0) * RELATIVE_CUTOFF
    return ranked.filter((entry) => entry.score >= cutoff).map((entry) => entry.faq)
}
