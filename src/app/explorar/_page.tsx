import React from "react"
import UzersSection from "./UzersSection"

export default function Explorar() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <section className="flex w-full items-center justify-center py-32">
        <h1 className="w-full text-center text-3xl font-semibold">
          Encontre <span className=" text-primary-purple">profissionais</span> que possam te ajudar!
        </h1>
        {/* <div className="absolute bottom-10 left-3 hidden h-fit w-fit rotate-90 flex-col items-center -space-y-10 md:flex">
          <Image src="/elementos/bolinhas.png" alt="elemento" width={600} height={600} className="w-6 opacity-0" />
          <Image
            src="/elementos/halfpadrao-circulo.png"
            alt="elemento"
            width={600}
            height={600}
            className="hidden w-56 md:block lg:w-80"
          />
        </div> */}
      </section>
      <UzersSection />
    </main>
  )
}
