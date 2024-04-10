import Link from "next/link"
import React from "react"
import SignButton from "./SignupButton"
import Image from "next/image"

export default function Registro() {
  return (
    <div className="flex flex-col items-center gap-10 px-10">
      <h1 className="font-semibold text-3xl md:self-start">Cadastre-se</h1>
      <SignButton
        className="min-w-full"
        content="Cadastre-se com Google"
        icon={<Image src="/images/icons/google.svg" alt="Google Icon" width={31} height={31} />}
      />
      <div className="w-full flex items-center justify-center gap-2">
        <hr className="w-[45%] bg-black/40" />
        <p className="font-medium text-black/40">ou</p>
        <hr className="w-[45%] bg-black/40" />
      </div>
      <Link href="/registro/cadastro" className="w-full">
        <SignButton
          className="bg-gradient-to-r from-primary-purple to-primary-blue border-none min-w-full"
          spanClassName="text-white"
          content="Cadastre-se com uez"
          icon={<Image src="/images/icons/uez-white.png" alt="Uez Icon" className="p-[2px]" width={31} height={31} />}
        />
      </Link>

      <p className="font-bold text-center">
        Ja possui uma conta?{" "}
        <Link className="text-primary-purple" href="/login">
          Entrar
        </Link>
      </p>
      <p className="text-center leading-6 md:mt-36">
        Ao se cadastrar você concorda com nossos{" "}
        <Link className="underline" href={"/sobre/termos-de-uso"}>
          termos <br className="hidden sm:block" /> de uso
        </Link>{" "}
        e{" "}
        <Link className="underline" href={"/sobre/politica-de-privacidade"}>
          política de privacidade
        </Link>
      </p>
    </div>
  )
}
