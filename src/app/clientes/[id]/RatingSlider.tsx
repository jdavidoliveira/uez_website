"use client"

import { IndianRupee } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
    setter: any
    value: number | string
}

export default function RatingSlider({ value, setter }: Props) {

    const roundedRating = Math.floor(Number(value))

    const stars: string[] = []

    for (let i = 0; i < roundedRating; i++) {
        stars.push(
            "filled"
        );
    }

    // Adicione estrelas vazias (se houver uma parte fracionária)
    if (value !== roundedRating) {
        stars.push(
            "half"
        );
    }

    // Adicione estrelas vazias restantes
    for (let i = stars.length; i < 5; i++) {
        stars.push(
            "empty"
        );
    }

    return (
        <div className='flex w-full items-center justify-center gap-2'>
            {stars.map((type, index) => (<StarButton type={type} position={Number(index) + 1} key={index} />))}
        </div>
    )

    function StarButton({ type, position }: { type: "filled" | "empty" | "half" | string, position: number }) {

        function setRate() {
            if (position === roundedRating) {
                setter(position - 0.5)
            } else {
                setter(position)
            }
        }

        return (
            <button
                className='flex items-center justify-center hover:opacity-70 active:opacity-70'
                title='Clique para avaliar'
                onClick={setRate}
            >
                <Image
                    className="flex-1 max-w-[50px]"
                    src={`/images/icons/estrela-${type === "filled" ? "inteira" : (type === "empty" ? "vazia" : "metade")}.png`}
                    width={200}
                    height={200}
                    alt='Estrela de avaliação'
                />
            </button>

        )
    }
}

