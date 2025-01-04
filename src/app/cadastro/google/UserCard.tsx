import Image from "next/image"
import React, { FormEvent } from "react"
import { twMerge } from "tailwind-merge"

interface UserCardProps {
  usertype: "CLIENTE" | "UEZER"
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
    <button className="relative flex h-full items-center justify-center" onClick={buttonForm}>
      <div
        className={twMerge(
          "absolute left-0 top-0 hidden aspect-square w-3/5 rounded-br-full bg-primary-blue opacity-100 transition-all sm:block",
          usertype === "UEZER" && "bottom-0 left-auto right-0 top-auto rounded-br-none rounded-tl-full",
          isSelected && "opacity-0 sm:opacity-0",
        )}
      />
      <div
        className={twMerge(
          "relative flex w-fit flex-col items-center justify-center gap-4 rounded-xl bg-primary-purple px-4 py-2 transition-transform sm:m-5 sm:px-7 sm:py-4",
          isSelected && "scale-110 border",
        )}
      >
        <div className="relative aspect-square w-24">
          <Image
            src={`/images/icons/${usertype === "UEZER" ? "uezer" : "cliente"}-white.png`}
            alt="cliente"
            className="object-contain   "
            fill
          />
        </div>

        <h1 className="mx-auto w-20 text-xl font-medium text-white">{usertype === "UEZER" ? "Uezer" : "Cliente"}</h1>
      </div>
    </button>
  )
}
