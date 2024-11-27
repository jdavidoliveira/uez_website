export interface IUzer {
  id: string
  username: string
  name: string
  email: string
  status: string
  block_reason: null
  address: null
  birth_date: string | Date
  created_at: string | Date
  phone: null
  usertype: "UZER" | "CLIENT" | "BOTH"
  orders_amount: null
  image: "https://cdn-icons-png.flaticon.com/512/74/74472.png"
  last_online: string | Date
  last_login: string | Date
}
