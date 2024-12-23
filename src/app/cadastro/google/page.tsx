import { Category, Service } from "@/types/Service"
import { Step1 } from "./Step1"
import { api } from "@/lib/serverapi"
import Loading from "@/app/loading"

export default async function CadastroComGoogle() {
  const searchOfCategories = await api.get<Category[]>("/categories", {
    next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
  })

  const searchOfServices = await api.get<Service[]>("/services", {
    next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
  })

  if (!searchOfCategories.ok || !searchOfServices.ok) return <Loading />

  return <Step1 categories={searchOfCategories.data} services={searchOfServices.data} />
}
