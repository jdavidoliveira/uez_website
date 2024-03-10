"use client"

import { FormEvent, useState } from "react"
import "animate.css"
import { X } from "lucide-react"

export default function FormNewsLetter({ closeFunction }: { closeFunction: () => void }) {
  const [email, setEmail] = useState<string>("")

  async function enviarNewsletter(event: FormEvent) {
    event.preventDefault()
    alert(email)
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50">
      <form
        onSubmit={enviarNewsletter}
        className="bg-white px-6 py-10 animate__animated animate__slideInUp relative w-2/5 border border-black flex flex-col justify-around items-center gap-10 rounded-xl"
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            closeFunction()
          }}
          className="flex justify-center items-center absolute top-2 right-2"
        >
          <X size={50} />
        </button>
        <h1 className="text-xl font-bold uppercase">Preencha com seu email para receber avisos!</h1>
        <div className="flex justify-center items-center gap-4 w-full">
          <label htmlFor="email" className="text-xl font-medium">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="border-2 border-black/25 focus:border-black rounded-lg w-1/2 p-2 text-xl"
          />
        </div>
        <button
          type="submit"
          className="transition p-4 text-xl bg-gradient-to-tr from-[#535FFF] to-[#2a14b7] hover:opacity-90  text-white rounded-xl font-bold"
        >
          INSCREVER-SE
        </button>
      </form>
    </div>
  )
}
