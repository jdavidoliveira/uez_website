import styles from "./Sobre.module.css";
import Image from "next/image";

export default function Sobre() {
    return (
        <main className={styles.main}>
            <GenericSection>
                <h1>Como funciona?</h1>
                <p>
                    Nós temos como objetivo unir pessoas que precisam de algum serviço e
                    pessoas que têm algum talento ou habilidade.
                </p>
            </GenericSection>
            <GenericSection>
                <h1>Exemplo</h1>
                <p>
                    Digamos que a pia do seu banheiro está vazando, você não sabe a
                    maneira correta de consertar e não conhece nenhum profissinal que
                    saiba, você entra no nosso site, faz um cadastro e nós te
                    amostraremos os profissionais que possam te ajudar. Nesse caso você
                    é o que chamamos de <b>Clientes</b>.
                </p>
            </GenericSection>
            <GenericSection>
                <p>
                    Agora imagine que você acabou de completar um curso de encanamento,
                    porém você tem dificuldade de arrumar clientes. Nesse caso você é o
                    que chamamos de “Uzer” com “z” mesmo, se referindo ao nome da
                    empresa.
                </p>
            </GenericSection>
            <GenericSection>
                <h1>Sobre Nós</h1>
                <div className={styles.cardsSobre}>
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
            <GenericSection>
                <h1>Teste</h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
                    temporibus esse voluptate quia libero facere laborum pariatur
                    laboriosam quod excepturi possimus, illo quidem. Saepe deserunt
                    neque perferendis. Quisquam, sint aut!
                </p>
            </GenericSection>
        </main>
    );
}

const GenericSection = ({ children }: { children: React.ReactNode }) => (
    <section className={styles.section}>{children}</section>
);

function CardSobre({title, image, description}: {title: string, image: string, description: string}) {
    return (
        <div className="w-[45%] h-full flex flex-col items-center gap-12 mobile:w-full">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            <Image width={200} height={200} className="w-[30%] h-[30%]" src={image} alt="Imagem ilustrativa" />
            <p className="text-lg font-bold text-center w-[90%]">{description}</p>
        </div>
    )
}