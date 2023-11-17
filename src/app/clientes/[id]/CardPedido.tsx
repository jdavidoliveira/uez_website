"use client"
import api from '@/hooks/api'
import UzerInterface from '@/types/Uzer'
import { Eye, MessageCircle, Star, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import 'animate.css'
import { useRouter } from 'next/navigation'

export default function CardPedido({ titulo = "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _id_uzer = "teste", status = "A realizar", disponivel = true, valor, descricao }: { titulo: string, _id_uzer: string | null, status: string, disponivel: boolean, valor: number | string, descricao: string }) {
    const [uzerData, setUzerData] = useState<UzerInterface | null>()
    useEffect(() => {
        fetchUzer()
    }, [])

    async function fetchUzer() {
        _id_uzer !== null ?
            await api.get<UzerInterface>(`/uzers/${_id_uzer}`)
                .then(res => setUzerData(res.data))
                .catch(err => setUzerData(null))
            : setUzerData(null)
    }

    function avaliarPedido() {
        alert("avaliar")
    }

    const router = useRouter()

    const sendMessage = () => {
        router.push(`/chat?userChatId=${_id_uzer}`)
    }

    const [showAvaliarModal, setShowAvaliarModal] = useState(false)
    const [showPedidoModal, setShowPedidoModal] = useState(false)

    return (<>
        <div onClick={status === 'A avaliar' ? () => setShowAvaliarModal(true) : () => setShowPedidoModal(true)}
            className={twMerge("bg-white cursor-pointer shadow-md rounded-xl p-6 w-10/12 m-2 transition relative group", status === "A avaliar" ? "animate__animated animate__headShake animate__infinite" : "hover:scale-105")}>
            {status === "A avaliar" && <Star className='absolute top-6 right-8 animate-pulse' />}
            <h3 className="text-xl font-bold mb-2">{titulo.length > 15 ? `${titulo.slice(0, 15)}...` : titulo}</h3>
            <p className="text-gray-600 mb-4">{uzerData?.nome ?? "Não atribuido"}</p>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'A realizar' ? 'bg-blue-100 text-blue-800' :
                status === 'Concluido' ? 'bg-green-100 text-green-800' :
                    status === 'Em andamento' ? 'bg-orange-100 text-orange-800' : status === 'A avaliar' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                }`}>
                {status}
            </div>
            <Eye className={twMerge('absolute top-6 right-8 hidden group-hover:block', status === 'A avaliar' && 'hidden opacity-0')} />
        </div>
        {showAvaliarModal &&
            <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                    <button title='Fechar' className='absolute z-50 flex items-center justify-center bg-black md:bg-transparent rounded-xl p-1 md:top-6 md:right-8 top-6 right-8'>
                        <X size={44} color='white' onClick={() => setShowAvaliarModal(false)} />
                    </button>
                    <h2 className="text-xl font-bold mb-4">Avalie o pedido</h2>
                    <p className="text-gray-600 mb-4">Avalie o pedido</p>
                    <button onClick={avaliarPedido} className='bg-roxazul rounded-lg p-2 text-white flex flex-col items-center'>Avaliar</button>
                </div>
            </div>}
        {showPedidoModal && <div className="fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
            <button title='Fechar' className='absolute z-50 flex items-center justify-center bg-black md:bg-transparent rounded-xl p-1 md:top-6 md:right-8 top-6 right-8'>
                <X size={44} color='white' onClick={() => setShowPedidoModal(false)} />
            </button>
            <div className="bg-white md:w-9/12 w-11/12 rounded-[30px] px-8 py-6 gap-4 flex flex-col items-center animate__animated animate__fadeInUp animate__faster">
                <h1 className="text-black text-lg md:text-2xl text-center font-extrabold">Descrição do pedido</h1>
                <div className="w-11/12 flex lg:flex-row flex-col lg:overflow-hidden overflow-y-auto items-center justify-center gap-3">
                    <div className="md:w-1/2 flex flex-col items-start gap-3">
                        <h1 className="text-black text-xl font-bold">{titulo.charAt(0).toUpperCase() + titulo.slice(1)}</h1>
                        <h2 className="text-black text-xl font-normal">{uzerData?.nome}</h2>
                        <h3 className="text-black text-xl font-medium">{valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                        <p className={twMerge("text-black text-xl font-medium", status === 'Concluido' ? 'text-green-500' :
                            status === 'Em andamento' ? ' text-[#535FFF]' : status === 'A avaliar' ? ' text-yellow-500' :
                                ' text-red-500')}>{status}</p>
                        <div className='w-full'>
                            <h1 className="text-black text-lg font-bold">Descrição</h1>
                            <textarea value={descricao} readOnly className='w-full bg-[#EDEDED] opacity-50 p-4 text-lg font-medium rounded-2xl animate__animated animate__shakeX animate__faster' cols={30} rows={10}></textarea>
                            <div className="w-full flex items-center justify-center">
                                <button disabled={status === "A avaliar" || status === "Concluido"} onClick={sendMessage} className="bg-roxazul mx-auto mt-4 transition-colors hover:bg-azulao text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <MessageCircle size={24} />
                                    Ir para o Chat
                                </button>
                            </div>
                        </div>


                    </div>
                    {/* <div className="md:w-1/2 flex flex-col items-center gap-3">
                            {status === "A avaliar" ? <h1 className="text-black text-center text-xl font-bold">Aguardando a avaliação do cliente...</h1> : <>
                               {!(status === "Concluido") && <h1 className="text-black text-center text-xl font-bold">Coloque uma imagem do serviço (Opcional):</h1>}
                                <label htmlFor="orcamento" className="text-black text-center w-10/12 h-64 bg-[#EDEDED] cursor-pointer hover:bg-[#d9d9d9] transition-colors rounded-2xl flex items-center justify-center text-xl font-medium">
                                    <FileUp size={32} color='black' />
                                </label>
                                <input
                                    id="orcamento"
                                    type="file"
                                    placeholder="0,00"
                                    className="bg-[#EDEDED] hidden p-2 text-center text-xl font-medium rounded-2xl animate__animated animate__shakeX animate__faster w-64 h-16"
                                />
                                <button
                                    title='Finalizar o serviço'
                                    onClick={realizarServico}
                                    disabled={status === "A avaliar" || status === "Concluido"}
                                    className="bg-[#535FFF] py-3 px-5 rounded-2xl hover:bg-roxazul transition-colors active:scale-[98%] mt-5 font-bold flex items-center justify-center text-lg disabled:cursor-not-allowed disabled:opacity-50">
                                    {isSubmitting ? <Loader2 size={32} color='white' className="animate-spin" /> : <>
                                        <Check size={32} color='white' />
                                        <span className="font-bold text-xl text-white flex justify-center items-center ml-1">Finalizar serviço</span>
                                    </>}
                                </button>
                            </>}
                        </div> */}
                </div>
            </div>
        </div>}
    </>
    )
}
