import type {
    AboutPageContent,
    HomePageContent,
    LegalPageContent,
    SitePageContentMap,
} from '../types/sitePages'

const home: HomePageContent = {
    hero: {
        title: 'JOURNEY MADE EASIER',
        subtitle: 'Dream It. Plan It. Live the AVENture.',
        ctaLabel: 'Start Your AVENture',
    },
    story: {
        eyebrow: 'Who we are',
        title: 'The AVENTURES Story',
        body: 'AVENTURES Global Resources and Travel Agency is a full-service travel agency offering curated local and international experiences. We specialize in tours across the Philippines, including Cebu, Siargao, and Boracay, as well as California tours and destinations worldwide.',
        linkLabel: 'Discover our story',
    },
    whyUs: {
        eyebrow: 'Travel with confidence',
        title: 'Why AVENTURES?',
        points: ['Trusted Airlines', 'Visa Assistance', 'Curated Trips', 'End-to-End Support', 'Local Experts'],
    },
}

const about: AboutPageContent = {
    intro: 'More than a travel agency, we are people who understand what it means to plan, prepare, hope, and finally go.',
    whyUs: {
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
        quote: 'Your plans matter. Your journey matters. Your AVENture matters.',
    },
    founder: {
        eyebrow: 'Behind the Dream',
        title: 'A dream helped build a company.',
        intro: 'Her professional journey began as a nursing graduate in the Philippines. She later moved into entrepreneurship through Kikay’s Lechon and developed hands-on experience with U.S. visa applications and processing through her work with [REK Global Philippines](https://rekph.com).',
        name: 'Mary Kathleen Kayce Avendula',
        role: 'CEO of AVENTURES',
        story: 'Mary Kathleen and her husband once stood where many aspiring clients stand today—with a dream of building a life in America and the determination to make it happen. Their own experience with preparation, patience, and the visa process became part of the foundation behind AVENTURES.',
        whyItMatters: 'Every application belongs to a person: a family waiting, a relationship worth pursuing, a future being planned, or a dream that took years to build. That is why AVENTURES aims to provide hands-on service, careful preparation, clear guidance, and personal attention.',
        quote: 'Sometimes, the person helping you pursue your dream is someone who once had to pursue one of her own.',
    },
    origin: {
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
    },
    transparency: {
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
        support: [
            'Explain the general application process',
            'Help clients understand relevant pathways',
            'Identify information and documents that may be relevant',
            'Organize application information',
            'Prepare for applicable stages',
            'Provide general guidance',
            'Assist with travel planning and arrangements',
        ],
        disclaimer: 'AVENTURES does not approve, deny, or guarantee a U.S. visa. Processing times, appointment availability, admission at a port of entry, and government decisions remain outside AVENTURES’ control. Clients remain responsible for providing complete and truthful information.',
        footnote: 'Information on this website is for general informational purposes and does not replace official U.S. government guidance or individualized legal advice. Always verify current information through official government sources.',
    },
}

const privacy: LegalPageContent = {
    subtitle: 'How we handle the information you share with us.',
    lastUpdated: '4 October 2026',
    intro: `At {fullName} (“AVENTURES”, “we”, “us”), good service begins with transparency. Your privacy is an important part of the relationship between you and AVENTURES.

This policy explains what this website collects, what we may ask for later if you choose to work with us, and how that information is used and shared.`,
    sections: [
        {
            id: 'website',
            label: 'On this website',
            title: 'What the website collects',
            body: `- **Inquiry and request forms** — Contact, Custom Tour, Flights, Hotels, Cars & Transfers, and Ask AVENtures. These collect your name, email, optional phone number, and the details you type in, such as destinations, travel dates, number of travelers, the visa type you are asking about, and your message.
- **Accounts** — if you choose to create one for the shop, we store your name, email, phone number and profile picture when provided, and your sign-in details. You can sign up with email and password or with Google.
- **Shop cart** — items you add to your cart while signed in are saved to your account. If you add an item before signing in, that one pending action is held in your browser’s session storage until you log in.
- **Technical data** — standard information our hosting providers may log, such as IP address, browser type, and pages visited.

The website forms do not ask for passport details, identification documents, or payment information, and the website does not take payments. Your answers in the [visa finder](/visa-assistance) stay in your browser and are only sent to us if you submit a form.`,
        },
        {
            id: 'forms',
            label: 'Form submissions',
            title: 'Where your inquiry goes',
            body: 'Inquiry forms are processed by our own server and delivered by email to our team at [{email}](mailto:{email}). We do not save form submissions in our website database. Your inquiry is kept in our email records so we can respond and follow up.',
        },
        {
            id: 'services',
            label: 'When you work with us',
            title: 'Information a service may require',
            body: `Depending on the service you choose, our team may later ask for information such as identification details, passport information, application information, and other documents relevant to the service.

For visa-related services, the information required may be more extensive because applications can involve personal, family, employment, financial, educational, travel, and immigration-related information. For travel services, information may be needed to arrange flights, accommodations, tours, transportation, activities, or other travel-related services.

We recognize that providing this information requires trust. We request it directly as part of the service process, and only what is relevant to the service you have chosen. Please take reasonable care when sending documents, sharing sensitive information, and using online platforms or payment channels.`,
        },
        {
            id: 'use',
            label: 'How we use it',
            title: 'How your information is used',
            body: `We use information for legitimate business and service purposes, including:

- Responding to your inquiries and questions
- Preparing or coordinating the service you requested
- Arranging flights, hotels, transfers, tours, and itineraries
- Running your account and shop cart
- Maintaining records and meeting applicable requirements
- Keeping the website secure and improving it

We do not sell your personal information.`,
        },
        {
            id: 'sharing',
            label: 'Sharing',
            title: 'Who we share it with',
            body: `- Service providers that run the website for us, including hosting, email delivery, database, and account sign-in providers.
- Google, if you choose to sign in with Google.
- Government authorities, airlines, hotels, tour operators, payment providers, or other third parties, only when a service you have engaged requires it.
- Others where required by law.`,
        },
        {
            id: 'choices',
            label: 'Your choices',
            title: 'Accessing or updating your information',
            body: 'You can ask us to access, correct, or delete the personal information we hold about you, including your account. Contact us using the details below and we will respond within a reasonable time, subject to records we are required to keep.',
        },
        {
            id: 'contact',
            label: 'Contact',
            title: 'Questions about this policy',
            body: 'Email [{email}](mailto:{email}), call [{phone}](tel:{phone}), or visit our office at {address}. For how our services, fees, and refunds work, see our [Terms & Conditions](/terms).',
        },
    ],
}

const terms: LegalPageContent = {
    subtitle: 'Understanding your rights, responsibilities, and what to expect.',
    lastUpdated: '4 October 2026',
    intro: 'Every service comes with expectations and responsibilities. This page gives a general overview of how {fullName} approaches service terms, refunds, cancellations, service limitations, and client responsibilities. Before you proceed with a service or make a payment, you should have the opportunity to understand the conditions that apply to your particular request.',
    sections: [
        {
            id: 'website',
            label: 'Using this website',
            title: 'How our services start',
            body: `This website lets you browse destinations, visa information, and our shop, and send us inquiries. Flights, hotels, cars and transfers, custom tours, and visa assistance are arranged by request: submitting a form starts a conversation with our team. It is not a booking, a reservation, or a commitment to pay.

The website does not take payments. Prices shown online, including “from” prices, are starting estimates. Your final quotation depends on travel dates, number of travelers, availability, and your requested customizations, and is confirmed with you directly. Shop checkout is not yet available.

Visa information on this site is general guidance only and is not legal advice.`,
        },
        {
            id: 'service-terms',
            label: 'Service-specific terms',
            title: 'Different services, different terms',
            body: `Our services differ, so there is no single set of terms that applies identically to every client or every service. A visa assistance service may have different conditions from a tour package. A customized itinerary may have different booking and cancellation conditions from an airfare arrangement. A third-party hotel, airline, tour operator, or other provider may also have its own terms that apply to a booking.

Visa assistance may involve application preparation, document coordination, appointment-related assistance, and other services within the agreed scope. Travel arrangements may involve airlines, hotels, transportation providers, tour operators, activity providers, or other third parties whose schedules, availability, and policies can affect the service.

The terms that apply to your service are sent to you by our team as part of the service process, before you pay.`,
        },
        {
            id: 'before-payment',
            label: 'Before you pay',
            title: 'Know what you are agreeing to',
            body: `Before payment, we will make the following available to you for your service:

- **Service scope** — What AVENTURES will and will not provide as part of the service.
- **Fees and charges** — What you are paying for and, where applicable, which fees are paid to third parties or government agencies.
- **Terms & Conditions** — The rules and responsibilities that apply to the specific service.
- **Refund and cancellation policy** — Whether a payment may be refundable, non-refundable, subject to deductions, or affected by cancellation deadlines.
- **Service limitations** — The matters that are outside AVENTURES’ control or authority.

If you do not understand a condition, ask before making your payment. We would rather you ask questions first than discover later that an important condition was misunderstood.`,
        },
        {
            id: 'refunds',
            label: 'Refunds & cancellations',
            title: 'Conditions vary by service',
            body: `Some services may have cancellation periods, administrative fees, non-refundable components, supplier-imposed penalties, or other conditions. Certain payments may be connected to third-party providers whose own refund and cancellation rules apply.

For visa-related services, fees may cover professional assistance, preparation, administrative work, or other services that may already have been performed. Government fees and third-party fees are subject to their own rules. For travel services, the airline, hotel, tour operator, transportation provider, or other supplier may have separate cancellation and refund policies.

AVENTURES does not have one universal refund policy. The refund and cancellation terms for your specific service are disclosed before payment.`,
        },
        {
            id: 'limitations',
            label: 'Service limitations',
            title: 'What we can and cannot control',
            body: `AVENTURES provides travel planning, booking assistance, visa assistance, document guidance, coordination, and other services within the agreed scope of each service. Some decisions and outcomes remain outside our authority.

For visa services, the relevant embassy, consulate, immigration authority, or government agency makes the decision. AVENTURES cannot guarantee:

- Visa approval or issuance
- Entry into a country or a particular immigration outcome
- A specific government processing time or appointment availability
- Third-party availability, schedules, or outcomes

Government policies, airline changes, weather, emergencies, destination restrictions, processing delays, supplier decisions, or other events may also affect a journey.`,
        },
        {
            id: 'responsibilities',
            label: 'Your responsibilities',
            title: 'Transparency works both ways',
            body: `As a client, you are responsible for:

- Providing information that is accurate, complete, and truthful
- Reviewing information and documents prepared for you, and telling us if something is incorrect or changes
- Meeting applicable deadlines and providing requested documents
- Reading the terms provided to you and asking questions when something is unclear
- For visa services, the truthfulness and accuracy of the information in your application
- For travel services, reviewing your itinerary, travel documents, passport validity, and entry requirements

**Good preparation is a shared responsibility.**`,
        },
        {
            id: 'notice',
            label: 'Important notice',
            title: 'This page and your service agreement',
            body: `This page provides general information. It does not replace the specific terms, service agreement, refund policy, cancellation policy, or other documents provided to you for a particular service. Those documents govern the applicable transaction or service relationship and should be reviewed carefully before payment.

For how we handle personal information, see our [Privacy Policy](/privacy). Questions about these terms: [{email}](mailto:{email}) or [{phone}](tel:{phone}).`,
        },
    ],
}

export const defaultSitePages: SitePageContentMap = { home, about, privacy, terms }
