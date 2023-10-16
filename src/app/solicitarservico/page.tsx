"use client"

import Input from "@/components/Forms/Input/Input";
import { ChevronLeftIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MiniModal from "@/components/Modal/MiniModal";
import { useEffect, useState } from "react";
import { useFetch as myUseFetch } from "@/hooks/useFetch";
import { parseCookies } from "nookies";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Modal from "@/components/Modal/Modal";

const solicitarServicoFormSchema = z.object({
    tipo: z.string()
        .min(1, "Selecione o tipo de serviço")
        .default("online"),
    servicoPrincipal: z.string()
        .min(1, "Selecione o serviço a qual seu problema está relacionado"),
    titulo: z.string()
        .min(1, "Insira um título pro serviço")
        .min(10, "O título precisa ter pelo menos 10 caracteres"),
    descricao: z.string()
        .min(1, "Descreva o serviço")
        .min(30, "A descrição precisa ter pelo menos 30 caracteres"),
    valor: z.number()
        .min(1, "O valor é muito baixo.")
        .default(0),
    acombinar: z.boolean().default(false)
})

type typeSoliciarServico = z.infer<typeof solicitarServicoFormSchema>

export default function SolicitarServico() {

    const [pedidoOk, setPedidoOk] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [isOnlineChecked, setIsOnlineChecked] = useState(true);
    const [isPresencialChecked, setIsPresencialChecked] = useState(false);
    const [acombinarChecked, setAcombinarChecked] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!isOnlineChecked && !isPresencialChecked) {
            setValue("tipo", "")
        }
    }, [isOnlineChecked, isPresencialChecked])

    const { register, handleSubmit, setValue, getValues, formState: { errors, } } = useForm<typeSoliciarServico>({
        /* @ts-ignore */
        resolver: zodResolver(solicitarServicoFormSchema)
    })

    async function createServico(data: typeSoliciarServico) {
        const { tipo, servicoPrincipal, descricao, valor, titulo } = data
        const pedidoData = {
            tipoPedido: tipo,
            categoriaServico: servicoPrincipal,
            nomeServico: servicoPrincipal,
            descricao: descricao,
            valor: valor,
        }

        if (pedidoOk) {
            setIsSubmitting(true)
            const response = await myUseFetch<any>("/create/pedido", {
                method: "POST",
                body: JSON.stringify(pedidoData),
                headers: {
                    Authorization: `Bearer ${parseCookies().accessToken}`
                }
            }).then((response) => {
                setIsSubmitting(false)
                toggleModal(response.message)
                return response.message
            }).catch(error => {
                console.error(error)
                toggleModal(error)
            })
            console.log(response)
        } else {
            setIsSubmitting(false)
            setShowConfirmModal(true)
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('null');
    const [haveButton, setHaveButton] = useState(true)
    function toggleModal(message: string, hasButton: boolean = true) {
        setModalMessage(message)
        setHaveButton(hasButton)
        setShowModal(prevState => !prevState)
    }


    return (
        <main className="w-full h-full flex flex-col items-center gap-24 p-20">
            <Link href="/" className="fixed left-24 top-20 text-xl font-bold px-2 bg-azulao rounded-xl text-white flex items-center justify-center">
                <ChevronLeftIcon width={40} height={40} />
                <span className="m-3 mr-6">
                    Voltar
                </span>
            </Link>
            <div className="w-full flex flex-col items-center gap-4 justify-center">
                <h1 className="text-4xl font-extrabold">Solicitar serviço</h1>
                <h2 className="text-xl font-bold">Preencha os campos para lançar seu serviço na nossa platafoma</h2>
            </div>
            <form className="w-10/12 h-4/6 flex flex-row items-center self-center gap-12 justify-center" onSubmit={handleSubmit(createServico)}>
                <div className="flex-1 h-full flex flex-col gap-10">
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor="online" className="text-2xl font-extrabold">Tipo de serviço:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <div className="w-1/2 flex items-center justify-start gap-2">
                                <Input type="checkbox" value={isOnlineChecked} handleChange={() => {
                                    setIsOnlineChecked(prevState => !prevState)
                                    setValue("tipo", isPresencialChecked && !isOnlineChecked ? "ambos" : "online")
                                }} id="online" noLabel />
                                <label htmlFor="online" className="font-extrabold text-xl">Online</label>
                            </div>
                            <div className="w-1/2 flex items-center justify-end gap-2">
                                <Input type="checkbox" value={isPresencialChecked} handleChange={() => {
                                    setIsPresencialChecked(prevState => !prevState)
                                    setValue("tipo", isOnlineChecked && !isPresencialChecked ? "ambos" : "presencial")
                                }} id="presencial" noLabel />
                                <label htmlFor="presencial" className="font-extrabold text-xl">Presencial</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor="nomeservico" className="text-2xl font-extrabold">Profissional que realiza:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <input type="text" id="nomeservico" list="data" {...register("servicoPrincipal")} className="bg-cinzero p-2 w-full text-lg font-extrabold outline-none" placeholder="Ex: Designer" />
                            <datalist id="data">
                                {["Designer", "Teste"].map((item, index) => {
                                    return (
                                        <option value={item} key={index} />
                                    )
                                })}
                            </datalist>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor="tituloservico" className="text-2xl font-extrabold">Título do serviço:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <input type="text" id="tituloservico" {...register("titulo")} className="bg-cinzero p-2 w-full text-lg font-extrabold outline-none" placeholder="Ex: Criação de Logotipo" />
                        </div>
                    </div>
                    <div className="w-full h-full flex items-start justify-between">
                        <label htmlFor="descricaoservico" className="text-2xl font-extrabold">Descrição:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <textarea id="descricaoservico" {...register("descricao")} className="bg-cinzero p-2 h-40 w-full text-lg font-extrabold outline-none" placeholder="Ex: Preciso de um logotipo para uma padaria chamada padaria do seu zé, com as cores marrom e branco" />
                        </div>
                    </div>
                </div>
                <div className="h-full flex flex-col items-center justify-between p-4">
                    <div className="w-full flex items-start gap-8" >
                        <label htmlFor="online" className="font-extrabold text-xl">Preço:</label>
                        <div className="w-1/2 flex flex-col items-start gap-2">
                            <div className="w-full flex items-center justify-between gap-3">
                                <label htmlFor="preco" className="font-extrabold text-xl">R$</label>
                                <input type="number" {...register("valor", {
                                    valueAsNumber: true,
                                })} min={0} defaultValue={0} id="preco" className="bg-cinzero p-1 w-9/12 text-lg font-extrabold outline-none" placeholder="0,00" />
                            </div>
                            <span className="w-full flex items-center justify-end justify-self-end  gap-2">
                                <Input type="checkbox" value={acombinarChecked} handleChange={() => {
                                    setAcombinarChecked(prevState => !prevState)
                                    setValue("acombinar", !acombinarChecked)
                                }} className="w-5 h-5" id="acombinar" noLabel />
                                <label htmlFor="acombinar" className="font-extrabold text-lg">A combinar</label>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="bg-azulao p-4 h-14 w-96 rounded-lg flex items-center justify-center font-bold text-white text-xl transition enabled:hover:scale-105 disabled:bg-red-600/50 disabled:scale-95" disabled={(errors.servicoPrincipal || errors.titulo || errors.descricao || errors.valor || errors.acombinar) && true}>{(isSubmitting ? <LoadingSpinner /> : "Solicitar")}</button>
                </div>
                {(errors.servicoPrincipal || errors.titulo || errors.descricao || errors.valor || errors.acombinar) && (
                    <div className="fixed bottom-0 bg-red-400 flex flex-col items-center justify-around text-red-600">
                        {errors.servicoPrincipal ?
                            <MiniModal message={String(errors.servicoPrincipal.message)} /> :
                            errors.titulo ? <MiniModal message={String(errors.titulo.message)} /> :
                                errors.descricao ? <MiniModal message={String(errors.descricao.message)} /> :
                                    errors.valor ? <MiniModal message={String(errors.valor.message)} /> :
                                        errors.acombinar ? <MiniModal message={String(errors.acombinar.message)} /> :
                                            errors.tipo ? <MiniModal message={String(errors.tipo.message)} /> :
                                                null
                        }
                    </div>
                )}
                {showConfirmModal && <ModalConfirmarPedido setShowConfirmModal={setShowConfirmModal} setPedidoOk={setPedidoOk} data={getValues()} />}
            </form>
            {showModal && <Modal message={modalMessage} handleClick={() => setShowModal(false)} noButton={!haveButton} />}

        </main>
    )
}



function ModalConfirmarPedido({ setShowConfirmModal, setPedidoOk, data }: {
    setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>, setPedidoOk: React.Dispatch<React.SetStateAction<boolean>>, data: {
        servicoPrincipal: string, titulo: string, descricao: string, valor: number, acombinar: boolean
    }
}) {
    return (
        <div className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30">
            <div className="bg-white w-1/2 h-1/2 flex flex-col items-center rounded-xl justify-between p-8 relative">
                <button onClick={(e) => {
                    e.preventDefault()
                    setShowConfirmModal(false)
                }} className="flex flex-col items-center justify-center absolute top-6 left-6"><Cross2Icon width={60} height={60} className="w-16 h-16 cursor-pointer hover:scale-105" /></button>
                <h1 className="text-3xl font-extrabold text-black">Confirme seu pedido</h1>
                <div className="w-8/12 flex flex-col items-start gap-2">
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
                } className="bg-azulao p-4 h-14 w-96 rounded-lg font-bold text-white text-xl transition hover:scale-105">Tudo Ok</button>
            </div>
        </div>
    )
}