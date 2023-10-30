"use client"

import { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

interface ChatProps {
    serverData: any;
}

export default function Chat({serverData}: ChatProps) {

    const [globalSelectedId, setGlobalSelectedId] = useState<string>();
    const [globalSelectedData, setGlobalSelectedData] = useState<any>();

    return (
        <main className="w-full h-full bg-white flex items-center justify-center gap-2">
            <LeftSide globalSelectedId={globalSelectedId} setGlobalSelectedId={setGlobalSelectedId}  />
            <RightSide globalSelectedId={globalSelectedId} />
        </main>
    )
}