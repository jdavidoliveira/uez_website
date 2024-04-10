import { IMessage } from "./IChat"

export interface IPedido {
  id: string
  tipo: "ONLINE" | "PRESENCIAL" | "AMBOS"
  titulo: string
  descricao: string
  categoriaServico: string
  status: string
  idServico: string
  idUzer?: string
  disponivel: boolean
  dataCriacao: string
  dataFinalizacao?: string
  valor: number
  images: string[]
  avaliacao: number
  avaliado: boolean
  idCliente: string
  Messages: IMessage[]
}
