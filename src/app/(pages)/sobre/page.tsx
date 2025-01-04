import Image from "next/image"
import GenericSection from "@/components/layout/GenericSection"
import { Mail } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre nós",
}

export default function Sobre() {
  return (
    <main className="relative flex w-full flex-col items-center pt-10 sm:pt-24">
      <Image
        src="/elementos/twochunks-circulo.png"
        alt="elemento"
        width={600}
        height={600}
        className="absolute right-0 top-0 hidden w-20 rotate-90 sm:block sm:w-40"
      />
      <Image
        src="/elementos/bolinhas.png"
        alt="elemento"
        width={600}
        height={600}
        className="absolute left-10 top-10 hidden w-6 sm:block"
      />
      <GenericSection>
        <h1 className="text-4xl font-bold sm:mb-10">Nossos pilares</h1>
        <div className="flex w-11/12 flex-col items-center justify-between gap-10 sm:flex-row sm:gap-0">
          <CardSobre
            title={"Missão"}
            image="/images/missao.svg"
            description={
              "Nossa missão é facilitar a vida das pessoas, criando conexões entre pessoas próximas de você."
            }
          />
          <CardSobre
            title={"Visão"}
            image="/images/visao.svg"
            description={"Visamos ser conhecidos por ajudar pessoas a encontrar e mostrar suas habilidades."}
          />
          <CardSobre
            title={"Valores"}
            image="/images/valores.svg"
            description={"Nós valorizamos a segurança, a confiança, a facilidade e o networking."}
          />
        </div>
      </GenericSection>
      <GenericSection className="relative flex flex-col bg-primary-purple px-24 pb-0 pt-20 md:flex-row md:px-36">
        <Image
          src="/elementos/chunck-circulo-azulao.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute left-0 top-0 w-20 md:w-40"
        />
        <Image
          src="/elementos/bolinhas.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-10 top-10 w-6"
        />
        <Image
          src="/elementos/quadrados.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute bottom-10 left-80 hidden w-6 rotate-90 xl:block"
        />
        <div className="flex w-full flex-col gap-10 text-white md:w-7/12">
          <h1 className="text-left text-4xl font-bold">Nossa história</h1>
          <p className="w-full pb-10 text-justify indent-7 text-lg font-semibold">
            A UEZ surgiu em 2023 a partir de um projeto de TCC de técnico em informática, que tinha como objetivo criar
            uma plataforma. Nosso grupo decidiu criar uma plataforma que ligasse profissionais e clientes de forma
            segura e eficaz, mas desenvolvemos um carinho tão grande por esse trabalho que os membros decidiram montar
            uma plataforma real para disponibilizar aos usuários. Assim, surgiu a UEZ.
          </p>
        </div>
        <div className="relative">
          <Image src="/images/velhinho.png" alt="Velhinho da UEZ" width={1000} height={1000} className="w-144" />
        </div>
      </GenericSection>
      <GenericSection className="relative mb-0 bg-white">
        <Image
          src="/elementos/quadrados.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute bottom-20 left-10 w-6"
        />
        <div className="flex flex-col gap-20">
          <h1 className="text-center text-3xl font-bold">Mas por que UEZ?</h1>
          <div className="relative mx-8 flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-x-28 md:gap-y-28 lg:gap-x-80 lg:gap-y-28 2xl:mx-80">
            <p className="text-justify">
              Se nós separarmos o nome <strong>UEZ</strong> em dois, nós teremos o <strong>“U”</strong> depois o{" "}
              <strong>“EZ”</strong>, dessa forma o <strong>“U”</strong> em inglês tem o sou de “iu” esse é o mesmo som
              da palavra “you” que em português significa você.
            </p>
            <p className="text-justify">
              A junção das letras <strong>“EZ”</strong> tem o som de “izi” que o mesmo som da palavra “easy” que em
              português significa fácil, então <strong>UEZ</strong> significa você fácil.
            </p>
            <p className="pb-52 text-justify">
              <strong>Você fácil</strong> significa que a nossa plataforma facilita a sua vida te ajudando a aumentar a
              sua rede de networking.
            </p>
            <div className="absolute bottom-0 right-20 flex flex-col items-center -space-y-10">
              <Image src="/elementos/bolinhas.png" alt="elemento" width={600} height={600} className="w-6 rotate-90" />
              <Image
                src="/elementos/halfpadrao-circulo.png"
                alt="elemento"
                width={600}
                height={600}
                className="hidden w-56 md:block lg:w-80"
              />
            </div>
          </div>
        </div>
      </GenericSection>
      <GenericSection className="relative bg-primary-blue py-56">
        <Image
          src="/elementos/halfpadrao-circulo-white.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute -left-1/4 bottom-0 w-64 -translate-x-1/2 sm:w-80 md:left-1/3 lg:w-96"
        />
        <Image
          src="/elementos/quadrados-empty.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute right-20 top-20 w-6 lg:w-10 xl:bottom-1/2"
        />

        <div className="flex flex-col items-center justify-between gap-20 md:flex-row">
          <div className="flex items-center justify-center gap-10">
            <Image src="/images/icons/uez-white.png" alt="Logo da uez" className="w-56" width={500} height={500} />
            <span className="mt-10 text-[150px] font-bold text-white">?</span>
          </div>
          <p className="w-10/12 text-justify text-lg font-bold text-white md:max-w-sm lg:max-w-lg lg:text-xl">
            Uma xícara de café traz a ideia de networking, quando uma reunião é marcada, geralmente, as pessoas falam
            “vamos tomar um café?”, além disso o café traz a ideia de produtividade que os uezers têm.
          </p>
        </div>
      </GenericSection>
      <GenericSection className="bg-white">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-xl font-bold sm:text-3xl">Evolução da logo</h1>
          <Image
            src="/images/logoevolucao-1.png"
            alt="Logo da uez"
            width={1000}
            height={1000}
            className="hidden md:block"
          />
          <Image
            src="/images/logoevolucao-vertical.png"
            alt="Logo da uez"
            width={1000}
            height={1000}
            className="block p-10 md:hidden"
          />
        </div>
      </GenericSection>
      <GenericSection className="mb-0 bg-azulao py-16">
        <h1 className="text-3xl font-bold text-white">Quer falar com a gente?</h1>
        <div className="flex flex-col items-center justify-between gap-14 xl:flex-row xl:gap-28">
          <div className="relative animate-float">
            <div className="absolute left-0 top-0 z-0 aspect-square w-3/5 rounded-br-full bg-primary-blue" />
            <div className="relative m-10 flex flex-col items-center justify-between gap-10 rounded-lg bg-primary-purple px-12 py-6 text-white">
              <h1 className="z-10 text-center text-xl font-bold">Email</h1>
              <p className="w-40 text-center text-base">
                Para sugestões de melhoria para a plataforma ou para alguma oferta
              </p>
              <Link href="mailto:suporte@uezcompany.com" target="_blank">
                <Mail className="mx-auto" size={40} />
              </Link>
            </div>
          </div>
          <Image
            src="/elementos/bolinhas.png"
            alt="Elementos"
            className="w-8 rotate-90 invert xl:rotate-0"
            width={500}
            height={500}
          />
          <div className="relative animate-float">
            <div className="rounded-lt-full absolute bottom-0 right-0 z-0 aspect-square w-3/5 bg-primary-blue" />
            <div className="relative m-10 flex flex-col items-center justify-between gap-10 rounded-lg bg-primary-purple px-14 py-6 text-white">
              <h1 className="z-10 text-center text-xl font-bold">Whatsapp</h1>
              <p className="w-40 text-center text-base">
                Para reclamações sobre outros usuários da plataforma ou dúvidas sobre o uso do site
              </p>
              <Link
                href="https://api.whatsapp.com/send?phone=5521978783261&text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20a%20UEZ"
                target="_blank"
              >
                <Image
                  src="/images/icons/whatsapp.png"
                  alt="Elementos"
                  className="mx-auto w-10"
                  width={500}
                  height={500}
                />
              </Link>
            </div>
          </div>
        </div>
      </GenericSection>
    </main>
  )
}

function CardSobre({ title, image, description }: { title: string; image: string; description: string }) {
  return (
    <div className="flex h-full w-[45%] flex-col items-center gap-12 mobile:w-full">
      <h2 className="text-center text-2xl font-bold">{title}</h2>
      <Image width={200} height={200} className="h-[30%] w-[30%] animate-float" src={image} alt="Imagem ilustrativa" />
      <p className="w-[90%] text-center text-base font-medium">{description}</p>
    </div>
  )
}
