"use client"

import { Order } from "@/types/Order"
import { Megaphone, Pencil } from "lucide-react"
import React, { useState } from "react"
import EditOrderOverlay from "./EditOrder"

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  return (
    <div className="flex w-full items-center justify-between rounded-lg border bg-white p-4 shadow-md">
      <div>
        <h3 className="text-sm font-bold">{order.title}</h3>
        <p className="pb-4 text-sm text-gray-500">{order.service.name}</p>
        <span className="mt-1 inline-flex items-center rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
          <Megaphone size={18} className="mr-1" />
          {order.service.category.name}
        </span>
      </div>
      <div className="mt-16 flex gap-2">
        <span className="font-semibold text-gray-700">R$ {order.value.toFixed(2)}</span>
        <button className="text-gray-600 hover:text-gray-900" onClick={() => setIsOverlayOpen(true)}>
          <Pencil size={18} />
        </button>
      </div>
      {isOverlayOpen && <EditOrderOverlay onClose={() => setIsOverlayOpen(false)} />}
    </div>
  )
}
