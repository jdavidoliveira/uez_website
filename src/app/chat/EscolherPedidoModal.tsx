"use client"

import api from "@/hooks/api"
import Pedido from "@/types/Pedido"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { useEffect, useState } from "react"

interface EscolherPedidoModalProps {
    idCliente: string
}

export default function EscolherPedidoModal({ idCliente }: EscolherPedidoModalProps) {

    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPedidoId, setSelectedPedidoId] = useState<string | null>(null)

    useEffect(() => {
        fetchPedidos()
    }, [])

    async function fetchPedidos() {
        await api.get(`/pedidos/cliente/${idCliente}`)
            .then(res => {
                return setPedidos(res.data)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    return (
        <div className="fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-azulao w-10/12 h-5/6 rounded-2xl p-8 py-6 gap-4 flex flex-col items-center justify-between">
                <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">A qual pedido de *Cliente* você deseja atrelar o orçamento?</h1>
                <div className="w-11/12 overflow-y-auto grid grid-cols-3">
                    {isLoading ? <p>Carregando...</p> :
                        pedidos.map((pedido, index) => (
                            <CardPedido id={pedido._id} nomePedido={pedido.titulo} dataPedido={pedido.dataCriacao} valorPedido={pedido.valor} key={index} />
                        ))
                    }
                </div>
                <div className="flex justify-center gap-10 w-11/12">
                    <button
                        onClick={() => alert("Voltar")}
                        className="bg-[#535FFF] p-2 rounded-2xl w-1/4 mt-5 font-bold flex items-center justify-center text-lg text-white">
                        <ChevronLeft color="white" size={35} />
                        <span className="font-bold text-lg text-white flex justify-center items-center mr-2">Voltar</span>
                    </button>
                    <button
                        onClick={() => alert("Avançar")}
                        className="bg-[#535FFF] p-2 rounded-2xl w-1/4 mt-5 font-bold flex items-center justify-center text-lg text-white">
                        <span className="font-bold text-lg text-white flex justify-center items-center ml-2">Avançar</span>
                        <ChevronRight color="white" size={35} />
                    </button>
                </div>
            </div>
        </div>
    )

    interface CardPedidoProps {
        nomePedido: string
        dataPedido: string
        valorPedido: number
        id: string
    }
    
    function CardPedido({nomePedido, dataPedido, valorPedido, id}: CardPedidoProps) {
        return (
            <button className="bg-white shadow-md rounded-xl flex-1 p-6 m-2 transition hover:scale-[102%] relative group" onClick={(e) => setSelectedPedidoId(id)}>
                <h1 className="text-xl font-bold">{nomePedido.charAt(0).toUpperCase() + nomePedido.slice(1)}</h1>
                <h2 className="text-black mb-4 font-medium">{dataPedido.slice(5, 10).split('-').reverse().join('/')}</h2>
                <h3 className="text-black mb-4 font-medium">{valorPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                <Eye className='absolute top-6 right-8 hidden group-hover:block' />
            </button>
        )
    }
}

