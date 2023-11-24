"use client"

import sendNotification from "@/hooks/sendNotification"
import { useFetch as myUseFetch } from "@/hooks/useFetch"
import Chat from "@/types/Chat"
import { useRouter } from "next/navigation"
import { parseCookies } from "nookies"

export default function SendMesageButton({ id }: { id: string }) {

    const router = useRouter()

    return (
        <button onClick={() => realizarServico(id)} className="text-xl font-bold bg-azulao rounded-xl p-3 px-6 text-white flex items-center mt-10 justify-center hover:bg-roxazul transition-colors">
            Enviar Mensagem
        </button>
    )

    function realizarServico(requestedContactId: string) {

        myUseFetch<Chat>(`/chat/create/${requestedContactId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${parseCookies().uezaccesstoken}`
            },
        })
            .then(async res => {
                await sendNotification("solicitCliente", `Cliente mandou mensagem para você!`, requestedContactId)
                router.push(`/chat?userChatId=${res._id}`)
            })
            .catch(err => console.error(err))


    }
}

