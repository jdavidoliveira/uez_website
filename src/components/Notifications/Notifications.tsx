"use client"

import { Bell, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import 'animate.css'
import api from "@/hooks/api";
import Notification from "@/types/Notification";
import Image from "next/image";

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
            <button className="flex items-center justify-center" onClick={() => setShowNotification(prevState => !prevState)}>
                <Bell width={25} height={25} color="#00003b" fill={showNotification ? "#00003b" : "none"} className="hover:scale-105" />
            </button>
            {showNotification && (
                <div className="w-64 z-50 absolute -left-72 -top-4 p-4 animate__animated animate__fadeIn animate__faster rounded-3xl bg-[#00003b] flex flex-col items-center gap-2" >
                    <h1 className="text-base mb-1 font-bold text-white">Notificações</h1>
                    {notifications.map((notification, index) => <NotificationCard readed={notification.readed} idNotificacao={notification._id} content={notification.content} type={notification.type} key={index} />)}
                    <div className="w-full px-3 flex items-center mt-2 justify-end">
                        <button className="text-xs w-auto font-normal text-cinzero hover:underline">Apagar todas</button>
                    </div>
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
        <div className="w-full h-14 flex bg-[#535FFF] rounded-2xl items-center p-2 justify-start gap-2">
            <Image src={photo} width={100} height={100} alt="Notification Icon" className="rounded-full aspect-square w-10 h-10" />
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
    let photo = ""

    switch (type) {
        case "like":
            photo = "https://picsum.photos/200/300"
            title = "Like"
            break
        case "comment":
            title = "Comment"
            break
        case "follow":
            title = "Follow"
            break
        default:
            photo = "https://picsum.photos/200/300"
            title = "Notification"
    }

    return { title, photo }
}