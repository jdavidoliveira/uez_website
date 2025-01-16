import React from "react"
import Image from "next/image"
import { Metadata } from "next"
import { SignupDataProvider } from "@/contexts/Signup"
import ReturnButton from "@/components/layout/buttons/Return"

export const metadata: Metadata = {
  title: "Cadastre-se",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignupDataProvider>
      <main className="bg-primary-dark-blue flex h-full w-full items-center justify-center">
        <div className="hidden h-full w-1/3 bg-primary-purple bg-boneco-cadastro bg-cover bg-center md:block lg:w-2/5"></div>
        <ReturnButton classname="fixed top-10 left-10 z-50" />
        <div className="relative flex h-full w-full items-center justify-center bg-white md:w-2/3 lg:w-3/5">
          <Image
            src="/elementos/bolinhas.png"
            alt="elemtno"
            width={120}
            height={840}
            className="absolute bottom-1/3 right-5 w-3 sm:w-5 md:w-8 lg:right-10 xl:right-20"
          />
          <Image
            src="/elementos/twochunks-circulo.png"
            alt="elemento"
            width={600}
            height={600}
            className="absolute bottom-0 right-0 w-20 rotate-180  sm:w-40"
          />
          {children}
        </div>
      </main>
    </SignupDataProvider>
  )
}
