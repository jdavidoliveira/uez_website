"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import Cronometro from "./Cronometro"
import FormNewsLetter from "./Form"
import { redirect, usePathname } from "next/navigation"

export default function Page() {
  const pathname = usePathname()
  const [showForm, setShowForm] = useState<boolean>(false)
  if (pathname !== "/") return redirect("/")

  return (
    <main className="w-full h-full bg-white flex flex-col items-center justify-center relative lg:p-0 p-6">
      {showForm && <FormNewsLetter closeFunction={() => setShowForm(false)} />}

      <Image
        src="/images/left-element.png"
        alt="Left"
        className="absolute left-0 top-0 h-full lg:block hidden"
        width={469}
        height={1080}
      />
      <Image
        src="/logo.svg"
        alt="Logo"
        className="absolute left-14 bottom-11 lg:block hidden w-64 h-64 invert"
        width={514}
        height={514}
      />
      <Image
        src="/images/right-element.png"
        alt="Right"
        className="absolute right-0 top-0 h-full lg:block hidden"
        width={514}
        height={1080}
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold">EM BREVE, DIA 10 DE ABRIL DE 2024</h1>
        <h2 className="text-xl font-medium">Ocorrerá o lançamento da versão beta da UEZ</h2>
      </div>
      <Cronometro />
      <div className="flex items-center justify-center lg:w-1/2 text-center mb-6">
        <p className="text-2xl font-medium text-center">
          Entre no nosso canal do whatsapp para ser avisado em primeira mão!
        </p>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-around gap-10">
        <ButtonBonito
          icon={<Image src="/images/icons/whatsapp.png" width={40} height={40} className="w-8 h-8" alt="Whatsapp" />}
          link="https://whatsapp.com/channel/0029Va9XdubIN9ixCTADeN3G"
        >
          Canal
        </ButtonBonito>
        {/* <NewsLetterButton icon={<Mail color="white" />} onOpen={() => setShowForm(true)}>
          NewsLetter
        </NewsLetterButton> */}
      </div>
      <div className="flex flex-col items-center justify-around gap-4 mt-16">
        <h1 className="text-2xl font-bold mx-auto text-roxazul">REDES SOCIAIS</h1>
        <div className="flex justify-center items-center gap-5">
          <LinkSocial icon="/images/icons/instagram.png" link="https://instagram.com/uez_company" alt="Instagram" />
          <LinkSocial icon="/images/icons/facebook.png" link="https://www.facebook.com/uezco/" alt="Facebook" />
          <LinkSocial icon="/images/icons/youtube.png" link="https://www.youtube.com/@UezCompany" alt="YouTube" />
          <LinkSocial icon="/images/icons/tiktok.png" link="https://www.tiktok.com/@uezcompany" alt="Tik Tok" />
          <LinkSocial icon="/images/icons/pinterest.png" link="https://br.pinterest.com/uezcompany/" alt="Pinterest" />
        </div>
      </div>
    </main>
  )
}

function ButtonBonito({ children, icon, link }: { children: React.ReactNode; icon: any; link: string }) {
  return (
    <Link
      href={link}
      className="flex justify-center items-center gap-3 bg-gradient-to-tr from-[#535FFF] to-[#2a14b7] transition hover:opacity-90 py-3 px-8 rounded-3xl text-white"
    >
      {icon}
      <span className="text-xl font-normal text-center">{children}</span>
    </Link>
  )
}

function LinkSocial({ icon, link, alt }: { icon: string; link: string; alt: string }) {
  return (
    <Link href={link} className="w-10 h-10 hover:scale-105" title={alt} target="_blank">
      <Image src={icon} width={100} height={100} className="w-full" alt={alt} />
    </Link>
  )
}
