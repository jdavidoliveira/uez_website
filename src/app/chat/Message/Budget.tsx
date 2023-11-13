"use client"

import api from "@/hooks/api";
import { Messages } from "@/types/Chat";
import Pedido from "@/types/Pedido";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import CardPedido from "./CardPedido";

export default function Budget({ content, sendHour, userData, type, _idPedido, userType, globalSelectedData, ...props }: Messages | any) {

    function openBudget() {
        setShowBudgetModal(true);
    }

    const [pedido, setPedido] = useState<Pedido | null>(null)
    const [pedidoAceitado, setPedidoAceitado] = useState(false)

    useEffect(() => {
        fetchPedido()
    }, [])

    async function fetchPedido() {
        await api.get(`/pedido/${_idPedido}`).then((res) => {
            console.log("aaaaa", res.data)
            setPedido(res.data)
        }).catch((err) => {
            setPedido(null)
            console.log(err)
        })
    }

    async function aceitarPedido() {
        if (pedidoAceitado) {
            return alert("Proposta ja foi aceita!")
        } else {
            setPedidoAceitado(true)
            await api.put(`/pedido/${_idPedido}`, {
                idUzer: globalSelectedData?.uzerId,
            }).then((res) => {
                console.log(res)
                setShowProposalModal(false)
                alert("Proposta aceita!")
            }).catch((err) => {
                console.log(err)
                alert("Erro ao aceitar proposta")
            })
        }
    }



    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [showProposalModal, setShowProposalModal] = useState(false);

    return (
        <>
            <div className={twMerge("w-full px-2 flex items-center z-[1] justify-end", userData._id === props.senderId ? "justify-end" : "justify-start")}>
                <div className={twMerge("border w-fit max-w-[55%] py-10 flex z-20 flex-col rounded-2xl p-4 text-white items-center gap-2 justify-center", userData._id === props.senderId ? "bg-azulinho justify-end rounded-br-none" : "bg-white text-black rounded-bl-none justify-start")}>
                    <button onClick={openBudget} className={twMerge("flex items-center gap-2 cursor-pointer bg-[#375FFF] transition-colors hover:bg-[#7a94ff] rounded p-2", userData._id === props.senderId ? "bg-[#375FFF]" : "bg-[#ededed]")}>
                        {pedido ? (<><CircleDollarSign /> <span>Orçamento: {pedido.titulo}</span></>) : "Ver Proposta"}
                    </button>
                    <div className={twMerge("w-full text-xs flex ", userData._id === props.senderId ? "justify-end" : "justify-start")}>
                        <h2>
                            {sendHour.substring(0, 5)}
                        </h2>
                    </div>
                </div>
            </div>
            {showBudgetModal && (
                <div className="fixed z-[999999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-azulao w-10/12 h-5/6 md:w-1/2 md:h-4/6 rounded-2xl p-4 py-6 gap-4 flex flex-col items-center justify-center">
                        <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">Pedido Atrelado</h1>
                        <CardPedido _id_uzer={pedido?._id_uzer} pedidoAceitado={pedidoAceitado} status={pedido?.status} titulo={pedido?.titulo} />
                        <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">{userType === "uzer" ? "Seu orcamento ficou no total de:" : "Seu pedido ficou no total de:"}</h1>
                        <p className="text-white text-lg md:text-2xl text-center font-extrabold">{Number(content).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        {pedido?._id_uzer || userType === "uzer" || pedidoAceitado ?
                            <button
                                onClick={() => setShowBudgetModal(false)}
                                className="bg-[#F12828] p-2 rounded w-1/2 mt-5 font-bold text-sm text-white">
                                Fechar
                            </button> :
                            <div className="flex gap-4 w-11/12">
                                <button
                                    onClick={() => setShowProposalModal(true)}
                                    className="bg-[#76F561] p-2 rounded w-1/2 mt-5 font-bold text-sm text-black">
                                    Aceitar
                                </button><button
                                    onClick={() => setShowBudgetModal(false)}
                                    className="bg-[#F12828] p-2 rounded w-1/2 mt-5 font-bold text-sm text-black">
                                    Fechar
                                </button>
                            </div>
                        }

                    </div>
                </div>
            )}
            {showProposalModal && (
                <div className="fixed z-[999999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-azulao w-10/12 h-5/6 md:w-1/2 md:h-4/6 rounded-2xl p-4 py-6 gap-4 flex flex-col items-center justify-between">
                        <h1 className="text-white text-lg md:text-2xl text-center font-extrabold">Página de checkout</h1>
                        <button
                            onClick={aceitarPedido}
                            className="bg-[#525FFF] p-2 rounded w-1/2 text-white mt-5 font-bold text-sm">
                            Ja realizei o pagamento
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}