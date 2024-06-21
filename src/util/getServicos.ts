import api from "@/lib/api"

export async function getServicos() {
  try {
    const response = await api.get("/servicos")
    return response
  } catch (response) {
    return response
  }
}

export async function getServicosByCategoria(categoria: string) {
  try {
    const response = await api.get(`/servicos/categoria/${categoria}`)
    return response
  } catch (response) {
    return response
  }
}
