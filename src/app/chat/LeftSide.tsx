"use client"

import VoltarButton from "@/components/VoltarButton/VoltarButton";
import ChatInterface from "@/types/Chat";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface LeftSideProps {
    globalSelectedData: ChatInterface | null;
    setGlobalSelectedData: Dispatch<SetStateAction<ChatInterface | null>>;
    serverData: ChatInterface[];
    userType: 'uzer' | 'cliente';
    userData: any;
}

export default function LeftSide({ globalSelectedData, setGlobalSelectedData, serverData, userType, userData }: LeftSideProps) {
    useEffect(() => {
        refreshGlobalSelectedData()
    }, [serverData])

    function refreshGlobalSelectedData() {
        // @ts-ignore
        setGlobalSelectedData((prevState: ChatInterface | null) => {
            return serverData.find((chat: ChatInterface) => {
                return chat._id === prevState?._id
            })
        })
    }

    function scrollToBottom() {
        const chatContainer = document.getElementById("chat-container");
        // @ts-ignore
        if (chatContainer) chatContainer.scrollTop = chatContainer?.scrollHeight;
    }

    return (
        <section className={twMerge("md:w-2/6 w-full h-full flex flex-col items-center border-r", globalSelectedData ? "hidden md:flex" : "flex")} >
            <div className="w-full flex items-center p-5 relative">
                <div className="w-full flex flex-col items-start gap-2">
                    <Image
                        src={userData.photoUrl || "data:image/png;base64,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"}
                        width={100}
                        height={100}
                        alt="Icone do Usuario"
                        className="rounded-full w-1/4 mdscreen:w-1/5 mobile:w-1/5 max-w-7xl aspect-square object-cover bg-cinzero border "
                    />
                    <h1 className="text-lg font-bold text-center">{userData.nome}</h1>
                </div>
                    <VoltarButton className="absolute right-5 top-5 left-auto z-[2] mobile:bottom-8 mobile:fixed mobile:right-7 mobile:top-auto mobile:left-auto mobile:rounded-full" />
            </div>
            <div className="w-full flex flex-col overflow-auto scroll">
                <h1 className="text-lg font-bold text-center py-4 border-b sticky">Faça serviços com eles de novo!</h1>
                {serverData ? serverData?.map((item) => (
                    <UserChatItem
                        key={item._id}
                        photo={item.photo ?? "/images/default-chat-background.png"}
                        name={userType === "cliente" ? item.uzerName : item.clienteName}
                        lastMessage={item.messages[item.messages.length - 1]?.content ?? ""}
                        data={item}
                    />
                )) : <h1 className="text-base font-medium text-center py-4 ">Você não iniciou nenhuma conversa ainda😭</h1>}

            </div>
        </section >)

    interface UserChatItemProps {
        photo: string,
        name: string,
        lastMessage: string,
        key: string,
        data: ChatInterface

    }

    function UserChatItem({ photo, name, lastMessage, data }: UserChatItemProps) {
        return (
            <div className={twMerge("w-full h-16 flex bg-white hover:bg-cinzero border-b cursor-pointer", globalSelectedData?._id === data._id ? "bg-cinzero" : "")} onClick={() => {
                globalSelectedData?._id === data._id ? setGlobalSelectedData(null) : setGlobalSelectedData(data)
            }}>
                <div className="h-full aspect-square flex items-center justify-center p-2">
                    <Image
                        src={photo}
                        width={100}
                        height={100}
                        alt="Icone do Usuario"
                        className="w-full aspect-square rounded-full"
                    />
                </div>
                <div className="flex-1 flex flex-col p-2">
                    <h1 className="font-bold text-sm lg:text-base">{name}</h1>
                    <h2 className="text-sm">{lastMessage.length > 40 ? lastMessage.substring(0, 40) + "..." : lastMessage}</h2>
                </div>
            </div>
        )
    }

}
