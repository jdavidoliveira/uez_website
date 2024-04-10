import React from "react"
import Image from "next/image"
import { Metadata } from "next"
import { SignupDataProvider } from "@/contexts/Signup"

export const metadata: Metadata = {
  title: "Cadastre-se",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignupDataProvider>
      <main className="w-full h-full bg-azulao flex justify-center items-center">
        <div className="lg:w-2/5 w-1/3 h-full hidden md:block bg-primary-purple bg-boneco-cadastro bg-cover bg-center"></div>
        <div className="lg:w-3/5 md:w-2/3 w-full h-full bg-white flex items-center justify-center relative">
          <Image
            src="/elementos/bolinhas.png"
            alt="elemtno"
            width={120}
            height={840}
            className="absolute xl:right-20 lg:right-10 right-5 md:w-8 sm:w-5 w-3 bottom-1/3"
          />
          <Image
            src="/elementos/twochunks-circulo.png"
            alt="elemento"
            width={600}
            height={600}
            className="absolute right-0 bottom-0 sm:w-40 w-20  rotate-180"
          />
          {children}
        </div>
      </main>
    </SignupDataProvider>
  )
}
