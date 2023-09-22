'use client'

import { useEffect, useState } from "react"
import { useFetch } from "@/hooks/useFetch"
import Input from '@/components/layout/Input/Input'
import * as Avatar from '@radix-ui/react-avatar'
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export default function Uzers() {

    interface Uzer {
        nome: string
        photoUrl: string
        servicosPrestados?: [
            {
                tipo: string
                nomeServico: string
            }
        ]
    }

    const [uzerData, setUzerData] = useState<Uzer[]>([{ nome: "Carregando", photoUrl: "https://via.placeholder.com/150" }])


    async function getUzerData() {
        const data = await useFetch<Uzer[]>("/uzers")
        setUzerData(data)
    }


    useEffect(() => {
        getUzerData()
    }, [])

    const [tipoServico, setTipoServico] = useState([])

    const handleOnlineCheckboxChange = (isChecked: boolean) => {
        if (isChecked) {
            {/* @ts-ignore */ }
            setTipoServico((prevTipoServico: any) => [...prevTipoServico, "online"]);
        } else {
            setTipoServico((prevTipoServico) =>
                prevTipoServico.filter((tipo) => tipo !== "online")
            );
        }
    };

    const handlePresencialCheckboxChange = (isChecked: boolean) => {
        if (isChecked) {
            {/* @ts-ignore */ }
            setTipoServico((prevTipoServico) => [...prevTipoServico, "presencial"]);
        } else {
            setTipoServico((prevTipoServico) =>
                prevTipoServico.filter((tipo) => tipo !== "presencial")
            );
        }
    };

    return (
        <main className="flex w-full justify-between mt-6">
            <section className="flex w-10/12 flex-wrap gap-4 justify-between p-4">
                {uzerData?.map((usuario, index) => {
                    const nomes = usuario.nome.split(" ")
                    const nome = nomes.length > 2 ? (nomes[0].length > 8 ? ((nomes[0].length > 12 ? nomes[0].slice(0, 12) : nomes[0])) : nomes[0] + " " + nomes[1]) : nomes[0] + " " + nomes[1]
                    // Se o nome for menor que 8 caracteres, coloca o nome completo, até 2 nomes
                    return <UserCard key={index} nome={nome} photoUrl={usuario.photoUrl} servicoPrincipal={usuario?.servicosPrestados ? usuario.servicosPrestados[0].nomeServico : "Cliente"} />
                }
                )}
            </section>
            <aside className="w-3/12 h-full flex flex-col gap-4 p-2 items-center">
                <form className="flex flex-col w-full items-center gap-4">
                    <h3>Qual profissional você procura?</h3>
                    <div className="flex w-full items-center justify-around gap-2">
                        <Input
                            type={"checkbox"}
                            id="online"
                            label={"Online"}
                            value={true}
                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnlineCheckboxChange(e.target.checked)}
                        />
                        <Input
                            type={"checkbox"}
                            id="presencial"
                            label={"Presencial"}
                            value={false}
                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handlePresencialCheckboxChange(e.target.checked)
                            }
                        />
                    </div>
                    <Input
                        type={"text"}
                        label={"Cargo:"}
                        placeholder={"Ex: Designer"}
                        id={"cargo"}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => { }}
                        auxButton={<MagnifyingGlassIcon />}
                        onAuxButtonClick={() => {
                            alert("teste");
                        }} />
                    <Input
                        type={"text"}
                        label={"Nome:"}
                        placeholder={"Ex: Fulano de tal"}
                        id={"nome"}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => { }}
                        auxButton={<MagnifyingGlassIcon />}
                        onAuxButtonClick={() => {
                            alert("teste");
                        }}
                    />
                    <button
                        className="px-4 py-2 text-sm font-medium text-center text-white bg-azulao rounded-lg hover:bg-roxazul focus:ring-4 focus:outline-none focus:ring-blue-300"
                        onClick={(e) => {
                            e.preventDefault();
                            alert("Filtro Aplicado");
                        }}
                    >Aplicar</button>
                </form>
            </aside>
        </main>
    )
}

function UserCard({ nome = "Carregando...", servicoPrincipal = "Carregando...", photoUrl = "https://via.placeholder.com/150", tipoServico = "Carregando..." }) {
    return (
        <div className="w-[calc(50%_-_20px)] flex items-center justify-center bg-cinzero ">
            <div className=" w-full flex items-center justify-between py-2 pl-4 pr-8">
                <Avatar.Root className="w-20 h-20 rounded-full shadow-lg">
                    <Avatar.Image
                        className="w-20 h-20 rounded-full"
                        src={photoUrl}
                        alt={nome}
                    />
                    <Avatar.Fallback
                        className="w-20 h-20 rounded-full"
                        delayMs={600}
                    >
                        User
                    </Avatar.Fallback>
                </Avatar.Root>
                <div className="flex flex-col items-center justify-center">
                    <h5 className="mb-1 text-base font-medium text-gray-900 text-center ">{nome}</h5>
                    <span className="text-xs text-gray-500 text-center ">{servicoPrincipal}</span>
                </div>

                <div className="flex gap-2">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-azulao rounded-lg hover:bg-roxazul focus:ring-4 focus:outline-none focus:ring-blue-300">Ver Perfil</a>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ">Contatar</a>
                </div>
            </div>
        </div>
    )
}