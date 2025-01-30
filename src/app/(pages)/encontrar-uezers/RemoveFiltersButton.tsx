"use client"
import { useRouter } from "next/navigation"

export default function RemoveFiltersButton() {
  const router = useRouter()

  function handleRemoveFilter() {
    const url = new URL(window.location.href)
    url.search = ""
    router.push(url.toString())
  }
  return (
    <button
      className="rounded bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600"
      onClick={handleRemoveFilter}
    >
      Remover filtros
    </button>
  )
}
