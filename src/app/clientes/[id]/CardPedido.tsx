"use client"
import { useFetch } from '@/hooks/useFetch'
import Pedido from '@/types/Pedido'
import UzerInterface from '@/types/Uzer'
import React, { useEffect, useState } from 'react'

export default function CardPedido({ titulo = "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _id_uzer = "teste", status = "A realizar..." }: { titulo: string, _id_uzer: string | null, status: string }) {
    const [uzerData, setUzerData] = useState<UzerInterface | null>()
    useEffect(() => {
        async () => {
            _id_uzer !== null ? await useFetch<UzerInterface>(`/uzers/${_id_uzer}`).then(res => setUzerData(res)).catch(err => setUzerData(null)) : setUzerData(null)
        }
    })

    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-10/12 m-2">
            <h3 className="text-xl font-bold mb-2">{titulo.length > 15 ? `${titulo.slice(0, 15)}...` : titulo}</h3>
            <p className="text-gray-600 mb-4">{uzerData?.nome ?? "Não atribuido"}</p>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'A realizar...' ? 'bg-blue-100 text-blue-800' :
                    status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {status}
            </div>
        </div>
    )
}
