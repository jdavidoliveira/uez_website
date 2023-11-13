"use client"
import api from '@/hooks/api'
import UzerInterface from '@/types/Uzer'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CardPedido({ titulo = "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _id_uzer = null, status = "A realizar...", pedidoAceitado }: { titulo: string | any, _id_uzer: string | any, status: string | any, pedidoAceitado?: boolean }) {
    const [uzerData, setUzerData] = useState<UzerInterface | null>()
    useEffect(() => {
        fetchPedido()
    }, [pedidoAceitado])

    async function fetchPedido() {
        _id_uzer !== null ? await api.get<UzerInterface>(`/uzers/${_id_uzer}`).then(res => setUzerData(res.data)).catch(err => setUzerData(null)) : setUzerData(null)
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-10/12 m-2 transition hover:scale-105 relative group">
            <h3 className="text-xl font-bold mb-2">{titulo.length > 15 ? `${titulo.slice(0, 15)}...` : titulo}</h3>
            <p className="text-gray-600 mb-4">{uzerData?.nome ?? "Não atribuido"}</p>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'A Realizar...' ? 'bg-blue-100 text-blue-800' :
                    status === 'Concluído' ? 'bg-green-100 text-green-800' :
                        status === 'Em andamento...' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                }`}>
                {status}
            </div>
            <Eye className='absolute top-6 right-8 hidden group-hover:block' />
        </div>
    )
}
