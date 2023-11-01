'use client'

import { Banknote, Send } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useFetch as myUseFetch } from "@/hooks/useFetch";
import Chat, { Messages } from "@/types/Chat";
import { parseCookies } from "nookies";

interface MessageBarProps {
    setGlobalSelectedData: Dispatch<SetStateAction<Chat | null>>
    userType: 'uzer' | 'cliente'
    senderId: string
    chatId: string
}

export default function MessageBar({ setGlobalSelectedData, userType, senderId, chatId }: MessageBarProps) {
    const [message, setMessage] = useState('')

    async function sendMessage(e: any) {
        e.preventDefault();
        const newMessage = await myUseFetch<Messages | null>("/chat/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${parseCookies().uezaccesstoken}`,
            },
            body: JSON.stringify({
                chatId: chatId,
                message: message,
                sendDate: new Date().toLocaleDateString(),
                sendHour: new Date().toLocaleTimeString(),

            })
        }).then(res => {
            console.log(res)
            return res
        })
            .catch(err => {
                console.error(err)
                return null
            })


            await setGlobalSelectedData((prevState: any) => ({
                ...prevState,
                messages: [
                    ...prevState.messages,
                    {
                        content: newMessage?.content,
                        sendDate: newMessage?.sendDate,
                        senderId: newMessage?.senderId,
                        sendHour: newMessage?.sendHour,
                    }
                ]
            }))

        await setMessage('')
        scrollToBottom()
        function scrollToBottom() {
            const chatContainer = document.getElementById("chat-container");
            // @ts-ignore
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        // Após adicionar a nova mensagem, role para o final
        scrollToBottom();
    }
    return (
        <form className="w-full flex border-t items-center justify-between p-2 gap-2 bg-white sticky bottom-0 z-20">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite aqui..." className="w-full h-10 px-3 py-6 text-lg outline-none" />
            <div className="flex gap-2">
                <button type='button' className="bg-azulinho h-12 w-12 hover:bg-azulinho/60 transition-colors text-white p-3 rounded-lg flex items-center justify-center" title='Enviar Orçamento'><Banknote size={24} /></button>
                <button type='submit' onClick={sendMessage} className="bg-azulinho h-12 w-12 hover:bg-azulinho/60 transition-colors text-white p-3 rounded-lg flex items-center justify-center" title='Enviar Mensagem'><Send size={24} /></button>
            </div>
        </form>
    )
}