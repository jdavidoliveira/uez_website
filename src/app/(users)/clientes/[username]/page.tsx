import { options } from "@/app/api/auth/[...nextauth]/options"
import ReturnButton from "@/components/layout/buttons/Return"
import { CalendarDaysIcon, Award, BarChart3 } from "lucide-react"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { api } from "@/lib/serverapi"
import { Client } from "@/types/Client"
import { redirect } from "next/navigation"
import { Order } from "@/types/Order"
import OrderCard from "./OrderCard"
import ShareButton from "../../uzers/[username]/ShareButton"
import TurnIntoUzerButton from "./TurnIntoUzerButton"

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  const { data } = await api.get<Client>(`/clients/${username}`, {
    next: { revalidate: 60 * 1 },
  })

  return {
    title: `${data.name} - Cliente`,
  }
}

export default async function page({ params: { username } }: Props) {
  const session = await getServerSession(options)

  const searchClientResponse = await api.get<Client>(`/clients/${username}`, {
    next: { revalidate: 60 * 1 },
  })

  if (!searchClientResponse.ok) return redirect("/404")

  const created_at = new Date(searchClientResponse.data.created_at).toLocaleDateString("pt-BR")

  // const isOwner = searchClientResponse.data.id === session.user.id

  const searchOrdersResponse = await api.get<Order[]>(`/orders/${searchClientResponse.data.id}/created-orders`)

  return (
    <main className="relative min-h-screen w-full bg-white">
      <ReturnButton classname="fixed top-10 left-10 z-50" />
      <section className="relative w-full">
        <div className="group relative h-96 w-full">
          <Image
            src={searchClientResponse.data.banner ?? "/path/to/default-image.jpg"} // Imagem padrão, se necessário
            alt="profile banner"
            fill
            className="object-cover transition duration-300 group-hover:brightness-50"
          />
          {/* <button className="absolute inset-0 flex transform-gpu flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Pencil className="text-white" size={30} />
            <p className="mt-2 text-lg font-semibold text-white">Editar</p>
          </button> */}
        </div>
        <div className="absolute -bottom-64 left-1/2 flex w-10/12 -translate-x-1/2 flex-col items-center justify-center gap-5 lg:left-[10%] lg:mx-auto lg:w-auto lg:-translate-x-0">
          <div className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-md">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              <div className="relative h-full w-full rounded-full bg-white p-[15px] md:p-[15px]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={searchClientResponse.data.image ?? "/path/to/default-image.jpg"} // Imagem padrão, se necessário
                    alt="profile"
                    fill
                    className="rounded-full object-cover transition duration-300 group-hover:brightness-75"
                  />
                </div>
              </div>
            </div>
            {/* <button className="absolute inset-0 flex transform-gpu flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Pencil className="text-white" size={25} />
              <p className="mt-2 text-sm font-semibold text-white">Editar</p>
            </button> */}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">{searchClientResponse.data.name}</h1>
            <h2 className="text-lg">@{searchClientResponse.data.username}</h2>
            <div className="mt-9 grid grid-cols-3 gap-5 lg:gap-0">
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{0}</h1>
                <h2 className="text-center text-lg font-medium">Pedidos feitos</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">{searchClientResponse.data.rating.toFixed(1)}</h1>
                <h2 className="text-center text-lg font-medium">Avaliação</h2>
              </div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-2xl font-bold">0</h1>
                <h2 className="text-center text-lg font-medium">Serviços fechados</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-20 h-56 w-full px-20 lg:grid lg:grid-cols-2">
        <div className="mt-80 flex flex-col gap-2 pb-20 lg:mt-60">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">Sobre mim</h1>
              {/* <button className="text-gray-600 hover:text-gray-900">
                <Pencil size={20} />
              </button> */}
            </div>
            <p className="text-xl font-normal">{searchClientResponse.data.bio}</p>
            <hr className="w-full" />
          </div>

          <h1 className="py-3 pl-4 text-2xl font-semibold">Serviços anteriores</h1>
          <div className="relative flex items-center gap-6 overflow-x-auto md:ml-[20px]">
            {/* {searchOrdersResponse.data.length > 0 ? (
              searchOrdersResponse.data.map((order, index) => (
                <div key={order.id} className={`shrink-0 ${index === 0 ? "relative z-10" : "relative"}`}>
                  <PortfolioCard
                    title={order.title}
                    description={order.description}
                    image={order.images[0]}
                    isActive={index !== 0}
                  />
                </div>
              ))
            ) : (
              <p className="text-2xl font-semibold">Nenhum servico fechado</p>
            )} */}
            <p className="my-10 text-xl font-normal">Nenhum servico fechado 😭</p>
          </div>
          <hr className="w-full" />

          {/* <div className="flex flex-col gap-6 p-4">
            <h1 className="text-2xl font-semibold">Outras informações</h1>
            <ul className="flex flex-col gap-6 pl-4">
              <li className="flex items-center justify-start gap-4">
                <CalendarDaysIcon size={40} />
                <span className="text-xl font-normal">
                  Entrou em <strong className="font-bold">{created_at}</strong>
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <BarChart3 size={40} />
                <span className="text-xl font-normal">
                  Fecha com <strong className="font-bold">77%</strong> dos uzers que contata
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <Award size={40} />
                <span className="text-xl font-normal">Bom pagador</span>
              </li>
            </ul>
            <hr className="w-full" />
          </div> */}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="mb-20 flex flex-col items-center justify-between gap-10 md:mb-0 ">
            <div className="flex w-full items-center justify-center pb-20 pt-10">
              <div className="flex h-16 items-center justify-center gap-2">
                <TurnIntoUzerButton id={searchClientResponse.data.id} />
                <ShareButton />
              </div>
            </div>

            <h1 className="text-3xl font-semibold">Solicitações</h1>
            <div className="flex w-full flex-col gap-2 md:mx-20 md:gap-6">
              {searchOrdersResponse.data.length < 0 ? (
                searchOrdersResponse.data.map((order, index) => <OrderCard key={order.id} order={order} />)
              ) : (
                <p className="text-center text-2xl font-normal">Nenhum servico fechado</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PortfolioCard({
  image,
  isActive,
  description,
  title,
}: {
  image: string
  isActive?: boolean
  title: string
  description: string
}) {
  return (
    <div
      className={`group relative flex aspect-square w-72 flex-col justify-center rounded-lg ${
        isActive ? "opacity-100" : "opacity-100"
      } transition-all hover:cursor-pointer`}
    >
      <div className="relative h-full w-full">
        <Image src={image} alt="portfolio" fill className={`rounded-lg object-cover`} />
      </div>
      <div className="absolute bottom-0 h-1/5 w-full rounded-b-lg bg-white p-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  )
}
