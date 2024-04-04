"use client"

import { CornerDownLeft } from "lucide-react"
import { twMerge } from "tailwind-merge"

export default function ReturnButton2({ classname }: { classname?: string }) {
  const returnPage = () => {
    window.history.back()
  }
  return (
    <button
      onClick={returnPage}
      className={twMerge("bg-white/50 flex justify-center items-center p-2 rounded-md", classname)}
    >
      <CornerDownLeft size={25} />
    </button>
  )
}
