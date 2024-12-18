"use client"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function ScrollToTop() {
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setCurrentScrollPosition(window.scrollY)
    }
    window.addEventListener("scroll", updatePosition)
    return () => {
      window.removeEventListener("scroll", updatePosition)
    }
  }, [])

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={twMerge(
        "fixed bottom-10 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black transition-opacity",
        currentScrollPosition > 100 ? "opacity-100" : "opacity-0",
      )}
    >
      <ArrowUp size={20} color="white" />
    </motion.button>
  )
}
