"use client"

import { useState } from "react"

interface ConfirmModalProps {
    title?: string
    label?: string
    valueSetter?: any
    prevValue?: string
    closeButtonFunction: () => void
    type?: "url" | "text" | "image"
}
export default function ConfirmModal({ title = "Escolha um", label = "Digite aqui:", valueSetter, closeButtonFunction, type, prevValue }: ConfirmModalProps) {

    const confirmButtonFunction = () => {
        if (type === "url") valueSetter(text?.includes("https://") ? text : `https://${text}`)
        else if (type === "image") {
            valueSetter(image)
        }
        else valueSetter(text)
        closeButtonFunction()
    }

    const [text, setText] = useState(prevValue)
    const [image, setImage] = useState<File | null>(null)

    switch (type) {
        case "image":
            return (
                <div className='fixed z-40 w-full h-full flex items-center justify-center bg-black/70'>
                    <div className='bg-white lg:w-1/2 w-10/12 sm:h-1/2 h-4/6 flex items-center justify-center rounded-xl'>
                        <div className='sm:px-20 px-10 flex flex-col items-start gap-2 w-full mt-10'>
                            <h1 className='text-2xl font-bold text-center'>{title}</h1>
                            <label htmlFor="texto">{label}</label>
                            <input type="file" id="arquivo" accept="image/*" onChange={(file) => setImage(file.target.files![0])} className='border w-full h-14 text-xl p-2' />
                            <div className="w-full flex items-center sm:justify-end justify-around gap-2 mt-16">
                                <button onClick={closeButtonFunction} className="bg-white border h-14 text-black py-2 px-3 rounded-lg font-bold text-xl">Cancelar</button>
                                <button onClick={confirmButtonFunction} className="bg-emerald-600 h-14 text-white py-2 px-6 rounded-lg font-bold text-xl">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            break;
        default:
            return (
                <div className='fixed z-40 w-full h-full flex items-center justify-center bg-black/70'>
                    <div className='bg-white w-1/2 h-1/2 flex items-center justify-center rounded-xl'>
                        <div className='px-20 flex flex-col items-start gap-2 w-full mt-10'>
                            <h1 className='text-2xl font-bold text-center'>{title}</h1>
                            <label htmlFor="texto">{label}</label>
                            <input type="text" id="texto" value={text} onChange={(e) => setText(e.target.value)} className='border w-full h-14 text-xl p-2' />
                            <div className="w-full flex items-center justify-end gap-2 mt-16">
                                <button onClick={closeButtonFunction} className="bg-white border h-14 text-black py-2 px-3 rounded-lg font-bold text-xl">Cancelar</button>
                                <button onClick={confirmButtonFunction} className="bg-emerald-600 h-14 text-white py-2 px-3 rounded-lg font-bold text-xl">Alterar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }


}
