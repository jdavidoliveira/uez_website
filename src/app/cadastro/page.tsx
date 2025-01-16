"use client"

import Link from "next/link"
import React from "react"
import SignButton from "./SignupButton"
import Image from "next/image"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Cadastro() {
  const router = useRouter()
  const session = useSession()

  if (session.status === "authenticated") {
    return router.replace("/")
  }

  return (
    <div className="flex flex-col items-center gap-10 px-10">
      <h1 className="text-3xl font-semibold md:self-start">Cadastre-se</h1>
      <button
        className="flex min-w-full items-center justify-center gap-2 rounded-lg border border-black/20 px-4 py-2 shadow-[5px_5px_10px_0_rgba(0,0,0,0.25)]"
        title="Cadastre-se com Google"
        onClick={() => signIn("google")}
      >
        <Image src="/social/google.svg" alt="Google Icon" width={31} height={31} />{" "}
        <span className="font-semibold text-black/50">Cadastre-se com Google</span>{" "}
      </button>
      <div className="flex w-full items-center justify-center gap-2">
        <hr className="w-[45%] bg-black/40" />
        <p className="font-medium text-black/40">ou</p>
        <hr className="w-[45%] bg-black/40" />
      </div>
      <Link href="/cadastro/uez" className="w-full">
        <SignButton
          className="min-w-full border-none bg-gradient-to-r from-primary-purple to-primary-blue"
          spanClassName="text-white"
          content="Cadastre-se com uez"
          icon={<Image src="/images/icons/uez-white.png" alt="Uez Icon" className="p-[2px]" width={31} height={31} />}
        />
      </Link>

      <p className="text-center font-bold">
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
