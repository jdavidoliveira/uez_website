"use client"

import { useEffect, useState } from "react";
import AsideFilters from "./AsideFilters";
import UserCard from "./UserCard";
import { useSearchParams } from "next/navigation";

export function UzersClient({ serverData }: any) {
    const [uzersData, setUzersData] = useState(serverData)
    const [filteredUzersData, setFilteredUzersData] = useState(serverData)
    useEffect(() => {
        setUzersData(serverData)
        setFilteredUzersData(serverData)
    }, [])


    const { get: getParams, has: hasParam } = useSearchParams()

    const [isOnline, setIsOnline] = useState<boolean>(hasParam("isOnline") || false)
    const [isPresencial, setIsPresencial] = useState<boolean>(hasParam("isPresencial") || false)
    const [nome, setNome] = useState(getParams("searchName") || "")
    const [cargo, setCargo] = useState(getParams("searchCargo") || "")



    useEffect(() => {
        // Filtrar usuários com base nas condições
        const filteredUzers = uzersData.filter((uzer: any) => {
            const matchesNome = uzer.nome.toLowerCase().includes(nome.toLowerCase());
            const matchesCargo = uzer.servicosPrestados[0].nomeServico.toLowerCase().includes(cargo.toLowerCase());

            if (isOnline && isPresencial) {
                return matchesNome && matchesCargo && uzer.servicosPrestados[0].tipoServico?.toLowerCase().includes("ambos");
            } else if (isOnline) {
                return matchesNome && matchesCargo && uzer.servicosPrestados[0].tipoServico?.toLowerCase().includes("online");
            } else if (isPresencial) {
                return matchesNome && matchesCargo && uzer.servicosPrestados[0].tipoServico?.toLowerCase().includes("presencial");
            } else {
                return matchesNome && matchesCargo;
            }
        });

        setFilteredUzersData(filteredUzers);
    }, [nome, cargo, isOnline, isPresencial]);


    return (
        <main className="bg-white flex flex-row-reverse w-full min-h-[60%] justify-around items-center mt-6 p-4 mobile:flex-col mobile:m-0 mobile:gap-8">
            <AsideFilters setIsOnline={setIsOnline} setIsPresencial={setIsPresencial} setNome={setNome} setCargo={setCargo} cargo={cargo} isOnline={isOnline} isPresencial={isPresencial} nome={nome} />
            <section className="flex w-9/12 h-full flex-wrap gap-4 justify-between items-center p-2 mobile:w-full mobile:p-0">
                {!(filteredUzersData.length === 0) ? filteredUzersData?.map((usuario: any, index: any) => {
                    const nomes = usuario.nome.split(" ")
                    const nome = nomes.length > 2 ? (nomes[0].length > 8 ? ((nomes[0].length > 12 ? nomes[0].slice(0, 12) : nomes[0])) : nomes[0] + " " + nomes[1]) : nomes[0] + (nomes[1] ? " " + nomes[1] : "")
                    // Se o nome for menor que 8 caracteres, coloca o nome completo, até 2 nomes
                    return <UserCard key={index} nome={nome} photoUrl={usuario.photoUrl} servicoPrincipal={usuario.servicosPrestados[0].nomeServico} _id={usuario._id} tipoServico={usuario.servicosPrestados[0].tipoServico} />
                }) : (
                    <div className="w-full flex items-center justify-center">
                        <h1>Não tem usuários que correspondem aos filtros...</h1>
                    </div>
                )
                }
            </section>
        </main>
    )
}

