"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Search() {
  const form = useForm()
  const searchParams = useSearchParams()

  useEffect(() => {
    const orderBy = searchParams.get("orderBy")
    const search = searchParams.get("search")

    if (orderBy) form.setValue("orderBy", orderBy)
    if (search) form.setValue("search", search)
  }, [searchParams, form.setValue])

  const handleSubmit = form.handleSubmit(async (data) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })
    const queryString = params.toString()
    const newUrl = `${window.location.pathname}?${queryString}`
    window.history.pushState(null, "", newUrl)
    window.location.reload()
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-fit w-1/2 items-center justify-center overflow-x-hidden rounded-lg border shadow-sm"
    >
      <div className="relative">
        <select
          className="h-full w-full rounded border-4 border-primary-gray bg-primary-gray px-2 py-1 text-xl font-medium"
          {...form.register("orderBy")}
        >
          <option value="default">Ordenar</option>
          <option value="newest">Mais recentes</option>
          <option value="older">Mais antigos</option>
          <option value="rentable">Mais rentáveis</option>
          <option value="norentable">Menos rentáveis</option>
        </select>
      </div>
      <div className="relative flex-1">
        <input
          {...form.register("search")}
          type="text"
          className="w-full px-3 py-1.5 text-xl outline-none"
          placeholder="Search..."
        />
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="size-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  )
}
