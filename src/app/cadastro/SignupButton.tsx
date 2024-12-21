"use client"

import React, { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface SignupButtonProps extends ComponentProps<"button"> {
  content: string
  icon: any
  className?: string
  spanClassName?: string
  onClick?: () => void
}

export default function SignButton({ content, icon, className, spanClassName, ...props }: SignupButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-lg border border-black/20 px-4 py-2 shadow-[5px_5px_10px_0_rgba(0,0,0,0.25)]",
        className,
      )}
      title={content}
    >
      {icon} <span className={twMerge("font-semibold text-black/50", spanClassName)}>{content}</span>{" "}
    </button>
  )
}
