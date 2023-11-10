"use client"

import { useFetch as myUseFetch } from '@/hooks/useFetch'
import Pedido from '@/types/Pedido'
import UzerInterface from '@/types/Uzer'
import { parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import CardUzer from './CardUzer'

export default function HistoricoUzers({ pedidos }: { pedidos: Pedido[] }) {
    const [uzerInfo, setUzerInfo] = useState<UzerInterface[]>([])

    useEffect(() => {
        fetchUzers()
    }, [])

    async function fetchUzers() {
        for (const pedido of pedidos) {
            if (pedido._id_uzer !== null) {
                const uzer = await myUseFetch<UzerInterface>(`/uzers/${pedido._id_uzer}`, {
                    headers: {
                        Authorization: `Bearer ${parseCookies().uezaccesstoken}`
                    }
                }).then(res => res)
                if (uzer) {
                    setUzerInfo((prev: UzerInterface[]) => {
                        if (prev.find(u => u._id === uzer._id)) {
                            return prev
                        }
                        return [...prev, uzer]
                    })
                }
            } else {
                return
            }
        }
    }

    return (
        <div className='md:w-1/2 w-full bg-white shadow-2xl rounded-3xl p-4 flex flex-col items-center'>
            <h1 className="text-lg mt-4 font-bold mb-4 text-center sm:text-2xl">Faça serviços com eles de novo!</h1>
            <div className='w-full p-2 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {uzerInfo.length > 0 ? uzerInfo.map((uzer, index) => (<CardUzer key={index} photoUrl={uzer.photoUrl} nome={uzer.nome} _id={uzer._id} />)) : <h1 className="text-lg p-2 text-center">Você ainda não fechou com nenhum uzer 😞</h1>}
            </div>
        </div>
    )
}
