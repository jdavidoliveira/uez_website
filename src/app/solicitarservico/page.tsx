import { useFetch } from "@/hooks/useFetch";
import SolicitarServicoClient from "./pageclient";
import Servico from "@/types/Servico";
import { cookies } from "next/headers";

export default async function SolicitarServico() {
    const servicos = await useFetch<Servico[]>('/servicos', {
        headers: {
            Authorization: `Bearer ${cookies().get("uezaccesstoken")?.value}`
        },
        next: {
            revalidate: 60 * 10 // 10 minutes
        },
    }).then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return []
    })
    const {_id} = await useFetch<{_id: string}>('/users/me', {
        headers: {
            Authorization: `Bearer ${cookies().get("uezaccesstoken")?.value}`
        },
    }).then(response => {
        return response
    }).catch(error => {
        return { _id: "0" }
    })

    return (
        <SolicitarServicoClient servicosDaPlataforma={servicos} myId={_id} />
    )
}