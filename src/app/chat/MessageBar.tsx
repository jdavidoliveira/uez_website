'use client'

import { Banknote, Send } from "lucide-react";
import { useState } from "react";

export default function MessageBar({setGlobalSelectedData}: {setGlobalSelectedData: any}) {
    const [message, setMessage] = useState('')

    async function sendMessage(e: any) {
        e.preventDefault();
        setGlobalSelectedData((prevState: any) => ({
            ...prevState,
            messages: [
                ...prevState.messages,
                {
                    content: message,
                    _id: Math.random().toString(),
                    sendDate: '30/12/2023',
                    senderId: 'uehduehd230243na34jnn',
                    sendHour: new Date().toLocaleTimeString().slice(0, 5),
                }
            ]
        }))
        await setMessage('')
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