"use client"

import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons"
import { twMerge } from "tailwind-merge"

interface MiniModalProps {
  message: string
  closeFunction?: () => void
  type?: "error" | "warning" | "success"
  messageProfession?: string
}
export default function MiniModal({
  message,
  closeFunction = () => {},
  type = "error",
  messageProfession,
}: MiniModalProps) {
  return (
    <div
      className={twMerge(
        "fixed bottom-8 right-6 flex items-center justify-between gap-6 bg-red-600 font-bold text-white",
        `${type === "error" && "bg-red-600"}`,
      )}
    >
      <span className="ml-2 space-x-3 p-2">
        {messageProfession && <span className="text-xl font-bold underline">{messageProfession}</span>}
        <span className="text-lg font-medium">{message}</span>
      </span>
      <button
        className="p-2 hover:bg-white/20"
        onClick={(e) => {
          e.preventDefault()
          closeFunction()
        }}
      >
        <Cross2Icon width={30} height={30} />
      </button>
    </div>
  )
}
