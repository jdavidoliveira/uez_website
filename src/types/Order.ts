import { Service } from "./Service"

export type Order = {
  id: string
  serviceId: string
  title: string
  description: string
  status: string
  available: boolean
  created_at: string
  end_date: string | null
  value: number
  images: string[]
  rating: number
  rated: boolean
  clientId: string
  uzerId: string
  service: Service
}
