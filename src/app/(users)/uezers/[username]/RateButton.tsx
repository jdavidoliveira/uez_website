"use client"

import { Star } from "lucide-react"

export default function RateButton() {
  return (
    <button className="absolute right-10 -top-10 group">
      <Star size={32} color="#00003b" className="group-hover:hidden" />
      <Star size={32} color="#00003b" fill="#00003b" className="hidden group-hover:block" />
    </button>
  )
}
