import LegalPage from '../components/layout/LegalPage'
import { useSitePage } from '../hooks/useSitePage'

export default function Terms() {
    const content = useSitePage('terms')
    return <LegalPage path="/terms" title="Terms & Conditions" content={content} />
}
