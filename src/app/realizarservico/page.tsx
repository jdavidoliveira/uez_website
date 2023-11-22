import { useFetch } from '@/hooks/useFetch'
import Image from 'next/image'
import { cookies } from 'next/headers'
import Header from '@/components/Header/Header'
import CardPedido from './CardPedido'
import Pedido from '@/types/Pedido'

export default async function RealizarServico() {

  const servicos: Pedido[] = await useFetch<Pedido[]>('/pedidos', {
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
        {servicos.length < 1 || servicos.every(servico => !servico.disponivel) ?
          <div className="flex flex-col h-144 items-center justify-center gap-4">
            <Image width={56} height={56} src="/images/refresh.png" alt="Ícone de refresh" className=" hover:animate-spin" />
            <h1 className="text-xl font-bold text-center">Não há solicitações de serviço no momento :/</h1>
          </div> :
          <div className='flex flex-col items-center gap-6 p-2 w-full justify-center'>
            <h1 className="text-2xl font-bold">Serviços disponiveis</h1>
            <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 w-11/12'>
              {servicos.map((servico, index) => {
                if (servico.disponivel) return <CardPedido pedido={servico} key={index} />
                else return null
              })}
            </div>
          </div>
        }
      </main>
    </>
  )
}

