import React from "react"
import { twMerge } from "tailwind-merge"

interface ErrorSpanProps {
  content: any
  className?: string
}

export default function ErrorSpan({ content, className }: ErrorSpanProps) {
  return <span className={twMerge("text-red-500 font-medium text-sm", className)}>{content}</span>
}
