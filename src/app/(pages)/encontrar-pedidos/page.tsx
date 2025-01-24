import { options } from "@/app/api/auth/[...nextauth]/options"
import FindOrders from "./FindOrders"
import { api } from "@/lib/serverapi"
import { Order, OrderWithClient } from "@/types/Order"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import NotSession from "@/components/NotSession"

interface PageProps {
  searchParams: Record<string, string>
}

export default async function Page({ searchParams, ...props }: PageProps) {
  const { search, orderBy, minValue, maxValue, toMatch, profession, speciality, page } = searchParams

  const params = new URLSearchParams({
    search: search || "",
    orderBy: orderBy || "default",
    ...(minValue && { minValue }),
    ...(maxValue && { maxValue }),
    ...(toMatch && { toMatch }),
    ...(profession && { profession }),
    ...(speciality && { speciality }),
    ...(page && { page, pageSize: "5" }),
  })

  const orders = (await api.get<OrderWithClient[]>(`/orders/active?${params.toString()}`, { cache: "no-cache" })) || []
  return (
    <>
      <main className="w-full">
        <FindOrders orders={orders.data} />
      </main>
      <NotSession />
    </>
  )
}
