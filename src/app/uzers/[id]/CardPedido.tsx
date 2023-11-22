"use client"
import api from '@/hooks/api'
import ClienteInterface from '@/types/Cliente'

import { Check, Clipboard, Eye, FileUp, Loader2, MessageCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useClipboard } from "use-clipboard-copy"
import { useRouter } from 'next/navigation'


export default function CardPedido({ titulo = "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _id_cliente = "teste", status = "A realizar", disponivel = true, descricao, idPedido, valor }: { titulo: string, _id_cliente: string | null, status: string, disponivel: boolean, descricao: string, idPedido: string, valor: number }) {
    const [clienteData, setClienteData] = useState<ClienteInterface | null>()
    useEffect(() => {
        fetchClientes()
        console.log(clienteData)
    }, [])

    const router = useRouter()
    async function fetchClientes() {
        _id_cliente !== null ?
            await api.get<ClienteInterface>(`/clientes/${_id_cliente}`)
                .then(res => setClienteData(res.data))
                .catch(err => setClienteData(null))
            : setClienteData(null)

    }

    const [showModal, setShowModal] = useState(false)

    return (<>
        <div onClick={() => setShowModal(true)} className="bg-white shadow-md rounded-xl p-6 w-10/12 m-2 transition hover:scale-105 relative group cursor-pointer">
            <h3 className="text-xl font-bold mb-2">{titulo.length > 15 ? `${titulo.slice(0, 15)}...` : titulo}</h3>
            <p className="text-gray-600 mb-4">{clienteData ? (clienteData.nome).charAt(0).toUpperCase() + (clienteData.nome).slice(1) : "Não atribuido"}</p>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'A realizar' ? 'bg-blue-100 text-blue-800' :
                status === 'Concluido' ? 'bg-green-100 text-green-800' :
                    status === 'Em andamento' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                }`}>
                {status}
            </div>
            <Eye className='absolute top-6 right-8 hidden group-hover:block' />
        </div>
        {showModal && <FinishPedido titulo={titulo} nome_cliente={clienteData?.nome} valor={valor} descricao={descricao} status={status} />}
    </>
    )


    interface FinishPedidoProps {
        titulo: string
        nome_cliente: string | any
        valor: number
        status: string
        descricao: string
    }
    function FinishPedido({ titulo, nome_cliente, valor, status, descricao }: FinishPedidoProps) {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [finished, setFinished] = useState(false);

        const clipboard = useClipboard(); // create an instance of useClipboard

        const handleCopy = () => {
            clipboard.copy(descricao); // copy the description to clipboard when button is clicked
            alert('Copiado para a area de transferência!');
        }

        const sendMessage = () => {
            router.push(`/chat?userChatId=${_id_cliente}`)
        }

        function realizarServico() {
            if (finished) {
                return
            }

            setIsSubmitting(true)
            api.put(`/pedido/finish/${idPedido}`, {
                status: 'Concluido',
            })
                .then(() => {
                    setIsSubmitting(false)
                    setFinished(false)
                    setShowModal(false)
                    alert('Serviço concluído com sucesso!')
                    router.refresh()
                })
                .catch(err => {
                    console.log(err)
                    setIsSubmitting(false)
                })


        }

        return (
            <div className="fixed z-40 w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
                <button title='Fechar' className='absolute z-50 flex items-center justify-center bg-black md:bg-transparent rounded-xl p-1 md:top-6 md:right-8 top-6 right-8'>
                    <X size={44} color='white' onClick={() => setShowModal(false)} />
                </button>
                <div className="bg-white md:w-9/12 w-11/12 rounded-[30px] px-8 py-6 gap-4 flex flex-col items-center animate__animated animate__fadeInUp animate__faster">
                    <h1 className="text-black text-lg md:text-2xl text-center font-extrabold">Descrição do pedido</h1>
                    <div className="w-11/12 flex lg:flex-row flex-col overflow-y-auto items-center justify-center gap-3">
                        <div className="lg:w-1/2 flex flex-col items-start gap-3">
                            <h1 className="text-black text-xl font-bold">{titulo.charAt(0).toUpperCase() + titulo.slice(1)}</h1>
                            <h2 className="text-black text-xl font-normal">{nome_cliente}</h2>
                            <h3 className="text-black text-xl font-medium">{valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            <p className={twMerge("text-black text-xl font-medium", status === 'Concluido' ? 'text-green-500' :
                                status === 'Em andamento' ? ' text-[#535FFF]' : status === 'A avaliar' ? ' text-yellow-500' :
                                    ' text-red-500')}>{status}</p>
                            <div className='w-full'>
                                <h1 className="text-black text-lg font-bold">Descrição</h1>
                                <textarea value={descricao} readOnly className='w-full bg-[#EDEDED] opacity-50 p-4 text-lg font-medium rounded-2xl md:h-auto h-28 animate__animated animate__shakeX animate__faster' cols={30} rows={10}></textarea>
                                <div className="w-full flex items-center justify-center">
                                    <button onClick={handleCopy} className="bg-white mx-auto mt-4 transition hover:scale-105 text-azulao border font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Clipboard size={24} />
                                        {clipboard.copied ? "Copiado!" : "Copiar descrição"}
                                    </button>
                                    <button disabled={status === "A avaliar" || status === "Concluido"} onClick={sendMessage} className="bg-roxazul mx-auto mt-4 transition-colors hover:bg-azulao text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <MessageCircle size={24} />
                                        Ir para o Chat
                                    </button>
                                </div>
                            </div>


                        </div>
                        <div className="lg:w-1/2 w-11/12 flex flex-col items-center gap-3">
                            {status === "A avaliar" ? <h1 className="text-black text-center text-xl font-bold">Aguardando a avaliação do cliente...</h1> : <>
                               {!(status === "Concluido") && <h1 className="text-black text-center text-xl font-bold">Coloque uma imagem do serviço (Opcional):</h1>}
                                <label htmlFor="orcamento" className="text-black text-center w-10/12 min-h-[60px] max-h-64 bg-[#EDEDED] cursor-pointer hover:bg-[#d9d9d9] transition-colors rounded-2xl flex items-center justify-center text-xl font-medium">
                                    <FileUp size={32} color='black' />
                                </label>
                                <input
                                    id="orcamento"
                                    type="file"
                                    placeholder="0,00"
                                    className="bg-[#EDEDED] sr-only p-2 text-center text-xl font-medium rounded-2xl animate__animated animate__shakeX animate__faster w-64 h-16"
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
