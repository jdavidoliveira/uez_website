import { TriangleAlert } from "lucide-react"
import React from "react"

export default function ReportButton() {
  return (
    <button
      title="Denunciar usuário"
      className="flex w-fit items-center gap-2 rounded-lg p-2 transition-colors hover:border hover:border-[#ff0000]"
    >
      <TriangleAlert size={30} color="#ff0000" />
      <span className="text-xl font-medium text-[#ff0000]">Denunciar</span>
    </button>
  )
}
