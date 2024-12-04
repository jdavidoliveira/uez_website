"use client"

import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons"
import { twMerge } from "tailwind-merge"

interface MiniModalProps {
    message: string
    closeFunction?: () => void
    type?: "error" | "warning" | "success"
    messageCategory?: string
}
export default function MiniModal({ message, closeFunction = () => {}, type = "error", messageCategory }: MiniModalProps) {

    return (
        <div className={twMerge("fixed bottom-8 right-6 font-bold text-white gap-6 bg-red-600 flex items-center justify-between", `${type === "error" && "bg-red-600"}`)}>
            <span className="p-2 ml-2 space-x-3">
                {messageCategory && <span className="underline font-bold text-xl">{messageCategory}</span>}
                <span className="font-medium text-lg">{message}</span>
            </span>
            <button className="hover:bg-white/20 p-2" onClick={(e) => {
                e.preventDefault()
                closeFunction()
            }}>
                <Cross2Icon width={30} height={30} />
            </button>
        </div>
    )
}
