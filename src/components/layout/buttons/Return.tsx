"use client"

import { CornerDownLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"

export default function ReturnButton({ classname }: { classname?: string }) {
  const router = useRouter()
  const returnPage = () => {
    router.push("/")
  }
  return (
    <button
      onClick={returnPage}
      className={twMerge("flex items-center justify-center rounded-md bg-white/50 p-2", classname)}
      title="Voltar para a homepage"
    >
      <CornerDownLeft size={25} />
    </button>
  )
}
