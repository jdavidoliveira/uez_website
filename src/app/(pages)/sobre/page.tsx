import Image from "next/image"
import GenericSection from "./GenericSection"
import Link from "next/link"
import { Mail } from "lucide-react"
import "./style.css"

export default function Sobre() {
  return (
    <main className="w-full flex flex-col items-center py-10 sm:py-24 relative">
      <section className="home" id="home">
        <div className="circle-4"></div>
        <Image
          src="/elementos/chunck-circulo.png"
          alt="elemento"
          width={600}
          height={600}
          className="absolute -mt-[7.5%]"
        />

        <GenericSection>
          <h1 className="text-3xl font-bold sm:mb-10">Sobre Nós</h1>
          <div className="w-11/12 flex flex-col gap-10 sm:gap-0 sm:flex-row items-center justify-between">
            <CardSobre
              title={"Missão"}
              image="/images/missao.svg"
              description={
                "Nossa missão é facilitar a vida das pessoas, criando conexões entre pessoas próximas de você"
              }
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
      </section>

      <div className="page1" id="page1">
        <div className="circle"></div>

        <div className="direita">
          <section className="historia">
            <h2>Nossa Historia</h2>
            <p>
              A UEZ surgiu em 2023 a partir de um projeto de TCC de técnico em informática, que tinha como objetivo
              criar uma plataforma. Nosso grupo decidiu criar uma plataforma que ligasse profissionais e clientes de
              forma segura e eficaz, mas desenvolvemos um carinho tão grande por esse trabalho que os membros decidiram
              montar uma plataforma real para disponibilizar aos usuários. Assim, surgiu a UEZ.
            </p>
          </section>
          <div className="retangulos">
            <div className="retangulo"></div>
            <div className="retangulo"></div>
            <div className="retangulo"></div>
            <div className="retangulo"></div>
            <div className="retangulo"></div>
            <div className="retangulo"></div>
          </div>
        </div>

        <div className="esquerda">
          <Image width={100} height={100} id="law" src="/images/velhinho.png" alt="" />
        </div>
        <div className="container-circular">
          <div className="circulos">
            <div className="circulo"></div>
            <div className="circulo"></div>
            <div className="circulo"></div>
            <div className="circulo"></div>
            <div className="circulo"></div>
          </div>
        </div>
      </div>

      <div className="text" id="text">
        <h1>
          <span>Mas por que UEZ?</span>
        </h1>
      </div>

      <div className="page2" id="page2">
        <div className="retangulos" id="component-pg2-reta">
          <div className="retangulo"></div>
          <div className="retangulo"></div>
          <div className="retangulo"></div>
          <div className="retangulo"></div>
          <div className="retangulo"></div>
        </div>

        <section className="centro">
          <p className="first" id="text-pg2">
            Se nós separarmos o nome
            <strong>UEZ</strong> em dois, nós teremos o<strong>“U”</strong> depois o<strong>“EZ”</strong>, dessa forma o
            <strong>“U”</strong> em inglês tem o som de “iu” esse é o mesmo som da palavra “you” que em português
            significa você.
          </p>
          <p className="second" id="text-pg2">
            <strong>Você fácil</strong> significa que a nossa plataforma facilita a sua vida te ajudando a aumentar a
            sua rede de networking.
          </p>
        </section>

        <section className="esquerda">
          <p id="text-pg2-esquerda">
            A junção das letras
            <strong>“EZ”</strong> tem o som de “izi’ que o mesmo som da palavra “easy” que em português significa fácil,
            então <strong>UEZ</strong>
            significa você fácil.
          </p>

          <div className="container-circular" id="component-pg2">
            <div className="circulos">
              <div className="circulo"></div>
              <div className="circulo"></div>
              <div className="circulo"></div>
              <div className="circulo"></div>
              <div className="circulo"></div>
            </div>
          </div>
          <div className="Group-1">
            {/* <Image width={100} height={100} src="../img/Group_1.jpg" alt="Imagem do Grupo 1" /> */}
            <Image width={100} height={100} src="/elementos/halfpadrao-circulo.png" alt="Imagem do Grupo 1" />
          </div>
          <div className="half-circle"></div>
        </section>
      </div>

      <div className="page3" id="page3">
        <div className="esquerda-3">
          <section className="img-info">
            <Image width={100} height={100} src="/images/icons/uez-white.png" alt="" />
            <span id="component-pg3">?</span>
          </section>
        </div>

        <div className="direita-3">
          <section className="text-info">
            <p>
              <span id="text-pg3" className="text-white">
                Uma xícara de café traz a ideia de networking, quando uma reunião é marcada, geralmente, as pessoas
                falam “vamos tomar um café?”, além disso o café traz a ideia de produtividade que os uzers têm.
              </span>
            </p>
          </section>

          <section className="container-rentangulos">
            <div className="retangulos">
              <div className="retangulo"></div>
              <div className="retangulo"></div>
              <div className="retangulo"></div>
            </div>
          </section>
        </div>
      </div>

      <div className="text" id="text">
        <h1>
          <span>Evolução da Logo</span>
        </h1>
      </div>

      <div className="page4">
        <div className="timeline">
          <Image width={100} height={100} src="/images/1.png" alt="Logo 1" className="logo left-[8%]" />
          <div className="dot left-[10%]"></div>

          <span className="date left-[10%] font-bold">22/03/23</span>

          <div className="dot left-[30%]"></div>
          <Image width={100} height={100} src="/images/2.png" alt="Logo 2" className="logo left-[28%]" />
          <span className="date left-[30%] font-bold">25/03/23</span>

          <div className="dot left-[60%]"></div>
          <Image width={100} height={100} src="/images/3.png" alt="Logo 3" className="logo left-[58%]" />
          <span className="date left-[60%] font-bold">25/06/23</span>

          <div className="dot left-[90%]"></div>
          <Image width={100} height={100} src="/images/4.png" alt="Logo 4" className="logo left-[88%]" />
          <span className="date left-[90%] font-bold">02/03/24</span>

          <div className="line"></div>
        </div>

        <div className="evo">
          <Image width={100} height={100} src="/images/Evolução da logo.png" alt="" />
        </div>
      </div>

      <div className="text" id="text-5">
        <h1>
          <span className="text-white">Quer falar com a gente?</span>
        </h1>
      </div>

      <div className="page5">
        <div className="circle-card" id="card1"></div>
        <section className="esquerda-4">
          <div className="card" id="card-1">
            <h1>
              <span className="text-white">Email</span>
            </h1>
            <p>
              <span className="text-white text-xl">
                Para sugestões de melhoria para a plataforma ou para alguma oferta
              </span>
            </p>
            <Image width={100} height={100} src="/images/icons/whatsapp.png" alt="WhatsApp" />
          </div>
        </section>

        <section className="centro-2">
          <div className="container-circular">
            <div className="circulos">
              <div className="circulo"></div>
              <div className="circulo"></div>
              <div className="circulo"></div>
            </div>
          </div>
        </section>
        <div className="circle-card" id="card2"></div>
        <section className="direita-4">
          <div className="card" id="card-2">
            <h1>
              <span className="text-white">WhatsApp</span>
            </h1>
            <p>
              <span className="text-white text-xl">
                Para reclamações sobre outros usuários da plataforma ou dúvidas sobre o uso do site
              </span>
            </p>
            <Image width={100} height={100} src="/images/icons/whatsapp.png" alt="whatsapp" />
          </div>
        </section>
      </div>
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

function FundadoresCard({ cargo, nome, href }: { cargo: string; nome: string; href?: string }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="md:text-2xl sm:text-base text-[10px] font-bold text-center text-white">{cargo}</h1>
      <Link
        target={href ? "_blank" : "_self"}
        href={href ? href : ""}
        className="md:text-lg sm:text-xs text-[6px] font-medium text-center text-white"
      >
        {nome}
      </Link>
    </div>
  )
}

function CardContato({ title, text, children }: any) {
  return (
    <div className="w-[30%] min-h-[80%] shadow-[10px_6px_0px_0px] animate-float  shadow-white bg-[#535FFF] px-20 py-6 rounded-3xl gap-2 lg:gap-10 text-white flex flex-col items-center">
      <h1 className="text-xl font-bold text-center">{title}</h1>
      <p className="text-base h-36 text-center">{text}</p>
      {children}
    </div>
  )
}
