"use client"

import api from "@/lib/api"
import { useState } from "react"

export default function EsqueciSenha() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api
      .post("/forgot-password", { email })
      .then((response) => {
        if (response.status === 200) {
          setMessage("O e-mail de redefinição foi enviado com sucesso.")
        } else {
          setMessage("O e-mail informado não existe.")
        }
      })
      .catch(() => {
        setMessage("O e-mail informado não existe.")
      })
  }

  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="flex w-[30%] flex-col items-center justify-center rounded-3xl bg-white p-10 font-Montserrat">
        <h1 className="text-lg font-semibold">Recuperação de Senha</h1>
        <ol className="my-4 list-decimal space-y-2 px-6 text-left text-gray-700">
          <li>Digite seu e-mail cadastrado no campo abaixo.</li>
          <li>Clique em &quot;Enviar&quot;.</li>
          <li>
            Verifique sua caixa de entrada. Se o e-mail estiver cadastrado, você receberá um link para redefinir sua
            senha.
          </li>
          <li>Acesse o link e siga as instruções para criar uma nova senha.</li>
        </ol>
        <form className="flex w-full flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded border p-2"
            required
          />
          <button type="submit" className="w-full rounded bg-azulao px-4 py-2 text-white">
            Enviar
          </button>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  )
}
