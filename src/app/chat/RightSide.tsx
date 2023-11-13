"use client"

import ChatInterface, { Messages as Message } from '@/types/Chat';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import MessageBar from './MessageBar';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import MessageItem from './Message/Message';
// import bg from '@/../public/images/default-chat-background.png';

interface RightSideProps {
    globalSelectedData: ChatInterface | null;
    setGlobalSelectedData: Dispatch<SetStateAction<ChatInterface | null>>;
    userType: 'uzer' | 'cliente';
    userData: any;
}

export default function RightSide({ globalSelectedData, userType, setGlobalSelectedData, userData }: RightSideProps) {
    useEffect(() => {
        scrollToBottom();
    }, [globalSelectedData])
    function scrollToBottom() {
        const chatContainer = document.getElementById("chat-container");
        // @ts-ignore
        if (chatContainer) chatContainer.scrollTop = chatContainer?.scrollHeight;
    }
    return globalSelectedData ? (
        <section className={twMerge("md:flex-1 md:flex flex h-full bg-cinzero flex-col relative", globalSelectedData ? "flex w-full" : "hidden")}>
            <header className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-[2] w-full">
                <div className="flex items-center gap-2">
                    <Image src={userType === "cliente" ? globalSelectedData.photo : globalSelectedData.photo} width={60} height={60} alt="Icone do Usuario" className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col items-start">
                        <Link title='Abrir Perfil' href={userType === "cliente" ? `/uzers/${globalSelectedData.uzerId}` : `/clientes/${globalSelectedData.clienteId}`} className="text-lg font-bold">{userType === "cliente" ? globalSelectedData?.uzerName : globalSelectedData?.clienteName}</Link>
                        <h2 className="text-base font-medium">{userType === "cliente" ? globalSelectedData?.uzerService : "Cliente"}</h2>
                    </div>
                </div>
                <button className="text-base font-bold p-2 bg-azulao rounded-xl text-white flex items-center justify-center" onClick={(e) => {
                    e.preventDefault();
                    setGlobalSelectedData(null);
                }}><Cross2Icon color='white' width={30} height={30} /></button>
            </header>
            <main className="flex-1 overflow-auto py-1 flex flex-col gap-2 relative" id='chat-container'>
                <Image src="/images/default-chat-background.png" priority className='h-full md:w-2/3 w-full object-cover fixed top-0' width={5144} height={5144} alt='Background' />
                {globalSelectedData && globalSelectedData.messages.map((message, index) => (
                    <MessageItem key={index} {...message} userType={userType} content={message.content} sendHour={message.sendHour} userData={userData} globalSelectedData={globalSelectedData} type={message.type}  />
                ))
                }
            </main>
            <MessageBar chatId={globalSelectedData._id} userType={userType} senderId={userData._id} globalSelectedData={globalSelectedData} setGlobalSelectedData={setGlobalSelectedData} />
        </section >
    ) : (
        <main className="flex-1 h-full flex items-center justify-center bg-cinzero">
            <Image
                src="/images/black_logo.svg"
                width={200}
                height={200}
                alt="Logo da UEZ"
            />
        </main>
    )

    

}
