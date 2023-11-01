"use client"

import { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import ChatInterface from "@/types/Chat";
import { useAuth } from "@/contexts/Auth";

interface ChatProps {
    serverData_chat: ChatInterface[];
    serverData_user: unknown;

}

export default function Chat({ serverData_chat, serverData_user }: ChatProps) {

    const { userType } = useAuth();

    const [globalSelectedData, setGlobalSelectedData] = useState<ChatInterface | null>(null);

    return (
        <main className="w-full h-full bg-white flex items-center justify-center gap-2">
            <LeftSide userType={userType} userData={serverData_user} serverData={serverData_chat} setGlobalSelectedData={setGlobalSelectedData} globalSelectedData={globalSelectedData} />
            <RightSide userData={serverData_user} globalSelectedData={globalSelectedData} setGlobalSelectedData={setGlobalSelectedData} userType={userType} />
        </main>
    )
}