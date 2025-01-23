"use client"

import React from "react"
import Search from "./Search"
import FilterButton from "./FilterButton"
import { Order, OrderWithClient } from "@/types/Order"
import OrderContainer from "./OrderContainer"

interface OrderContainerProps {
  orders: OrderWithClient[]
}

export default function FindOrders({ orders }: OrderContainerProps) {
  return (
    <div className="mt-20 flex min-h-screen w-full flex-col items-center">
      <div className="relative flex w-10/12 items-center justify-between">
        <h1 className="text-3xl font-semibold">Pedidos</h1>
        <Search />
        <FilterButton />
      </div>
      <OrderContainer orders={orders} />
    </div>
  )
}
