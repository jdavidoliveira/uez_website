import { STATUS, USERTYPE } from "./enums"
import { Service, SimpleService } from "./Service"

export interface Uzer {
  id: string
  username: string
  name: string
  email: string
  usertype: USERTYPE
  status: STATUS
  block_reason: string | null
  image: string
  banner: string
  bio: string
  phone: string | null
  birth_date: string
  last_online: string
  last_login: string
  address: string | null
  orders_amount: number | null
  completed_orders_amount: number | null
  rating: number
  ratings: number[]
  created_at: string
  service: Service
}

export interface SimpleUzer
  extends Pick<
    Uzer,
    | "id"
    | "username"
    | "name"
    | "usertype"
    | "status"
    | "image"
    | "orders_amount"
    | "completed_orders_amount"
    | "rating"
  > {
  service: SimpleService
}
