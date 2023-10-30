import ChatInterface, { Messages as Message } from '@/types/Chat';
import { twMerge } from 'tailwind-merge';

interface RightSideProps {
    globalSelectedData: ChatInterface | null;
    userType: 'uzer' | 'cliente';
}

export default function RightSide({ globalSelectedData, userType }: RightSideProps) {
    return (
        <section className="flex-1 h-full bg-cinzero flex flex-col gap-2 overflow-auto ">
            <header className="bg-white p-4 flex items-center justify-between w-full">
                <div className="flex flex-col items-start">
                    <h1 className="text-lg font-bold">{userType === "cliente" ? globalSelectedData?.uzerName : globalSelectedData?.clienteName}</h1>
                    <h2 className="text-base font-medium">{globalSelectedData?.uzerService}</h2>
                </div>
            </header>
            {globalSelectedData && globalSelectedData.messages.map((message) => (
                <MessageItem key={message._id} {...message} content={message.content} sendHour={message.sendHour} />
            ))}
        </section>
    )

    function MessageItem({ content, sendHour, ...props }: Message) {
        return (
            <div className={twMerge("w-full flex items-center justify-end", userType === "cliente" ? "justify-end" : "justify-start")}>
                <div className="bg-azulinho w-fit flex rounded-2xl p-4 text-white items-center justify-center">
                    {content}
                </div>
            </div>

        )
    }
}

