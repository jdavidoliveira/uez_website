"use client"

import { Bell, BellRing, CheckCheck, MailCheck } from "lucide-react"
import { createContext, useContext, useEffect, useState } from "react"
import "animate.css"
import api from "@/lib/api"
// import Notification from "@/types/Notification"
import Image from "next/image"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { infoByType } from "@/utils/notifications/infoByType"

const NotificationsContext = createContext<{
  notifications: any[]
  updateNotification: (id: string, updatedData: Partial<any>) => void
}>({
  notifications: [],
  updateNotification: () => {},
})

export default function Notifications() {
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<any[]>([])

  async function searchNotifications() {
    const notifications = await api
      .get("/notifications")
      .then((res) => res.data)
      .catch((err) => [])
    setNotifications(notifications.notifications)
  }

  useEffect(() => {
    searchNotifications()
  }, [])

  function updateNotification(id: string, updatedData: Partial<any>) {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, ...updatedData } : notification)),
    )
  }

  async function handleReadAllNotifications() {
    if (notifications.filter((notification) => notification.readed === false).length > 0) {
      try {
        await api.post(`/notifications/readall`)
        notifications.forEach((notification) => {
          updateNotification(notification.id, { readed: true })
        })

        toast.success("Todas as notificações foram lidas com sucesso.")
      } catch (error: any) {
        toast.error("Erro ao ler a notificação, ", error)
      }
    } else {
      toast("Você não tem notificações para ler.")
    }
  }

  return (
    <NotificationsContext.Provider value={{ notifications, updateNotification }}>
      <div className="relative">
        <button
          className="relative flex items-center justify-center"
          onClick={() => setShowNotification((prevState) => !prevState)}
        >
          {notifications.filter((notification) => notification.readed === false).length > 0 ? (
            <BellRing
              width={25}
              height={25}
              className={twMerge(
                "animate__animated animate__pulse animate__infinite animate__slow text-primary-purple hover:scale-105",
                showNotification && "fill-primary-purple",
              )}
            />
          ) : (
            <Bell
              width={25}
              height={25}
              className={twMerge("text-primary-purple hover:scale-105", showNotification && "fill-primary-purple")}
            />
          )}
          {!showNotification && notifications.filter((notification) => notification.readed === false).length > 0 && (
            <DotFilledIcon
              className={twMerge(
                "animate__animated animate__pulse animate__infinite animate__slow absolute -bottom-2 -right-3",
                "fill-primary-purple text-primary-purple",
              )}
            />
          )}
        </button>
        {showNotification && (
          <motion.div
            animate={{}}
            className="animate__animated animate__fadeIn animate__faster absolute right-10 top-10 z-50 flex max-h-[60vh] min-h-72 w-fit min-w-96 flex-col items-center gap-2 overflow-hidden rounded-3xl border bg-white pt-4"
          >
            <div className="flex items-center gap-6 px-4">
              <h1 className=" my-2 text-2xl font-semibold">Notificações</h1>
              {
                <button
                  onClick={handleReadAllNotifications}
                  className={twMerge(
                    "flex items-center justify-center text-xs font-semibold text-primary-purple",
                    notifications.filter((notification, index) => notification.readed).length ===
                      notifications.length && "cursor-default touch-none opacity-0",
                  )}
                >
                  <CheckCheck className="size-5" />
                  Marcar todas como lidas
                </button>
              }
            </div>

            {notifications.length > 0 ? (
              <ul className="overflow-y-auto">
                {notifications.map((notification, index) => {
                  return (
                    <NotificationCard
                      readed={notification.readed}
                      idNotificacao={notification.id}
                      content={notification.content}
                      type={notification.type}
                      key={index}
                    />
                  )
                })}
              </ul>
            ) : (
              <h1 className="mb-1 text-center text-base font-medium text-white">
                Você não tem notificações no momento 😥
              </h1>
            )}
          </motion.div>
        )}
      </div>
    </NotificationsContext.Provider>
  )
}

interface NotificationCardProps {
  content: string
  type: string
  idNotificacao: string
  readed: boolean
}

function NotificationCard({ content, type, readed, idNotificacao }: NotificationCardProps) {
  const { updateNotification } = useContext(NotificationsContext)
  const { title, photo } = infoByType(type)

  async function handleReadNotification() {
    if (!readed) {
      try {
        await api.post(`/notifications/read/${idNotificacao}`)
        updateNotification(idNotificacao, { readed: true })
        toast.success("Notificação lida")
      } catch (error: any) {
        toast.error("Erro ao ler a notificação, ", error)
      }
    } else {
      toast("Você já leu essa notificação")
    }
  }

  return (
    <li
      className={twMerge(
        "flex min-h-14 w-full cursor-pointer items-center justify-start border-t border-black/30   hover:bg-[#E1DCEB]",
        readed && "cursor-default bg-[#DCDCDC]",
      )}
    >
      <button
        className="flex size-full items-center justify-start gap-2 px-3 py-4"
        onClick={handleReadNotification}
        title="Ler notificação"
      >
        <Image
          src={photo}
          width={100}
          height={100}
          alt="Notification Icon"
          className="aspect-square size-10 object-contain object-center"
        />
        <div className="h-full flex-col items-start justify-start">
          <DotFilledIcon className={twMerge("text-primary-purple", readed && "opacity-0")} />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-xs font-bold">{title}</h1>
          <p className="text-left text-xs">{content}</p>
        </div>
        {/* {!readed && (
            <button
              title="Marcar como lida"
              className="flex items-center justify-center transition-colors hover:opacity-60"
            >
              <MailCheck size={20} />
            </button>
          )} */}
      </button>
    </li>
  )
}
