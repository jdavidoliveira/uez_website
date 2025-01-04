import Rating from "@/components/layout/Rating"
import Image from "next/image"

interface UezerCardProps {
  imageUrl: string
  profession: string
  username: string
  speciality: string
  name: string
}

export function UezerCard({ profession, imageUrl, username, speciality, name }: UezerCardProps) {
  return (
    <div className="flex w-full min-w-[39%] items-center justify-between gap-5 rounded-3xl border border-black/20 bg-white py-8 pl-10 pr-4 shadow-lg">
      <div className="flex h-full items-center justify-center">
        <Image
          src={imageUrl}
          alt="profile"
          width={200}
          height={200}
          className="aspect-square w-28 rounded-full bg-slate-300"
        />
      </div>
      <div className="flex h-full flex-col justify-center">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h2 className="-mt-1 text-lg font-light">@{username}</h2>
        <Rating rating={4.7} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold">34</h1>
          <p className="text-center text-sm">Pedidos Realizados</p>
        </div>
        <div className="flex w-fit items-center justify-center gap-2 rounded-lg px-3 py-2">
          <Image
            src="/images/icons/categorias/programacao.png"
            width={120}
            height={120}
            alt={profession}
            className="w-6 invert"
          />
          <span className="text-center text-sm font-medium text-black">{speciality}</span>
        </div>
      </div>
    </div>
  )
}
