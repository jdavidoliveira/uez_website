import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import { cookies } from "next/headers";
import Editpage from "./EditPage";
import { Metadata } from "next";
import ClienteInterface from "@/types/Cliente";

export const metadata: Metadata = {
    title: "Cliente",
    description: "Página de perfil do Cliente",
    keywords: "Clientes, Cliente, Uez",
}

export default async function Cliente({ params }: { params: { id: string } }) {
    const clienteData = await useFetch<ClienteInterface>(`/clientes/${params.id}`, {
        next: {
            revalidate: 60 * 1 // 1 minutes
        }
    })
    const { photoUrl, nome , _id } = clienteData
    const bannerImage = "https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg"
    console.log(_id)
    const { _id: myId } = await useFetch<ClienteInterface>(`/users/me`, {
        headers: {
            Authorization: `Bearer ${cookies().get("uezaccesstoken")?.value}`
        },
    });
    clienteData.bannerImage = bannerImage
    const editMode: boolean = myId === _id
    console.log(editMode)


    return editMode ? (
        <main className="w-full h-screen mobile:h-auto flex items-center justify-between relative mobile:flex-col desktop:flex-col mdscreen:flex-col  mobile:gap-24 desktop:gap-24 mdscreen:gap-24">
            <Link href="/" className="fixed z-50 left-14 top-8 text-base font-bold px-2 bg-azulao hover:bg-roxazul rounded-xl text-white flex items-center justify-center mobile:bottom-8  mobile:right-7 mobile:top-auto mobile:left-auto mobile:rounded-full ">
                <ChevronLeftIcon width={20} height={20} />
                <span className="p-2">
                    Voltar
                </span>
            </Link>
            <Editpage clienteData={clienteData} />

        </main>
    )
        : (
            <main className="w-full h-screen mobile:h-auto flex items-center justify-between relative mobile:flex-col desktop:flex-col mdscreen:flex-col  mobile:gap-24 desktop:gap-24 mdscreen:gap-24">
                <Link href="/uzers" className="fixed z-50 left-14 top-8 text-base font-bold px-2 bg-azulao hover:bg-roxazul rounded-xl text-white flex items-center justify-center mobile:bottom-8  mobile:right-7 mobile:top-auto mobile:left-auto mobile:rounded-full ">
                    <ChevronLeftIcon width={20} height={20} />
                    <span className="p-2">
                        Voltar
                    </span>
                </Link>
                <section className="w-2/3 mobile:w-full desktop:w-full mdscreen:w-full h-full flex flex-col items-center justify-center animate-transitionY">
                    <div className="bg-cinzero w-10/12 mobile:w-full desktop:w-full mdscreen:w-full relative">
                        <div
                            className="w-full h-44 flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition relative"
                        >
                            <Image
                                fill
                                src={bannerImage}
                                className="transition object-cover object-center rounded-xl" alt="Imagem ilustrativa"
                            />
                            <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">Ver projeto</h1>
                        </div>
                        <Image width={200} height={200} src={photoUrl} className="w-32 rounded-full absolute -bottom-10 left-5 shadow-lg" alt="Imagem de perfil" />
                    </div>
                    <div className="w-10/12 flex items-center mt-14 mb-24 mobile:mb-4 justify-between desktop:flex-col mobile:flex-col mdscreen:flex-col">
                        <div className="flex-1 flex flex-col items-start self-start pl-2">
                            <h1 className="text-3xl font-bold mb-4">{nome}</h1>
                        </div>
                    </div>
                </section>

            </main>
        )
}
