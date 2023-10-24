import { ChevronLeftIcon, Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import PortfolioCard from './PortfolioCard'
import Image from 'next/image'
import UzerInterface from '@/types/Uzer'

export default function Editpage({ uzerData: { photoUrl, nome, servicosPrestados, bannerImage, portfolio, _id } }: { uzerData: UzerInterface }) {
  return (
    <>
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
        <div className="w-10/12 flex items-center mt-24 mb-24 mobile:mb-4 justify-between desktop:flex-col mobile:flex-col mdscreen:flex-col">
          <div className="flex-1 flex flex-col items-start self-start pl-2">
            <h1 className="text-3xl font-bold mb-4">{nome}</h1>
            <h2 className="font-normal text-lg">Habilidade: <strong>{servicosPrestados[0].nomeServico}</strong> </h2>
            <h2 className="font-normal text-base"><strong>{servicosPrestados[0].tipoServico === 'ambos' ? "Online e Presencial" : servicosPrestados[0].tipoServico.toUpperCase()}</strong> </h2>
            {(servicosPrestados[0].tipoServico === 'presencial') || (servicosPrestados[0].tipoServico === 'ambos') && <h2 className="font-medium text-base">Área de atuação: <strong>{servicosPrestados[0].areaAtuacao}km</strong> </h2>}
          </div>
          <Link href="/uzers" className="text-xl font-bold bg-azulao rounded-xl p-3 px-6 text-white flex items-center mt-10 justify-center">
            Enviar Mensagem
          </Link>
        </div>
      </section>
      <section className="flex-1 mobile:w-10/12 desktop:w-10/12 mdscreen:w-10/12 h-full flex flex-col items-center justify-center py-10 mobile:py-1">
        <h1 className="text-4xl font-bold h-1/6 flex justify-center items-center w-full">Portfólio</h1>
        <div className="w-full grid grid-cols-2 p-6 gap-4">
          {portfolio.slice(0, 6).map((item, index) => (
            <PortfolioCard key={index} image={item.image} title={item.title} description={item.description} />
          ))}

        </div>
        <Link href={`/uzers/${_id}/portfolio`} className="text-xl font-bold my-8 flex justify-center items-center hover:underline">Ver Mais</Link>
      </section>
    </>
  )
}
