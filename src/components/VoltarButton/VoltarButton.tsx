"use client"
import { ChevronLeftIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function VoltarButton() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()} className="fixed z-50 left-14 top-8 text-base font-bold px-2 bg-azulao hover:bg-roxazul rounded-xl text-white flex items-center justify-center mobile:bottom-8  mobile:right-7 mobile:top-auto mobile:left-auto mobile:rounded-full ">
            <ChevronLeftIcon width={20} height={20} />
            <span className="p-2">
                Voltar
            </span>
        </button>
    )
}
