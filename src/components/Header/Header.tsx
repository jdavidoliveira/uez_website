'use client'

import { AuthContext } from "@/contexts/Auth";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Roboto } from "next/font/google";
import Link from "next/link";
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

import { useContext } from "react";

export default function Header() {
  const { statusLogin } = useContext(AuthContext);
  console.log(statusLogin);
  
  return (
    <header className={`w-full flex items-center justify-center shadow bg-white ${roboto.className}`}>
      <div className="w-11/12 p-3 flex items-center justify-between">
        <nav className="flex items-center justify-between gap-10 text-xl font-bold">
          <button
            className="hidden md:block"
          >
            <HamburgerMenuIcon width={60} height={60} />
          </button>
          <Link href="/" className="md:hidden p-2">
            <img src="/logo.svg" alt="Logo da UEZ Company" className="md:hidden w-[75px] transition hover:scale-105" />
          </Link>
          <Link href="/" className="md:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">Home</Link>
          <Link href="/sobre" className="md:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">Sobre</Link>
          <Link href="/testes" className="md:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">Testes</Link>
        </nav>
        <div className="flex gap-4 justify-between items-center">
          <Link href="/login">
            <button className="flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg text-black bg-white cursor-pointer hover:bg-roxazul hover:text-white duration-300">Entrar</button>
          </Link>
          <Link href="/cadastro">
            <button className="flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg text-white bg-roxazul cursor-pointer hover:bg-black hover:text-white duration-300">Criar conta</button>
          </Link>
        </div>
      </div>
    </header>
  )
}
