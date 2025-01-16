"use client"

import GenericSection from "@/components/layout/GenericSection"
import { AnimationOnScroll } from "react-animation-on-scroll"
import { PhotoCard } from "./PhotoCard"
import Image from "next/image"

export function AboutSection() {
  return (
    <GenericSection className="text-primary-dark-blue relative mb-28 flex w-full animate-transitionY flex-col items-center justify-around gap-8 px-0 py-16">
      <div className="text-primary-dark-blue relative my-16 flex w-11/12 flex-col items-center justify-around gap-16">
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
      <HowItWorks />
    </GenericSection>
  )
}

function HowItWorks() {
  const data: { imageUrl: string; title: string; description: string }[] = [
    {
      imageUrl: "/images/icons/cliente-white.png",
      title: "Cliente",
      description:
        "Uma pessoa que necessita de um serviço, por exemplo uma pessoa que está iniciando um negócio e precisa de uma logo.",
    },
    {
      imageUrl: "/images/icons/uezer-white.png",
      title: "Uezer",
      description: "Um profissional que sabe realizar esse serviço online, por exemplo um designer.",
    },
    {
      imageUrl: "/images/pages/homepage/batepapo.png",
      title: "Bate papo",
      description:
        "Aqui o cliente e o uezer conversam para decidirem o preço, enviar especificações e para montar o orçamento.",
    },
    {
      imageUrl: "/images/pages/homepage/riquinho.png",
      title: "Orçamento",
      description: "Aqui o cliente envia o orçamento para o uezer e ele envia o orçamento para o cliente.",
    },
  ]

  return (
    <div className="text-primary-dark-blue relative flex w-full flex-col items-center justify-around gap-8">
      <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
        <h1 className="mb-16 text-center text-4xl font-bold ">Como funciona?</h1>
      </AnimationOnScroll>
      <div className="hidden w-full flex-col items-center gap-4 md:flex">
        <div className="flex w-8/12 items-center justify-around gap-4">
          <PhotoCard
            imageUrl="/images/icons/cliente-white.png"
            imageClassName="invert"
            title="Cliente"
            description="Uma pessoa que precisa de um serviço, por exemplo, uma pessoa com a tubulação quebrada."
          />
          <PhotoCard
            imageUrl="/images/icons/uezer-white.png"
            imageClassName="invert"
            title="Uezer"
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
            imageUrl="/images/pages/homepage/batepapo.png"
            title="Chat"
            description="Aqui o cliente e o uezer conversam para decidirem o preço, enviar especificações e para montar o orçamento."
          />
          <PhotoCard
            imageUrl="/images/pages/homepage/riquinho.png"
            title="Orçamento"
            description="Quando o orçamento é lançado para o cliente, ele tem a opção de aceitar ou não, priorizando a segurança."
          />
        </div>
      </div>
      {/* mobile */}
      <div className="flex w-full flex-col items-center gap-4 md:hidden">
        <div className="flex w-full flex-col items-center justify-around gap-20 ">
          {data.map((item, index) => (
            <PhotoCard
              key={index}
              imageUrl={item.imageUrl}
              imageClassName={item.title === "Uezer" || item.title === "Cliente" ? "invert" : ""}
              title={item.title}
              description={item.description}
              className="w-full gap-6 hover:scale-100"
              descriptionClassName="text-justify"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
