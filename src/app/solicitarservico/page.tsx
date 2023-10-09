"use client"

import Input from "@/components/Forms/Input/Input";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MiniModal from "@/components/Modal/MiniModal";
import { useEffect, useState } from "react";

const solicitarServicoFormSchema = z.object({
    tipo: z.string()
        .min(1, "Selecione o tipo de serviço")
        .nonempty("Selecione o tipo de serviço")
        .default("online"),
    servicoPrincipal: z.string()
        .nonempty("Selecione o serviço a qual seu problema está relacionado"),
    titulo: z.string()
        .nonempty("Insira o nome do serviço"),
    descricao: z.string()
        .nonempty("Descreva o serviço")
        .min(30, "A descrição precisa ter pelo menos 30 caracteres"),
    valor: z.number()
        .min(1, "O valor é muito baixo.")
    ,
    acombinar: z.boolean().default(false)
})

type typeSoliciarServico = z.infer<typeof solicitarServicoFormSchema>

export default function SolicitarServico() {

    const [isOnlineChecked, setIsOnlineChecked] = useState(true);
    const [isPresencialChecked, setIsPresencialChecked] = useState(false);
    const [acombinarChecked, setAcombinarChecked] = useState(false)

    useEffect(() => {
        if (!isOnlineChecked && !isPresencialChecked) {
            setValue("tipo", "")
        }
    }, [isOnlineChecked, isPresencialChecked])

    const { register, handleSubmit, getValues, setValue, formState: { errors, } } = useForm<typeSoliciarServico>({
        /* @ts-ignore */
        resolver: zodResolver(solicitarServicoFormSchema)
    })

    async function createServico(data: typeSoliciarServico) {
        alert("Serviço criado com sucesso!")
        alert(JSON.stringify(data, null, 2))
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
                            <input type="text" id="nomeservico" {...register("servicoPrincipal")} className="bg-cinzero p-2 w-full text-lg font-extrabold outline-none" placeholder="Ex: Designer" />
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
                    <button className="bg-azulao p-4 h-14 w-96 rounded-lg font-bold text-white text-xl transition hover:scale-105" disabled={(errors.servicoPrincipal || errors.titulo || errors.descricao || errors.valor || errors.acombinar) && true}>Solicitar</button>
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
            </form>

        </main>
    )
}
