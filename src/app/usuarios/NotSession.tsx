"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

export default function NotSession() {
  const [isClosed, setIsClosed] = useState(false)
  const session = useSession()

  return (
    session.status === "unauthenticated" && (
      <motion.div
        className="fixed bottom-0 w-full border-t border-black/10 bg-white"
        animate={{
          height: isClosed ? "1.3rem" : "8rem",
        }}
        initial={false}
        transition={{ duration: 0.4 }}
      >
        <button
          className="absolute left-1/2 top-[-1rem] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-black/20 bg-white shadow"
          onClick={() => setIsClosed(!isClosed)}
        >
          <ChevronDown className={`transition-transform ${isClosed ? "rotate-180" : "rotate-0"}`} />
        </button>
        {!isClosed && (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 px-32 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-center text-lg font-semibold">
              Entre ou cadastre-se na uez para se conectar com clientes ou uezers e usar nossa plataforma ao seu favor.
            </h1>
            <div className="flex items-center justify-center gap-6">
              <Link
                href="/login?redirectToLastPage=true"
                className="w-64 rounded-lg bg-primary-blue py-2.5 text-center text-lg font-semibold text-white"
              >
                Entrar
              </Link>
              <span className="my-auto text-center text-lg font-medium">ou</span>
              <Link
                href="/cadastro"
                className="w-64 rounded-lg bg-green-600 py-2.5 text-center text-lg font-semibold text-white"
              >
                Criar nova conta
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  )
}
