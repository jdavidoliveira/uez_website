"use client"

import Input from "@/components/Forms/Input/Input";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const solicitarServicoFormSchema = z.object({
    tipo: z.string().nonempty("Selecione o tipo de serviço"),
    servicoPrincipal: z.string().nonempty("Selecione o serviço a qual seu problema está relacionado"),
    titulo: z.string().nonempty("Insira o nome do serviço"),
    descricao: z.string().nonempty("Descreva o serviço"),
    valor: z.number().min(1, "O valor é muito baixo. Seja mais brilhante").default(0),
    acombinar: z.boolean().default(false)
})

type typeSoliciarServico = z.infer<typeof solicitarServicoFormSchema>

export default function SolicitarServico() {

    const { register, handleSubmit, formState: { errors, } } = useForm<typeSoliciarServico>({
        /* @ts-ignore */
        resolver: zodResolver(solicitarServicoFormSchema)
    })

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
            <form className="w-10/12 h-4/6 flex flex-row items-center self-center gap-12 justify-center" onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="flex-1 h-full flex flex-col gap-10">
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor="online" className="text-2xl font-extrabold">Tipo de serviço:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <div className="w-1/2 flex items-center justify-start gap-2">
                                <Input type="checkbox" id="online" noLabel />
                                <label htmlFor="online" className="font-extrabold text-xl">Online</label>
                            </div>
                            <div className="w-1/2 flex items-center justify-end gap-2">
                                <Input type="checkbox" id="presencial" noLabel />
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
                                })} min={0} id="preco" className="bg-cinzero p-1 w-9/12 text-lg font-extrabold outline-none" placeholder="0,00" />
                            </div>
                            <span className="w-full flex items-center justify-end justify-self-end  gap-2">
                                <Input type="checkbox" className="w-5 h-5" id="acombinar" noLabel />
                                <label htmlFor="acombinar" className="font-extrabold text-lg">A combinar</label>
                            </span>
                        </div>
                    </div>
                    <div className="w-10/12 flex flex-col items-center justify-around font-bold text-red-600">
                        {(errors.servicoPrincipal || errors.titulo || errors.descricao || errors.valor || errors.acombinar) && (
                            <>
                                <h1 className="text-xl font-extrabold mb-4 text-center">Corrija esses erros para prosseguir com a criação do serviço </h1>
                                <ul className="list-disc flex flex-col px-10">
                                    {errors.servicoPrincipal && <li> {errors.servicoPrincipal.message}</li>}
                                    {errors.titulo && <li> {errors.titulo.message}</li>}
                                    {errors.descricao && <li> {errors.descricao.message}</li>}
                                    {errors.valor && <li> {errors.valor.message}</li>}
                                    {errors.acombinar && <li> {errors.acombinar.message}</li>}
                                </ul>
                            </>
                        )}


                    </div>

                    <button className="bg-azulao p-4 h-14 w-96 rounded-lg font-bold text-white text-xl transition hover:scale-105">Solicitar</button>
                </div>
            </form>

        </main>
    )
}
