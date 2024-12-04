"use client"

import { CornerDownLeft } from "lucide-react"
import { twMerge } from "tailwind-merge"

export default function ReturnButton({ classname }: { classname?: string }) {
  const returnPage = () => {
    window.history.back()
  }
  return (
    <button
      onClick={returnPage}
      className={twMerge("flex items-center justify-center rounded-md bg-white/50 p-2", classname)}
    >
      <CornerDownLeft size={25} />
    </button>
  )
}
