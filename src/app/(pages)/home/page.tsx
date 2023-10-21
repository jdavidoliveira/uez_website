"use client"

import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

export default function Home() {

  return (
    <main className="w-full flex flex-col items-center mx-0 bg-white" id="inicio">
      <ImageSection imageUrl="/images/p1.jpg">
        <div className="px-6 py-12 bg-azulao absolute right-0 top-1/3 rounded-l-full flex items-center justify-center">
          <h1 className="mx-8 text-white text-left text-4xl font-semibold">Encontre uzers <br /> que possam te ajudar!</h1>
        </div>
        <button className="bg-azulao py-1 px-4 rounded-full font-bold text-white absolute bottom-6 left-1/2 -translate-x-1/2 transition hover:scale-105"><Link href="/cadastro?userType=cliente">Torne-se um Cliente</Link></button>
        <div className="w-40 h-40 bg-azulao absolute bottom-0 left-0 -translate-x-1/2 rounded-r-full smmobile:w-28 smmobile:h-28"></div>
      </ImageSection>
      <ImageSection imageUrl="/images/p2.jpg">
        <div className="px-6 py-12 bg-roxazul absolute left-0 top-1/3 rounded-r-full flex items-center justify-center">
          <h1 className="mx-8 text-white text-left text-4xl font-semibold">Consiga clientes, <br /> ajude mais pessoas!</h1>
        </div>
        <button className="bg-white py-1 px-4 rounded-full font-bold text-azulao absolute bottom-6 left-1/2 -translate-x-1/2 transition hover:scale-105"><Link href="/cadastro?userType=uzer">Torne-se um Uzer</Link></button>
        <div className="w-20 h-40 bg-roxazul absolute bottom-0 right-0 translate-y-1/2 rounded-l-full smmobile:h-28 smmobile:w-[3.5rem]"></div>
      </ImageSection>


      <GenericSection className="relative flex flex-col items-center justify-around gap-8 text-azulao mb-28">
        <div className="w-40 h-40 bg-roxazul absolute top-1/4 left-0 -translate-x-1/2 rounded-r-full smmobile:w-28 smmobile:h-28"></div>
        <div className="w-20 h-40 bg-roxazul absolute top-3/4 right-0 rounded-l-full smmobile:h-28 smmobile:w-[3.5rem]"></div>
        <div className="w-40 h-40 bg-roxazul absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rounded-r-full smmobile:w-28 smmobile:h-28"></div>
        <div className="relative flex flex-col items-center justify-around gap-16 mb-16 text-azulao w-11/12">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-semibold text-center">O que é a UEZ Company?</h1>
          </AnimationOnScroll>
          <p className="text-lg leading-snug font-medium text-center w-10/12">
            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
              A <strong>UEZ Company</strong> é uma empresa que tem o objetivo de facilitar a sua vida, te ajudando a encontrar profissionais que possam realizar algum serviço para você ou se você é esse profissional e está em busca de novos clientes.
            </AnimationOnScroll>
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-semibold text-center mb-16 ">Como funciona?</h1>
          </AnimationOnScroll>
          <div className="flex flex-col gap-4 items-center w-full">
            <div className={`flex gap-4 items-center justify-around w-full`}>
              <CardPhoto imageUrl="/images/cliente.png" title="Cliente" description="Uma pessoa que precisa de um serviço, por exemplo, uma pessoa com a tubulação quebrada." />
              <CardPhoto imageUrl="/images/uzer.png" title="Uzer" description="Um profissional que precisa de clientes, por exemplo, um encanador capaz de consertar a tubulação." />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <Image src="/vetores/linha-baixo.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12" />
              <div className="w-40 h-40 transition hover:scale-105">
                <a href="#inicio" title="Uez Company">
                  <Image src="/images/black_logo.svg" width={120} height={120} alt="Logo da UEZ Company" className=" animate-pulse w-40 h-40 transition hover:animate-none hover:duration-300 hover:scale-105" />
                </a>
              </div>
              <Image src="/vetores/linha-cima.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12" />
            </div>
            <div className="flex gap-4 items-center justify-around w-full">
              <CardPhoto imageUrl="/images/batepapo.png" title="Chat" description="Aqui o cliente e o uzer conversam para decidirem o preço, enviar especificações e para montar o orçamento." />
              <CardPhoto imageUrl="/images/riquinho.png" title="Orçamento" description="Quando o orçamento é lançado para o cliente, ele tem a opção de aceitar ou não, priorizando a segurança." />
            </div>
          </div>
        </div>
      </GenericSection>


      <GenericSection className="relative flex flex-col items-center justify-around gap-8 text-azulao mb-20">
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
          <Image src="/images/icons/cadeado.svg" width={120} height={120} alt="Imagem ilustrativa de um cadeado" className="w-12 h-12 absolute top-8 left-0 mobile:hidden animate-pulse" />
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-bold text-center">Nós prezamos pela sua segurança!</h1>
          </AnimationOnScroll>
          <p className="text-lg leading-snug font-medium text-center w-10/12">
            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>O nosso modo de pagamento zela tanto pela segurança dos Clientes quanto dos Uzers.</AnimationOnScroll>
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
          <Image src="/images/icons/cadeado.svg" width={120} height={120} alt="Imagem ilustrativa de um cadeado" className="sm:hidden w-12 h-12 absolute top-0 left-0 smmobile:hidden animate-pulse" />
          <Image src="/images/icons/cadeado.svg" width={120} height={120} alt="Imagem ilustrativa de um cadeado" className="w-12 h-12 absolute top-0 right-0 smmobile:hidden animate-pulse" />
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-bold text-center">Mas de que forma?</h1>
          </AnimationOnScroll>
          <p className="text-lg leading-snug font-medium text-center w-10/12">
            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>Quando um serviço é fechado, o pagamento do cliente é <strong>obrigatório</strong> e fica retido na nossa plataforma, o uzer só recebe quando o cliente declarar o serviço como feito. Para ter a certeza que o cliente irá fazer isso, nós bloqueamos suas atividades que ele declare.</AnimationOnScroll>
          </p>
        </div>
      </GenericSection>
    </main>
  );
}

const GenericSection = ({ className = "", children }: { className: string, children: ReactNode }) => (
  <section
    className={`w-full px-0 py-16 flex flex-row items-center justify-around gap-8 text-azulao animate-transitionY ${className}`}
  >{children}</section>
);

const ImageSection = ({ imageUrl, children }: { imageUrl: StaticImageData | string, children: ReactNode }) => (
  <section
    className={`w-full h-144 p-0 m-0 bg-gray-600 bg-center bg-cover bg-no-repeat aspect-video relative`}
  >
    <Image src={imageUrl} alt="Imagem de fundo" fill className="object-cover object-center" priority />
    {children}
  </section>
);

const CardPhoto = ({ imageUrl, title, description }: { imageUrl: string, title: string, description: string }) => (
  <div className="w-8/12 flex flex-col items-center justify-between gap-2 transition duration-300 hover:animate-none hover:duration-300 hover:scale-105 animate-pulse">
    <Image className="w-3/12" width={120} height={120} src={imageUrl} alt="Imagem ilustrativa" />
    <h2 className="text-4xl font-normal text-center">{title}</h2>
    <p className="w-8/12 text-sm leading-tight font-medium text-center">{description}</p>
  </div>
)
