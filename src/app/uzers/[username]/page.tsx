import { options } from "@/app/api/auth/[...nextauth]/options"
import ReportButton from "@/components/layout/buttons/Report"
import ReturnButton from "@/components/layout/buttons/Return"
import { api } from "@/lib/serverapi"
import { Uzer } from "@/types/Uzer"
import { Calendar, Handshake, LineChart } from "lucide-react"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import ContactUzerButton from "./ContactUzerButton"
import RateButton from "./RateButton"
import ShareButton from "./ShareButton"

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  const { data } = await api.get<Uzer>(`/uzers/${username}`, {
    next: { revalidate: 60 * 1 },
  })

  return {
    title: `${data.name} - Uzer`,
  }
}

export default async function page({ params: { username } }: Props) {
  const session = await getServerSession(options)
  const searchUzerResponse = await api.get<Uzer>(`/uzers/${username}`, {
    next: { revalidate: 60 * 1 },
  })
  if (!searchUzerResponse.ok) return redirect("/404")

  const searchPortfolioResponse = await api.get<any[]>(`/portfolios/${username}`)

  const created_at = new Date(searchUzerResponse.data.created_at).toLocaleDateString("pt-BR")

  const isOwner = searchUzerResponse.data.id === session?.user.id

  return (
    <main className="relative min-h-screen w-full bg-white">
      <ReturnButton classname="fixed top-10 left-10 z-50" />
      <section className="relative w-full">
        <div className="relative h-96 w-full">
          <Image src={searchUzerResponse.data.banner} alt="banner" priority fill className="object-cover" />
        </div>
        <div className="absolute -bottom-64 left-1/2 flex w-10/12 -translate-x-1/2 flex-col items-center justify-center gap-5 md:left-[10%] md:mx-auto md:w-auto md:-translate-x-0">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-md ">
            <div className="relative aspect-square w-full rounded-full md:w-[80%]">
              <Image src={searchUzerResponse.data.image} alt="profile" fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">{searchUzerResponse.data.name}</h1>
            <h2 className="text-lg">@{searchUzerResponse.data.username}</h2>
            <h3 className="text-xl font-medium">{searchUzerResponse.data.service.name}</h3>
            <div className="mt-6 grid grid-cols-3 gap-6 md:gap-0">
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{searchUzerResponse.data.completed_orders_amount ?? 0}</h1>
                <h2 className="text-center text-lg font-medium">Serviços feitos</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{searchUzerResponse.data.rating.toFixed(1)}</h1>
                <h2 className="text-center text-lg font-medium">Avaliação</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{4}</h1>
                <h2 className="text-center text-lg font-medium">Favoritados</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-20 h-56 w-full px-20 md:grid md:grid-cols-2">
        {!isOwner && <RateButton />}
        <div className="mt-80 flex flex-col gap-2 pb-20 md:mt-60">
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-semibold">Sobre mim</h1>
            <p className="text-xl font-normal">{searchUzerResponse.data.bio}</p>
            <hr className="w-full" />
          </div>
          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-2xl font-semibold">Outras informações</h1>
            <ul className="flex flex-col gap-6 pl-4">
              <li className="flex items-center justify-start gap-4">
                <Calendar size={40} />
                <span className="text-xl font-normal">
                  Entrou em <strong className="font-bold">{created_at}</strong>
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
          {!isOwner && (
            <div className="flex flex-col gap-6 p-4">
              <ReportButton />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {session?.user.usertype !== "UZER" && (
            <div className="flex w-full items-center justify-center pb-20 pt-10">
              <div className="flex h-16 items-center justify-center gap-2">
                <ContactUzerButton id={searchUzerResponse.data.id} />
                <ShareButton />
              </div>
            </div>
          )}
          <div className="mb-20 flex flex-col items-center justify-between gap-10 md:mb-0">
            <h1 className="text-3xl font-semibold">Portfolio</h1>
            <div
              className={`${searchPortfolioResponse.data.length > 0 ? "grid grid-cols-2 gap-6" : "flex items-center justify-center"}`}
            >
              {searchPortfolioResponse.data.length > 0 ? (
                searchPortfolioResponse.data.map((portfolio) => (
                  <PortfolioCard key={portfolio.id} image={portfolio.imagemUrl} />
                ))
              ) : (
                <h1 className="mx-auto text-2xl font-medium">O usuário ainda não possui nenhum item no portfolio</h1>
              )}
            </div>
            {searchPortfolioResponse.data.length > 0 && (
              <Link
                href="/uzers/[username]/portfolio"
                as={`/uzers/${searchUzerResponse.data.username}/portfolio`}
                className="rounded-full bg-roxazul px-4 py-1 font-bold text-white transition hover:scale-105"
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
    <div className="group relative flex aspect-square w-72 flex-col justify-center rounded-lg bg-cinzero hover:cursor-pointer">
      <div className="relative h-full w-full">
        <Image src={image} alt="profile" fill className="rounded-lg object-cover" />
      </div>
      <div className="absolute bottom-0 hidden h-1/5 w-full animate-upEntranceInTheCard rounded-b-lg bg-white p-4 group-hover:flex">
        a
      </div>
    </div>
  )
}
