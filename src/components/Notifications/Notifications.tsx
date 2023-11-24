"use client"

import { Bell, BellRing, Dot, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import 'animate.css'
import api from "@/hooks/api";
import Notification from "@/types/Notification";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

export default function Notifications() {

    async function searchNotifications() {
        const notifictions = await api.get("/notifications").then(res => res.data).catch(err => [])
        setNotifications(notifictions)
    }

    useEffect(() => {
        searchNotifications()
    }, [])

    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<Notification[]>([])

    return (
        <div className="relative">
            <button className="flex items-center relative justify-center" onClick={() => setShowNotification(prevState => !prevState)}>
                {notifications.filter((notification) => notification.readed === false).length > 0 ? <BellRing width={25} height={25} color="#00003b" fill={showNotification ? "#00003b" : "none"} className="hover:scale-105 animate__animated animate__pulse animate__infinite animate__slow" /> : <Bell width={25} height={25} color="#00003b" fill={showNotification ? "#00003b" : "none"} className="hover:scale-105" />}
                {notifications.filter((notification) => notification.readed === false).length > 0 && <DotFilledIcon color="#00003b" fill={"#00003b"} width={20} height={20} className="absolute -bottom-2 -right-3 animate__animated animate__pulse animate__infinite animate__slow" />}
            </button>
            {showNotification && (
                <div className="w-80 z-50 absolute max-h-96 overflow-y-auto -left-[22rem] -top-4 p-4 animate__animated animate__fadeIn animate__faster rounded-3xl bg-[#00003b] flex flex-col items-center gap-2" >
                    <h1 className="text-base mb-1 font-bold text-white">Notificações</h1>
                    {notifications.map((notification, index) => {


                        return <NotificationCard 
                            readed={notification.readed} 
                            idNotificacao={notification._id} 
                            content={notification.content} 
                            type={notification.type} 
                            key={index} 
                        />
                        })}
                    {notifications.length > 0 ? <div className="w-full px-3 flex items-center mt-2 justify-end">
                        <button className="text-xs w-auto font-normal text-cinzero hover:underline">Marcar todas como lida</button>
                    </div> : <h1 className="text-base mb-1 font-medium text-center text-white">Você não tem notificações no momento 😥</h1>}
                </div>
            )}
        </div>
    )
}

interface NotificationCardProps {
    content: string
    type: string
    idNotificacao: string
    readed: boolean
}

function NotificationCard({ content, type, readed }: NotificationCardProps) {

    const { title, photo } = infoByType(type)

    return (
        <div className="w-full min-h-[3.5rem] flex bg-[#535FFF] rounded-2xl items-center p-2 justify-start gap-2">
            <Image src={photo} width={100} height={100} alt="Notification Icon" className="rounded-full object-contain object-center aspect-square w-10 h-10" />
            <div className="flex flex-col">
                <h1 className="text-xs font-bold text-white">{title}</h1>
                <p className="text-xs font-extralight text-white">{content}</p>
            </div>
            {!readed && (
                <button title="Marcar como lida" className="flex items-center hover:opacity-60 transition-colors justify-center">
                    <MailCheck color="white" size={20} />
                </button>
            )}
        </div>
    )
}

function infoByType(type: string) {

    let title = ""
    let photo = "/images/notifications/"

    switch (type) {
        case "orcaReceb":
            photo += "orcaReceb.png"
            title = "Você recebeu um orçamento!"
            break
        case "servFim":
            photo += "servFim.png"
            title = "Seu serviço foi finalizado!"
            break

        case "solicitUzer":
            photo += "solicitUzer.png"
            title = "Um Uzer quer conversar contigo!"
            break
        case "pedLance":
            photo += "pedLance.png"
            title = "Seu pedido foi lançado!"
            break
        case "ban":
            photo += "ban.png"
            title = "Infelizmente você foi banido."
            break
        case "parabens":
            photo += "parabens.png"
            title = "Parabéns! Agora você é um de nós!"
            break
        case "solicitCliente":
            photo += "solicitCliente.png"
            title = "Um Cliente quer conversar contigo!"
            break
        case "orcaAceito":
            photo += "orcaAceito.png"
            title = "Seu orçamento foi aceito!"
            break
        case "orcaNeg":
            photo += "orcaNeg.png"
            title = "Seu orçamento foi negado!"
            break
        case "servAval":
            photo += "servAval.png"
            title = "Seu serviço foi avaliado!"
            break
        case "erro":
            photo += "erro.png"
            title = "Houve algum erro no seu serviço!"
            break
        default:
            photo += "Notificação.png"
            title = "Notificação"
    }

    return { title, photo }
}