"use client"

import GenericSection from "@/components/layout/GenericSection"
import { AnimationOnScroll } from "react-animation-on-scroll"
import { PhotoCard } from "../PhotoCard"
import Image from "next/image"

export function AboutSection() {
  return (
    <GenericSection className="relative mb-28 flex w-full animate-transitionY flex-col items-center justify-around gap-8 px-0 py-16 text-azulao">
      <div className="relative my-16 flex w-11/12 flex-col items-center justify-around gap-16 text-azulao">
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <h1 className="text-center text-4xl font-bold">O que é a UEZ?</h1>
        </AnimationOnScroll>
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <p className="mx-auto w-10/12 text-center text-lg font-normal leading-snug">
            A <strong>UEZ</strong> é uma plataforma que tem o objetivo de facilitar a sua vida, te ajudando a encontrar
            profissionais que possam realizar algum serviço online para você. Além disso, se você sabe fazer algo que se
            enquadre nos nossos serviços, nós te ajudamos a encontrar novos clientes.
          </p>
        </AnimationOnScroll>
      </div>
      <div className="relative flex w-11/12 flex-col items-center justify-around gap-8 text-azulao">
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <h1 className="mb-16 text-center text-4xl font-bold ">Como funciona?</h1>
        </AnimationOnScroll>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-8/12 items-center justify-around gap-4">
            <PhotoCard
              imageUrl="/images/icons/cliente-white.png"
              className="invert"
              title="Cliente"
              description="Uma pessoa que precisa de um serviço, por exemplo, uma pessoa com a tubulação quebrada."
            />
            <PhotoCard
              imageUrl="/images/icons/uzer-white.png"
              className="invert"
              title="Uzer"
              description="Um profissional que precisa de clientes, por exemplo, um encanador capaz de consertar a tubulação."
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Image src="/vetores/linha-baixo.svg" width={120} height={120} alt="Vetor de linhas" className="w-4/12" />
            <div className="mb-5 mt-4 size-fit transition hover:scale-105">
              <a href="#inicio" title="Uez Company">
                <Image
                  src="/logo/logo.png"
                  width={1000}
                  height={1000}
                  alt="Logo da UEZ Company"
                  className="w-52 transition hover:scale-105 hover:animate-none hover:duration-300"
                />
              </a>
            </div>
            <Image src="/vetores/linha-cima.svg" width={120} height={120} alt="Vetor de linhas" className="w-4/12" />
          </div>
          <div className="flex w-8/12 items-center justify-around gap-4">
            <PhotoCard
              imageUrl="/images/batepapo.png"
              title="Chat"
              description="Aqui o cliente e o uzer conversam para decidirem o preço, enviar especificações e para montar o orçamento."
            />
            <PhotoCard
              imageUrl="/images/riquinho.png"
              title="Orçamento"
              description="Quando o orçamento é lançado para o cliente, ele tem a opção de aceitar ou não, priorizando a segurança."
            />
          </div>
        </div>
      </div>
    </GenericSection>
  )
}
