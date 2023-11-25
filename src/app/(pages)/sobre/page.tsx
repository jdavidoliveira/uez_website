import Image from "next/image";
import GenericSection from "./GenericSection";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Sobre() {
    return (
        <main className="w-full flex flex-col items-center py-10 sm:py-24">
            <GenericSection>
                <Image width={600} height={600} src="/images/padrao-elipse.png" className="absolute -z-10 -left-96 -top-80 sm:-left-72 sm:-top-72" alt="Elipse" />
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
                        description={
                            "Visamos ser conhecidos por ajudar pessoas a encontrar e mostrar suas habilidades"
                        }
                    />
                    <CardSobre
                        title={"Valores"}
                        image="/images/valores.svg"
                        description={
                            "Nós valorizamos a segurança, a confiança, a facilidade e o networking"
                        }
                    />
                </div>
            </GenericSection>
            <section className="w-full flex flex-col bg-transparent items-center justify-around gap-8">
                <h1 className="text-3xl font-bold ">Nossa equipe</h1>
                <div className="w-full md:h-144 sm:h-80 h-40 flex items-center justify-center bg-center bg-contain lg:bg-cover bg-fixed bg-no-repeat" style={{ backgroundImage: "url('/images/equipe.png')" }}>
                    <div className="grid grid-cols-5 items-center efeito-vidro p-3">
                        <FundadoresCard cargo="Designer" nome="Matheus Barros" href="https://www.linkedin.com/in/matheus-barros-846738286/" />
                        <FundadoresCard cargo="Diretor de relações" nome="Yago Estevão" href="https://www.linkedin.com/in/yago-estev%C3%A3o-509018287/" />
                        <FundadoresCard cargo="Desenvolvedor" nome="João David" href="https://github.com/lordaval" />
                        <FundadoresCard cargo="Diretor de operações" nome="Neemias Duarte" href="https://www.linkedin.com/in/neemias-duarte-81b738286/" />
                        <FundadoresCard cargo="Diretor Geral" nome="Renato Gomes" href="https://www.linkedin.com/in/renato-gomes-do-nascimento-915737286/" />
                    </div>

                    {/* <Image fill src="/images/equipe.png" className="object-cover object-center" priority alt="Equipe" /> */}
                </div>
            </section>
            <GenericSection className="flex-row w-full h-screen relative mb-24 justify-end p-0">
                <Image src="/images/pedaco1.svg" alt="Pedaço" width={500} height={500} className="absolute hidden sm:block left-0 md:top-10 top-20 h-[75%] md:h-full w-auto" />
                <div className="flex relative sm:w-4/6 flex-col gap-10 px-16">
                    <h1 className="text-3xl font-bold text-right">Nossa História</h1>
                    <p className="text-lg text-right font-bold">
                        A UEZ surgiu em 2023 de um projeto de TCC de um grupo de amigos que tinha como objetivo criar uma plataforma online. Essa plataforma tem como finalidade facilitar a vida de profissionais de diversas áreas que estão desempregados e precisam de uma fonte de renda, além de auxiliar pessoas que enfrentam problemas variados, desde um problema de encanamento até a pintura de uma casa.
                    </p>
                </div>
            </GenericSection>
            <GenericSection className="bg-center h-screen bg-cover relative bg-no-repeat p-0">
                <Image width={700} height={700} priority src="/images/pedacobg.svg" className="-z-10 sm:w-full absolute left-0" alt="Background" />
                <div className="flex w-full text-white flex-col sm:gap-10 px-16">
                    <h1 className="text-3xl font-bold text-center">Quer falar com a gente?</h1>
                    <div className="flex items-center h-96 justify-center mx-auto gap-10 w-full">
                        <CardContato title="Email" text="Para sugestões de melhoria para a plataforma ou para alguma oferta">
                            <Link href="mailto:uezcompanylog@gmail.com" target="_blank">
                                <Image src="https://logosmarcas.net/wp-content/uploads/2020/11/Gmail-Logo.png" alt="Logo do WhatsApp" width={3000} height={3000} className="w-20 hover:scale-105 transition-transform cursor-pointer" />
                            </Link>
                        </CardContato>
                        <CardContato title="Whatsapp" text="Para reclamações sobre outros usuários da plataforma ou dúvidas sobre o uso do site">
                            <Link href="https://api.whatsapp.com/send?phone=5521978783261&text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20como%20funciona%20a%20UEZ" target="_blank">
                                <Image src="https://logosmarcas.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" alt="Logo do WhatsApp" width={3000} height={3000} className="w-20 hover:scale-105 transition-transform cursor-pointer" />
                            </Link>
                        </CardContato>
                    </div>
                </div>
            </GenericSection>
            <GenericSection className="relative sm:p-10 p-3 mt-52">
                <Image width={600} height={600} src="/images/padrao-elipse.png" className="absolute -z-20 -left-96 -top-80 sm:-left-72 sm:-top-72" alt="Elipse" />
                <h1 className="text-3xl w-4/6 mx-auto text-center font-bold">Abaixo está um vídeo explicando um pouco mais sobre a nossa essência</h1>
                <div className="w-10/12 aspect-video flex items-center justify-center border-[36px] rounded-3xl border-[#535FFF] bg-[#535FFF]">
                    <iframe className="w-full h-full rounded-3xl" src="https://www.youtube.com/embed/cO8slfj93rE?si=l5g9OVHCgsU9C0tO" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </GenericSection>
            {/* <GenericSection>
                <h1 className="text-3xl font-bold text-center">Como funciona?</h1>
                <p className="text-lg text-center">
                    Nós temos como objetivo unir pessoas que precisam de algum serviço e
                    pessoas que têm algum talento ou habilidade.
                </p>
            </GenericSection>
            <GenericSection>
                <h1 className="text-3xl font-bold">Exemplo</h1>
                <p className="text-lg text-center">
                    Digamos que a pia do seu banheiro está vazando, você não sabe a
                    maneira correta de consertar e não conhece nenhum profissinal que
                    saiba. Você entra no nosso site, faz um cadastro e nós te
                    mostraremos os profissionais que podem te ajudar. Nesse caso você
                    é o que chamamos de <b>Cliente</b>.
                </p>
            </GenericSection>
            <GenericSection>
                <p className="text-lg text-center">
                    Agora imagine que você acabou de completar um curso de encanamento,
                    porém você tem dificuldade de arrumar clientes. Nesse caso você pode ser o
                    que chamamos de “Uzer” com “z” mesmo, referindo-se ao nome da
                    empresa.
                </p>
            </GenericSection> */}
        </main>
    );
}

function CardSobre({ title, image, description }: { title: string, image: string, description: string }) {
    return (
        <div className="w-[45%] h-full flex flex-col items-center gap-12 mobile:w-full">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            <Image width={200} height={200} className="w-[30%] h-[30%] animate-float" src={image} alt="Imagem ilustrativa" />
            <p className="text-base font-medium text-center w-[90%]">{description}</p>
        </div>
    )
}

function FundadoresCard({ cargo, nome, href }: { cargo: string, nome: string, href?: string }) {
    return (
        <div className="flex flex-col items-center">
            <h1 className="md:text-2xl sm:text-base text-[10px] font-bold text-center text-white">{cargo}</h1>
            <Link target={href ? "_blank" : "_self"} href={href ? href : ""} className="md:text-lg sm:text-xs text-[6px] font-medium text-center text-white">{nome}</Link>
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
