"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import Cronometro from "./Cronometro"
import NewsLetterButton from "./NewsLetterButton"
import FormNewsLetter from "./Form"

export default function Page() {
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <main className="w-full h-full bg-white flex flex-col items-center justify-center relative lg:p-0 p-6">
      {showForm && <FormNewsLetter closeFunction={() => setShowForm(false)} />}

      <Image
        src="/images/left-element.png"
        alt="Left"
        className="absolute left-0 top-0 h-full lg:block hidden"
        width={500}
        height={500}
      />
      <Image
        src="/images/right-element.png"
        alt="Right"
        className="absolute right-0 top-0 h-full lg:block hidden"
        width={500}
        height={500}
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold">EM BREVE, DIA 10 DE ABRIL DE 2024</h1>
        <h2 className="text-xl font-medium">Ocorrerá o lançamento da versão beta da UEZ APP</h2>
      </div>
      <Cronometro />
      <div className="flex items-center justify-center lg:w-1/2 text-center mb-6">
        <p className="text-2xl font-medium">
          Coloque abaixo seu email e entre na comunidade de whatsapp para ser avisado em primeira mão
        </p>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-around gap-10">
        <ButtonBonito icon={<Phone color="white" />} link="https://whatsapp.com/channel/0029Va9XdubIN9ixCTADeN3G">
          WhatsApp
        </ButtonBonito>
        <NewsLetterButton icon={<Mail color="white" />} onOpen={() => setShowForm(true)}>
          NewsLetter
        </NewsLetterButton>
      </div>
    </main>
  )
}

function ButtonBonito({ children, icon, link }: { children: React.ReactNode; icon: any; link: string }) {
  return (
    <Link
      href={link}
      className="flex justify-center items-center gap-3 bg-gradient-to-tr from-[#535FFF] to-[#2a14b7] transition hover:opacity-90 py-3 px-4 rounded-3xl text-white"
    >
      {icon}
      <span className="text-xl font-normal">{children}</span>
    </Link>
  )
}
