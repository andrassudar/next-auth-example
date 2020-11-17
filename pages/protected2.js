import Authenticated from '../components/authenticated'

export default function AuthenticatedPage() {
    // If session exists, display content
    return <Authenticated>Ez egy védett terület</Authenticated>
}
