import { useFetch } from '@/hooks/useFetch'
import Image from 'next/image'
import { cookies } from 'next/headers'
import Header from '@/components/Header/Header'

type pedido = {
  tipo: "online" | "ambos" | "presencial",
  titulo: string,
  valor: number,
}

export default async function RealizarServico() {

  const servicos: pedido[] = await useFetch<pedido[]>('/pedidos', {
    headers: {
      Authorization: `Bearer ${cookies().get("uezaccesstoken")?.value}`
    },
  }).then(response => {
    return response
  }).catch(error => {
    console.error(error)
    return []
  })

  return (
    <>
      <Header />
      <main className="flex items-center justify-center p-4">
        {servicos.length < 1 ?
          <div className="flex flex-col h-144 items-center justify-center gap-4">
            <Image width={56} height={56} src="/images/refresh.png" alt="Ícone de refresh" className=" hover:animate-spin" />
            <h1 className="text-xl font-bold text-center">Não há solicitações de serviço no momento :/</h1>
          </div> :
          <div className='flex flex-col items-center gap-6 p-2 w-full justify-center'>
            <h1 className="text-2xl font-bold">Serviços disponiveis</h1>
            <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 '>
              {servicos.map((servico, index) => (
                <CardPedido pedido={servico} key={index} />
              ))}
            </div>
          </div>
        }
      </main>
    </>
  )
}

function CardPedido({ pedido }: { pedido: pedido }) {

  const tituloPedido = (pedido.titulo || "teste").charAt(0).toUpperCase() + (pedido.titulo || "teste").slice(1)

  return (
    <div className="relative bg-cinzero flex flex-1 h-40 flex-col items-start sm:justify-center p-4 rounded-lg">
      <h1 className="sm:text-xl text-lg font-bold">{tituloPedido.length > 20 ? `${tituloPedido.slice(0, 20)}...` : tituloPedido}</h1>
      <p className='font-medium'>{pedido.tipo}</p>
      <p className='font-medium'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valor)}</p>
      <button className="bg-azulao sm:py-1 sm:px-3 p-1 rounded-full font-bold text-sm text-white absolute bottom-4 right-4 sm:w-auto w-2/5 overflow-visible">
        <span className="hidden sm:inline">Ver pedido</span>
        <span className="inline sm:hidden">Ver</span>
      </button>

    </div>
  )
}