export interface Service {
  id: string
  name: string
  type: "ONLINE"
  description: string
  default_tax: number
  completed_orders_amount: number
  category: Category
}

export interface Category {
  id: string
  name: string
}

export interface SimpleService {
  id: string
  name: string
}
