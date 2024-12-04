"use client"

import { ReactNode } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { AnimationOnScroll } from "react-animation-on-scroll"
import GenericSection from "@/components/layout/GenericSection"
import "animate.css/animate.css"
import { twMerge } from "tailwind-merge"

export default function Home() {
  return (
    <main className="mx-0 flex w-full flex-col items-center bg-white" id="inicio">
      <GenericSection className="relative z-0 bg-white px-20 py-72">
        <Image
          src="/elementos/twochunks-circulo.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute left-0 top-0 hidden w-20 sm:block sm:w-40"
        />
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-10 hidden w-6 sm:block"
        />
        <div className="absolute bottom-10 right-3 hidden h-fit w-fit -rotate-90 flex-col items-center -space-y-10 md:flex">
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
            className="hidden w-56 md:block lg:w-80"
          />
        </div>
        <div className="animate__animated animate__fadeIn flex flex-col items-center justify-center gap-10">
          <Image src="/images/logo.png" alt="Logo" width={500} height={500} className="w-96" />
          <h1 className="text-center text-3xl">
            Porque a vida é mais fácil, <br className="hidden md:block" /> quando estamos conectados.
          </h1>
        </div>
      </GenericSection>
      <GenericSection className="relative m-0 flex flex-row items-center justify-start bg-white p-0">
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-0 hidden w-6 sm:block"
        />
        <Image
          src="/elementos/halfpadrao-circulo-azulao.png"
          alt="elemento"
          width={1284}
          height={926}
          className="absolute bottom-0 z-0 h-full w-full object-cover md:left-32 md:w-auto"
        />
        <Image
          src="/images/p1.png"
          alt="Carinhas apertando a mão"
          className="relative z-20 w-full md:w-9/12"
          width={2688}
          height={1536}
        />
        <div className="efeito-vidro md:rounded-0 absolute z-30 hidden items-center justify-center rounded-xl px-3 py-6 shadow-md shadow-black/25 md:right-0 md:top-0 md:flex md:translate-x-0 md:rounded-l-xl md:rounded-r-none md:bg-white lg:top-1/3 lg:px-6 lg:py-12">
          <h1 className="mx-8 text-left text-4xl font-semibold text-black">
            Encontre uzers <br /> que possam te <span className="md:text-primary-purple">ajudar!</span>
          </h1>
        </div>
        <Link
          href="/cadastro/uez?userType=cliente"
          className="absolute bottom-10 left-1/2 z-30 w-10/12 -translate-x-1/2 rounded-xl bg-white px-10 py-3 text-center text-4xl font-medium text-black transition hover:scale-105 md:w-auto"
        >
          Cadastrar como Cliente
        </Link>
      </GenericSection>
      <GenericSection className="relative m-0 bg-primary-purple p-0">
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-0 hidden w-6 sm:block"
        />
        <Image
          src="/images/p2.png"
          alt="Carinhas apertando a mão"
          className="relative z-10 w-full"
          width={2688}
          height={1536}
        />
        <div className="efeito-vidro md:rounded-0 absolute z-30 hidden items-center justify-center rounded-xl px-3 py-6 shadow-md shadow-black/25 md:left-0 md:top-10 md:flex md:translate-x-0 md:rounded-l-none md:rounded-r-xl md:bg-white lg:top-1/3 lg:px-6 lg:py-12 ">
          <h1 className="mx-8 text-left text-4xl font-semibold text-black">
            Consiga clientes <br /> feche <span className="text-primary-purple">mais</span> negócios
          </h1>
        </div>
        <Link
          href="/cadastro/uez?userType=uzer"
          className="absolute bottom-10 left-1/2 z-30 w-10/12 -translate-x-1/2 rounded-xl bg-white px-10 py-3 text-center text-4xl font-medium text-black transition hover:scale-105 md:w-auto"
        >
          Cadastrar como Uzer
        </Link>
      </GenericSection>
      <GenericSection className="relative mb-28 flex w-full animate-transitionY flex-col items-center justify-around gap-8 px-0 py-16 text-azulao">
        <div className="relative mb-16 flex w-11/12 flex-col items-center justify-around gap-16 text-azulao">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-center text-4xl font-bold">O que é a UEZ?</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="mx-auto w-10/12 text-center text-lg font-normal leading-snug">
              A <strong>UEZ</strong> é um software que tem o objetivo de facilitar a sua vida, te ajudando a encontrar
              profissionais que possam realizar algum serviço online para você. Além disso, se você sabe fazer algo que
              se enquadre nos nossos serviços, nós te ajudamos a encontrar novos clientes.
            </p>
          </AnimationOnScroll>
        </div>
        <div className="relative flex w-11/12 flex-col items-center justify-around gap-8 text-azulao">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="mb-16 text-center text-4xl font-bold ">Como funciona?</h1>
          </AnimationOnScroll>
          <div className="flex w-full flex-col items-center gap-4">
            <div className={`flex w-full items-center justify-around gap-4`}>
              <CardPhoto
                imageUrl="/images/icons/cliente-white.png"
                className="invert"
                title="Cliente"
                description="Uma pessoa que precisa de um serviço, por exemplo, uma pessoa com a tubulação quebrada."
              />
              <CardPhoto
                imageUrl="/images/icons/uzer-white.png"
                className="invert"
                title="Uzer"
                description="Um profissional que precisa de clientes, por exemplo, um encanador capaz de consertar a tubulação."
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <Image src="/vetores/linha-baixo.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12" />
              <div className="h-40 w-40 transition hover:scale-105">
                <a href="#inicio" title="Uez Company">
                  <Image
                    src="/logo.svg"
                    width={120}
                    height={120}
                    alt="Logo da UEZ Company"
                    className=" h-40 w-40 animate-pulse transition hover:scale-105 hover:animate-none hover:duration-300"
                  />
                </a>
              </div>
              <Image src="/vetores/linha-cima.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12" />
            </div>
            <div className="flex w-full items-center justify-around gap-4">
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
      <GenericSection className="relative bg-primary-purple p-0">
        <Image
          src="/elementos/bolinhas.png"
          alt="Elementos"
          className="absolute right-32 top-10 w-8 rotate-90 invert xl:right-10 xl:rotate-0"
          width={500}
          height={500}
        />
        <div className="flex max-w-fit flex-col items-center justify-center gap-20 p-10">
          <h1 className="text-center text-4xl font-bold text-white">Conheça nossos serviços!</h1>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-12">
            <CategoryCard
              categoryName="Design"
              imagePath="/images/icons/categorias/designer-azulao.png"
              services={[
                "Criação de logo",
                "Papelaria",
                "Tipografia",
                `Artes para <br /> redes sociais`,
                "Brand identity",
                "Ilustração 2d/3d",
                "UI/UX",
              ]}
            />
            <CategoryCard
              categoryName="Programação"
              imagePath="/images/icons/categorias/programacao-azulao.png"
              services={["Frontend", "Backend", "Fullstack", "Mobile", "Games", "Web", "Engenharia de <br /> Dados"]}
            />
            <CategoryCard
              categoryName="Social Media"
              imagePath="/images/icons/categorias/socialmedia-azulao.png"
              services={[
                "Gestão de editoriais",
                "Criação de conteúdo",
                "Copywriter",
                "Gestão de <br /> tráfego pago",
                "Gestão de <br /> comunidades",
                "Interação e <br /> monitoramento",
                "Relatórios e análises",
              ]}
              classNameForLi="text-base font-bold"
            />

            <CategoryCard
              categoryName="Video Making"
              imagePath="/images/icons/categorias/videomaker-azulao.png"
              services={[
                "Edição de vídeos",
                "Roteirização",
                "Narração",
                "Animação 2D/3D",
                "Operação de <br /> câmera",
                "Operação de áudio",
                "Operação de <br /> iluminação",
              ]}
              classNameForLi="text-base font-bold"
            />
          </div>
        </div>
      </GenericSection>
      <GenericSection className="relative mb-20 flex w-full animate-transitionY flex-col items-center justify-around gap-8 px-0 py-16 text-azulao">
        <div className="relative flex w-11/12 flex-col items-center justify-around gap-8 text-azulao">
          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="absolute left-0 top-8 h-12 w-12 animate-pulse mobile:hidden"
          />
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-center text-4xl font-bold">Nós prezamos pela sua segurança!</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="mx-auto w-10/12 text-center text-lg font-medium leading-snug">
              O nosso modo de pagamento zela tanto pela segurança dos Clientes quanto dos Uzers.
            </p>
          </AnimationOnScroll>
        </div>
        <div className="relative flex w-11/12 flex-col items-center justify-around gap-8 text-azulao">
          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="absolute left-0 top-0 h-12 w-12 animate-pulse sm:hidden smmobile:hidden"
          />
          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="absolute right-0 top-0 h-12 w-12 animate-pulse smmobile:hidden"
          />
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-center text-4xl font-bold">Mas de que forma?</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="mx-auto w-10/12 text-center text-lg font-medium leading-snug">
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

const CategoryCard = ({
  categoryName,
  imagePath,
  services,
  classNameForLi,
}: {
  categoryName: string
  imagePath: string
  services: string[]
  classNameForLi?: string
}) => (
  <div className="group flex flex-col items-center justify-between transition-transform duration-300">
    <div className="flex h-full w-full flex-col items-center gap-14 rounded-xl bg-white px-8 transition-transform duration-300 [perspective:1000px]  [transform-style:preserve-3d] hover:scale-105 group-hover:flex group-hover:items-center group-hover:justify-center group-hover:px-0 group-hover:[transform:rotateY(180deg)] sm:px-6">
      <Image
        src={imagePath}
        width={120}
        height={120}
        alt={categoryName}
        className="mt-8 w-20 group-hover:hidden sm:mt-14"
      />
      <h1 className="mb-8 w-48 text-center text-lg font-bold text-azulao group-hover:hidden sm:mb-14 sm:text-2xl">
        {categoryName}
      </h1>
      <ul className="box-border hidden w-fit list-disc transition-transform [transform:rotateY(180deg)] group-hover:block">
        {services.map((service) => {
          return service.includes("<br />") ? (
            <li className={twMerge("text-lg font-bold", classNameForLi)} key={service}>
              {service.split("<br />")[0]}
              <br />
              {service.split("<br />")[1]}
            </li>
          ) : (
            <li className={twMerge("text-lg font-bold", classNameForLi)} key={service}>
              {service}
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)

const CardPhoto = ({
  imageUrl,
  title,
  description,
  className,
}: {
  imageUrl: string
  title: string
  description: string
  className?: string
}) => (
  <div className="flex w-8/12 animate-pulse flex-col items-center justify-between gap-2 transition duration-300 hover:scale-105 hover:animate-none hover:duration-300">
    <Image className={twMerge("w-3/12", className)} width={120} height={120} src={imageUrl} alt="Imagem ilustrativa" />
    <h2 className="text-center text-4xl font-normal">{title}</h2>
    <p className="w-8/12 text-center text-sm font-medium leading-tight">{description}</p>
  </div>
)
