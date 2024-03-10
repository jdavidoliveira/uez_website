"use client"

import { FormEvent, useState } from "react"
import { createPortal } from "react-dom"
import FormNewsLetter from "./Form"

export default function NewsLetterButton({
  children,
  icon,
  onOpen,
}: {
  children: React.ReactNode
  icon: any
  onOpen: () => void
}) {
  function openForm(e: FormEvent) {
    e.preventDefault()
    onOpen()
  }

  return (
    <button
      onClick={openForm}
      className="flex justify-center items-center gap-3 bg-gradient-to-tr from-[#535FFF] to-[#2a14b7] transition hover:opacity-90 py-3 px-4 rounded-3xl text-white"
    >
      {icon}
      <span className="text-xl font-normal">{children}</span>
    </button>
  )
}
