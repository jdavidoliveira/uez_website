"use client"

import { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import ChatInterface from "@/types/Chat";
import { useAuth } from "@/contexts/Auth";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { parseCookies } from "nookies";

interface ChatProps {
    serverData_chat: ChatInterface[];
    serverData_user: unknown;

}

export default function Chat({ serverData_chat, serverData_user }: ChatProps) {
    const [globalSelectedData, setGlobalSelectedData] = useState<ChatInterface | null>(null);
    const [chatsData, setChatsData] = useState<ChatInterface[]>(serverData_chat)

    const userChatId = useSearchParams().get('userChatId')

    async function refreshData() {
        const refreshedChatData = await useFetch<ChatInterface[] | []>("/chats", {
            headers: {
                Authorization: `Bearer ${parseCookies().uezaccesstoken}`
            },
        }).then(res => res).catch(err => []);
        if (JSON.stringify(refreshedChatData) === JSON.stringify(chatsData)) {
            console.log("Não há novas mensagens")
            return
        } else {
            console.log("Nova mensagem")
            return setChatsData(refreshedChatData)
        }
    }

    useEffect(() => {
        if (userChatId) {
            const data: ChatInterface | any = serverData_chat.find((chat: ChatInterface) => {
                return chat._id === userChatId
            })
            setGlobalSelectedData(data)
        }
    }, [])

     // Refresh data periodically
     useEffect(() => {
        const refreshInterval = setInterval(() => {
            refreshData();
        }, 1000 * 2); // 2 segundos
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    const { userType } = useAuth();

    return (
        <main className="w-full h-full bg-white flex items-center justify-center">
            <LeftSide userType={userType} userData={serverData_user} serverData={chatsData} setGlobalSelectedData={setGlobalSelectedData} globalSelectedData={globalSelectedData} />
            <RightSide userData={serverData_user} globalSelectedData={globalSelectedData} setGlobalSelectedData={setGlobalSelectedData} userType={userType} />
        </main>
    )
}