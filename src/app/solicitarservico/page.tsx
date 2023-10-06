"use client"

import Input from "@/components/Forms/Input/Input";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function SolicitarServico() {
    return (
        <main className="w-full h-full flex flex-col items-center gap-24 p-20">
            <Link href="/" className="fixed left-24 top-24 text-xl font-bold px-2 bg-azulao rounded-xl text-white flex items-center justify-center">
                <ChevronLeftIcon width={40} height={40} />
                <span className="m-3 mr-6">
                    Voltar
                </span>
            </Link>
            <div className="w-full flex flex-col items-center gap-4 justify-center">
                <h1 className="text-4xl font-extrabold">Solicitar serviço</h1>
                <h2 className="text-xl font-bold">Preencha os campos para lançar seu serviço na nossa platafoma</h2>
            </div>
            <div className="w-10/12 h-4/6 flex flex-row items-center self-center gap-12    justify-center">
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
                            <input type="text" id="nomeservico" className="bg-cinzero p-2 w-full text-lg font-extrabold outline-none" placeholder="Ex: Designer" />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor="tituloservico" className="text-2xl font-extrabold">Título do serviço:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <input type="text" id="tituloservico" className="bg-cinzero p-2 w-full text-lg font-extrabold outline-none" placeholder="Ex: Criação de Logotipo" />
                        </div>
                    </div>
                    <div className="w-full h-full flex items-start justify-between">
                        <label htmlFor="tituloservico" className="text-2xl font-extrabold">Título do serviço:</label>
                        <div className="w-1/2 flex items-center justify-between" >
                            <textarea id="tituloservico" className="bg-cinzero p-2 h-40 w-full text-lg font-extrabold outline-none" placeholder="Ex: Preciso de um logotipo para uma padaria chamada padaria do seu zé, com as cores marrom e branco" />
                        </div>
                    </div>
                </div>
                <div className="h-full flex flex-col items-center justify-between p-4">
                    <div className="w-full flex items-start gap-8" >
                        <label htmlFor="online" className="font-extrabold text-xl">Preço:</label>
                        <div className="w-1/2 flex flex-col items-start gap-2">
                            <div className="w-full flex items-center justify-between gap-3">
                                <label htmlFor="preco" className="font-extrabold text-xl">R$</label>
                                <input type="number" min={0} id="preco" className="bg-cinzero p-1 w-9/12 text-lg font-extrabold outline-none" placeholder="0,00" />
                            </div>
                            <span className="w-full flex items-center justify-end justify-self-end  gap-2">
                                <Input type="checkbox" className="w-5 h-5" id="acombinar" noLabel />
                                <label htmlFor="acombinar" className="font-extrabold text-lg">A combinar</label>
                            </span>
                        </div>
                    </div>
                    <button className="bg-azulao p-4 h-14 w-96 rounded-lg font-bold text-white text-xl transition hover:scale-105">Solicitar</button>
                </div>
            </div>

        </main>
    )
}
