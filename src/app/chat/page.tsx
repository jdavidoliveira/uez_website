import { useFetch } from "@/hooks/useFetch";
import { cookies } from "next/headers";
import Link from "next/link";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Chat from "./Chat";
import ChatInterface from "@/types/Chat";

// interface UserChat {
//     _id: string;
//     photo: string;
//     clienteName: string;
// clienteId: 'uehduehd230243na34jnn',
// createdAt: '30/12/2023',

//     lastMessage: string;
//     userType: 'uzer' | 'cliente';
// }

// const data: ChatInterface[] = [
//     {
//         _id: "1",
//         photo: '/images/cliente.png',
//         clienteName: 'Ademar Campos',
//         clienteId: 'uehduehd230243na34jnn',
//         createdAt: '30/12/2023',
//         uzerId: 'uehduehd230243na34jnn',
//         uzerName: 'Ademar Campos',
//         messages: [
//             {
//                 content: 'Bom dia!',
//                 _id: "1",
//                 sendDate: '30/12/2023',
//                 senderId: 'uehduehd230243na34jnn',
//                 sendHour: '12:00',
//             },{
//                 content: 'Tudo bem?',
//                 _id: "2",
//                 sendDate: '30/12/2023',
//                 senderId: 'uehduehd230243na34jnn',
//                 sendHour: '12:01',

//             }
//         ]

//     },{
//         _id: "2",
//         photo: '/images/cliente.png',
//         clienteName: 'Ademar Campos',
//         clienteId: 'uehduehd230243na34jnn',
//         createdAt: '30/12/2023',
//         uzerId: 'uehduehd230243na34jnn',
//         uzerName: 'Ademar Campos',
//         messages: [
//             {
//                 content: 'Bom dia!',
//                 _id: "1",
//                 sendDate: '30/12/2023',
//                 senderId: 'uehduehd230243na34jnn',
//                 sendHour: '12:00',

//             }
//         ]

//     },
// ];
const data: ChatInterface[] = [
    {
        _id: "1",
        photo: '/images/cliente.png',
        clienteName: 'Ademar Campos',
        clienteId: 'uehduehd230243na34jnn',
        createdAt: '30/12/2023',
        uzerId: 'kkkkko34kd943',
        uzerService: 'Pedreiro',
        uzerName: 'Felipe Campos',
        messages: [
            {
                content: 'Bom dia!',
                _id: "1",
                sendDate: '30/12/2023',
                senderId: 'uehduehd230243na34jnn',
                sendHour: '12:00',
            },{
                content: 'Tudo bem?',
                _id: "2",
                sendDate: '30/12/2023',
                senderId: 'uehduehd230243na34jnn',
                sendHour: '12:01',

            },{
                content: 'Sim, e você?',
                _id: "3",
                sendDate: '30/12/2023',
                senderId: 'kkkkko34kd943',
                sendHour: '12:02',

            },{
                content: 'Estou bem, obrigado!',
                _id: "4",
                sendDate: '30/12/2023',
                senderId: 'uehduehd230243na34jnn',
                sendHour: '12:03',

            }
        ]

    },
    {
        _id: "2",
        photo: '/images/cliente.png',
        clienteName: 'Ademar Campos',
        clienteId: 'uehduehd230243na34jnn',
        createdAt: '30/12/2023',
        uzerId: 'uehduehd230243na34jnn',
        uzerName: 'Renato Gomes',
        uzerService: 'Pedreiro',
        messages: [
            {
                content: 'Bom dia!',
                _id: "1",
                sendDate: '30/12/2023',
                senderId: 'uehduehd230243na34jnn',
                sendHour: '12:00',

            },{
                content:'Como posso ajudá-lo?',
                _id:"2",
                sendDate:'30/12/2023',
                senderId:'uehduehd230243na34jnn',
                sendHour:'12.01'
            }
        ]

    },
];


export default async function ChatPage() {
    const token = cookies().get("uezaccesstoken");
    // const chatData = await useFetch("users/me", { headers: { Authorization: `Bearer ${token?.value}` } }).then(res => res).catch(err => []);
    const chatData = data;
    

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
        <Chat serverData={chatData} />
    )
}
