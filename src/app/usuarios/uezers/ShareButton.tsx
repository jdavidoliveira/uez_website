"use client"

import { Link } from "lucide-react"
import { toast } from "sonner"

export default function ShareButton() {
  function share() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.info("Link copiado!")
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
        className="flex aspect-square h-full items-center justify-center rounded-lg bg-[#535FFF] p-4 text-xl font-semibold text-white"
      >
        <Link className="size-full" />
      </button>
    </>
  )
}
