import { options } from "@/app/api/auth/[...nextauth]/options"
import { api } from "@/lib/serverapi"
import { Client } from "@/types/Client"
import { Uezer } from "@/types/Uezer"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { ClientProfilePage } from "../clientes/ClientProfilePage"
import { UezerProfilePage } from "../uezers/UezerProfilePage"
import { USERTYPE } from "@/types/enums"

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  const { data } = await api.get<Uezer | Client>(`/users/${username}`, {
    next: { revalidate: 60 * 1 },
  })

  return {
    title: `${data.name} - ${data.usertype === "UEZER" ? "Uezer" : "Cliente"}`,
    openGraph: {
      title: `${data.name} - ${data.usertype === "UEZER" ? "Uezer" : "Cliente"}`,
      description: data.bio,
      images: [data.image],
    },
  }
}

export default async function page({ params: { username } }: Props) {
  const session = await getServerSession(options)
  const searchUserResponse = await api.get<Uezer | Client>(`/users/${username}`, {
    next: { revalidate: 60 * 1 },
  })
  if (!searchUserResponse.ok) return notFound()

  const created_at = new Date(searchUserResponse.data.created_at).toLocaleDateString("pt-BR")

  const isOwner = searchUserResponse.data.id === session?.user.id

  return searchUserResponse.data.usertype === USERTYPE.UEZER ? (
    <UezerProfilePage uezerData={searchUserResponse.data as Uezer} />
  ) : (
    <ClientProfilePage clientData={searchUserResponse.data as Client} />
  )
}
