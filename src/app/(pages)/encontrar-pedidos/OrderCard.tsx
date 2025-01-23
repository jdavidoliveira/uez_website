import LoadingSpinner from "@/components/layout/LoadingSpinner"
import Rating from "@/components/layout/Rating"
import api from "@/lib/api"
import { OrderWithClient } from "@/types/Order"
import { getProfessionIconByName } from "@/utils/getProfessionIconByName"
import Image from "next/image"
import { useEffect, useState } from "react"

interface OrderCardProps {
  order: OrderWithClient
}

const placeholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices et sapien id consectetur. In eros odio, consequat vel tortor ac, sollicitudin cursus dui. Mauris in sem massa. Sed convallis iaculis hendrerit. Quisque ac efficitur sapien. Suspendisse pulvinar erat ac felis lobortis dignissim. Praesent odio est, fermentum quis lectus eget, tempus sollicitudin enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit..."

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-between gap-2 rounded-md border bg-white p-5 shadow-lg">
      <div className="mx-auto h-3/4 w-full overflow-y-auto text-left">
        <p className="size-full max-h-52 text-left">{order.description}</p>
      </div>
      <hr className="h-1 w-full rounded-full" />
      <div className="flex w-full flex-col items-start justify-between ">
        <h1 className="text-left font-semibold">{order.speciality.name}</h1>
        <div className="flex w-full items-center justify-between">
          <p className="flex items-center justify-start gap-2 font-medium">
            <Image
              alt="Profissão"
              src={getProfessionIconByName(order.speciality.profession.name, true)}
              width={100}
              height={100}
              className="size-5"
            />
            {order.speciality.profession.name}
          </p>
          {order.value ? <span className="font-medium">R$ {order.value.toFixed(2)}</span> : null}
        </div>
      </div>
      <hr className="h-1 w-full rounded-full" />
      <div className="flex w-full flex-col items-start justify-between ">
        <div className="flex items-center gap-2">
          <Image
            src={order?.client.image}
            alt={order?.client.name}
            width={120}
            height={120}
            className="size-10 rounded-full border"
          />
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold">{order.client.name}</h3>
            <span className="flex items-center justify-center gap-2 text-sm">
              {order.client.rating ? order.client.rating.toFixed(1) : 0}
              <Rating rating={order.client.rating} size={16} showRating={false} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
