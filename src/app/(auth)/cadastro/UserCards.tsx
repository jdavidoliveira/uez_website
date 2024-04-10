"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { twMerge } from "tailwind-merge"

interface UserCardsProps {
  setUserType: any
  userType: "CLIENTE" | "UZER" | "null" | string
  setZodUserType: any
}

export default function UserCards({ setUserType, userType, setZodUserType }: UserCardsProps) {
  function selecionar(tipo: string) {
    if (tipo === "CLIENTE") {
      setUserType("CLIENTE")
      setZodUserType("userType", "CLIENTE")
      setSelected1(" border-4 border-white")
      setSelected2("")
    } else if (tipo === "UZER") {
      setUserType("UZER")
      setZodUserType("userType", "UZER")
      setSelected2(" border-4 border-white")
      setSelected1("")
    } else return
  }

  const [selected1class, setSelected1] = useState("")
  const [selected2class, setSelected2] = useState("")

  useEffect(() => selecionar(userType), [])

  return (
    <div className="max-w-4xl w-fit flex items-center gap-6 justify-between mx-auto mb-0 mt-10 animate-transitionX">
      <div className="relative">
        <div className="bg-primary-blue absolute -top-6 -left-6 w-32 h-32 rounded-br-full"></div>
        <div
          className={twMerge(
            "relative bg-primary-purple text-white cursor-pointer rounded-2xl rounded-tl-none duration-75 px-6 py-6 flex flex-col items-center justify-around hover:scale-105",
            selected1class
          )}
          onClick={() => selecionar("CLIENTE")}
          title="Peça serviços para Uzers da nossa plataforma, de forma gratuita,
        rápida e eficiente."
        >
          <Image
            src="/images/icons/CLIENTE-icons8.png"
            alt="Imagem ilustrativa do CLIENTE"
            width={125}
            height={125}
            className="w-20 h-full"
          />
          <h2 className="mx-auto text-2xl font-semibold">Cliente</h2>
          {/* <p className="text-xs text-center my-2 mx-0 mobile:text-[0.6rem] mobile:leading-none p-0 grow">
            Peça serviços para Uzers da nossa plataforma, de forma gratuita, rápida e eficiente.
          </p> */}
        </div>
      </div>
      <div className="relative">
        <div className="bg-primary-blue absolute -bottom-6 -right-6 w-32 h-32 rounded-tl-full"></div>
        <div
          className={twMerge(
            "relative bg-primary-purple text-white cursor-pointer rounded-2xl rounded-br-none duration-75 px-6 py-6 flex flex-col items-center justify-around hover:scale-105",
            selected2class
          )}
          onClick={() => selecionar("UZER")}
          title="Peça serviços para Uzers da nossa plataforma, de forma gratuita,
        rápida e eficiente."
        >
          <Image
            src="/images/icons/UZER-icons8.png"
            alt="Imagem ilustrativa do UZER"
            width={125}
            height={125}
            className="w-20 h-full"
          />
          <h2 className="px-4 text-2xl font-semibold">Uzer</h2>
          {/* <p className="text-xs text-center my-2 mx-0 mobile:text-[0.6rem] mobile:leading-none p-0 grow">
            Peça serviços para Uzers da nossa plataforma, de forma gratuita, rápida e eficiente.
          </p> */}
        </div>
      </div>
    </div>
  )
}
