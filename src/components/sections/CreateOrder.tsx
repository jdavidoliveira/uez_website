import ReactDOM from "react-dom"
import Image from "next/image"
import { CircleHelp } from "lucide-react"
import { useState } from "react"

function CreateOrderOverlay({ onClose }: { onClose: () => void }) {
  const [solicitacoes, setSolicitacoes] = useState<{ nome: string; especialidade: string }[]>([])

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 md:overflow-hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest(".close-overlay") || target.closest(".overlay-container")) return
        onClose()
      }}
    >
      <div className="overlay-container relative w-[90%] max-w-7xl rounded-2xl bg-white p-6 shadow-lg md:p-10 lg:p-14">
        <button
          onClick={onClose}
          className="close-overlay absolute right-4 top-4 text-2xl font-extrabold text-black hover:text-gray-700 md:right-6 md:top-6"
        >
          ✕
        </button>

        <h2 className="mb-2 text-center text-2xl font-extrabold md:text-3xl lg:text-4xl">Criar pedido</h2>
        <p className="mb-8 text-center text-black md:mb-12 lg:mb-16">
          Preencha os campos para lançar seu pedido na nossa plataforma
        </p>

        <form className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          <div className="lg:ml-14">
            <div>
              <label className="text-primary-dark-blue block items-center pb-2 text-base font-semibold">
                Título do pedido
              </label>
              <input
                type="text"
                placeholder="Ex: Eu preciso de uma logo para minha padaria"
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between pb-2">
                <label className="text-primary-dark-blue flex items-center text-base font-semibold">Descrição</label>
                <span className="text-sm text-gray-500">0/600</span>
              </div>
              <textarea
                placeholder="Ex: Preciso de um logotipo para minha padaria chamada 'Padaria Felicidade' com as cores marrom e branco, estilo minimalista."
                maxLength={600}
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
              ></textarea>
            </div>
          </div>

          <div>
            <div className="mb-4 lg:mb-14">
              <label className="text-primary-dark-blue flex items-center pb-2 text-base font-semibold">
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
                placeholder="Ex: Design"
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 lg:mb-14">
              <label className=" text-primary-dark-blue flex items-center pb-2 text-base font-semibold">
                Especialidade
                <div className="group relative">
                  <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                  <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    A habilidade ou ramo dentro da profissão que você deseja para o serviço.
                  </div>
                </div>
              </label>
              <input
                type="text"
                placeholder="Ex: Criação de logo"
                className="w-full rounded-lg border-2 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6">
              <label className="text-primary-dark-blue block pb-2 text-base font-semibold">Preço</label>
              <div className="flex flex-col items-start space-y-2">
                <div className="flex w-full items-center space-x-2">
                  <span className="text-gray-500">R$</span>
                  <input
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

          <div>
            <h3 className="text-primary-dark-blue -mt-1 mb-2 flex items-center text-base font-semibold">
              Suas solicitações ({solicitacoes.length}/5)
              <div className="group relative">
                <CircleHelp size={18} className="ml-2 cursor-pointer text-gray-400" />
                <div className=" absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  Adicione até cinco solicitações ao seu pedido para detalhar suas necessidades.
                </div>
              </div>
            </h3>

            {solicitacoes.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-300 p-4 py-20 shadow-lg lg:max-w-64">
                <Image
                  src="/images/icons/request-verification.png"
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-20 md:w-28"
                />
                <p className="text-center text-sm text-gray-500">
                  Atualmente, você não tem nenhuma solicitação adicionada.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:max-w-64 lg:grid-cols-1">
                {solicitacoes.map((solicitacao, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start rounded-lg border-2 border-gray-300 p-4 shadow-lg"
                  >
                    <h4 className="text-primary-dark-blue text-base font-semibold">{solicitacao.nome}</h4>
                    <p className="text-sm text-gray-500">{solicitacao.especialidade}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="hover:bg-secondary-blue relative rounded-lg bg-primary-blue px-10 py-2 font-semibold text-white transition md:px-16 md:py-3"
            >
              Solicitar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}

export default CreateOrderOverlay
