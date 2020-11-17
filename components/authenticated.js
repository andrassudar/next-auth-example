import { useState, useEffect, Children } from 'react'
import { useSession } from 'next-auth/client'
import Layout from './layout'
import AccessDenied from './access-denied'

export default function Authenticated({ children }) {
    const [session, loading] = useSession()

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return <h5>loading...</h5> //null

    // If no session exists, display access denied message
    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        )
    }

    // If session exists, display content
    return <Layout>{children}</Layout>
}
