import { api } from "@/lib/serverapi"
import { IUzer } from "@/types/IUzer"
import Image from "next/image"
import { Metadata } from "next"
import { Calendar, Handshake, LineChart, Share, Share2 } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import ShareButton from "./ShareButton"
import ContactUzerButton from "./ContactUzerButton"
import DenunciarButton from "@/components/User/DenunciarButton"
import RateButton from "./RateButton"
import { redirect } from "next/navigation"
import ReturnButton2 from "@/components/Utils/ReturnButton2"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  const { data } = await api.get<IUzer>(`/uzers/${username}`, {
    revalidate: 60 * 1,
  })

  return {
    title: `${data.nome} - Uzer`,
  }
}

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page({ params: { username } }: Props) {
  const session = await getServerSession(options)
  const { data, ok } = await api.get<IUzer>(`/uzers/${username}`, {
    revalidate: 60 * 1,
  })

  if (!ok) return redirect("/404")

  const { data: portfoliosData } = await api.get<any[]>(`/portfolios/${username}`)

  const { data: servicoData } = await api.get<any>(`/servicos/${data.idServico}`, {
    revalidate: 60 * 60 * 24, //24 horas
  })

  const dataCadastroPorExtenso = new Date(data.dataCadastro).toLocaleDateString("pt-BR")

  return (
    <main className="w-full min-h-screen relative bg-white">
      <ReturnButton2 classname="fixed top-10 left-10 z-50" />
      <section className="w-full relative">
        <div className="w-full h-96 relative">
          <Image src={data.bannerUrl} alt="banner" priority fill className="object-cover" />
        </div>
        <div className="absolute -bottom-64 md:left-[10%] md:w-auto w-10/12 md:-translate-x-0 left-1/2 -translate-x-1/2 md:mx-auto flex flex-col items-center justify-center gap-5">
          <div className="w-40 h-40 bg-white shadow-md rounded-full flex justify-center items-center ">
            <div className="md:w-[80%] w-full aspect-square relative rounded-full">
              <Image src={data.photoUrl} alt="profile" fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">{data.nome}</h1>
            <h2 className="text-lg">@{data.username}</h2>
            <h3 className="text-xl font-medium">{servicoData.nome}</h3>
            <div className="grid grid-cols-3 mt-6 md:gap-0 gap-6">
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{data.quantidadePedidosRealizados ?? 0}</h1>
                <h2 className="text-lg font-medium text-center">Serviços feitos</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{data.avaliacao.toFixed(1)}</h1>
                <h2 className="text-lg font-medium text-center">Avaliação</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{4}</h1>
                <h2 className="text-lg font-medium text-center">Favoritados</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-56 mt-20 px-20 md:grid md:grid-cols-2 relative">
        <RateButton />
        <div className="flex flex-col gap-2 md:mt-60 mt-80 pb-20">
          <div className="p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Sobre mim</h1>
            <p className="text-xl font-normal">{data.bio}</p>
            <hr className="w-full" />
          </div>
          <div className="p-4 flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Outras informações</h1>
            <ul className="flex flex-col gap-6 pl-4">
              <li className="flex items-center justify-start gap-4">
                <Calendar size={40} />
                <span className="text-xl font-normal">
                  Entrou em <strong className="font-bold">{dataCadastroPorExtenso}</strong>
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <Handshake size={40} />
                <span className="text-xl font-normal">
                  Fecha com <strong className="font-bold">77%</strong> dos clientes que contata
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <LineChart size={40} />
                <span className="text-xl font-normal">
                  Indicado por <strong className="font-bold">100%</strong> dos clientes
                </span>
              </li>
            </ul>
            <hr className="w-full" />
          </div>
          <div className="p-4 flex flex-col gap-6">
            <DenunciarButton />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {session?.user.userType === "CLIENTE" && (
            <div className="w-full flex justify-center items-center pt-10 pb-20">
              <div className="flex items-center h-16 justify-center gap-2">
                <ContactUzerButton id={data.id} />
                <ShareButton />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center justify-between gap-10 md:mb-0 mb-20">
            <h1 className="text-3xl font-semibold">Portfolio</h1>
            <div
              className={`${portfoliosData.length > 0 ? "grid grid-cols-2 gap-6" : "flex justify-center items-center"}`}
            >
              {portfoliosData.length > 0 ? (
                portfoliosData.map((portfolio) => <PortfolioCard key={portfolio.id} image={portfolio.imagemUrl} />)
              ) : (
                <h1 className="text-2xl font-medium mx-auto">O usuário ainda não possui nenhum item no portfolio</h1>
              )}
            </div>
            {portfoliosData.length > 0 && (
              <Link
                href="/uzers/[username]/portfolio"
                as={`/uzers/${data.username}/portfolio`}
                className="bg-roxazul py-1 px-4 rounded-full font-bold text-white transition hover:scale-105"
              >
                Ver mais
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function PortfolioCard({ image }: { image: string }) {
  return (
    <div className="aspect-square w-72 bg-cinzero rounded-lg relative group hover:cursor-pointer flex flex-col justify-center">
      <div className="relative w-full h-full">
        <Image src={image} alt="profile" fill className="object-cover rounded-lg" />
      </div>
      <div className="w-full h-1/5 bg-white absolute bottom-0 rounded-b-lg p-4 hidden group-hover:flex animate-upEntranceInTheCard">
        a
      </div>
    </div>
  )
}
