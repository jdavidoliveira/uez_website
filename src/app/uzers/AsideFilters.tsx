"use client"

import Input from '@/components/Forms/Input/Input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

interface AsideFiltersProps {
    setIsOnline: (prevState: any) => void
    setIsPresencial: (prevState: any) => void
    setNome: (prevState: any) => void
    setCargo: (prevState: any) => void
    isOnline: boolean
    isPresencial: boolean
    nome: string
    cargo: string
}
export default function AsideFilters({setCargo, setIsOnline ,setIsPresencial ,setNome, isOnline, cargo, isPresencial, nome}: AsideFiltersProps) {

    const { push: pushRoute } = useRouter()

    return (
        <aside className="w-3/12 h-full flex flex-col gap-4 p-2 items-center mobile:w-full desktop:w-4/12">
            <form className="flex flex-col w-full items-center gap-4">
                <h3 className="font-medium text-center">Qual profissional você procura?</h3>
                <div className="flex w-full max-w-[350px] items-center justify-around gap-2 desktop:flex-col">
                    <div className="flex items-center justify-center gap-1">
                        <Input
                            type={"checkbox"}
                            id="online"
                            noLabel
                            label={"Online"}
                            handleChange={(e: any) => setIsOnline((prevState: any) => !prevState)}
                            value={isOnline}
                        />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <Input
                            type={"checkbox"}
                            id="presencial"
                            label={"Presencial"}
                            noLabel
                            handleChange={(e: any) => setIsPresencial((prevState: any) => !prevState)}
                            value={isPresencial}
                        />
                        <label htmlFor="presencial">Presencial</label>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="cargo" title="Cargo" className="self-start text-base font-medium">
                        Cargo:
                    </label>
                    <div className="flex items-center w-full h-10">
                        <input
                            className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none`}
                            type="text"
                            id="cargo"
                            maxLength={200}
                            placeholder="Ex: Designer"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                        />
                        <button
                            title="Buscar"
                            type="button"
                            className="bg-cinzero hover:bg-[#e9e9e9] border-none py-2 px-3 h-full cursor-pointer flex items-center justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <MagnifyingGlassIcon width={20} height={20} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="nome" title="Nome" className="self-start text-base font-medium">
                        Nome:
                    </label>
                    <div className="flex items-center w-full h-10">
                        <input
                            className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none`}
                            type="text"
                            id="nome"
                            maxLength={200}
                            placeholder="Ex: Fulano de tal"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <button
                            title="Buscar"
                            type="button"
                            className="bg-cinzero hover:bg-[#e9e9e9] border-none py-2 px-3 h-full cursor-pointer flex items-center justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <MagnifyingGlassIcon width={20} height={20} />
                        </button>
                    </div>
                </div>
            </form>
        </aside>
    )
}
