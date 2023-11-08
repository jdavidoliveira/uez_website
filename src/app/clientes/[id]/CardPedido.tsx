import { useFetch } from '@/hooks/useFetch'
import Pedido from '@/types/Pedido'
import UzerInterface from '@/types/Uzer'
import React from 'react'

export default async function CardPedido({ titulo = "teste", _id_uzer = "teste", status = "A realizar..." }: Pedido | { titulo?: string, _id_uzer?: string, status?: string }) {
    const uzerData = await useFetch<UzerInterface>(`/users/${_id_uzer}`).then(res => res).catch(err => console.log(err))
    return (
        <div className='flex flex-col items-start gap-2 w-2/3 rounded-xl shadow p-4'>
            <div className='flex flex-col'>
                <h1 className='text-xl font-bold'>{titulo}</h1>
                <h2>{uzerData?.nome || "Não atribuido"}</h2>
                <h3>{status}</h3>
                {/* <h3>{valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3> */}
            </div>
        </div>
    )
}
