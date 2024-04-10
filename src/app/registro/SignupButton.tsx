"use client"

import React from "react"
import { twMerge } from "tailwind-merge"

interface SignupButtonProps {
  content: string
  icon: any
  className?: string
  spanClassName?: string
  onClick?: () => void
}

export default function SignButton({ content, icon, className, spanClassName, onClick = () => {} }: SignupButtonProps) {
  return (
    <button
      className={twMerge(
        "border border-black/20 shadow-[5px_5px_10px_0_rgba(0,0,0,0.25)] px-4 py-2 rounded-lg flex justify-center items-center gap-2",
        className
      )}
      onClick={onClick}
      title={content}
    >
      {icon} <span className={twMerge("font-semibold text-black/50", spanClassName)}>{content}</span>{" "}
    </button>
  )
}
