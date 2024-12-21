"use client"

import { Bell, BellRing, MailCheck } from "lucide-react"
import { useEffect, useState } from "react"
import "animate.css"
import api from "@/lib/api"
// import Notification from "@/types/Notification"
import Image from "next/image"
import { DotFilledIcon } from "@radix-ui/react-icons"

export default function Notifications() {
  async function searchNotifications() {
    const notifictions = await api
      .get("/notifications")
      .then((res) => res.data)
      .catch((err) => [])
    setNotifications(notifictions)
  }

  useEffect(() => {
    searchNotifications()
  }, [])

  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<any[]>([])

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center"
        onClick={() => setShowNotification((prevState) => !prevState)}
      >
        {notifications.filter((notification) => notification.readed === false).length > 0 ? (
          <BellRing
            width={25}
            height={25}
            color="#00003b"
            fill={showNotification ? "#00003b" : "none"}
            className="animate__animated animate__pulse animate__infinite animate__slow hover:scale-105"
          />
        ) : (
          <Bell
            width={25}
            height={25}
            color="#00003b"
            fill={showNotification ? "#00003b" : "none"}
            className="hover:scale-105"
          />
        )}
        {notifications.filter((notification) => notification.readed === false).length > 0 && (
          <DotFilledIcon
            color="#00003b"
            fill={"#00003b"}
            width={20}
            height={20}
            className="animate__animated animate__pulse animate__infinite animate__slow absolute -bottom-2 -right-3"
          />
        )}
      </button>
      {showNotification && (
        <div className="animate__animated animate__fadeIn animate__faster absolute -left-[22rem] -top-4 z-50 flex max-h-96 w-80 flex-col items-center gap-2 overflow-y-auto rounded-3xl bg-[#00003b] p-4">
          <h1 className="mb-1 text-base font-bold text-white">Notificações</h1>
          {notifications.map((notification, index) => {
            return (
              <NotificationCard
                readed={notification.readed}
                idNotificacao={notification._id}
                content={notification.content}
                type={notification.type}
                key={index}
              />
            )
          })}
          {notifications.length > 0 ? (
            <div className="mt-2 flex w-full items-center justify-end px-3">
              <button className="w-auto text-xs font-normal text-cinzero hover:underline">
                Marcar todas como lida
              </button>
            </div>
          ) : (
            <h1 className="mb-1 text-center text-base font-medium text-white">
              Você não tem notificações no momento 😥
            </h1>
          )}
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
    <div className="flex min-h-[3.5rem] w-full items-center justify-start gap-2 rounded-2xl bg-[#535FFF] p-2">
      <Image
        src={photo}
        width={100}
        height={100}
        alt="Notification Icon"
        className="aspect-square h-10 w-10 rounded-full object-contain object-center"
      />
      <div className="flex flex-col">
        <h1 className="text-xs font-bold text-white">{title}</h1>
        <p className="text-xs font-extralight text-white">{content}</p>
      </div>
      {!readed && (
        <button
          title="Marcar como lida"
          className="flex items-center justify-center transition-colors hover:opacity-60"
        >
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
      photo += "Notificacao.png"
      title = "Notificação"
  }

  return { title, photo }
}
