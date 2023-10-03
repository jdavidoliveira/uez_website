"use client"

import { useEffect, useState } from "react";
import { useFetch as myUseFetch } from "@/hooks/useFetch";
import AsideFilters from "./AsideFilters";
import UserCard from "./UserCard";
import { useSearchParams } from "next/navigation";
import { parseCookies } from "nookies";

export default function Uzers() {

    const [uzersData, setUzersData] = useState([{ nome: "Carregando...", photoUrl: "https://via.placeholder.com/100", servicosPrestados: [{ nomeServico: "Carregando...", tipoServico: "Carregando..." }], _id: "0" }, { nome: "Carregando...", photoUrl: "https://via.placeholder.com/100", servicosPrestados: [{ nomeServico: "Carregando...", tipoServico: "Carregando..." }], _id: "0" }])
    useEffect(() => {
        myUseFetch<any[]>('/uzers', {
            headers: {
                Authorization: `Bearer ${parseCookies().accessToken}`
            },
            next: {
                revalidate: 60 * 1 // 1 minutes
            }
        }).then(response => {
            setUzersData(response)
        }).catch(error => console.error(error))
    }, [])

    const { get: getParams, has: hasParam } = useSearchParams()

    const [isOnline, setIsOnline] = useState<boolean>(hasParam("isOnline") || false)
    const [isPresencial, setIsPresencial] = useState<boolean>(hasParam("isPresencial") || false)
    const [nome, setNome] = useState(getParams("searchName") || "")
    const [cargo, setCargo] = useState(getParams("searchCargo") || "")


    const [filteredUzersData, setFilteredUzersData] = useState(uzersData)

    useEffect(() => {

        const filter = uzersData.filter((uzer) => {
            const matchesNome = uzer.nome.toLowerCase().includes(nome.toLowerCase());
            const matchesCargo = uzer.servicosPrestados[0].nomeServico.toLowerCase().includes(cargo.toLowerCase());
            const isBoth = isOnline && isPresencial
            const matchesIsOnline = isOnline || isBoth ? uzer.servicosPrestados[0].tipoServico.includes("online") : true;
            const matchesIsPresencial = isPresencial || isBoth ? uzer.servicosPrestados[0].tipoServico.includes("presencial") : true;

            return matchesNome && matchesCargo && matchesIsOnline && matchesIsPresencial;
        });
        setFilteredUzersData(filter)
    },
        [nome, cargo, isOnline, isPresencial])


    return (
        <main className="bg-white flex flex-row-reverse w-full justify-around items-center mt-6 p-4 mobile:flex-col mobile:m-0 mobile:gap-8">
            <AsideFilters setIsOnline={setIsOnline} setIsPresencial={setIsPresencial} setNome={setNome} setCargo={setCargo} cargo={cargo} isOnline={isOnline} isPresencial={isPresencial} nome={nome} />
            <section className="flex w-9/12 h-full flex-wrap gap-4 justify-between items-center p-2 mobile:w-full mobile:p-0">
                {!(filteredUzersData.length === 0) ? filteredUzersData?.map((usuario: any, index) => {
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

