import { useFetch } from '@/hooks/useFetch'
import Image from 'next/image'
import { cookies } from 'next/headers'

type pedido = {
  tipo: "online" | "ambos" | "presencial",
  titulo: string,
  valor: number,
}

export default async function RealizarServico() {

    const servicos: pedido[] = await useFetch<pedido[]>('/pedidos', {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`
      },
    }).then(response => {
      console.log(response)
      return response
    }).catch(error => {
      console.error(error)
      return []
    })

  return (
    <main className="flex items-center justify-center p-4 min-h-[60%]">
      {servicos.length < 1 ? <div className="flex flex-col h-144 items-center justify-center gap-4">
        <Image width={56} height={56} src="/images/refresh.png" alt="Ícone de refresh" className=" hover:animate-spin" />
        <h1 className="text-xl font-bold text-center">Não há solicitações de serviço no momento :/</h1>
      </div> :
        <div className='flex flex-col items-center gap-6 p-2 w-full justify-center'>
          <h1 className="text-2xl font-bold">Serviços disponiveis</h1>
          <div className='grid grid-cols-4 gap-4 '>
            {servicos.map((servico, index) => (
              <CardPedido pedido={servico} key={index} />
            ))}
          </div>
        </div>
      }
    </main>
  )
}

function CardPedido({pedido}: {pedido: pedido}) {
  return (
    <div className="relative bg-cinzero flex w-64 h-40 flex-col items-start justify-center gap-1 p-4 rounded-lg">
      <h1 className="text-xl font-bold">{(pedido.titulo || "teste").charAt(0).toUpperCase() + (pedido.titulo || "teste").slice(1)}</h1>
      <p className='font-medium'>{pedido.tipo}</p>
      <p className='font-medium'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valor)}</p>
      <button className='bg-azulao py-1 px-3 rounded-full font-bold text-sm text-white absolute bottom-4 right-4'>Ver pedido</button>
    </div>
  )
}