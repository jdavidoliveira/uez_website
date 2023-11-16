"use client"
import api from '@/hooks/api'
import UzerInterface from '@/types/Uzer'
import { Eye, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import 'animate.css'

export default function CardPedido({ titulo = "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _id_uzer = "teste", status = "A realizar", disponivel = true }: { titulo: string, _id_uzer: string | null, status: string, disponivel: boolean }) {
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

    const [showAvaliarModal, setShowAvaliarModal] = useState(false)
    const [showPedidoModal, setShowPedidoModal] = useState(false)

    return (<>
        <div onClick={status === 'A avaliar' ? () => setShowAvaliarModal(true) : () => setShowPedidoModal(true)}
            className={twMerge("bg-white shadow-md rounded-xl p-6 w-10/12 m-2 transition relative group", status === "A avaliar" ? "animate__animated animate__headShake animate__infinite" : "hover:scale-105")}>
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
        {showAvaliarModal && <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Avalie o pedido</h2>
                <p className="text-gray-600 mb-4">Avalie o pedido</p>
                <button onClick={avaliarPedido}>Avaliar</button>
            </div>
        </div>}
        {showPedidoModal && <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Avalie o pedido</h2>
                <p className="text-gray-600 mb-4">Avalie o pedido</p>
                <button onClick={avaliarPedido}>Avaliar</button>
            </div>
        </div>}
    </>
    )
}
