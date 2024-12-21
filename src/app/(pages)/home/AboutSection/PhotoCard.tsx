import Image from "next/image"
import { twMerge } from "tailwind-merge"

export const PhotoCard = ({
  imageUrl,
  title,
  description,
  imageClassName,
  className,
  descriptionClassName,
}: {
  imageUrl: string
  title: string
  description: string
  imageClassName?: string
  descriptionClassName?: string
  className?: string
}) => (
  <div
    className={twMerge(
      "flex w-6/12 flex-col items-center justify-between gap-2 transition duration-300 hover:scale-105 hover:animate-none hover:duration-300",
      className,
    )}
  >
    <Image
      className={twMerge("w-2/12", imageClassName)}
      width={120}
      height={120}
      src={imageUrl}
      alt="Imagem ilustrativa"
    />
    <h2 className="text-center text-4xl font-normal">{title}</h2>
    <p className={twMerge("w-8/12 text-center text-sm font-medium leading-tight", descriptionClassName)}>
      {description}
    </p>
  </div>
)
