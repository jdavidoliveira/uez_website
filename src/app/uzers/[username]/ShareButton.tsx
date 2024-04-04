"use client"

import { Link } from "lucide-react"
import { toast } from "sonner"

export default function ShareButton() {
  function share() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log(window.location.href)
        toast("Link copiado!")
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <button
        title="Compartilhar"
        onClick={share}
        className="bg-[#535FFF] p-4 h-full aspect-square flex items-center justify-center rounded-lg text-xl font-semibold text-white"
      >
        <Link size={50} />
      </button>
    </>
  )
}
