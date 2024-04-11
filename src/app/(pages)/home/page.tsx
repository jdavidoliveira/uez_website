"use client"

import { ReactNode } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { AnimationOnScroll } from "react-animation-on-scroll"
import GenericSection from "@/components/GenericSection"
import "animate.css/animate.css"
import { twMerge } from "tailwind-merge"

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center mx-0 bg-white" id="inicio">
      <GenericSection className="bg-white px-20 py-72 relative z-0">
        <Image
          src="/elementos/twochunks-circulo.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute left-0 top-0 sm:w-40 w-20 hidden sm:block"
        />
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-10 w-6 hidden sm:block"
        />
        <div className="absolute bottom-10 right-0 flex flex-col items-center -space-y-10 h-fit w-fit -rotate-90">
          <Image
            src="/elementos/bolinhas.png"
            alt="elemento"
            width={600}
            height={600}
            className="w-6 rotate-90 opacity-0"
          />
          <Image
            src="/elementos/halfpadrao-circulo.png"
            alt="elemento"
            width={600}
            height={600}
            className="lg:w-80 w-56 hidden md:block"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 animate__animated animate__fadeIn">
          <Image src="/images/logo.png" alt="Logo" width={500} height={500} className="w-96" />
          <h1 className="text-3xl text-center">
            Porque a vida é mais fácil, <br className="hidden md:block" /> quando estamos conectados.
          </h1>
        </div>
      </GenericSection>
      <GenericSection className="bg-white relative m-0 p-0 flex flex-row items-center justify-start">
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-0 w-6 hidden sm:block"
        />
        <Image
          src="/elementos/halfpadrao-circulo-azulao.png"
          alt="elemento"
          width={1284}
          height={926}
          className="h-full md:w-auto w-full object-cover md:left-32 absolute bottom-0 z-0"
        />
        <Image
          src="/images/p1.png"
          alt="Carinhas apertando a mão"
          className="md:w-9/12 w-full relative z-20"
          width={2688}
          height={1536}
        />
        <div className="lg:px-6 px-3 lg:py-12 py-6 md:bg-white efeito-vidro absolute md:right-0 lg:top-1/3 md:top-0 hidden md:translate-x-0 md:rounded-l-xl md:rounded-r-none md:rounded-0 rounded-xl md:flex items-center justify-center z-30 shadow-md shadow-black/25">
          <h1 className="mx-8 text-black text-left text-4xl font-semibold">
            Encontre uzers <br /> que possam te <span className="md:text-primary-purple">ajudar!</span>
          </h1>
        </div>
        <Link
          href="/cadastro/uez?userType=cliente"
          className="bg-white py-3 px-10 md:w-auto w-10/12 text-4xl text-center rounded-xl font-medium text-black absolute z-30 bottom-10 left-1/2 -translate-x-1/2 transition hover:scale-105"
        >
          Cadastrar como Cliente
        </Link>
      </GenericSection>
      <GenericSection className="bg-primary-purple relative m-0 p-0">
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-0 w-6 hidden sm:block"
        />
        <Image
          src="/images/p2.png"
          alt="Carinhas apertando a mão"
          className="w-full relative z-10"
          width={2688}
          height={1536}
        />
        <div className="lg:px-6 px-3 lg:py-12 py-6 md:bg-white efeito-vidro absolute md:left-0 lg:top-1/3 md:top-10 hidden md:translate-x-0 md:rounded-r-xl md:rounded-l-none md:rounded-0 rounded-xl md:flex items-center justify-center z-30 shadow-md shadow-black/25 ">
          <h1 className="mx-8 text-black text-left text-4xl font-semibold">
            Consiga clientes <br /> feche <span className="text-primary-purple">mais</span> negócios
          </h1>
        </div>
        <Link
          href="/cadastro/uez?userType=uzer"
          className="bg-white py-3 px-10 md:w-auto w-10/12 text-4xl text-center rounded-xl font-medium text-black absolute z-30 bottom-10 left-1/2 -translate-x-1/2 transition hover:scale-105"
        >
          Cadastrar como Uzer
        </Link>
      </GenericSection>
      <GenericSection className="relative flex flex-col items-center justify-around gap-8 text-azulao mb-28 w-full px-0 py-16 animate-transitionY">
        <div className="relative flex flex-col items-center justify-around gap-16 mb-16 text-azulao w-11/12">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-bold text-center">O que é a UEZ?</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="text-lg leading-snug font-normal text-center mx-auto w-10/12">
              A <strong>UEZ</strong> é um software que tem o objetivo de facilitar a sua vida, te ajudando a encontrar
              profissionais que possam realizar algum serviço online para você. Além disso, se você sabe fazer algo que
              se enquadre nos nossos serviços, nós te ajudamos a encontrar novos clientes.
            </p>
          </AnimationOnScroll>
        </div>
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-bold text-center mb-16 ">Como funciona?</h1>
          </AnimationOnScroll>
          <div className="flex flex-col gap-4 items-center w-full">
            <div className={`flex gap-4 items-center justify-around w-full`}>
              <CardPhoto
                imageUrl="/images/cliente.png"
                title="Cliente"
                description="Uma pessoa que precisa de um serviço, por exemplo, uma pessoa com a tubulação quebrada."
              />
              <CardPhoto
                imageUrl="/images/uzer.png"
                title="Uzer"
                description="Um profissional que precisa de clientes, por exemplo, um encanador capaz de consertar a tubulação."
              />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <Image src="/vetores/linha-baixo.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12" />
              <div className="w-40 h-40 transition hover:scale-105">
                <a href="#inicio" title="Uez Company">
                  <Image
                    src="/logo.svg"
                    width={120}
                    height={120}
                    alt="Logo da UEZ Company"
                    className=" animate-pulse h-40 w-40 transition hover:animate-none hover:duration-300 hover:scale-105"
                  />
                </a>
              </div>
              <Image src="/vetores/linha-cima.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12" />
            </div>
            <div className="flex gap-4 items-center justify-around w-full">
              <CardPhoto
                imageUrl="/images/batepapo.png"
                title="Chat"
                description="Aqui o cliente e o uzer conversam para decidirem o preço, enviar especificações e para montar o orçamento."
              />
              <CardPhoto
                imageUrl="/images/riquinho.png"
                title="Orçamento"
                description="Quando o orçamento é lançado para o cliente, ele tem a opção de aceitar ou não, priorizando a segurança."
              />
            </div>
          </div>
        </div>
      </GenericSection>
      <GenericSection className="bg-primary-purple relative p-0">
        <Image
          src="/elementos/bolinhas.png"
          alt="Elementos"
          className="w-8 invert rotate-90 xl:rotate-0 absolute top-10 right-10"
          width={500}
          height={500}
        />
        <div className="flex flex-col items-center justify-center gap-20 p-10 max-w-fit">
          <h1 className="text-4xl font-bold text-center text-white">Conheça nossos serviços!</h1>
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-12 gap-6">
            <div className="flex flex-col items-center justify-between bg-white sm:py-14 py-8 sm:px-6 px-8 gap-14 rounded-xl hover:scale-105 transition-transform">
              <Image
                src="/images/icons/categorias/designer-azulao.png"
                width={120}
                height={120}
                alt="Designer"
                className="w-20"
              />
              <h1 className="text-azulao font-bold sm:text-2xl text-lg w-48 text-center">Design</h1>
            </div>
            <div className="flex flex-col items-center justify-between bg-white sm:py-14 py-8 sm:px-6 px-8 gap-14 rounded-xl hover:scale-105 transition-transform">
              <Image
                src="/images/icons/categorias/programacao-azulao.png"
                width={120}
                height={120}
                alt="Programação"
                className="w-20"
              />
              <h1 className="text-azulao font-bold sm:text-2xl text-lg w-48 text-center">Programação</h1>
            </div>
            <div className="flex flex-col items-center justify-between bg-white sm:py-14 py-8 sm:px-6 px-8 gap-14 rounded-xl hover:scale-105 transition-transform">
              <Image
                src="/images/icons/categorias/socialmedia-azulao.png"
                width={120}
                height={120}
                alt="Social Media"
                className="w-20"
              />
              <h1 className="text-azulao font-bold sm:text-2xl text-lg w-48 text-center">Social Media</h1>
            </div>
            <div className="flex flex-col items-center justify-between bg-white sm:py-14 py-8 sm:px-6 px-8 gap-14 rounded-xl hover:scale-105 transition-transform">
              <Image
                src="/images/icons/categorias/videomaker-azulao.png"
                width={120}
                height={120}
                alt="Video Making"
                className="w-20"
              />
              <h1 className="text-azulao font-bold sm:text-2xl text-lg w-48 text-center">Video Making</h1>
            </div>
          </div>
        </div>
      </GenericSection>
      <GenericSection className="relative flex flex-col items-center justify-around gap-8 text-azulao mb-20 w-full px-0 py-16 animate-transitionY">
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="w-12 h-12 absolute top-8 left-0 mobile:hidden animate-pulse"
          />
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-bold text-center">Nós prezamos pela sua segurança!</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="text-lg leading-snug font-medium text-center mx-auto w-10/12">
              O nosso modo de pagamento zela tanto pela segurança dos Clientes quanto dos Uzers.
            </p>
          </AnimationOnScroll>
        </div>
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="sm:hidden w-12 h-12 absolute top-0 left-0 smmobile:hidden animate-pulse"
          />
          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="w-12 h-12 absolute top-0 right-0 smmobile:hidden animate-pulse"
          />
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-bold text-center">Mas de que forma?</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="text-lg leading-snug font-medium text-center mx-auto w-10/12">
              Quando um serviço é fechado, o pagamento do cliente é <strong>obrigatório</strong> e fica retido na nossa
              plataforma, o uzer só recebe quando o cliente declarar o serviço como feito. Para ter a certeza que o
              cliente irá fazer isso, nós bloqueamos suas atividades até que ele declare.
            </p>
          </AnimationOnScroll>
        </div>
      </GenericSection>
    </main>
  )
}

const ImageSection = ({
  imageUrl,
  children,
  className,
}: {
  imageUrl: StaticImageData | string
  children: ReactNode
  className?: string
}) => (
  <section
    className={twMerge(
      `w-full h-144 p-0 m-0 bg-gray-600 bg-center bg-cover bg-no-repeat aspect-video relative`,
      className
    )}
  >
    <Image src={imageUrl} alt="Imagem de fundo" fill className="object-cover object-center" priority />
    {children}
  </section>
)

const CardPhoto = ({ imageUrl, title, description }: { imageUrl: string; title: string; description: string }) => (
  <div className="w-8/12 flex flex-col items-center justify-between gap-2 transition duration-300 hover:animate-none hover:duration-300 hover:scale-105 animate-pulse">
    <Image className="w-3/12" width={120} height={120} src={imageUrl} alt="Imagem ilustrativa" />
    <h2 className="text-4xl font-normal text-center">{title}</h2>
    <p className="w-8/12 text-sm leading-tight font-medium text-center">{description}</p>
  </div>
)
