import React from 'react'

export default function GenericSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full px-16 flex flex-col items-center justify-around gap-8">
            {children}
        </section>
    )
}
