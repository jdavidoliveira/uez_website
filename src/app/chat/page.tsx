import { useFetch } from "@/hooks/useFetch";
import { cookies } from "next/headers";
import Link from "next/link";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import Chat from "./Chat";
import ChatInterface from "@/types/Chat";

export default async function ChatPage() {
    const token = cookies().get("uezaccesstoken");
    const userData = await useFetch("/users/me", { headers: { Authorization: `Bearer ${token?.value}` } }).then(res => res).catch(err => []);
    const chatData = await useFetch<ChatInterface[] | []>("/chats", { 
        headers: { 
            Authorization: `Bearer ${token?.value}` 
        },
    }).then(res => res).catch(err => []);

    

    if (!token) {
        return (
            <main className="w-full h-full text-center flex flex-col items-center justify-center gap-2">
                <h1 className="text-4xl">Chat em Desenvolvimento!</h1>
                <p className="text-xl">Previsão de entrega: <code className="bg-slate-300 rounded p-1">18/11/2023</code></p>
                <Link href={"/"} className="text-xl font-bold text-sky-700 hover:underline">Voltar para a homepage</Link>
            </main>
        )
    }

    return (
        <Chat serverData_chat={chatData} serverData_user={userData} />
    )
}
