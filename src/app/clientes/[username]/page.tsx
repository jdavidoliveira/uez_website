import { options } from "@/app/api/auth/[...nextauth]/options";
import ReturnButton from "@/components/layout/buttons/Return";
import { User } from "@/types/raw/User";
import { CalendarDaysIcon, Pencil, Megaphone, Award, BarChart3 } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { STATUS, USERTYPE } from "@/types/enums";

type Props = {
  params: { username: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  // Dados mockados
  const mockData: User = {
    id: "1",
    name: "Cliente Mockado",
    username: "mock_user",
    image: "/path/to/default-image.jpg",
    bio: "Essa é uma bio mockada para fins de teste.",
    created_at: new Date("2023-01-01"),
    completed_orders_amount: 10,
    rating: 4.8,
    email: "",
    usertype: USERTYPE.BOTH,
    status: STATUS.ACTIVE,
    birth_date: "",
    ratings: [],
    owner_orders: [],
    assigned_orders: [],
    chats: [],
    notifications: []
  };

  return {
    title: `${mockData.name} - Cliente`,
  };
}

export default async function Page({ params: { username } }: Props) {
  const session = await getServerSession(options);

  // Mock de dados do cliente
  const clientData: User = {
    id: "1",
    name: "Cliente Mockado",
    username: "mock_user",
    image: "https://picsum.photos/seed/picsum/1800",
    bio: "Sou o joão David, sei dar mortal e programar e montar cudo mágico e tocar escaleta e lutar jiu jipso, passo muita manteiga no pão e coloco muito sal na salada, trabalho no loide de primavera, estudo análise e desenvolvimento de sistemas e sou CTO da UEZ Company.",
    created_at: new Date("2024-12-12"),
    completed_orders_amount: 10,
    rating: 4.8,
    email: "",
    usertype: USERTYPE.BOTH,
    status: STATUS.ACTIVE,
    birth_date: "",
    ratings: [],
    owner_orders: [],
    assigned_orders: [],
    chats: [],
    notifications: []
  };

  // Mock de dados do portfólio
  const portfolioData = [
    { id: "1", imagemUrl: "https://picsum.photos/seed/picsum/200/300.jpg" },
    { id: "2", imagemUrl: "https://picsum.photos/seed/picsum/200/300" },
    { id: "3", imagemUrl: "https://picsum.photos/seed/200/300" },
  ];

  const created_at = new Date(clientData.created_at).toLocaleDateString("pt-BR");

  const isOwner = clientData.id === session?.user.id;

  return (
    <main className="relative min-h-screen w-full bg-white">
      <ReturnButton classname="fixed top-10 left-10 z-50" />
    <section className="relative w-full">
      <div className="relative h-96 w-full group">
        <Image
          src={clientData.image ?? "/path/to/default-image.jpg"} // Imagem padrão, se necessário
          alt="profile banner"
          fill
          className="object-cover transition duration-300 group-hover:brightness-50"
        />
        <button className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 transform-gpu">
          <Pencil className="text-white" size={30} />
          <p className="mt-2 text-white text-lg font-semibold">Editar</p>
        </button>
      </div>
    <div className="absolute -bottom-64 left-1/2 flex w-10/12 -translate-x-1/2 flex-col items-center justify-center gap-5 md:left-[10%] md:mx-auto md:w-auto md:-translate-x-0"> 
    <div className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-md">
      <div className="relative flex h-full w-full items-center justify-center rounded-full overflow-hidden">
        <div className="relative h-full w-full rounded-full bg-white p-[15px] md:p-[15px]">
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <Image
              src={clientData.image ?? "/path/to/default-image.jpg"} // Imagem padrão, se necessário
              alt="profile"
              fill
              className="rounded-full object-cover transition duration-300 group-hover:brightness-75"
            />
          </div>
        </div>
      </div>
    <button className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 transform-gpu">
      <Pencil className="text-white" size={25} />
      <p className="mt-2 text-white text-sm font-semibold">Editar</p>
    </button>
  </div>

    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">{clientData.name}</h1>
      <h2 className="text-lg">@{clientData.username}</h2>
      <div className="mt-9 grid grid-cols-3 gap-5 md:gap-0">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl font-bold">{clientData.completed_orders_amount ?? 0}</h1>
          <h2 className="text-center text-lg font-medium">Pedidos realizados</h2>
        </div>
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl font-bold">{clientData.rating.toFixed(1)}</h1>
          <h2 className="text-center text-lg font-medium">Avaliação</h2>
        </div>
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl font-bold">4</h1>
          <h2 className="text-center text-lg font-medium">Serviços fechados</h2>
        </div>
      </div>
    </div>
  </div>
  </section>

      <section className="relative mt-20 h-56 w-full px-20 md:grid md:grid-cols-2">
        <div className="mt-80 flex flex-col gap-2 pb-20 md:mt-60">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">Sobre mim</h1>
              <button className="text-gray-600 hover:text-gray-900">
                <Pencil size={20} />
              </button>
            </div>
            <p className="text-xl font-normal">{clientData.bio}</p>
            <hr className="w-full" />
          </div>

          <h1 className="text-2xl font-semibold py-3 pl-4">Serviços anteriores</h1>
          <div className="relative flex items-center gap-6 overflow-x-auto md:ml-[20px]">
            {portfolioData.map((portfolio, index) => (
              <div
                key={portfolio.id}
                className={`shrink-0 ${index === 0 ? "relative z-10" : "relative"}`}
              >
                <PortfolioCard image={portfolio.imagemUrl} isActive={index !== 0} />
              </div>
            ))}
          </div>
          <hr className="w-full"/>

          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-2xl font-semibold">Outras informações</h1>
            <ul className="flex flex-col gap-6 pl-4">
              <li className="flex items-center justify-start gap-4">
                <CalendarDaysIcon size={40} />
                <span className="text-xl font-normal">
                  Entrou em <strong className="font-bold">{created_at}</strong>
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <BarChart3 size={40} />
                <span className="text-xl font-normal">
                  Fecha com <strong className="font-bold">77%</strong> dos uzers que contata
                </span>
              </li>
              <li className="flex items-center justify-start gap-4">
                <Award size={40} />
                <span className="text-xl font-normal">
                  Bom pagador
                </span>
              </li>
            </ul>
            <hr className="w-full"/>
          </div>
        </div>
              
        <div className="flex flex-col items-center gap-2">
          <div className="mb-20 flex flex-col items-center justify-between gap-10 md:mb-0 ">
          <div className="relative flex justify-end w-full pb-32">
            <button className="relative pl-20 pr-20 z-10 rounded-xl bg-blue-600 px-4 py-2 text-white">
              Tornar-se uzer
            </button>
          </div>

          <h1 className="text-3xl font-semibold">Solicitações</h1>
          <div className="flex flex-col gap-2 md:gap-6 md:mx-20">
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border">
              <div>
                <h3 className="font-bold text-sm">Criação de copy para produtos de dropshipping</h3>
                <p className="text-gray-500 text-sm pb-4">Copywriter</p>
                <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mt-1 inline-flex items-center">
                  <Megaphone size={18} className="mr-1" />
                  Social media
                </span>
              </div>
              <div className="flex mt-16 gap-2">
                <span className="font-semibold text-gray-700">R$ 20,00</span>
                <button className="text-gray-600 hover:text-gray-900">
                  <Pencil size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border">
              <div>
                <h3 className="font-bold text-sm">Criação de copy para produtos de dropshipping</h3>
                <p className="text-gray-500 text-sm pb-4">Copywriter</p>
                <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mt-1 inline-flex items-center">
                  <Megaphone size={18} className="mr-1" />
                  Social media
                </span>
              </div>
              <div className="flex mt-16 gap-2">
                <span className="font-semibold text-gray-700">R$ 20,00</span>
                <button className="text-gray-600 hover:text-gray-900">
                  <Pencil size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border">
              <div>
                <h3 className="font-bold text-sm">Criação de copy para produtos de dropshipping</h3>
                <p className="text-gray-500 text-sm pb-4">Copywriter</p>
                <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mt-1 inline-flex items-center">
                  <Megaphone size={18} className="mr-1" />
                  Social media
                </span>
              </div>
              <div className="flex mt-16 gap-2">
                <span className="font-semibold text-gray-700">R$ 20,00</span>
                <button className="text-gray-600 hover:text-gray-900">
                  <Pencil size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border">
              <div>
                <h3 className="font-bold text-sm">Criação de copy para produtos de dropshipping</h3>
                <p className="text-gray-500 text-sm pb-4">Copywriter</p>
                <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mt-1 inline-flex items-center">
                  <Megaphone size={18} className="mr-1" />
                  Social media
                </span>
              </div>
              <div className="flex mt-16 gap-2">
                <span className="font-semibold text-gray-700">R$ 20,00</span>
                <button className="text-gray-600 hover:text-gray-900">
                  <Pencil size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border">
              <div>
                <h3 className="font-bold text-sm">Criação de copy para produtos de dropshipping</h3>
                <p className="text-gray-500 text-sm pb-4">Copywriter</p>
                <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mt-1 inline-flex items-center">
                  <Megaphone size={18} className="mr-1" />
                  Social media
                </span>
              </div>
              <div className="flex mt-16 gap-2">
                <span className="font-semibold text-gray-700">R$ 20,00</span>
                <button className="text-gray-600 hover:text-gray-900">
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </section>
    </main>
  );
}
       
function PortfolioCard({ image, isActive }: { image: string; isActive?: boolean }) {
  return (
    <div
      className={`group relative flex aspect-square w-72 flex-col justify-center rounded-lg ${
        isActive ? "opacity-100" : "opacity-100"
      } hover:cursor-pointer transition-all`}
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt="portfolio"
          fill
          className={`rounded-lg object-cover`}
        />
      </div>
      <div className="absolute bottom-0 h-1/5 w-full rounded-b-lg bg-white p-2">
        <h3 className="text-sm font-medium text-gray-600">Logo da padaria</h3>
        <p className="text-xs text-gray-400">Criação de logo</p>
      </div>
    </div>
  );
}

