import { useState, type FormEvent } from 'react'
import { submitInquiry, type SubmitStatus } from '../lib/forms'

export const ASK_VISA_TYPES = [
    'U.S. Tourist Visa',
    'U.S. Fiancé(e) Visa',
    'U.S. K-2 Visa',
    'U.S. J-1 Exchange Visitor Visa',
    'U.S. R-1 Religious Worker Visa',
    'U.S. R-2 Dependent Visa',
    'U.S. P-1 Visa',
    'U.S. P-2 Visa',
    'U.S. E-2 Treaty Investor Visa',
    'Not Sure Yet',
    'General Travel Question',
    'Other',
] as const

export type AskVisaType = (typeof ASK_VISA_TYPES)[number]

export type AskFields = {
    firstName: string
    lastName: string
    email: string
    visaType: string
    question: string
}

const emptyFields: AskFields = { firstName: '', lastName: '', email: '', visaType: '', question: '' }

/**
 * State for the Ask AVENtures form. Owned by the page so a draft or the confirmation
 * survives the form being remounted elsewhere in the layout.
 */
export function isAskVisaType(value: string | null | undefined): value is AskVisaType {
    return ASK_VISA_TYPES.some((type) => type === value)
}

/** `initialVisaType` is ignored unless it is one of `ASK_VISA_TYPES`. */
export function useAskForm(initialVisaType?: string | null) {
    const [fields, setFields] = useState<AskFields>(() => ({
        ...emptyFields,
        visaType: isAskVisaType(initialVisaType) ? initialVisaType : '',
    }))
    const [status, setStatus] = useState<SubmitStatus>('idle')

    const setField = (name: keyof AskFields, value: string) => setFields((current) => ({ ...current, [name]: value }))

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('sending')
        const result = await submitInquiry(event.currentTarget, { kind: 'question', ...fields })
        if (result === 'error') {
            setStatus('error')
            return
        }
        setFields(emptyFields)
        setStatus('sent')
    }

    const reset = () => setStatus('idle')

    return { fields, setField, status, submit, reset }
}

export type AskForm = ReturnType<typeof useAskForm>
