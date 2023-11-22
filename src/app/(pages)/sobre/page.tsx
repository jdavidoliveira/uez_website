import Image from "next/image";
import GenericSection from "./GenericSection";

export default function Sobre() {
    return (
        <main className="w-full flex flex-col items-center py-10 sm:py-24 gap-20">
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
                <div className="w-full h-144 flex items-center justify-center bg-center bg-contain lg:bg-cover bg-fixed bg-no-repeat" style={{ backgroundImage: "url('/images/equipe.png')" }}>
                    <div className="grid grid-cols-5 items-center efeito-vidro p-3">
                        <FundadoresCard cargo="Designer" nome="Matheus Barros" />
                        <FundadoresCard cargo="Diretor de relações" nome="Yago Estevão" />
                        <FundadoresCard cargo="Desenvolvedor" nome="João David" />
                        <FundadoresCard cargo="Diretor de operações" nome="Neemias Duarte" />
                        <FundadoresCard cargo="Diretor Geral" nome="Renato Gomes" />
                    </div>

                    {/* <Image fill src="/images/equipe.png" className="object-cover object-center" priority alt="Equipe" /> */}
                </div>
            </section>
            <GenericSection>
                <h1 className="text-3xl font-bold">Como funciona?</h1>
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
            </GenericSection>
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

function FundadoresCard({ cargo, nome }: { cargo: string, nome: string }) {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center text-white">{cargo}</h1>
            <h2 className="text-lg font-medium text-center text-white">{nome}</h2>
        </div>
    )
}