import { TriangleAlert } from "lucide-react"
import React from "react"

export default function DenunciarButton() {
  return (
    <button
      title="Denunciar usuário"
      className="flex items-center w-fit p-2 gap-2 hover:border hover:border-[#ff0000] transition-colors rounded-lg"
    >
      <TriangleAlert size={30} color="#ff0000" />
      <span className="text-xl text-[#ff0000] font-medium">Denunciar</span>
    </button>
  )
}
