"use client"

import api from "@/lib/api"
import { Messages } from "@/types/Chat"
import { CircleDollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import CardPedido from "./CardPedido"
import { useRouter } from "next/navigation"
import { IMessage } from "@/types/IChat"
import { User } from "next-auth"
import { useChat } from "@/contexts/Chat"
import { IPedido } from "@/types/IPedido"

interface BudgetProps {
  userData: User
  type: "BUDGET"
  userType: "UZER" | "CLIENTE"
  message: IMessage
}

export default function Budget({ userData, message }: BudgetProps) {
  const { chat, setChat } = useChat()
  const router = useRouter()

  function openBudget() {
    setShowBudgetModal(true)
  }

  const [pedido, setPedido] = useState<IPedido | null>(null)
  const [pedidoAceitado, setPedidoAceitado] = useState(false)

  useEffect(() => {
    fetchPedido()
  }, [])

  async function fetchPedido() {
    await api
      .get(`/pedidos/${message.idPedido}`)
      .then((res) => {
        setPedido(res.data)
      })
      .catch((err) => {
        setPedido(null)
      })
  }

  async function aceitarPedido() {
    if (pedidoAceitado) {
      return alert("A Proposta ja foi aceita!")
    } else {
      setPedidoAceitado(true)
      await api
        .put(`/pedido/assignUzer/${message.idPedido}`, {
          idUzer: chat?.idUzer,
          valor: Number(message.content),
        })
        .then(async (res) => {
          console.log(res)
          setShowProposalModal(false)
          alert("Proposta aceita!")
          router.push(`/clientes/${chat?.idCliente}`)
        })
        .catch((err) => {
          console.log(err)
          alert("Erro ao aceitar proposta")
        })
    }
  }

  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showProposalModal, setShowProposalModal] = useState(false)

  return (
    <>
      <div
        className={twMerge(
          "w-full px-2 flex items-center z-[1] justify-end",
          userData.id === message.senderId ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={twMerge(
            "border w-fit max-w-[55%] py-10 flex z-20 flex-col rounded-2xl p-4 text-white items-center gap-2 justify-center",
            userData.id === message.senderId
              ? "bg-azulinho justify-end rounded-br-none"
              : "bg-white text-black rounded-bl-none justify-start"
          )}
        >
          <button
            onClick={openBudget}
            className={twMerge(
              "flex items-center gap-2 cursor-pointer bg-[#375FFF] transition-colors hover:bg-[#7a94ff] rounded p-2",
              userData.id === message.senderId ? "bg-[#375FFF]" : "bg-[#ededed]"
            )}
          >
            {pedido ? (
              <>
                <CircleDollarSign /> <span>Orçamento: {pedido.titulo}</span>
              </>
            ) : (
              "Ver Proposta"
            )}
          </button>
          <div
            className={twMerge(
              "w-full text-xs flex ",
              userData.id === message.senderId ? "justify-end" : "justify-start"
            )}
          >
            <h2>
              {message.createdAt.substring(11, 16)}
              {userData.id === message.senderId ? (message.readed ? " - L" : " - NL") : ""}
            </h2>
          </div>
        </div>
      </div>
      {showBudgetModal && (
        <div className="fixed z-[999999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-azulao w-10/12 h-5/6 md:w-1/2 md:h-4/6 rounded-2xl p-4 py-6 gap-4 flex flex-col items-center justify-center">
            <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">Pedido Atrelado</h1>
            <CardPedido
              idUzer={pedido?.idUzer}
              pedidoAceitado={pedidoAceitado}
              status={pedido?.status}
              titulo={pedido?.titulo}
            />
            <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">
              {userData.userType === "UZER" ? "Seu orcamento ficou no total de:" : "Seu pedido ficou no total de:"}
            </h1>
            <p className="text-white text-lg md:text-2xl text-center font-extrabold">
              {Number(message.content).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            {pedido?.idUzer || userData.userType === "UZER" || pedidoAceitado ? (
              <button
                onClick={() => setShowBudgetModal(false)}
                className="bg-[#F12828] p-2 rounded w-1/2 mt-5 font-bold text-sm text-white"
              >
                Fechar
              </button>
            ) : (
              <div className="flex gap-4 w-11/12">
                <button
                  onClick={() => setShowProposalModal(true)}
                  className="bg-[#76F561] p-2 rounded w-1/2 mt-5 font-bold text-sm text-black"
                >
                  Aceitar
                </button>
                <button
                  onClick={() => setShowBudgetModal(false)}
                  className="bg-[#F12828] p-2 rounded w-1/2 mt-5 font-bold text-sm text-black"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showProposalModal && (
        <div className="fixed z-[999999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-azulao w-10/12 h-5/6 md:w-1/2 md:h-4/6 rounded-2xl p-4 py-6 gap-4 flex flex-col items-center justify-between">
            <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">Página de checkout</h1>
            <button
              onClick={aceitarPedido}
              className="bg-[#525FFF] p-2 rounded w-1/2 text-white mt-5 font-bold text-sm"
            >
              Ja realizei o pagamento
            </button>
          </div>
        </div>
      )}
    </>
  )
}
