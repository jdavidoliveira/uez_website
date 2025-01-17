"use client"

import ReactDOM from "react-dom"
import { CircleHelp } from "lucide-react"
import { FormEvent, useState } from "react"
import { Order, OrderDetailed } from "@/types/Order"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { toast } from "sonner"
import LoadingSpinner from "@/components/layout/LoadingSpinner"
import { Axios, AxiosError } from "axios"

interface EditOrderOverlayProps {
  onClose: () => void
  order: Order
}

function EditOrderOverlay({ onClose, order }: EditOrderOverlayProps) {
  const [showConfirmCancelation, setShowConfirmCancelation] = useState(false)
  const [orderForm, setOrderForm] = useState({
    title: order.title,
    description: order.description,
    profession: order.speciality.profession.name,
    speciality: order.speciality.name,
    value: order.value,
  })
  const [isEditingOrder, setIsEditingOrder] = useState(false)

  async function handleUpdateOrder(e: FormEvent) {
    e.preventDefault()
    console.log(orderForm)
    setIsEditingOrder(true)
    try {
      const updatedOrder = await api.patch<Order>(`/orders/${order.id}`, orderForm)
      toast.success(`O pedido: "${updatedOrder.data.title}" foi atualizado com sucesso!`, {
        action: {
          label: "Atualizar",
          onClick: () => window.location.reload(),
        },
      })
      onClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? "Erro ao atualizar o pedido")
      }
    } finally {
      setIsEditingOrder(false)
    }
  }
  async function handleConfirmCancelation() {
    try {
      const updatedOrder = await api.delete<Order>(`/orders/${order.id}/cancel`)
      toast.success(`O pedido: "${updatedOrder.data.title}" foi cancelado com sucesso!`, {
        action: {
          label: "Atualizar",
          onClick: () => window.location.reload(),
        },
      })
      onClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? "Erro ao atualizar o pedido")
      }
    }
    // cancel order
    setShowConfirmCancelation(false)
    onClose()
  }

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 sm:overflow-auto md:overflow-hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest(".close-overlay") || target.closest(".overlay-container")) return
        onClose()
      }}
    >
      {showConfirmCancelation ? (
        <div className="overlay-container relative w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-bold text-black">Confirmação de cancelamento</h2>
          <p className="mb-6 text-center text-gray-700">
            Tem certeza de que deseja cancelar este pedido? Essa ação não pode ser desfeita.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmCancelation}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-300"
            >
              Confirmar
            </button>

            <button
              onClick={() => setShowConfirmCancelation(false)}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-400"
            >
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <div className="overlay-container relative w-[90%] max-w-7xl rounded-2xl bg-white p-6 shadow-lg md:p-10 lg:p-14">
          <button
            onClick={onClose}
            className="close-overlay absolute right-4 top-4 text-2xl font-extrabold text-black hover:text-gray-700 md:right-6 md:top-6"
          >
            ✕
          </button>

          <h2 className="mb-2 text-center text-2xl font-extrabold md:mt-4 md:text-4xl">Editar pedido</h2>
          <p className="mb-4 text-center text-black md:mb-12 lg:mb-16">
            Preencha os campos para lançar seu pedido na nossa plataforma
          </p>

          <form className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-6">
            <div className="lg:ml-36 lg:mr-10">
              <div>
                <label className="block items-center pb-2 text-base font-semibold text-primary-dark-blue">
                  Título do pedido
                </label>
                <input
                  value={orderForm.title}
                  onChange={(e) => setOrderForm({ ...orderForm, title: e.target.value })}
                  type="text"
                  placeholder="Ex: Eu preciso de uma logo para minha padaria"
                  className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-1 mt-4 md:mb-14 md:mt-6">
                <div className="flex items-center justify-between pb-2">
                  <label className="flex items-center text-base font-semibold text-primary-dark-blue">Descrição</label>
                  <span className="text-sm text-gray-500">0/600</span>
                </div>
                <textarea
                  value={orderForm.description}
                  onChange={(e) => setOrderForm({ ...orderForm, description: e.target.value })}
                  placeholder="Ex: Preciso de um logotipo para minha padaria chamada 'Padaria Felicidade' com as cores marrom e branco, estilo minimalista."
                  maxLength={600}
                  className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={10}
                ></textarea>
              </div>
            </div>

            <div className="lg:ml-10 lg:mr-36">
              <div className="mb-4 md:mb-14">
                <label className="flex items-center pb-2 text-base font-semibold text-primary-dark-blue">
                  Profissão
                  <div className="group relative">
                    <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                    <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                      Área profissional que melhor descreve o serviço que você está solicitando.
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={orderForm.profession}
                  onChange={(e) => setOrderForm({ ...orderForm, profession: e.target.value })}
                  placeholder="Ex: Design"
                  className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 md:mb-14">
                <label className=" flex items-center pb-2 text-base font-semibold text-primary-dark-blue">
                  Especialidade
                  <div className="group relative">
                    <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                    <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                      A habilidade ou ramo dentro da profissão que você deseja para o serviço.
                    </div>
                  </div>
                </label>
                <input
                  value={orderForm.speciality}
                  onChange={(e) => setOrderForm({ ...orderForm, speciality: e.target.value })}
                  type="text"
                  placeholder="Ex: Criação de logo"
                  className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:mt-6">
                <label className="block pb-2 text-base font-semibold text-primary-dark-blue">Preço</label>
                <div className="flex flex-col items-start space-y-2">
                  <div className="flex w-full items-center space-x-2">
                    <span className="text-primary-dark-blue">R$</span>
                    <input
                      value={orderForm.value}
                      onChange={(e) => setOrderForm({ ...orderForm, value: parseFloat(e.target.value) })}
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <label className="flex items-center space-x-1 self-end">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">A combinar</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex items-center justify-center gap-10 md:col-span-2 lg:col-span-3">
              <button
                onClick={handleUpdateOrder}
                className="relative flex items-center justify-center rounded-lg bg-primary-blue px-10 py-2 font-semibold text-white transition hover:bg-secondary-blue md:px-16 md:py-3"
              >
                {isEditingOrder ? <LoadingSpinner /> : "Atualizar"}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmCancelation(true)}
                className="relative rounded-lg bg-red-600 px-10 py-2 font-semibold text-white transition hover:bg-red-500 md:px-10 md:py-3"
              >
                Cancelar pedido
              </button>
            </div>
          </form>
        </div>
      )}
    </motion.div>,
    document.body,
  )
}

export default EditOrderOverlay
