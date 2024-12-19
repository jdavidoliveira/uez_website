"use client"

import GenericSection from "@/components/layout/GenericSection"
import Image from "next/image"
import React from "react"
import { AnimationOnScroll } from "react-animation-on-scroll"

export function AboutSecuritySection() {
  return (
    <GenericSection className="relative mb-20 flex w-full animate-transitionY flex-col items-center justify-around gap-8 px-0 py-16 text-azulao">
      <div className="relative flex w-11/12 flex-col items-center justify-around gap-8 text-azulao">
        <Image
          src="/images/icons/cadeado.svg"
          width={120}
          height={120}
          alt="Imagem ilustrativa de um cadeado"
          className="absolute left-0 top-8 h-12 w-12 animate-pulse mobile:hidden"
        />
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <h1 className="text-center text-2xl font-bold md:text-4xl">Nós prezamos pela sua segurança!</h1>
        </AnimationOnScroll>
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <p className="mx-auto w-10/12 text-center text-lg font-medium leading-snug">
            O nosso modo de pagamento zela tanto pela segurança dos Clientes quanto dos Uzers.
          </p>
        </AnimationOnScroll>
      </div>
      <div className="relative flex w-11/12 flex-col items-center justify-around gap-8 text-azulao">
        <Image
          src="/images/icons/cadeado.svg"
          width={120}
          height={120}
          alt="Imagem ilustrativa de um cadeado"
          className="absolute left-0 top-0 h-12 w-12 animate-pulse sm:hidden smmobile:hidden"
        />
        <Image
          src="/images/icons/cadeado.svg"
          width={120}
          height={120}
          alt="Imagem ilustrativa de um cadeado"
          className="absolute right-0 top-0 h-12 w-12 animate-pulse smmobile:hidden"
        />
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <h1 className="text-center text-2xl font-bold md:text-4xl">Mas de que forma?</h1>
        </AnimationOnScroll>
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
          <p className="mx-auto w-10/12 text-center text-lg font-medium leading-snug">
            Quando um serviço é fechado, o pagamento do cliente é <strong>obrigatório</strong> e fica retido na nossa
            plataforma, o uzer só recebe quando o cliente declarar o serviço como feito. Para ter a certeza que o
            cliente irá fazer isso, nós bloqueamos suas atividades até que ele declare.
          </p>
        </AnimationOnScroll>
      </div>
    </GenericSection>
  )
}
