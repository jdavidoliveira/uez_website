export interface IChat {
  id: string
  idCliente: string
  idUzer: string
  messages: IMessage[]
  createdAt: string
  cliente?: any
  uzer?: any
}

export interface IMessage {
  id: string
  type: "TEXT" | "IMAGE" | "URL"
  content: string
  createdAt: string
  readed: boolean
  senderId: string
  receiverId: string
  idChat: string
}
