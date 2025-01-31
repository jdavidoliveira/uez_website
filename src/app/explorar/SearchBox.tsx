"use client"

import { ChevronDown, Search } from "lucide-react"
import { FormEvent, useState } from "react"

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [categoryQuery, setCategoryQuery] = useState<string>("ALL")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    alert(`Categoria: ${categoryQuery}\nBusca: ${searchQuery}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-1/2 justify-center rounded-xl shadow-xl">
      <div className="relative flex items-center justify-center">
        <select
          name="filter"
          id="filter"
          value={categoryQuery}
          //   onSelect={(e) => setCategoryQuery(e.currentTarget.value)}
          onChange={(e) => setCategoryQuery(e.currentTarget.value)}
          className="h-full w-48 appearance-none rounded-l-xl border-none bg-[#E6E6E6] py-2 pl-4 text-lg font-medium outline-none"
        >
          <option value="ALL">Tudo</option>
          <option value="PROGRAMACAO">Programação</option>
          <option value="SOCIAL_MEDIA">Social Media</option>
          <option value="VIDEO_MAKING">Video Making</option>
          <option value="DESIGN">Design</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full items-center justify-center bg-[#E6E6E6] pr-2">
          <ChevronDown />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          className="h-full w-full appearance-none px-5 outline-none"
        />
        <button type="submit" className="flex h-full items-center justify-center p-3">
          <Search className="opacity-40" />
        </button>
      </div>
    </form>
  )
}
