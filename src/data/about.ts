import { relatedBusiness } from './site'

export type AboutTabId = 'why-us' | 'behind-the-dream' | 'origin' | 'transparency'

export const aboutTabs: { id: AboutTabId; label: string; shortLabel: string }[] = [
    { id: 'why-us', label: 'Why Us', shortLabel: 'Why Us' },
    { id: 'behind-the-dream', label: 'Behind the Dream', shortLabel: 'Behind the Dream' },
    { id: 'origin', label: 'Origin', shortLabel: 'Origin' },
    { id: 'transparency', label: 'Trust and Transparency', shortLabel: 'Trust and Transparency' },
]

export const whyAventures = {
    eyebrow: 'Why AVENTURES',
    title: 'Your plans deserve more than a booking.',
    intro: 'Choosing who will help with your visa application or travel plans is an important decision. AVENTURES brings visa assistance, travel planning, and destination support together—making every step more organized, informed, and manageable.',
    pillars: [
        { title: 'Trusted airlines', description: 'Explore suitable flight arrangements based on your destination, travel dates, and complete trip plan.' },
        { title: 'Visa assistance', description: 'Clear guidance, careful preparation, and help understanding a process that can otherwise feel overwhelming.' },
        { title: 'Curated trips', description: 'Choose an existing package or shape a personal journey around your dates, pace, and preferred experiences.' },
        { title: 'End-to-end support', description: 'One team connects the moving parts—from understanding visa options to preparing for travel.' },
        { title: 'Local experts', description: 'Personal guidance from people who understand where you are starting and why the journey matters.' },
    ],
    promise: ['Guidance', 'Preparation', 'Convenience', 'Personal attention', 'Transparency', 'Support'],
}

export const founderStory = {
    eyebrow: 'Behind the Dream',
    title: 'A dream helped build a company.',
    name: 'Mary Kathleen Kayce Avendula',
    role: 'CEO of AVENTURES',
    intro: `Her professional journey began as a nursing graduate in the Philippines. She later moved into entrepreneurship through Kikay’s Lechon and developed hands-on experience with U.S. visa applications and processing through her work with ${relatedBusiness.name}.`,
    story: 'Mary Kathleen and her husband once stood where many aspiring clients stand today—with a dream of building a life in America and the determination to make it happen. Their own experience with preparation, patience, and the visa process became part of the foundation behind AVENTURES.',
    whyItMatters: 'Every application belongs to a person: a family waiting, a relationship worth pursuing, a future being planned, or a dream that took years to build. That is why AVENTURES aims to provide hands-on service, careful preparation, clear guidance, and personal attention.',
    quote: 'Sometimes, the person helping you pursue your dream is someone who once had to pursue one of her own.',
}

export const originStory = {
    eyebrow: 'Our Origin',
    title: 'Travel should feel exciting—not overwhelming.',
    intro: 'AVENTURES Global Resources and Travel Agency is a full-service travel agency offering curated local and international experiences. From its Sacramento base, AVENTURES plans trips that feel considered rather than pieced together from separate bookings.',
    story: 'The company specializes in travel across the Philippines—including Cebu, Siargao, and Boracay—as well as California tours and destinations worldwide. Whether a client needs airfare and hotels, a custom itinerary, or help with visas, the goal is one connected journey from the first conversation onward.',
    values: [
        { title: 'Clarity', description: 'A better understanding of what you are preparing for.' },
        { title: 'Confidence', description: 'Better preparation for the journey ahead.' },
        { title: 'Convenience', description: 'Connected services that reduce unnecessary complexity.' },
        { title: 'Transparency', description: 'A clear view of what we can assist with—and what remains with third parties or government authorities.' },
        { title: 'Care', description: 'A human approach to every booking, application, and journey.' },
    ],
    mission: 'To connect people with travel opportunities and experiences through thoughtful planning, personalized service, and responsible guidance.',
    vision: 'To become a trusted global travel and resources company that makes meaningful journeys more accessible, connected, and memorable.',
}

export const transparency = {
    eyebrow: 'Trust & Transparency',
    title: 'Know who you’re trusting.',
    intro: 'When you choose someone to assist with a visa application or help plan your trip, trust should never be based on promises alone.',
    principle: 'Know the people. Understand the service. Check the source.',
    contact: {
        address: '3419 Arden Way, Sacramento, CA, United States',
        email: 'aventures.globalresources@gmail.com',
        phone: '+1 (916) 268-7731',
    },
    visas: ['B-1/B-2 Visitor Visa', 'K-1 Fiancé(e)', 'K-2', 'J-1 Exchange Visitor', 'R-1 Religious Worker', 'R-2 Dependent', 'P-1', 'P-2', 'E-2 Treaty Investor'],
    support: ['Explain the general application process', 'Help clients understand relevant pathways', 'Identify information and documents that may be relevant', 'Organize application information', 'Prepare for applicable stages', 'Provide general guidance', 'Assist with travel planning and arrangements'],
    disclaimer: 'AVENTURES does not approve, deny, or guarantee a U.S. visa. Processing times, appointment availability, admission at a port of entry, and government decisions remain outside AVENTURES’ control. Clients remain responsible for providing complete and truthful information.',
}
