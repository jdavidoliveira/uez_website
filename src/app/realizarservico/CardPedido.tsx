"use client"

import Pedido from "@/types/Pedido"
import AssignPedidoModal from "./AssignPedidoModal"
import { useState } from "react"

export default function CardPedido({ pedido }: { pedido: Pedido }) {

    function verPedido() {
        setShowModal(true)
    }
    const closeModalFunction = () => {
        setShowModal(false)
    }

    const tituloPedido = (pedido.titulo || "teste").charAt(0).toUpperCase() + (pedido.titulo || "teste").slice(1)

    const [showModal, setShowModal] = useState(false)
  
    return (
      <div className="relative bg-cinzero flex flex-1 h-40 flex-col items-start sm:justify-center p-4 rounded-lg">
        <h1 className="sm:text-xl text-lg font-bold">{tituloPedido.length > 20 ? `${tituloPedido.slice(0, 20)}...` : tituloPedido}</h1>
        <p className='font-medium'>{pedido.tipo}</p>
        <p className='font-medium'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valor)}</p>
        <button onClick={verPedido} className="bg-azulao sm:py-1 sm:px-3 p-1 rounded-full font-bold text-sm text-white absolute bottom-4 right-4 sm:w-auto w-2/5 overflow-visible">
          <span className="hidden sm:inline">Ver pedido</span>
          <span className="inline sm:hidden">Ver</span>
        </button>
        {showModal && <AssignPedidoModal pedido={pedido} closeFunction={closeModalFunction} />}
      </div>
    )
  }