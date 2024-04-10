import Image from "next/image"
import React, { FormEvent } from "react"
import { twMerge } from "tailwind-merge"

interface UserCardProps {
  usertype: "CLIENTE" | "UZER"
  onClick?: () => void
  isSelected?: boolean
}

export default function UserCard({
  usertype,
  onClick = (e?: FormEvent) => {
    e?.preventDefault()
  },
  isSelected,
}: UserCardProps) {
  function buttonForm(e: FormEvent) {
    e.preventDefault()
    onClick()
  }

  return (
    <button className="relative flex items-center justify-center h-full" onClick={buttonForm}>
      <div
        className={twMerge(
          "w-3/5 aspect-square bg-primary-blue rounded-br-full absolute top-0 left-0 opacity-100 hidden sm:block transition-all",
          usertype === "UZER" && "rounded-br-none rounded-tl-full top-auto left-auto bottom-0 right-0",
          isSelected && "opacity-0 sm:opacity-0"
        )}
      />
      <div
        className={twMerge(
          "w-fit bg-primary-purple flex flex-col justify-center items-center transition-transform sm:px-7 sm:py-4 px-4 py-2 gap-4 rounded-xl relative sm:m-5",
          isSelected && "border scale-110"
        )}
      >
        <div className="relative w-24 aspect-square">
          <Image
            src={`/images/icons/${usertype === "UZER" ? "uzer" : "cliente"}-white.png`}
            alt="cliente"
            className="object-contain   "
            fill
          />
        </div>

        <h1 className="text-white font-medium text-xl w-20 mx-auto">{usertype === "UZER" ? "Uzer" : "Cliente"}</h1>
      </div>
    </button>
  )
}
