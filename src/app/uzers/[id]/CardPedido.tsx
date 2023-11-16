"use client"
import api from '@/hooks/api'
import ClienteInterface from '@/types/Cliente'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CardPedido({ titulo = "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _id_cliente = "teste", status = "A realizar...", disponivel = true }: { titulo: string, _id_cliente: string | null, status: string, disponivel: boolean }) {
    const [clienteData, setClienteData] = useState<ClienteInterface | null>()
    useEffect(() => {
        fetchClientes()
        console.log(clienteData)

    }, [])

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
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'A Realizar...' ? 'bg-blue-100 text-blue-800' :
                status === 'Concluido' ? 'bg-green-100 text-green-800' :
                    status === 'Em andamento...' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                }`}>
                {status}
            </div>
            <Eye className='absolute top-6 right-8 hidden group-hover:block' />
        </div>
        {showModal && <FinishPedido />}
    </>
    )

    function FinishPedido() {

        const value = 10
        return (
            <div className="fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-9/12 h-5/6 rounded-[30px] p-8 py-6 gap-4 flex flex-col items-center animate__animated animate__fadeInUp animate__faster">
                    <h1 className="text-black text-lg md:text-2xl text-center font-extrabold">Descrição do pedido</h1>
                    <div className="w-11/12 flex items-center justify-center gap-3">
                        <div className="w-1/2 flex flex-col items-start gap-3">
                            <h1 className="text-black text-xl font-bold">{"Título"}</h1>
                            <h2 className="text-black text-xl font-bold">{"Nome do cliente"}</h2>
                            <h3 className="text-black text-xl font-bold">{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            <p className="text-black text-xl font-bold">{"Status"}</p>
                            <div>
                            <h1 className="text-black text-xl font-bold">{"Título"}</h1>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col items-center gap-3">
                            <label htmlFor="orcamento" className="text-black text-xl font-bold">Preço estabelecido (R$):</label>
                            <input
                                id="orcamento"
                                type="number"
                                placeholder="0,00"
                                className="bg-[#EDEDED] p-2 text-center text-xl font-medium rounded-2xl animate__animated animate__shakeX animate__faster w-64 h-16"
                            />
                            <button
                                className="bg-[#535FFF] p-2 rounded-2xl active:scale-[98%] w-36 mt-5 font-bold flex items-center justify-center text-lg text-black disabled:cursor-not-allowed disabled:opacity-50">
                                <span className="font-bold text-lg text-white flex justify-center items-center ml-1">Avançar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
