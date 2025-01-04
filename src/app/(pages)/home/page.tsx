import Image from "next/image"
import Link from "next/link"
import GenericSection from "@/components/layout/GenericSection"
import { ProfessionSection } from "./ProfessionSection"
import { AboutSection } from "./AboutSection"
// import { AboutSecuritySection } from "./AboutSecuritySection"
import "animate.css/animate.css"

export default function Home() {
  return (
    <main className="mx-0 flex w-full flex-col items-center bg-white" id="inicio">
      <GenericSection className="relative z-0 mb-0 h-fit bg-white">
        <div className="absolute bottom-4 right-6 hidden h-fit w-fit -rotate-90 flex-col items-center -space-y-10 md:flex">
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
            className="hidden w-56 md:block lg:w-64"
          />
        </div>
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
          className="absolute right-40 top-10 hidden w-6 md:block"
        />

        <div className="animate__animated animate__fadeIn my-24 flex flex-col items-center justify-center gap-10">
          <span className="text-center text-2xl font-bold">
            Sua nova plataforma de{" "}
            <span className="bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
              serviços digitais.
            </span>
          </span>
          <Image src="/images/logo.png" alt="Logo" width={500} height={500} className="w-3/4 max-w-96" />
          <h1 className="text-center text-3xl">
            Porque a vida é mais fácil, <br className="hidden md:block" /> quando estamos conectados.
          </h1>
        </div>
      </GenericSection>
      <GenericSection className="relative m-0 hidden flex-row items-center justify-start bg-white p-0 md:flex">
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
          src="/images/pages/homepage/p1.png"
          alt="Carinhas apertando a mão"
          className="relative z-20 w-full md:w-9/12"
          width={2688}
          height={1536}
        />
        <div className="efeito-vidro md:rounded-0 absolute z-30 hidden items-center justify-center rounded-xl px-3 py-6 shadow-md shadow-black/25 md:right-0 md:top-0 md:flex md:translate-x-0 md:rounded-l-xl md:rounded-r-none md:bg-white lg:top-1/3">
          <h1 className="mx-8 text-left text-2xl font-semibold text-black xl:text-4xl">
            Encontre uezers <span className="text-base">(profissionais)</span> <br /> que possam te{" "}
            <span className="md:text-primary-purple">ajudar!</span>
          </h1>
        </div>
        <Link
          href="/cadastro/uez?userType=cliente"
          className="absolute bottom-10 left-1/2 z-30 w-10/12 -translate-x-1/2 rounded-xl bg-white px-10 py-3 text-center text-4xl font-medium text-black transition hover:scale-105 md:w-auto"
        >
          Cadastrar como Cliente
        </Link>
      </GenericSection>
      {/* mobile */}
      <GenericSection className="mb-0 flex flex-col items-center justify-center gap-10 px-0 pb-10 md:hidden">
        <div className="flex h-fit w-full items-center justify-center">
          <Image
            src="/images/pages/homepage/p1-mobile.png"
            alt="Carinhas apertando a mão"
            width={2688}
            height={1536}
            className="w-full"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-6 pl-8 pr-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="w-1/2 text-2xl font-medium">
              Encontre uezers que <br /> possam te <span className="text-primary-purple">ajudar!</span>
            </h1>
            <div className="flex w-1/2 items-center justify-center">
              <Image src="/elementos/quadrados.png" alt="elemento" width={600} height={600} className="w-4 rotate-90" />
            </div>
          </div>
          <Link
            href="/cadastro/uez?userType=cliente"
            className="rounded-xl bg-white p-2 text-center text-2xl font-medium text-black shadow-md transition hover:scale-105"
          >
            Cadastrar como Cliente
          </Link>
        </div>
      </GenericSection>
      <GenericSection className="relative m-0 hidden flex-row items-center justify-start bg-primary-purple p-0 md:flex">
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-40 top-0 hidden w-6 sm:block"
        />
        <Image
          src="/images/pages/homepage/p2.png"
          alt="Carinhas apertando a mão"
          className="relative z-10 w-full"
          width={2688}
          height={1536}
        />
        <div className="efeito-vidro md:rounded-0 absolute z-30 hidden items-center justify-center rounded-xl px-3 py-6 shadow-md shadow-black/25 md:left-0 md:top-1/3 md:flex md:translate-x-0 md:rounded-l-none md:rounded-r-xl md:bg-white">
          <h1 className="mx-8 text-left text-2xl font-semibold text-black xl:text-4xl">
            Consiga clientes <br /> feche <span className="text-primary-purple">mais</span> negócios
          </h1>
        </div>
        <Link
          href="/cadastro/uez?userType=uezer"
          className="absolute bottom-10 left-1/2 z-30 w-10/12 -translate-x-1/2 rounded-xl bg-white px-10 py-3 text-center text-4xl font-medium text-black transition hover:scale-105 md:w-auto"
        >
          Cadastrar como Uezer
        </Link>
      </GenericSection>
      {/* mobile */}
      <GenericSection className="mb-0 flex flex-col items-center justify-center gap-10 px-0 pb-10 md:hidden">
        <div className="flex h-fit w-full items-center justify-center bg-primary-purple">
          <Image
            src="/images/pages/homepage/p2.png"
            alt="Carinhas apertando a mão"
            width={2688}
            height={1536}
            className="w-full"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-6 pl-8 pr-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-1/2 items-center justify-center">
              <Image src="/elementos/bolinhas.png" alt="elemento" width={600} height={600} className="w-4 rotate-90" />
            </div>
            <h1 className="w-1/2 text-right text-2xl font-medium">
              Consiga clientes, <br /> feche <span className="text-primary-purple">mais</span> negócios!
            </h1>
          </div>
          <Link
            href="/cadastro/uez?userType=uezer"
            className="rounded-xl bg-white p-2 text-center text-2xl font-medium text-black shadow-md transition hover:scale-105"
          >
            Cadastrar como Uezer
          </Link>
        </div>
      </GenericSection>
      <AboutSection />
      <ProfessionSection />
      {/* <AboutSecuritySection /> */}
    </main>
  )
}
