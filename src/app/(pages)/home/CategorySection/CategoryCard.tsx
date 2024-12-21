import Image from "next/image"
import { twMerge } from "tailwind-merge"

export const CategoryCard = ({
  categoryName,
  imagePath,
  services,
  classNameForLi,
}: {
  categoryName: string
  imagePath: string
  services: string[]
  classNameForLi?: string
}) => (
  <div className="group flex flex-col items-center justify-between transition-transform duration-300">
    <div className="flex h-full w-full flex-col items-center gap-14 rounded-xl bg-white px-8 transition-transform duration-300 [perspective:1000px] [transform-style:preserve-3d] hover:scale-105 group-hover:flex group-hover:items-center group-hover:justify-center group-hover:px-0 group-hover:[transform:rotateY(180deg)] sm:px-6">
      <Image
        src={imagePath}
        width={120}
        height={120}
        alt={categoryName}
        className="mt-8 w-20 group-hover:hidden sm:mt-14"
      />
      <h1 className="mb-8 w-48 break-words text-center text-lg font-bold text-azulao group-hover:hidden sm:mb-14 sm:text-2xl">
        {categoryName}
      </h1>
      <ul className=" hidden w-fit list-disc py-5 pl-10 transition-transform [transform:rotateY(180deg)] group-hover:block">
        {services.map((serviceName) => {
          return (
            <li
              className={twMerge("break-words text-base font-bold sm:w-48", classNameForLi)}
              key={serviceName}
              title={serviceName} // Exibe o nome completo ao passar o mouse
            >
              {serviceName.length > 50 ? `${serviceName.slice(0, 47)}...` : serviceName}
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)
