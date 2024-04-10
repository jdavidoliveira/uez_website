"use client"

import { ReactNode } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import "animate.css/animate.min.css"
import { AnimationOnScroll  } from "react-animation-on-scroll"

export default function Home() { 
  return (
    <main className="w-full flex flex-col items-center mx-0  bg-white" id="inicio">
      
      {/* P0 - FEITO */}
      {/* <ImageSection imageUrl="/images/p0.jpg">
        <div className="flex flex-col z-10 absolute right-1/2 translate-x-1/2 mt-48 gap-8 items-center">
          <Image src="/images/logo.png" alt={"Logo da UEZ"} width={250} height={200}/>
          <div className="text-center">
            <h1 className="text-3xl"> Porque a vida é mais fácil </h1>
            <h1 className="text-3xl"> 
            quando estamos 
            <span className="">conectados</span>
            </h1>
          </div>
        </div>
      </ImageSection> */}
 

      {/* P1 -  */}
      


      {/* P2 - FEITO */}
      {/* <ImageSection imageUrl="/images/p2.jpg">
        <div className="absolute w-full flex flex-col z-10 bottom-0 gap-44 left-0 mb-8">
          <h1 className=" w-[430px] py-8 pr-4 bg-white text-4xl font-medium text-right rounded-r-2xl " >
            Consiga clientes  <br />
            feche <span className="text-azulao">mais</span> negócios 
          </h1>
          <h1 className="p-4 cursor-pointer bg-white text-4xl font-medium text-center flex self-center rounded-2xl transition duration-100 hover:animate-none hover:duration-100 hover:scale-105  animate-pulse">
            Cadastrar como uzer 
          </h1>
        </div>
      </ImageSection> */}


      {/* P3 - FEITO */}
      {/* <GenericSection className="relativa h-144  flex flex-col items-center justify-around bg-pink text-azulao" >
        <div className=" flex flex-col items-center justify-around gap-16 text-azulao ">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-semibold text-center">O que é a UEZ?</h1>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <p className="text-lg leading-snug font-medium text-center mx-auto w-10/12">
              A <strong> UEZ </strong> é um software que tem o objetivo de facilitar a sua vida, te ajudando a encontrar profissionais que possam realizar algum serviço online para você. Além disso, se você sabe fazer algo que se enquadre nos nossos serviços, nós te ajudamos a encontrar novos clientes.
            </p>
          </AnimationOnScroll>
        </div>
      </GenericSection> */}


      {/* P4 */}
      {/* <GenericSection className="flex flex-col items-center pb-40 justify-around text-azulao ">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <h1 className="text-4xl font-semibold text-center mb-16 ">Como funciona?</h1>
          </AnimationOnScroll>
          <div className="flex flex-col items-center w-full">
            <div className="flex gap-4 items-center justify-around w-full">
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
              <Image src={"/vetores/linha-baixo.svg"} width={120} height={120} alt="Vetor de linhas" className="w-6/12 pt-8 pb-4 flex z-10" />
              <div className="w-40 h-40 transition hover:scale-105">
                <a href="#inicio" title="Uez Company">
                  <Image
                    src="logo.svg"
                    width={120}
                    height={120}
                    alt="Logo da UEZ Company"
                    className=" animate-pulse w-40 h-40 transition hover:animate-none hover:duration-300 hover:scale-105"
                  />
                </a>
              </div>
              <Image src="/vetores/linha-cima.svg" width={120} height={120} alt="Vetor de linhas" className="w-6/12 pt-4 pb-8 flex z-10" />
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
      </GenericSection> */}
   

      {/* P5 */}
      {/* <ImageSection imageUrl="/images/p5.png">
        <div className="flex flex-col gap-2"> 
          <h1 className="flex z-10 mt-16 font-semibold tracking-wider text-3xl text-white self-center">Conheça nossos serviços!</h1>

          <div className="flex z-10 justify-evenly items-center mt-36 ">
            <div id="frente" className="w-[230px]  h-[290px] rounded-2xl z-10 bg-white text-center flex flex-col items-center justify-evenly">
              <Image src="/images/design.png" alt="Icone de designer" width={80} height={81}/>
              <h1 className="font-bold text-xl text-azulao">Design</h1>
            </div>
                          
            <div id="frente" className="w-[230px]  h-[290px] rounded-2xl z-10 bg-white text-center flex flex-col items-center justify-evenly">
              <Image src="/images/programação.png" alt="Icone de designer" width={80} height={81}/>
              <h1 className="font-bold text-xl text-azulao">Programação</h1>
            </div>
                          
            <div id="frente" className="w-[230px]  h-[290px] rounded-2xl z-10 bg-white text-center flex flex-col items-center justify-evenly">
              <Image src="/images/social.png" alt="Icone de designer" width={80} height={81}/>
              <h1 className="font-bold text-xl text-azulao">Social Midia</h1>
            </div>
                          
            <div id="frente" className="w-[230px]  h-[290px] rounded-2xl z-10 bg-white text-center flex flex-col items-center justify-evenly">
              <Image src="/images/video.png" alt="Icone de designer" width={80} height={81}/>
              <h1 className="font-bold text-xl text-azulao">Video Maker</h1>
            </div>
                          

          </div>

        </div>
      </ImageSection> */}


      {/* P6 - FEITO */}
      {/* <GenericSection className="pt-16 pb-8 relative flex flex-col items-center justify-around gap-8 text-azulao mb-20">
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

          <Image
            src="/images/icons/cadeado.svg"
            width={120}
            height={120}
            alt="Imagem ilustrativa de um cadeado"
            className="w-12 h-12 absolute top-8 right-0 mobile:hidden animate-pulse"
          />
        </div>
        <div className="relative flex flex-col items-center justify-around gap-8 text-azulao w-11/12">
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
      </GenericSection>  */}
      
    </main>
  )
}

const GenericSection = ({ className = "", children }: { className: string; children: ReactNode }) =>  (
  <section
    className={`w-full  px-0 flex flex-row items-center justify-around  text-azulao animate-transitionY ${className}`}
  >
    {children}
  </section>
)

const ImageSection = ({ imageUrl, children }: { imageUrl: StaticImageData | string; children: ReactNode }) => (
  <section className={`w-full h-auto pt-0 p-0 m-0 bg-center  bg-no-repeat aspect-video relative`}>
    <Image src={imageUrl} alt="Imagem de fundo" fill className="object-fill object-center " priority />
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
