import GenericSection from "@/components/layout/GenericSection"
import { CategoryCard } from "./CategoryCard"
import Image from "next/image"
import { api } from "@/lib/serverapi"
import { Category, Service } from "@/types/Service"

export async function CategorySection() {
  const searchOfServices = await api.get<Service[]>("/services", {
    revalidate: 60 * 60 * 24 * 1, // 1 day in seconds
  })
  const searchOfCategories = await api.get<Category[]>("/categories", {
    revalidate: 60 * 60 * 24 * 1, // 1 day in seconds
  })

  const arrayOfCategoriesWithRespectiveServices = searchOfCategories.data.map((category) => ({
    category,
    services: searchOfServices.data.filter((service) => service.category.id === category.id),
  }))

  return searchOfServices.ok ? (
    <GenericSection className="relative bg-primary-purple p-0">
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
  ) : null
}
