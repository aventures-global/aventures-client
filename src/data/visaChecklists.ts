import type { VisaId } from './visaFinder'

export type ChecklistGroup = {
    title: string
    items: string[]
}

/** On-page copy of the printable checklist PDFs stored in R2 under `visa-checklists/`. Keep in sync with the PDFs. */
export type VisaChecklist = {
    tagline: string
    intro?: string
    groups: ChecklistGroup[]
    reminder: string
}

export const visaChecklists: Record<VisaId, VisaChecklist> = {
    tourist: {
        tagline: 'Your AVENture starts with preparation.',
        intro: 'Use this checklist to organize the common things you may need as you prepare for your U.S. Tourist Visa application and future trip.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have identified the main purpose of my trip.',
                    'I have reviewed my intended travel dates.',
                    'I have considered the places I plan to visit.',
                    'I have reviewed my personal travel plans and circumstances.',
                    'I have prepared my basic personal information.',
                    'I have organized my general travel-related records.',
                    'I understand that additional requirements may apply to my individual application.',
                ],
            },
            {
                title: 'Travel Planning',
                items: [
                    'I have considered my expected travel budget.',
                    'I have considered transportation within the U.S.',
                    'I have identified possible accommodation options.',
                    'I have considered travel insurance.',
                    'I have reviewed the general currency and payment options I may use.',
                    'I have considered who I may contact in case of an emergency.',
                ],
            },
            {
                title: 'Document & Information Preparation',
                items: [
                    'My passport is available and in good condition.',
                    'I have organized important personal and travel information.',
                    'I have made secure copies of important documents.',
                    'I know where my important documents are stored.',
                    'I have important contact information saved.',
                ],
            },
            {
                title: 'Before Departure',
                items: [
                    'My flight details are confirmed.',
                    'My accommodation details are confirmed.',
                    'My luggage is prepared.',
                    'I have reviewed my baggage allowance.',
                    'I have prepared items I need to keep in my hand-carry.',
                    'I have reviewed my airport departure details.',
                    'I have enough time planned for airport procedures.',
                ],
            },
        ],
        reminder:
            'This checklist contains general travel and preparation items only. It does not represent the complete documentary or eligibility requirements for a U.S. Tourist Visa. Additional requirements may apply depending on your individual circumstances and will be discussed during the application process.',
    },
    fiance: {
        tagline: 'A new chapter starts with preparation.',
        intro: 'Use this checklist to organize the common preparation items connected to your fiancé(e) visa journey and your plans for traveling to the United States.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have reviewed the purpose of my intended travel.',
                    'I have organized my basic personal information.',
                    'I have reviewed my intended travel timeline.',
                    'I have organized my general relationship and travel information.',
                    'I have prepared the information needed to discuss my plans clearly.',
                    'I understand that specialized requirements may apply to my individual case.',
                ],
            },
            {
                title: 'Personal & Travel Preparation',
                items: [
                    'My passport is available and in good condition.',
                    'I have reviewed my expected travel arrangements.',
                    'I have considered where I will stay after arrival.',
                    'I have considered my transportation arrangements.',
                    'I have considered my expected travel expenses.',
                    'I have important contact information saved.',
                ],
            },
            {
                title: 'Document Organization',
                items: [
                    'I have organized my important personal records.',
                    'I have kept important documents in a secure location.',
                    'I have prepared secure copies of important documents.',
                    'I know which documents I need to keep accessible.',
                    'I understand that AVENTURES will discuss the specialized requirements applicable to my application.',
                ],
            },
            {
                title: 'Travel Preparation',
                items: [
                    'My expected travel dates are noted.',
                    'I have considered my flight arrangements.',
                    'I have considered my accommodation arrangements.',
                    'I have considered travel insurance.',
                    'I have considered currency and payment options.',
                    'I have prepared my luggage and travel essentials.',
                    'I know what I need to bring in my hand-carry.',
                ],
            },
            {
                title: 'Before Departure',
                items: [
                    'Flight information is confirmed.',
                    'Accommodation information is accessible.',
                    'Important contacts are saved.',
                    'Important documents and copies are organized.',
                    'Luggage is ready.',
                    'Airport departure details have been reviewed.',
                    'I have allowed enough time for airport procedures.',
                ],
            },
        ],
        reminder:
            'This is a general preparation checklist, not a complete list of fiancé(e) visa requirements. Specialized documentary requirements and case-specific instructions will be discussed with you when you begin your application with AVENTURES.',
    },
    k2: {
        tagline: 'Preparing to continue your family AVENture? Start here.',
        intro: 'Use this checklist to organize the common information and travel preparation items that may apply to an eligible K-2 applicant.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have information about the K-1 applicant.',
                    'I have confirmed my relationship to the K-1 applicant.',
                    'I have organized my basic personal information.',
                    'I have reviewed my expected travel timeline.',
                    'I understand that additional requirements may apply to my individual case.',
                ],
            },
            {
                title: 'Personal & Civil Documents',
                items: [
                    'My passport is available and in good condition.',
                    'My birth certificate is available.',
                    'I have organized other applicable civil documents.',
                    'I have previous passports, if applicable.',
                    'I have name-change documents, if applicable.',
                    'I have adoption or custody documents, if applicable.',
                ],
            },
            {
                title: 'K-1 Family Connection',
                items: [
                    'I have information about the K-1 petition.',
                    'I have documentation showing my relationship to the K-1 applicant.',
                    'I have relevant K-1 case information.',
                    'I have organized documents connecting my application to the K-1 case.',
                ],
            },
            {
                title: 'Visa Application Preparation',
                items: [
                    'I have completed my DS-160.',
                    'I have printed my DS-160 confirmation page.',
                    'I have reviewed the applicable visa fee requirements.',
                    'I have reviewed my interview appointment information, if applicable.',
                    'I have reviewed the instructions of the U.S. Embassy or Consulate.',
                ],
            },
            {
                title: 'Medical & Background Preparation',
                items: [
                    'I have reviewed medical examination requirements.',
                    'I have organized vaccination or medical records, if applicable.',
                    'I have reviewed whether police or court records may apply to my circumstances.',
                    'I have organized applicable immigration records.',
                ],
            },
            {
                title: 'Travel Preparation',
                items: [
                    'My expected travel dates are organized.',
                    'I have reviewed my intended U.S. address.',
                    'I have considered transportation arrangements.',
                    'I have considered accommodation arrangements.',
                    'Important family and emergency contacts are saved.',
                    'Important documents and copies are organized.',
                ],
            },
        ],
        reminder:
            'This checklist provides general preparation guidance only. K-2 applicants must satisfy the requirements applicable to their individual circumstances and the related K-1 case.',
    },
    j1: {
        tagline: 'Preparing for your exchange visitor AVENture? Start here.',
        intro: 'Use this checklist to organize the common information, documents, and travel preparations you may need as you move forward with your J-1 journey.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have confirmed the purpose of my exchange program.',
                    'I know the name of my exchange program sponsor.',
                    'I understand the general duration of my program.',
                    'I have reviewed my program information.',
                    'I have organized my basic personal information.',
                    'I understand that additional requirements may apply to my individual case.',
                ],
            },
            {
                title: 'Exchange Program Documents',
                items: [
                    'My DS-2019 is available, if already issued.',
                    'I have my SEVIS information.',
                    'I have reviewed my SEVIS I-901 fee requirements.',
                    'I have my program acceptance or participation information.',
                    'I have organized my sponsor information.',
                    'I have my DS-7002, if applicable to my program category.',
                ],
            },
            {
                title: 'Personal & Travel Documents',
                items: [
                    'My passport is available and in good condition.',
                    'I have organized previous passports, if applicable.',
                    'I have organized previous U.S. visa information, if applicable.',
                    'I have organized previous U.S. immigration documents, if applicable.',
                    'I have important personal information readily available.',
                ],
            },
            {
                title: 'Financial Preparation',
                items: [
                    'I have reviewed how my program and travel expenses will be covered.',
                    'I have organized information about program funding, if applicable.',
                    'I have organized evidence of personal financial support, if applicable.',
                    'I have information about other financial support, if applicable.',
                ],
            },
            {
                title: 'Visa Application Preparation',
                items: [
                    'I have completed my DS-160.',
                    'I have printed my DS-160 confirmation page.',
                    'I have reviewed the applicable visa fee requirements.',
                    'I have reviewed my interview appointment information.',
                    'I have reviewed the instructions of the U.S. Embassy or Consulate where I will apply.',
                ],
            },
            {
                title: 'Before Departure',
                items: [
                    'My flight information is organized.',
                    'My accommodation information is available.',
                    'I have important program and sponsor contacts saved.',
                    'I have prepared my luggage and travel essentials.',
                    'I have reviewed my airport departure details.',
                    'I have secure copies of important documents.',
                ],
            },
        ],
        reminder:
            'This checklist provides general preparation guidance only. J-1 requirements can vary depending on your exchange category, program sponsor, individual circumstances, and U.S. Embassy or Consulate instructions.',
    },
    r1: {
        tagline: 'Prepare for the opportunity ahead.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have identified the purpose of my intended travel.',
                    'I have organized my basic personal information.',
                    'I have reviewed my intended travel timeline.',
                    'I have information about the organization connected to my intended opportunity.',
                    'I have organized general information about my planned activities.',
                    'I understand that additional case-specific requirements may apply.',
                ],
            },
            {
                title: 'Personal Preparation',
                items: [
                    'My passport is available and in good condition.',
                    'My personal information is organized and current.',
                    'I have reviewed my expected travel arrangements.',
                    'I have considered where I will stay after arrival.',
                    'I have considered transportation arrangements.',
                    'I have important contact information saved.',
                ],
            },
            {
                title: 'Document Organization',
                items: [
                    'I have organized my important personal records.',
                    'I have kept important documents secure.',
                    'I have prepared secure copies of important documents.',
                    'I have organized information relevant to my planned travel and opportunity.',
                    'I understand that specialized R-1 requirements will be discussed during the application process.',
                ],
            },
            {
                title: 'Travel Preparation',
                items: [
                    'I have reviewed my expected travel dates.',
                    'I have considered my flight arrangements.',
                    'I have considered accommodation.',
                    'I have considered travel insurance.',
                    'I have reviewed currency and payment options.',
                    'I have prepared my luggage and travel essentials.',
                    'I know what I need to keep accessible during travel.',
                ],
            },
            {
                title: 'Before Departure',
                items: [
                    'Flight information is confirmed.',
                    'Accommodation information is accessible.',
                    'Important contacts are saved.',
                    'Important documents and copies are organized.',
                    'Luggage is ready.',
                    'Airport details have been reviewed.',
                    'I have allowed enough time for airport procedures.',
                ],
            },
        ],
        reminder:
            'This checklist contains general preparation items only. It does not provide the complete eligibility, documentary, or case-specific requirements for an R-1 visa. Specialized requirements will be discussed when you begin your application with AVENTURES.',
    },
    r2: {
        tagline: 'Preparing to join your AVENture? Start here.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have reviewed the purpose of my intended travel.',
                    'I have organized my basic personal information.',
                    'I have reviewed my intended travel timeline.',
                    'I have information about the R-1 principal applicant.',
                    'I have organized my general travel plans.',
                    'I understand that additional requirements may apply to my individual case.',
                ],
            },
            {
                title: 'Personal & Travel Preparation',
                items: [
                    'My passport is available and in good condition.',
                    'My personal information is current and organized.',
                    'I have reviewed my expected travel arrangements.',
                    'I have considered my accommodation arrangements.',
                    'I have considered transportation arrangements.',
                    'I have important contacts saved.',
                ],
            },
            {
                title: 'Document Organization',
                items: [
                    'I have organized my important personal records.',
                    'I have kept important documents in a secure location.',
                    'I have prepared secure copies of important documents.',
                    'I have organized relevant information connected to my travel.',
                    'I understand that specialized R-2 requirements will be discussed during the application process.',
                ],
            },
            {
                title: 'Travel Preparation',
                items: [
                    'I have reviewed my expected travel dates.',
                    'I have considered my flight arrangements.',
                    'I have considered accommodation.',
                    'I have considered travel insurance.',
                    'I have reviewed currency and payment options.',
                    'I have prepared my luggage and travel essentials.',
                    'I know what I need to keep accessible during travel.',
                ],
            },
            {
                title: 'Before Departure',
                items: [
                    'Flight information is confirmed.',
                    'Accommodation information is accessible.',
                    'Important contacts are saved.',
                    'Important documents and copies are organized.',
                    'Luggage is ready.',
                    'Airport details have been reviewed.',
                    'I have allowed enough time for airport procedures.',
                ],
            },
        ],
        reminder:
            'This checklist provides general preparation guidance only. It is not a complete list of R-2 eligibility or documentary requirements. Case-specific requirements and instructions will be discussed when you begin your application with AVENTURES.',
    },
    p1: {
        tagline: 'Taking your athletic or entertainment AVENture to the United States? Start here.',
        intro: 'Use this checklist to organize common preparation items for your P-1 visa journey.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I understand the purpose of my U.S. activity.',
                    'I know my P-1 classification.',
                    'I have information about my U.S. petitioner or sponsor.',
                    'I have information about my event, competition, or performance.',
                    'I understand that additional requirements may apply to my individual case.',
                ],
            },
            {
                title: 'Petition & Sponsor Documents',
                items: [
                    'I have information about the approved petition, if already approved.',
                    'I have the relevant I-797 information, if applicable.',
                    'I have U.S. petitioner information.',
                    'I have my contract or agreement, if applicable.',
                    'I have event, competition, or performance information.',
                ],
            },
            {
                title: 'Professional / Qualification Documents',
                items: [
                    'I have organized evidence of my professional achievements.',
                    'I have organized awards or recognition, if applicable.',
                    'I have organized rankings or competition records, if applicable.',
                    'I have organized press or media coverage, if applicable.',
                    'I have organized contracts or professional agreements.',
                    'I have organized other relevant professional evidence.',
                ],
            },
            {
                title: 'Visa Application Preparation',
                items: [
                    'I have completed my DS-160.',
                    'I have printed my DS-160 confirmation page.',
                    'I have reviewed the applicable visa fee requirements.',
                    'I have reviewed my interview appointment information.',
                    'I have reviewed the U.S. Embassy or Consulate instructions.',
                ],
            },
            {
                title: 'Travel / Event Preparation',
                items: [
                    'My U.S. itinerary is organized.',
                    'My event or competition schedule is available.',
                    'My performance schedule is available, if applicable.',
                    'Venue information is organized.',
                    'Accommodation information is organized.',
                    'Important contacts are saved.',
                ],
            },
            {
                title: 'Final Check',
                items: [
                    'Petition information is organized.',
                    'Qualification evidence is organized.',
                    'Passport and visa documents are ready.',
                    'Interview preparation is complete.',
                    'Travel and event information is accessible.',
                ],
            },
        ],
        reminder:
            'This checklist provides general preparation guidance only. P-1 requirements depend on the specific classification, applicant, petitioner, activity, and applicable U.S. government and consular requirements.',
    },
    p2: {
        tagline: 'Preparing for your reciprocal exchange AVENture? Start here.',
        intro: 'Use this checklist to organize common preparation items as you move forward with your P-2 journey.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I understand the purpose of my U.S. activity.',
                    'I have information about the reciprocal exchange program.',
                    'I know the participating organizations.',
                    'I have information about my U.S. petitioner or sponsor.',
                    'I understand that additional requirements may apply to my case.',
                ],
            },
            {
                title: 'Reciprocal Exchange Documents',
                items: [
                    'I have information about the reciprocal exchange agreement.',
                    'I have information about the U.S. organization.',
                    'I have information about the foreign organization.',
                    'I have information about the approved petition, if applicable.',
                    'I have my relevant petition documentation, if available.',
                ],
            },
            {
                title: 'Professional Documents',
                items: [
                    'I have my professional résumé or biography.',
                    'I have organized evidence of professional experience.',
                    'I have organized performance or participation records.',
                    'I have contracts or agreements, if applicable.',
                    'I have event or performance information.',
                    'I have supporting professional evidence.',
                ],
            },
            {
                title: 'Visa Application Preparation',
                items: [
                    'I have completed my DS-160.',
                    'I have printed my DS-160 confirmation page.',
                    'I have reviewed the applicable visa fee requirements.',
                    'I have reviewed my interview appointment information.',
                    'I have reviewed the U.S. Embassy or Consulate instructions.',
                ],
            },
            {
                title: 'Travel & Performance Preparation',
                items: [
                    'My U.S. itinerary is organized.',
                    'My performance schedule is available.',
                    'Venue information is available.',
                    'Accommodation information is organized.',
                    'Important contacts are saved.',
                    'Travel documents and copies are organized.',
                ],
            },
            {
                title: 'Final Check',
                items: [
                    'Petition information is organized.',
                    'Reciprocal exchange documents are organized.',
                    'Professional evidence is organized.',
                    'Passport and visa documents are ready.',
                    'Interview preparation is complete.',
                    'Travel arrangements are reviewed.',
                ],
            },
        ],
        reminder:
            'This checklist provides general preparation guidance only. P-2 requirements depend on the qualifying reciprocal exchange arrangement, the applicant’s circumstances, the petitioner, and applicable U.S. government and consular requirements.',
    },
    e2: {
        tagline: 'Preparing for your U.S. investment AVENture? Start here.',
        intro: 'Use this checklist to organize common personal, business, investment, and application preparation items as you move forward with your E-2 journey.',
        groups: [
            {
                title: 'Before Your Application',
                items: [
                    'I have confirmed my nationality.',
                    'I have reviewed whether my nationality qualifies under the E-2 treaty-country requirements.',
                    'I have identified the U.S. enterprise.',
                    'I understand my intended role in the enterprise.',
                    'I have reviewed the nature of my investment.',
                    'I understand that additional requirements may apply to my individual case.',
                ],
            },
            {
                title: 'Personal Documents',
                items: [
                    'My valid passport is available.',
                    'I have proof of nationality.',
                    'I have previous U.S. visa information, if applicable.',
                    'I have previous U.S. immigration information, if applicable.',
                    'I have organized other relevant personal documents.',
                ],
            },
            {
                title: 'Business Documents',
                items: [
                    'Business registration documents are organized.',
                    'Ownership records are organized.',
                    'Articles of incorporation or organization are available, if applicable.',
                    'Operating agreement is available, if applicable.',
                    'Business licenses and permits are organized, if applicable.',
                    'Lease or premises documents are organized, if applicable.',
                    'Business contracts are organized, if applicable.',
                ],
            },
            {
                title: 'Investment Documents',
                items: [
                    'I have records showing my investment.',
                    'I have purchase agreements, if applicable.',
                    'I have invoices and receipts.',
                    'I have business bank records.',
                    'I have equipment or asset purchase records.',
                    'I have inventory records, if applicable.',
                    'I have escrow documents, if applicable.',
                    'I have other evidence showing funds committed to the enterprise.',
                ],
            },
            {
                title: 'Source of Funds',
                items: [
                    'Bank statements are organized.',
                    'Tax records are organized, if applicable.',
                    'Sale-of-asset documents are available, if applicable.',
                    'Loan documents are available, if applicable.',
                    'Gift documents are available, if applicable.',
                    'Inheritance documents are available, if applicable.',
                    'Other evidence showing the lawful source of funds is organized.',
                ],
            },
            {
                title: 'Business Plan & Operations',
                items: [
                    'Business plan is prepared.',
                    'Financial projections are prepared.',
                    'Revenue projections are prepared.',
                    'Expense projections are prepared.',
                    'Staffing plan is prepared, if applicable.',
                    'Marketing plan is prepared.',
                    'Business operations are documented.',
                    'Business contracts and customer or supplier information are organized, if applicable.',
                ],
            },
            {
                title: 'Visa Application Preparation',
                items: [
                    'I have completed my DS-160.',
                    'I have printed my DS-160 confirmation page.',
                    'I have reviewed the applicable visa fee requirements.',
                    'I have reviewed whether DS-156E applies to my case.',
                    'I have reviewed my interview or submission instructions.',
                    'I have reviewed the U.S. Embassy or Consulate instructions.',
                ],
            },
            {
                title: 'Final Check',
                items: [
                    'Treaty-country nationality has been reviewed.',
                    'Ownership structure is documented.',
                    'Investment funds are documented.',
                    'Source of funds is documented.',
                    'Business plan is complete.',
                    'Financial projections are organized.',
                    'Business operations are documented.',
                    'Application documents are organized.',
                ],
            },
        ],
        reminder:
            'This checklist provides general preparation guidance only. E-2 cases are highly case-specific. There is no single universal investment amount that guarantees E-2 qualification.',
    },
}
