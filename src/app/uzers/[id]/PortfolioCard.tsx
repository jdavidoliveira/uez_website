"use client"

import Image from "next/image";
import { FileUp, Pencil, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function PortfolioCard({ image, isBanner, editMode = false }: { image: string, isBanner?: boolean, editMode?: boolean }) {
    return !editMode ? (
        <div
            title="Ver projeto"
            className={twMerge(`w-44 h-44 flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition group relative cursor-pointer`, isBanner && "w-full cursor-default")}
            onClick={() => {
                alert("Ver projeto")
            }}
        >
            <Image
                fill
                src={image}
                className={twMerge("group-hover:opacity-60 transition object-cover object-center rounded-xl", isBanner && "group-hover:opacity-100")} alt="Imagem ilustrativa"
            />
            {!isBanner && (
                <>
                    {/* <Search
                        size={42}
                        className="hidden z-40 group-hover:block transition" color="#00003a" fill="#00000000"
                    /> */}
                    <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">Ver projeto</h1>
                </>
            )}
        </div>
    ) : (
        <div
            title="Editar projeto"
            className={`${isBanner ? "w-full" : "w-44"} h-44 flex items-center justify-center bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition group relative cursor-pointer`}
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

