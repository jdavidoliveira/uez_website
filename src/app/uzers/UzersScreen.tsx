import { useFetch } from '@/hooks/useFetch'
import UserCard from './UserCard'

interface UzersScreenProps {
    filterName?: string
    filterOnOff?: string

}

export default async function UzersScreen({ ...rest }: UzersScreenProps) {

    const data = await useFetch<any[]>('/uzers', {
        headers: {
            Authorization: `Bearer eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDg3YTk0NzAyZDgyNjdhMzU3MjRhMyIsInRpcG8iOiJ1emVyIiwiaWF0IjoxNjk2MzMxODk4LCJleHAiOjE2OTY0MTgyOTh9.0ELyTvHg5_uWxpZby6tD-5aMJ56_EmKHHededPrf_po`
        },
        next: {
            revalidate: 60 * 1 // 1 minutes
        }
    }).then(response => {
        return response
    }).catch(error => {
        console.error(error)
        return [{
            nome: "Carregando...",
            photoUrl: "https://via.placeholder.com/100",
            servicosPrestados: [
                { nomeServico: "Carregando...", tipoServico: "Carregando..." }
            ],
            _id: "0"
        }, {
            nome: "Carregando...",
            photoUrl: "https://via.placeholder.com/100",
            servicosPrestados: [
                { nomeServico: "Carregando...", tipoServico: "Carregando..." }
            ],
            _id: "0"
        }]
    })

    return (
        <section className="flex w-10/12 h-full flex-wrap gap-4 justify-between items-center p-2 mobile:w-full mobile:p-0">
            {data?.map((usuario: any, index: any) => {
                const nomes = usuario.nome.split(" ")
                const nome = nomes.length > 2 ? (nomes[0].length > 8 ? ((nomes[0].length > 12 ? nomes[0].slice(0, 12) : nomes[0])) : nomes[0] + " " + nomes[1]) : nomes[0] + (nomes[1] ? " " + nomes[1] : "")
                // Se o nome for menor que 8 caracteres, coloca o nome completo, até 2 nomes
                return <UserCard key={index} nome={nome} photoUrl={usuario.photoUrl} servicoPrincipal={usuario.servicosPrestados[0].nomeServico} _id={usuario._id} tipoServico={usuario.servicosPrestados[0].tipoServico} />
            }
            )}
        </section>
    )
}
