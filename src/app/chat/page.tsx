import { useFetch } from "@/hooks/useFetch";
import { cookies } from "next/headers";
import Link from "next/link";
import LeftSide from "./LeftSide";

export default async function Chat() {
    const token = cookies().get("uezaccesstoken");
    const chatData = await useFetch("users/me", { headers: { Authorization: `Bearer ${token?.value}` } });
    
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
        <main className="w-full h-full bg-white flex items-center justify-center gap-2">
            <LeftSide />
            <section className="flex-1 h-full bg-cinzero ">
            </section>
        </main>
    )
}
