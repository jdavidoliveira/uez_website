import { Cross2Icon } from "@radix-ui/react-icons"

export default function ModalConfirmarPedido({ setShowConfirmModal, setPedidoOk, data }: {
    setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>, setPedidoOk: React.Dispatch<React.SetStateAction<boolean>>, data: {
        servicoPrincipal: string, titulo: string, descricao: string, valor: number, acombinar: boolean
    }
}) {
    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30">
            <div className="bg-white sm:w-1/2 sm:h-1/2 w-5/6 h-4/6 flex flex-col items-center rounded-xl justify-between p-8 relative">
                <button onClick={(e) => {
                    e.preventDefault()
                    setShowConfirmModal(false)
                }} className="flex flex-col items-center justify-center absolute top-6 left-6">
                    <Cross2Icon width={60} height={60} className="sm:w-16 sm:h-16 w-10 h-10 cursor-pointer hover:scale-105" />
                </button>
                <h1 className="sm:text-3xl text-2xl font-extrabold mt-[35%] sm:mt-0 text-black text-center">Confirme seu pedido</h1>
                <div className="sm:w-8/12 flex flex-col items-start gap-2">
                    <div className=""><strong className="font-bold">Serviço requisitado:</strong><span className="ml-2">{data.servicoPrincipal}</span></div>
                    <div className=""><strong className="font-bold">Nome do pedido:</strong><span className="ml-2">{data.titulo}</span></div>
                    <div className="w-full whitespace-normal">
                        <strong className="font-bold">Descrição do pedido:</strong>
                        <p className="whitespace-normal break-all">{data.descricao}</p>
                    </div>
                    <div className=""><strong className="font-bold">Valor:</strong><span className="ml-2">{data.acombinar ? "A combinar" : "R$ " + String(data.valor)}</span></div>
                </div>
                <button onClick={
                    (e) => {
                        e.preventDefault()
                        setPedidoOk(true)
                        setShowConfirmModal(false)
                        //aqui eu quero submeter de novo para criar o pedido
                    }
                } className="bg-azulao p-4 h-14 w-full rounded-lg font-bold text-white text-xl transition hover:scale-105">Tudo Ok</button>
            </div>
        </div>
    )
}