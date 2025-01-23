import FindOrders from "./FindOrders"
import { api } from "@/lib/serverapi"
import { Order, OrderWithClient } from "@/types/Order"

interface PageProps {
  searchParams: Record<string, string>
}

export default async function Page({ searchParams }: PageProps) {
  const { search, orderBy, minValue, maxValue, toMatch, profession, speciality } = searchParams

  const params = new URLSearchParams({
    search: search || "",
    orderBy: orderBy || "default",
    ...(minValue && { minValue }),
    ...(maxValue && { maxValue }),
    ...(toMatch && { toMatch }),
    ...(profession && { profession }),
    ...(speciality && { speciality }),
  })

  const orders = (await api.get<OrderWithClient[]>(`/orders/active?${params.toString()}`, { cache: "no-cache" })) || []
  return (
    <main className="w-full">
      <FindOrders orders={orders.data} />
    </main>
  )
}
