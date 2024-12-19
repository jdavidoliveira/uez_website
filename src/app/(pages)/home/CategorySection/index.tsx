import GenericSection from "@/components/layout/GenericSection"
import { CategoryCard } from "./CategoryCard"
import Image from "next/image"
import { api } from "@/lib/serverapi"
import { Category, Service } from "@/types/Service"
import { twMerge } from "tailwind-merge"

export async function CategorySection() {
  const searchOfServices = await api.get<Service[]>("/services", {
    next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
  })
  const searchOfCategories = await api.get<Category[]>("/categories", {
    next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
  })

  if (!searchOfServices.ok || !searchOfCategories.ok) return null

  const arrayOfCategoriesWithRespectiveServices = searchOfCategories.data.map((category) => ({
    category,
    services: searchOfServices.data.filter((service) => service.category.id === category.id),
  }))

  return searchOfServices.ok ? (
    <>
      <GenericSection className="relative hidden bg-primary-purple p-0 md:flex">
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
            {arrayOfCategoriesWithRespectiveServices.map((item) => (
              <CategoryCard
                key={item.category.name}
                categoryName={item.category.name}
                imagePath={`/images/icons/categorias/${item.category.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(" ", "")}-azulao.png`}
                services={item.services.map((service) => service.name)}
              />
            ))}
            {/*
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
          */}
          </div>
        </div>
      </GenericSection>
      {/* mobile */}
      <GenericSection className="relative flex bg-white p-0 md:hidden">
        <div className="flex max-w-fit flex-col items-center justify-center gap-14 px-4">
          <h1 className="text-center text-xl font-bold text-azulao">Conheça nossos serviços!</h1>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-12">
            {arrayOfCategoriesWithRespectiveServices.map((item) => (
              <div
                className="group flex flex-col items-center justify-between transition-transform duration-300"
                key={item.category.name}
              >
                <div className="flex h-full w-full flex-col items-center gap-14 rounded-xl  bg-white px-8 shadow-lg transition-transform duration-300 [perspective:1000px] [transform-style:preserve-3d] hover:scale-105 group-hover:flex group-hover:items-center group-hover:justify-center group-hover:px-0 group-hover:[transform:rotateY(180deg)] sm:px-6">
                  <Image
                    src={`/images/icons/categorias/${item.category.name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(" ", "")}-azulao.png`}
                    width={120}
                    height={120}
                    alt={item.category.name}
                    className="mt-8 w-14 group-hover:hidden"
                  />
                  <h1 className="mb-8 w-48 break-words text-center text-lg font-bold text-azulao group-hover:hidden sm:mb-14 sm:text-2xl">
                    {item.category.name}
                  </h1>
                  <ul className="hidden w-fit list-disc py-3 pl-6 transition-transform [transform:rotateY(180deg)] group-hover:block">
                    {item.services.map((service) => {
                      return (
                        <li
                          className={twMerge("break-words text-xs font-bold")}
                          key={service.id}
                          title={service.name} // Exibe o nome completo ao passar o mouse
                        >
                          {service.name.length > 50 ? `${service.name.slice(0, 47)}...` : service.name}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GenericSection>
    </>
  ) : null
}
