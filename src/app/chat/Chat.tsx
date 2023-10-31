"use client"

import { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import ChatInterface from "@/types/Chat";
import { useAuth } from "@/contexts/Auth";

interface ChatProps {
    serverData: ChatInterface[];
}

export default function Chat({ serverData }: ChatProps) {

    const { userType } = useAuth();

    const [globalSelectedData, setGlobalSelectedData] = useState<ChatInterface | null>(null);

    return (
        <main className="w-full h-full bg-white flex items-center justify-center gap-2">
            <LeftSide userType={userType} serverData={serverData} setGlobalSelectedData={setGlobalSelectedData} globalSelectedData={globalSelectedData} />
            <RightSide globalSelectedData={globalSelectedData} setGlobalSelectedData={setGlobalSelectedData} userType={userType} />
        </main>
    )
}