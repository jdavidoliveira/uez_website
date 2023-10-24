"use client"

import { useState } from "react"

interface ConfirmModalProps {
    title?: string
    label?: string
    valueSetter?: any
    closeButtonFunction: () => void
}
export default function ConfirmModal({ title = "Escolha um", label = "Digite aqui:", valueSetter, closeButtonFunction }: ConfirmModalProps) {

    const confirmButtonFunction = () => {
        valueSetter(text)
        closeButtonFunction()
    }
    
    const [text, setText] = useState("")
    
    return (
        <div className='fixed z-40 w-full h-full flex items-center justify-center bg-black/70'>
            <div className='bg-white w-1/2 h-1/2 flex items-center justify-center rounded-xl'>
                <div className='px-20 flex flex-col items-start gap-2 w-full'>
                    <h1 className='text-2xl font-bold text-center'>{title}</h1>
                    <label htmlFor="texto">{label}</label>
                    <input type="text" id="texto" value={text} onChange={(e) => setText(e.target.value)} className='border w-full h-14 text-xl p-2' />
                    <div className="w-full flex items-center justify-end gap-2 mt-16 -mb-16">
                        <button onClick={closeButtonFunction} className="bg-white border h-14 text-black py-2 px-3 rounded-lg font-bold text-xl">Cancelar</button>
                        <button onClick={confirmButtonFunction} className="bg-emerald-600 h-14 text-white py-2 px-3 rounded-lg font-bold text-xl">Alterar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
