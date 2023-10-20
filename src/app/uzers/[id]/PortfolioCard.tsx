import Image from "next/image";
import { FileUp } from "lucide-react";

export default function PortfolioCard({ image, isBanner }: { image: string, isBanner?: boolean }) {
    return (
        <div title="Ver projeto" className={`${isBanner ? "w-full" : "w-44"} h-44 flex items-center justify-center bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition group relative`}>
            <Image fill src={image} className="group-hover:opacity-30 transition object-cover object-center rounded-xl" alt="Imagem ilustrativa" />
            <FileUp size={42} className="hidden z-40 group-hover:block transition" color="#00003a" fill="#00000000" />
        </div>
    )
}