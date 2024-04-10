"use client"

import api from "@/lib/api"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import "animate.css"
import { useGlobalSocket } from "@/contexts/GlobalSocket"
import { useChat } from "@/contexts/Chat"
import { IChat } from "@/types/IChat"
import { IPedido } from "@/types/IPedido"

interface EscolherPedidoModalProps {
  idCliente: string | any
  closeFunction: () => void
  chatId: string
}

export default function EscolherPedidoModal({ idCliente, closeFunction, chatId }: EscolherPedidoModalProps) {
  const [pedidos, setPedidos] = useState<IPedido[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPedidoId, setSelectedPedidoId] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [precoOrcamento, setPrecoOrcamento] = useState(0)
  const { globalSocket } = useGlobalSocket()
  const { chat, setChat } = useChat()

  useEffect(() => {
    fetchPedidos()
  }, [])

  async function fetchPedidos() {
    await api
      .get<IPedido[]>(`/pedidos/cliente/${idCliente}`)
      .then((res) => {
        return setPedidos(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function backFunction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (step === 2) return setStep(1)
    return closeFunction()
  }

  async function finishFunction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (step === 1) return setStep(2)
    // OK
    e.preventDefault()
    if (!precoOrcamento) {
      alert("Por favor, informe o preço do orçamento")
      return
    }

    globalSocket?.emit("budget", {
      chatId: chatId,
      value: precoOrcamento,
      idPedido: selectedPedidoId,
      receiverId: idCliente,
    })

    setChat((prev: IChat | any) => {
      closeFunction()
      return {
        ...prev,
        messages: [
          ...prev.messages,
          {
            senderId: chat?.idUzer,
            receiverId: idCliente,
            idChat: chatId,
            content: precoOrcamento.toString(),
            type: "BUDGET",
            createdAt: new Date().toISOString(),
            idPedido: selectedPedidoId,
          },
        ],
      }
    })
  }

  return (
    <div className="fixed z-[999999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={twMerge(
          "bg-azulao w-9/12 h-5/6 rounded-2xl p-8 py-6 gap-4 flex flex-col items-center justify-between animate__animated animate__fadeInUp animate__faster",
          step === 2 && "w-1/2 h-1/2"
        )}
      >
        {step === 1 && (
          <>
            <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">
              A qual pedido você deseja atrelar um orçamento?
            </h1>
            <div className="w-full overflow-y-auto grid grid-cols-2">
              {isLoading ? (
                <p>Carregando...</p>
              ) : (
                pedidos.map((pedido, index) => {
                  if (pedido.disponivel === false) return null
                  return (
                    <CardPedido
                      pedido={pedido}
                      id={pedido.id}
                      nomePedido={pedido.titulo}
                      dataPedido={pedido.dataCriacao}
                      valorPedido={pedido.valor}
                      key={index}
                    />
                  )
                })
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">
              Qual o valor total do orçamento?
            </h1>
            <div className="w-11/12 flex flex-col items-center gap-3">
              <label htmlFor="orcamento" className="text-white text-xl font-bold">
                Preço estabelecido (R$):
              </label>
              <input
                id="orcamento"
                type="number"
                placeholder="0,00"
                value={precoOrcamento}
                onChange={(e) => setPrecoOrcamento(Number(e.target.value))}
                className="bg-[#EDEDED] p-2 text-center text-xl font-medium rounded-2xl animate__animated animate__shakeX animate__faster w-64 h-16"
              />
            </div>
          </>
        )}
        <div className="flex justify-center gap-10 w-11/12">
          <button
            onClick={backFunction}
            className="bg-[#535FFF] p-2 rounded-2xl active:scale-[98%] w-36 mt-5 font-bold flex items-center justify-center text-lg text-white"
          >
            <ChevronLeft color="white" size={32} />
            <span className="font-bold text-lg text-white flex justify-center items-center mr-1">Voltar</span>
          </button>
          <button
            onClick={finishFunction}
            disabled={selectedPedidoId === null}
            className="bg-[#535FFF] p-2 rounded-2xl active:scale-[98%] w-36 mt-5 font-bold flex items-center justify-center text-lg text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="font-bold text-lg text-white flex justify-center items-center ml-1">Avançar</span>
            <ChevronRight color="white" size={32} />
          </button>
        </div>
      </div>
    </div>
  )

  interface CardPedidoProps {
    nomePedido: string
    dataPedido: string
    valorPedido: number
    id: string
    pedido: IPedido
  }

  function CardPedido({ nomePedido, dataPedido, valorPedido, id, pedido }: CardPedidoProps) {
    const [servico, setServico] = useState<any | null>()

    async function fetchServico() {
      await api
        .get(`/servicos/${pedido.idServico}`)
        .then((response) => {
          setServico(response.data)
        })
        .catch((error) => {
          setServico(null)
        })
    }

    useEffect(() => {
      fetchServico()
    }, [])

    function selectPedidoByCard(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      setSelectedPedidoId(pedido.id)
      setPrecoOrcamento(pedido.valor)
    }

    function deselectPedidoByCard(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      setSelectedPedidoId(null)
      setPrecoOrcamento(0)
    }

    return (
      <button
        title="Clique para escolher"
        className={twMerge(
          "bg-white shadow-md rounded-xl flex flex-col items-start flex-1 p-6 m-2 transition hover:scale-[102%] cursor-default relative active:scale-[98%] group",
          selectedPedidoId === id ? "bg-[#535FFF] text-white" : ""
        )}
        onClick={selectPedidoByCard}
        onDoubleClick={deselectPedidoByCard}
      >
        <h1 className={twMerge("text-xl font-bold", selectedPedidoId === id && "text-white")}>
          {pedido.titulo.charAt(0).toUpperCase() + nomePedido.slice(1).substring(0, 20)}
        </h1>
        <h2 className={twMerge("text-black mb-4 font-medium", selectedPedidoId === id && "text-white")}>
          {pedido.dataCriacao.slice(0, 10).split("-").reverse().join("/")}
        </h2>

        {servico && (
          <h3
            className={twMerge(
              "font-medium bg-primary-purple p-2 text-white rounded-md",
              selectedPedidoId === id && "text-white"
            )}
          >
            {servico.nome}
          </h3>
        )}
        <Eye
          onClick={() => alert("Visualizar")}
          className="absolute top-1/2 translate-y-[-50%] right-8 hidden group-hover:block cursor-pointer"
        />
      </button>
    )
  }
}
