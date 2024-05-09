import React from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  return <main className="w-full flex flex-col items-center justify-center">{children}</main>
}

export function Titulozinho({ children }: { children: React.ReactNode }) {
  return <h2 className="font-bold">{children}</h2>
}

export function Paragrafozinho({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}
