import { useFetch } from "@/hooks/useFetch";
import AsideFilters from "./AsideFilters";
import UserCard from "./UserCard";

export default async function Uzers() {


    const data = await useFetch<any[]>('/uzers', {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDg3YTk0NzAyZDgyNjdhMzU3MjRhMyIsInRpcG8iOiJ1emVyIiwiaWF0IjoxNjk2MjA4NDM3LCJleHAiOjE2OTYyOTQ4Mzd9.bTCGCJpjQaw0AoDDHLRrejATct9eL8n3-t7CvgZ1aM4`
        },
        next: {
            revalidate: 60 * 1 // 1 minutes
        }
    }).then(response => {
        return response
    }).catch(error => {
        alert(error)
        return []
    })

return (
    <>
        <main className="flex flex-row-reverse w-full justify-around items-center mt-6 p-4 mobile:flex-col mobile:m-0 mobile:gap-8">
            <AsideFilters />
            <section className="flex w-10/12 h-full flex-wrap gap-4 justify-between items-center p-2 mobile:w-full mobile:p-0">
                {data?.map((usuario: any, index) => {
                    const nomes = usuario.nome.split(" ")
                    const nome = nomes.length > 2 ? (nomes[0].length > 8 ? ((nomes[0].length > 12 ? nomes[0].slice(0, 12) : nomes[0])) : nomes[0] + " " + nomes[1]) : nomes[0] + (nomes[1] ? " " + nomes[1] : "")
                    // Se o nome for menor que 8 caracteres, coloca o nome completo, até 2 nomes
                    return <UserCard key={index} nome={nome} photoUrl={usuario.photoUrl} servicoPrincipal={usuario.servicosPrestados[0].nomeServico} _id={usuario._id} tipoServico={usuario.servicosPrestados[0].tipoServico} />
                }
                )}
            </section>
        </main>
    </>
)
}

