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

function editDistance(left: string, right: string) {
    const previous = Array.from({ length: right.length + 1 }, (_, index) => index)
    for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
        let diagonal = previous[0]
        previous[0] = leftIndex
        for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
            const above = previous[rightIndex]
            previous[rightIndex] = Math.min(
                previous[rightIndex] + 1,
                previous[rightIndex - 1] + 1,
                diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
            )
            diagonal = above
        }
    }
    return previous[right.length]
}

function tokenCloseness(token: string, text: string) {
    if (text.includes(token)) return 1

    let best = 0
    for (const word of text.split(/[^\p{L}\p{N}]+/u).filter(Boolean)) {
        if (word.includes(token) || token.includes(word)) {
            best = Math.max(best, Math.min(word.length, token.length) / Math.max(word.length, token.length))
            continue
        }
        const distance = editDistance(token, word)
        best = Math.max(best, 1 - distance / Math.max(token.length, word.length))
    }
    return best >= 0.6 ? best : 0
}

/**
 * Ranks FAQs by closeness to `query`. Each word is matched fuzzily (typos and partial
 * words count), questions weigh more than answers, and FAQs matching more of the words
 * rank higher. FAQs matching none of the words, or far weaker than the best match, are dropped.
 */
export function searchFaqs<T extends SearchableFaq>(faqs: T[], query: string): T[] {
    const trimmed = query.trim()
    if (!trimmed) return []

    const tokens = tokenize(trimmed)
    const phrase = normalize(trimmed)
    const ranked = faqs.flatMap((faq) => {
        const question = normalize(faq.question)
        const answer = normalize(faq.answer)
        const matches = tokens.map((token) => Math.max(tokenCloseness(token, question) * 0.7, tokenCloseness(token, answer) * 0.3))
        if (!matches.some(Boolean)) return []
        let score = matches.reduce((total, match) => total + match, 0) / tokens.length
        if (question.includes(phrase)) score += 1
        else if (answer.includes(phrase)) score += 0.4
        return [{ faq, score }]
    })

    ranked.sort((a, b) => b.score - a.score)
    const cutoff = (ranked[0]?.score ?? 0) * RELATIVE_CUTOFF
    return ranked.filter((entry) => entry.score >= cutoff).map((entry) => entry.faq)
}
