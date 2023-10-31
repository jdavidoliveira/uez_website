import ChatInterface, { Messages as Message } from '@/types/Chat';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import MessageBar from './MessageBar';
import { Dispatch, SetStateAction } from 'react';
// import bg from '@/../public/images/default-chat-background.png';

interface RightSideProps {
    globalSelectedData: ChatInterface | null;
    setGlobalSelectedData: Dispatch<SetStateAction<ChatInterface | null>>;
    userType: 'uzer' | 'cliente';
}

export default function RightSide({ globalSelectedData, userType, setGlobalSelectedData }: RightSideProps) {
    return globalSelectedData ? (
        <section className="flex-1 h-full bg-white flex flex-col relative">
            <header className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-20 w-full">
                <div className="flex flex-col items-start">
                    <h1 className="text-lg font-bold">{userType === "cliente" ? globalSelectedData?.uzerName : globalSelectedData?.clienteName}</h1>
                    <h2 className="text-base font-medium">{globalSelectedData?.uzerService}</h2>
                </div>
            </header>
            <main className="flex-1 overflow-auto py-1 flex flex-col gap-2 relative" id='chat-container'>
                <Image src="/images/default-chat-background.png" priority className='h-full w-2/3 object-cover fixed top-0' width={5144} height={5144} alt='Background' />
                {globalSelectedData && globalSelectedData.messages.map((message) => (
                    <MessageItem key={message._id} {...message} content={message.content} sendHour={message.sendHour} />
                ))
                }
            </main>
            <MessageBar setGlobalSelectedData={setGlobalSelectedData} />
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

    function MessageItem({ content, sendHour, ...props }: Message) {
        return (
            <div className={twMerge("w-full px-2 flex items-center z-10 justify-end", globalSelectedData?.clienteId === props.senderId ? "justify-end" : "justify-start")}>
                <div className={twMerge("bg-azulinho border w-fit max-w-[55%] flex flex-col rounded-2xl p-4 text-white items-center justify-center", globalSelectedData?.clienteId === props.senderId ? "bg-azulinho justify-end" : "bg-white text-black justify-start")}>
                    <h1 className="">
                        {content}
                    </h1>
                    <div className={twMerge("w-full text-xs flex ", globalSelectedData?.clienteId === props.senderId ? "justify-end" : "justify-start")}>
                        <h2>
                            {sendHour}
                        </h2>
                    </div>
                </div>
            </div>

        )
    }
}
