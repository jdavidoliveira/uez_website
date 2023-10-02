"use client"

import { AuthProvider } from './Auth'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
