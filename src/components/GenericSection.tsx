import React from "react"
import { twMerge } from "tailwind-merge"

export default function GenericSection({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <section className={twMerge("w-full px-16 flex flex-col items-center justify-around gap-8 mb-20", className)}>
      {children}
    </section>
  )
}
