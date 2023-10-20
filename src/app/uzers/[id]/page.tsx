import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PortfolioCard from "./PortfolioCard";
import { useFetch } from "@/hooks/useFetch";
import UzerInterface from "@/types/Uzer";
import Image from "next/image";

export default async function Uzer({ params }: { params: { id: string } }) {
  const { nome, photoUrl, servicosPrestados, } = await useFetch<UzerInterface>(`/uzers/${params.id}`);



  return (
    <main className="w-full h-full flex items-center justify-center relative">
      <Link href="/uzers" className="absolute left-20 top-14 text-xl font-bold px-2 bg-azulao rounded-xl text-white flex items-center justify-center">
        <ChevronLeftIcon width={40} height={40} />
        <span className="m-3 mr-6">
          Voltar
        </span>
      </Link>
      <section className="w-full h-full flex flex-col items-center justify-center animate-transitionY">
        <div className="bg-cinzero w-10/12 relative">
          <PortfolioCard isBanner image="https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg" />
          <Image width={200} height={200} src={photoUrl} className="w-32 rounded-full absolute -bottom-10 left-5 shadow-lg" alt="Imagem de perfil" />
        </div>
        <div className="w-10/12 flex items-center mt-24 mb-24 justify-between">
          <div className="flex-1 flex flex-col pl-2">
            <h1 className="text-4xl font-bold mb-4">{nome}</h1>
            <h2 className="font-medium text-lg">Habilidade: <strong>{servicosPrestados[0].nomeServico}</strong> </h2>
            <h2 className="font-medium text-base"><strong>{servicosPrestados[0].tipoServico === 'ambos' ? "Online e Presencial" : servicosPrestados[0].tipoServico.toUpperCase()}</strong> </h2>
            {(servicosPrestados[0].tipoServico === 'presencial') || (servicosPrestados[0].tipoServico === 'ambos') && <h2 className="font-medium text-base">Área de atuação: <strong>{servicosPrestados[0].areaAtuacao}km</strong> </h2>}
          </div>
          <Link href="/uzers" className="text-xl font-bold bg-azulao rounded-xl p-3 px-6 text-white flex items-center mt-10 justify-center">
            Enviar Mensagem
          </Link>
        </div>
      </section>
      <section className="w-1/2 h-full flex flex-col items-center justify-center gap-12">
        <h1 className="text-4xl font-bold">Portfólio</h1>
        <div className="grid grid-cols-2 gap-10">
          <PortfolioCard image="https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg" />
          <PortfolioCard image="https://picsum.photos/200/300" />
          <PortfolioCard image="https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg" />
          <PortfolioCard image="https://picsum.photos/200/300" />
          <PortfolioCard image="https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg" />
          <PortfolioCard image="https://picsum.photos/200/300" />

        </div>
      </section>

    </main>
  )
}
