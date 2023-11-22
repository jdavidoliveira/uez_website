"use client"

import api from "@/hooks/api"
import Pedido from "@/types/Pedido"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import 'animate.css'
import { Messages } from "@/types/Chat"

interface EscolherPedidoModalProps {
    idCliente: string
    closeFunction: () => void
    chatId: string
}

export default function EscolherPedidoModal({ idCliente, closeFunction, chatId }: EscolherPedidoModalProps) {

    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPedidoId, setSelectedPedidoId] = useState<string | null>(null)
    const [step, setStep] = useState(1)
    const [precoOrcamento, setPrecoOrcamento] = useState(0)

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

    function backFunction(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (step === 2) return setStep(1)
        return closeFunction()
    }

    async function finishFunction(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (step === 1) return setStep(2)
        // OK
            e.preventDefault(); 
            if (!precoOrcamento) {
                alert("Por favor, informe o preço do orçamento")
                return
            }
            const newMessage = await api.post<Messages | null>("/chat/message/budget", {
                    chatId: chatId,
                    message: precoOrcamento,
                    sendDate: new Date().toLocaleDateString(),
                    sendHour: new Date().toLocaleTimeString(),
                    type: "budget",
                    idPedido: selectedPedidoId
    
                }).then(res => {
                console.log(res)
                alert("Orçamento enviado com sucesso")
                setPrecoOrcamento(0)
                closeFunction()
                return res
            })
                .catch(err => {
                    console.error(err)
                    return null
                })
    }

    return (
        <div className="fixed z-[999999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={twMerge("bg-azulao w-9/12 h-5/6 rounded-[30px] p-8 py-6 gap-4 flex flex-col items-center justify-between animate__animated animate__fadeInUp animate__faster", step === 2 && "w-1/2 h-1/2")}>
                {step === 1 && <>
                    <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">A qual pedido de *Cliente* você deseja atrelar o orçamento?</h1>
                    <div className="w-11/12 overflow-y-auto grid grid-cols-2 sm:grid-cols-3">
                        {isLoading ? <p>Carregando...</p> :
                            pedidos.map((pedido, index) => {
                                if (pedido.disponivel === false) return null
                                return (
                                <CardPedido id={pedido._id} nomePedido={pedido.titulo} dataPedido={pedido.dataCriacao} valorPedido={pedido.valor} key={index} />
                            )})
                        }
                    </div>
                </>}
                {step === 2 && <>
                    <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">Qual o valor total do orçamento?</h1>
                    <div className="w-11/12 flex flex-col items-center gap-3">
                        <label htmlFor="orcamento" className="text-white text-xl font-bold">Preço estabelecido (R$):</label>
                        <input
                            id="orcamento"
                            type="number"
                            placeholder="0,00"
                            value={precoOrcamento}
                            onChange={(e) => setPrecoOrcamento(Number(e.target.value))}
                            className="bg-[#EDEDED] p-2 text-center text-xl font-medium rounded-2xl animate__animated animate__shakeX animate__faster w-64 h-16"
                        />
                    </div>
                </>}
                <div className="flex justify-center gap-10 w-11/12">
                    <button
                        onClick={backFunction}
                        className="bg-[#535FFF] p-2 rounded-2xl active:scale-[98%] w-36 mt-5 font-bold flex items-center justify-center text-lg text-white">
                        <ChevronLeft color="white" size={32} />
                        <span className="font-bold text-lg text-white flex justify-center items-center mr-1">Voltar</span>
                    </button>
                    <button
                        onClick={finishFunction}
                        disabled={selectedPedidoId === null}
                        className="bg-[#535FFF] p-2 rounded-2xl active:scale-[98%] w-36 mt-5 font-bold flex items-center justify-center text-lg text-white disabled:cursor-not-allowed disabled:opacity-50">
                        <span className="font-bold text-lg text-white flex justify-center items-center ml-1">Avançar</span>
                        <ChevronRight color="white" size={32} />
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

        function selectPedidoByCard(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault()
            setSelectedPedidoId(id)
            setPrecoOrcamento(valorPedido)
        }

        function deselectPedidoByCard(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault()
            setSelectedPedidoId(null)
            setPrecoOrcamento(0)
        }

        return (
            <button title="Clique para escolher" className={twMerge("bg-white shadow-md rounded-xl flex flex-col items-start flex-1 p-6 m-2 transition hover:scale-[102%] cursor-default relative active:scale-[98%] group", selectedPedidoId === id ? "bg-[#535FFF] text-white" : "")} onClick={selectPedidoByCard } onDoubleClick={deselectPedidoByCard}>
                <h1 className={twMerge("text-xl font-bold", selectedPedidoId === id && "text-white")}>{(nomePedido.charAt(0).toUpperCase() + nomePedido.slice(1).substring(0, 20))}</h1>
                <h2 className={twMerge("text-black mb-4 font-medium", selectedPedidoId === id && "text-white")}>{dataPedido.slice(5, 10).split('-').reverse().join('/')}</h2>
                <h3 className={twMerge("text-black font-medium", selectedPedidoId === id && "text-white")}>{valorPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                <Eye onClick={() => alert("Visualizar")} className='absolute top-1/2 translate-y-[-50%] right-8 hidden group-hover:block cursor-pointer' />
            </button>
        )
    }
}

