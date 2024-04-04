import Image from "next/image"
import { cookies } from "next/headers"
import Editpage from "./EditPage"
import { Metadata } from "next"
import VoltarButton from "@/components/VoltarButton/VoltarButton"
import Avaliacao from "@/components/layout/Avaliacao"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { api } from "@/lib/serverapi"

export const metadata: Metadata = {
  title: "Cliente",
  description: "Página de perfil do Cliente",
  keywords: "Clientes, Cliente, Uez",
}

export default async function Cliente({ params }: { params: { id: string } }) {
  const session = await getServerSession(options)
  if (!session) return redirect("/login")

  const { data: cliente } = await api.get(`http://localhost:3333/clientes/${params.id}`)

  console.log(cliente)

  const { photoUrl, nome, id } = cliente
  cliente.bannerImage =
    "https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg"
  const editMode: boolean = session?.user.id === id

  return editMode ? (
    <main className="w-full h-full flex flex-col items-center justify-between relative mobile:flex-col desktop:flex-col mdscreen:flex-col bg-[#f3f3f3] mobile:gap-24 desktop:gap-24 mdscreen:gap-24">
      <VoltarButton />
      <Editpage clienteData={cliente} pedidos={[]} />
    </main>
  ) : (
    <main className="w-full h-screen mobile:h-auto flex items-center justify-between relative mobile:flex-col desktop:flex-col mdscreen:flex-col  mobile:gap-24 desktop:gap-24 mdscreen:gap-24">
      <VoltarButton />
      <section className="w-2/3 mobile:w-full desktop:w-full mdscreen:w-full h-full flex flex-col items-center justify-center animate-transitionY">
        <div className="bg-cinzero w-10/12 mobile:w-full desktop:w-full mdscreen:w-full relative">
          <div className="w-full h-44 flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition relative">
            <Image
              fill
              src={cliente.bannerImage}
              className="transition object-cover object-center rounded-xl"
              alt="Imagem ilustrativa"
            />
            <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">
              Ver projeto
            </h1>
          </div>
          <Image
            width={200}
            height={200}
            src={photoUrl}
            className="w-32 h-32 rounded-full absolute -bottom-10 left-5 shadow-lg"
            alt="Imagem de perfil"
          />
        </div>
        <div className="w-10/12 flex items-center mt-14 mb-24 mobile:mb-4 justify-between desktop:flex-col mobile:flex-col mdscreen:flex-col">
          <div className="flex-1 flex flex-col items-start self-start pl-2">
            <h1 className="text-3xl font-bold mb-4">{nome}</h1>
            <Avaliacao rating={4.5} />
          </div>
        </div>
      </section>
    </main>
  )
}
