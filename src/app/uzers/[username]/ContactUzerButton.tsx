"use client"

import api from "@/lib/api"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

export default function ContactUzerButton({ id }: { id: string }) {
  const router = useRouter()

  async function realizarServico() {
    const { status, data } = await api
      .post(`/chat/create/${id}`)
      .then((res) => res)
      .catch((err: AxiosError) => ({ ...err, data: err.response?.data }))

    if (status !== 201) return router.push(`/chat?userChatId=${id}`)

    return router.push(`/chat?userChatId=${data.id}`)
  }

  return (
    <button
      title="Contate este uzer"
      onClick={realizarServico}
      className="bg-[#535FFF] px-24 h-full rounded-lg text-xl font-semibold text-white"
    >
      Contate já
    </button>
  )
}
