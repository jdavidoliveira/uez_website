"use client"

import Pedido from "@/types/Pedido"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

export default function AssignPedidoModal({ pedido, closeFunction }: { pedido: Pedido, closeFunction: () => void }) {

    const descricaoPedido = (pedido.descricao || "teste").charAt(0).toUpperCase() + (pedido.descricao || "teste").slice(1)


    return (
        <div className='fixed bottom-0 left-0 z-40 w-full h-full flex items-center justify-center bg-black/70'>
            <div className='bg-white w-5/6 h-5/6 flex items-center justify-center rounded-[40px]'>
                <div className='sm:px-20 sm:pt-20 sm:pb-8 p-8 flex flex-col items-start justify-between gap-2 w-full h-full'>
                    <div className="w-full flex flex-col sm:flex-row items-start justify-center gap-4">
                        <div className="w-full flex flex-col items-start gap-2 justify-center pr-2 sm:border-r sm:border-black/75">
                            <h1 className='text-3xl font-bold text-left'>{pedido.titulo}</h1>
                            <h2 className='text-2xl font-medium text-left'>{pedido.tipo}</h2>
                            <h3 className='text-2xl font-normal text-left'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valor)}</h3>
                        </div>
                        <div className="w-full flex flex-col items-start justify-center sm:ml-2">
                            <p className='font-medium text-xl w-full text-justify break-words whitespace-normal'>{descricaoPedido}</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between gap-2">
                        <button onClick={closeFunction} className="bg-azulao border h-11 text-white pl-4 pr-6 rounded-lg font-bold text-lg flex items-center"><ChevronLeft size={34} /> Voltar</button>
                        <button className="bg-[#525FFF] h-11 text-white px-6 rounded-lg font-bold text-lg flex items-center gap-2"> <Image width={24} height={24} src="/vetores/confere.svg" alt="Aceitar" /> Aceitar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
