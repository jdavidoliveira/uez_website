"use client"

import api from "@/lib/api"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function TurnIntoUezerButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleContactUezer() {
    // const { status, data } = await api
    //   .post(`/chat/create/${id}`)
    //   .then((res) => res)
    //   .catch((err: AxiosError) => ({ ...err, data: err.response?.data }))

    // if (status !== 201) return router.push(`/chat?userChatId=${id}`)

    // return router.push(`/chat?userChatId=${data.id}`)
    toast("Em breve")
  }

  return (
    <button
      title="Contate este uezer"
      onClick={handleContactUezer}
      className="h-full rounded-lg bg-[#535FFF] px-20 text-xl font-semibold text-white"
    >
      Torne-se um Uezer
    </button>
  )
}
