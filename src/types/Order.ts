import { Speciality } from "./Speciality"

export type Order = {
  id: string
  specialityId: string
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
  uezerId: string
  speciality: Speciality
}
