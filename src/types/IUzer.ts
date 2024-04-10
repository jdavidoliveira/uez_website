export interface IUzer {
  id: string
  username: string
  nome: string
  email: string
  cpf: string
  senha: string
  situacao: "ATIVO" | "INATIVO" | "BLOQUEADO"
  motivoBloqueio: string | null
  cep: string
  logradouro: string
  numero: number
  complemento: string
  bairro: string
  cidade: string
  estado: string
  dataNascimento: string
  dataCadastro: string
  telefone: string
  tipoUsuario: "UZER" | "CLIENTE"
  quantidadePedidos: number | null
  photoUrl: string
  quantidadePedidosRealizados: number | null
  idServico: string
  avaliacao: number
  avaliacoes: any[]
  lastOnline: string
  lastLogin: string
  bannerUrl: string
  bio: string
}
