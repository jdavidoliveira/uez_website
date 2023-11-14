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


    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-10/12 m-2 transition hover:scale-105 relative group">
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
    )
}
