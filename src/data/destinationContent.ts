export const EXPERIENCE_CATEGORIES = [
    { label: 'See', summary: 'Landmarks, scenery, architecture, and views that define the destination.' },
    { label: 'Taste', summary: 'Local flavors, markets, cafés, and dining experiences worth seeking out.' },
    { label: 'Experience', summary: 'Activities and attractions that bring you closer to the place.' },
    { label: 'Discover', summary: 'Culture, traditions, and everyday moments beyond the familiar routes.' },
    { label: 'Explore', summary: 'Neighborhoods, streets, and local corners best found at your own pace.' },
] as const

export const STORY_COUNT = 3

export function defaultExperienceBody(location: string) {
    return `This space can hold a signature story about ${location}—from a local recommendation and cultural detail to the moments that make this experience distinct from anywhere else.`
}

export function defaultTravelTips(location: string) {
    return [
        `Give yourself time to experience ${location} without rushing.`,
        'Pack for the weather, local customs, and the activities you want to try.',
        'Keep digital and printed copies of important travel documents.',
        'Leave room for local recommendations and unplanned discoveries.',
    ]
}
