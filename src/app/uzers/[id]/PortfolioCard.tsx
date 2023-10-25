"use client"

import Image from "next/image";
import { FileUp, Pencil, Search } from "lucide-react";

interface PortfolioCardProps {
    image: string,
    title: string,
    description: string,
    editMode?: boolean,
}

export default function PortfolioCard({ image, editMode = false, title, description }: PortfolioCardProps) {
    return !editMode ? (
        <div
            title="Ver projeto"
            className="aspect-square flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition group relative cursor-pointer"
            onClick={() => {
                alert("Ver projeto")
            }}
        >
            <Image
                fill
                src={image}
                className="group-hover:opacity-60 transition object-cover object-center rounded-xl" alt="Imagem ilustrativa"
            />
            <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">Ver projeto</h1>
        </div>
    ) : (
        <div
            title="Editar projeto"
            className={`aspect-square flex items-center justify-center bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition group relative cursor-pointer`}
            onClick={() => {
                alert("Editar")
            }}
        >
            <Image
                fill
                src={image}
                className="group-hover:opacity-30 transition object-cover object-center rounded-xl" alt="Imagem ilustrativa"
            />
            <Pencil
                size={42}
                className="hidden z-40 group-hover:block transition" color="#00003a" fill="#00000000"
            />
        </div>
    )
}

