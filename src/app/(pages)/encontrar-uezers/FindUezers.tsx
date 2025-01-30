import { Uezer } from "@/types/Uezer"
import React from "react"
import Search from "./Search"
import UezerContainer from "./UezerContainer"

interface FindUezersProps {
  uezers: Uezer[]
}

export default function FindUezers({ uezers }: FindUezersProps) {
  return (
    <div className="mt-20 flex min-h-screen w-full flex-col items-center">
      <div className="relative flex w-10/12 flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
        <Search />
      </div>
      <UezerContainer uezers={uezers} />
    </div>
  )
}
