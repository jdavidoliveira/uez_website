'use client'

import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { useAuth } from "@/contexts/Auth";
import Image from "next/image";
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export default function Header() {
  const { statusLogin } = useAuth()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    setIsLogged(statusLogin)
  }, [])


  return (
    <header className={`w-full flex items-center p-3 justify-center shadow bg-white ${roboto.className} relative`}>
      <div className="w-11/12 flex items-center justify-between">
        <nav className="flex items-center justify-between gap-10 text-xl font-bold mdscreen:gap-5">
          <button
            className="hidden mobile:block"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <HamburgerMenuIcon width={60} height={60} />
          </button>
          <Link href="/" className="mobile:hidden p-2">
            <Image width={60} height={60} src="/logo.svg" alt="Logo da UEZ Company" className="mobile:hidden w-[75px] transition hover:scale-105" />
          </Link>
          {isLogged ? <>
            <Link href="/solicitarservico" className="mobile:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">Solicitar serviço</Link>
            <Link href="/uzers" className="mobile:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">Uzers</Link>
            <Link href="/clientes" className="mobile:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">Clientes</Link>
          </>
            :
            <>
              <Link href="/sobre" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Sobre</Link>
              <Link href="/visaoservicos" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Serviços</Link>
            </>
          }
        </nav>
        <Suspense fallback={"loading"}>
          {isLogged ? <HeaderProfile /> : (
            <div className="flex gap-4 justify-between items-center">
              <Link href="/login" className="flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg text-black bg-white cursor-pointer hover:bg-roxazul hover:text-white duration-300">
                Entrar
              </Link>
              <Link href="/cadastro" className="flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg text-white bg-roxazul cursor-pointer hover:bg-black hover:text-white duration-300">
                Criar conta
              </Link>
            </div>
          )
          }
        </Suspense>

      </div>
      {showMobileMenu && <HeaderMobile statusLogin={isLogged} setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} />}
    </header>
  )
}

function HeaderMobile({ showMobileMenu, setShowMobileMenu, statusLogin }: { showMobileMenu: boolean, setShowMobileMenu: (showMobileMenu: boolean) => void, statusLogin: boolean | undefined }) {
  return (
    <div className="hidden mobile:flex w-full absolute top-0 bg-white flex-col z-10">
      <div className="flex items-center justify-between px-10 py-4">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex items-center justify-center"
        >
          <Cross1Icon width={60} height={60} />
        </button>
      </div>
      <nav className="flex flex-col w-1/2 items-start justify-between gap-10 px-8 text-xl font-bold animate-transitionY mb-6">
        <Link href="/" className="p-2">
          <Image width={60} height={60} src="/logo.svg" alt="Logo da UEZ Company" className="w-[75px] transition hover:scale-105" />
        </Link>
        {statusLogin ? <>
          <Link href="/sobre" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Sobre</Link>
          <Link href="/uzers" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Uzers</Link>
          <Link href="/clientes" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Clientes</Link>
        </>
          :
          <>
            <Link href="/sobre" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Sobre</Link>
            <Link href="/servicos" className="hover:bg-gray-400 hover:text-white p-2 rounded-lg">Serviços</Link>
          </>

        }
      </nav>
    </div>
  )
}