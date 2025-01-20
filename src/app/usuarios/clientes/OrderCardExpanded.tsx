"use client"

import { Order, OrderDetailed } from "@/types/Order"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import EditOrderOverlay from "./EditOrder"
import { X } from "lucide-react"
import Image from "next/image"
import api from "@/lib/api"
import LoadingSpinner from "@/components/layout/LoadingSpinner"
import Rating from "@/components/layout/Rating"
import { translateOrderStatus } from "@/utils/translateOrderStatus"
import { twMerge } from "tailwind-merge"

interface OrderCardExpandedProps {
  onClose: () => void
  order: Order
}

export default function OrderCardExpanded({ onClose, order }: OrderCardExpandedProps) {
  const [showEditOrderOverlay, setShowEditOrderOverlay] = useState(false)

  const [orderDetailed, setOrderDetailed] = useState<OrderDetailed>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await api(`/orders/${order.id}`)
        setOrderDetailed(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrderDetails()
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/65"
      >
        <div className="relative flex h-1/2 w-3/4 items-center justify-center rounded-lg bg-white p-8">
          <button
            onClick={onClose}
            className="absolute right-2 top-2  text-black hover:text-gray-700 md:right-4 md:top-4"
          >
            <X size={24} className="" />
          </button>
          <div className="flex h-full w-[70%] flex-col gap-2 pr-4">
            <h1 className="text-xl font-bold">{order.title}</h1>
            <p className="text-lg font-bold text-black/50">R${order.value.toFixed(2)}</p>
            <div className="flex w-fit items-center justify-center gap-2">
              <Image
                src={`/images/icons/categorias/${order.speciality.profession.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(" ", "")}-azulao.png`}
                alt={order.speciality.profession.name}
                width={120}
                height={120}
                className="w-8"
                title={order.speciality.profession.name}
              />
              <p className="text-lg">{order.speciality.name}</p>
            </div>
            <div className="mt-6 flex flex-col">
              <h2 className="text-lg font-bold">Descrição</h2>
              <p className="text-md max-h-40 overflow-y-auto px-2 font-medium">{order.description}</p>
            </div>
          </div>
          <div className="flex h-full w-[30%] flex-col items-center justify-start border-l">
            {isLoading || !orderDetailed ? (
              <div className="flex h-full w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="mb-4 flex w-3/4 items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={orderDetailed?.client.image}
                      alt={orderDetailed?.client.name}
                      width={120}
                      height={120}
                      className="w-16 rounded-full border"
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-bold">{orderDetailed.client.name}</h3>
                      <span className="text-md flex items-center justify-center gap-2">
                        {orderDetailed.client.rating ? orderDetailed.client.rating.toFixed(1) : 0}
                        <Rating rating={orderDetailed.client.rating} size={16} showRating={false} />
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={twMerge(
                    "mb-10 flex w-3/4 items-center justify-center rounded-xl px-2.5 py-1 text-center font-medium",
                    `text-status-${order.status}`,
                    `bg-status-${order.status}/30`,
                  )}
                >
                  {translateOrderStatus(order.status)}
                </span>
                {order.status === "OPEN" && (
                  <button
                    onClick={() => setShowEditOrderOverlay(true)}
                    className="w-3/4 rounded-xl bg-primary-purple p-2.5 text-lg text-white transition-colors hover:bg-primary-purple/75"
                    title="Editar pedido"
                  >
                    Editar pedido
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
      {showEditOrderOverlay && <EditOrderOverlay order={order} onClose={() => setShowEditOrderOverlay(false)} />}
    </>
  )
}
