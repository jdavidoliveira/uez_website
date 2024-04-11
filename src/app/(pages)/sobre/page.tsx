import Image from "next/image"
import GenericSection from "@/components/GenericSection"
import { Mail } from "lucide-react"

export default function Sobre() {
  return (
    <main className="w-full flex flex-col items-center pt-10 sm:pt-24 relative">
      <Image
        src="/elementos/twochunks-circulo.png"
        alt="elemento"
        width={600}
        height={600}
        className="absolute right-0 top-0 sm:w-40 w-20 rotate-90 hidden sm:block"
      />
      <Image
        src="/elementos/bolinhas.png"
        alt="elemento"
        width={600}
        height={600}
        className="absolute left-10 top-10 w-6 hidden sm:block"
      />
      <GenericSection>
        <h1 className="text-3xl font-bold sm:mb-10">Sobre Nós</h1>
        <div className="w-11/12 flex flex-col gap-10 sm:gap-0 sm:flex-row items-center justify-between">
          <CardSobre
            title={"Missão"}
            image="/images/missao.svg"
            description={"Nossa missão é facilitar a vida das pessoas, criando conexões entre pessoas próximas de você"}
          />
          <CardSobre
            title={"Visão"}
            image="/images/visao.svg"
            description={"Visamos ser conhecidos por ajudar pessoas a encontrar e mostrar suas habilidades"}
          />
          <CardSobre
            title={"Valores"}
            image="/images/valores.svg"
            description={"Nós valorizamos a segurança, a confiança, a facilidade e o networking"}
          />
        </div>
      </GenericSection>
      <GenericSection className="bg-primary-purple relative md:px-36 px-24 py-36 flex md:flex-row flex-col">
        <Image
          src="/elementos/chunck-circulo-azulao.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute left-0 top-0 sm:w-40 w-20"
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
          className="absolute left-52 -bottom-5 w-6 rotate-90"
        />
        <div className="text-white flex flex-col gap-10 md:w-7/12 w-full">
          <h1 className="text-3xl font-bold text-center">Nossa história</h1>
          <p className="font-semibold indent-7 w-full text-justify">
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
      <GenericSection className="bg-white relative mb-0">
        <Image
          src="/elementos/quadrados.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute left-10 bottom-20 w-6"
        />
        <div className="flex flex-col items-center justify-center gap-20">
          <h1 className="text-3xl font-bold">Mas por que a UEZ?</h1>
          <div className="md:grid md:grid-cols-2 flex flex-col items-center gap-10 lg:gap-x-56 lg:gap-y-28 md:gap-x-28 md:gap-y-28 lg:mx-28 sm:mx-16 mx-8 relative">
            <p className="text-justify">
              Se nós separarmos o nome <strong>UEZ</strong> em dois, nós teremos o <strong>“U”</strong> depois o{" "}
              <strong>“EZ”</strong>, dessa forma o <strong>“U”</strong> em inglês tem o sou de “iu” esse é o mesmo som
              da palavra “you” que em português significa você.
            </p>
            <p className="text-justify">
              A junção das letras <strong>“EZ”</strong> tem o som de “izi” que o mesmo som da palavra “easy” que em
              português significa fácil, então <strong>UEZ</strong> significa você fácil.
            </p>
            <p className="text-justify pb-52">
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
                className="lg:w-80 w-56 hidden md:block"
              />
            </div>
          </div>
        </div>
      </GenericSection>
      <GenericSection className="bg-primary-blue py-56 relative">
        <Image
          src="/elementos/halfpadrao-circulo-white.png"
          alt="elemento"
          width={600}
          height={600}
          className="sm:w-80 w-64 absolute bottom-0 md:left-20 left-1/2 -translate-x-1/2"
        />
        <Image
          src="/elementos/quadrados-empty.png"
          alt="elemento"
          width={600}
          height={600}
          className="lg:w-10 w-6 absolute xl:bottom-1/2 top-20 right-20"
        />

        <div className="flex md:flex-row flex-col justify-between items-center gap-20">
          <div className="flex items-center justify-center gap-10">
            <Image src="/images/icons/uez-white.png" alt="Logo da uez" className="w-56" width={500} height={500} />
            <span className="text-[150px] font-bold text-white mt-10">?</span>
          </div>
          <p className="text-white font-bold lg:text-xl text-lg text-justify lg:max-w-lg md:max-w-sm w-10/12">
            Uma xícara de café traz a ideia de networking, quando uma reunião é marcada, geralmente, as pessoas falam
            “vamos tomar um café?”, além disso o café traz a ideia de produtividade que os uzers têm.
          </p>
        </div>
      </GenericSection>
      <GenericSection className="bg-white">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="sm:text-3xl text-xl font-bold">Evolução da logo</h1>
          <Image
            src="/images/logoevolucao.png"
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
            className="md:hidden block p-10"
          />
        </div>
      </GenericSection>
      <GenericSection className="bg-azulao py-16 mb-0">
        <h1 className="text-3xl font-bold text-white">Quer falar com a gente?</h1>
        <div className="flex flex-col xl:flex-row justify-between items-center gap-14 xl:gap-28">
          <div className="relative animate-float">
            <div className="w-3/5 aspect-square bg-primary-blue z-0 rounded-br-full absolute top-0 left-0" />
            <div className="text-white bg-primary-purple relative py-6 px-12 flex flex-col items-center m-10 justify-between gap-10 rounded-lg">
              <h1 className="text-xl font-bold text-center z-10">Email</h1>
              <p className="text-base w-40 text-center">
                Para sugestões de melhoria para a plataforma ou para alguma oferta
              </p>
              <Mail className="mx-auto" size={40} />
            </div>
          </div>
          <Image
            src="/elementos/bolinhas.png"
            alt="Elementos"
            className="w-8 invert rotate-90 xl:rotate-0"
            width={500}
            height={500}
          />
          <div className="relative animate-float">
            <div className="w-3/5 aspect-square bg-primary-blue z-0 rounded-lt-full absolute bottom-0 right-0" />
            <div className="text-white bg-primary-purple relative py-6 px-14 flex flex-col items-center m-10 justify-between gap-10 rounded-lg">
              <h1 className="text-xl font-bold text-center z-10">Whatsapp</h1>
              <p className="text-base w-40 text-center">
                Para reclamações sobre outros usuários da plataforma ou dúvidas sobre o uso do site
              </p>
              <Image
                src="/images/icons/whatsapp.png"
                alt="Elementos"
                className="w-10 mx-auto"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </GenericSection>
    </main>
  )
}

function CardSobre({ title, image, description }: { title: string; image: string; description: string }) {
  return (
    <div className="w-[45%] h-full flex flex-col items-center gap-12 mobile:w-full">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <Image width={200} height={200} className="w-[30%] h-[30%] animate-float" src={image} alt="Imagem ilustrativa" />
      <p className="text-base font-medium text-center w-[90%]">{description}</p>
    </div>
  )
}
