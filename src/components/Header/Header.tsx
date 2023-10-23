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

type PersonalLinks = {
  href: string,
  text: string,
}

const defaultLinks: PersonalLinks[] = [
  {
    href: "/sobre",
    text: "Sobre nós",
  },
  {
    href: "/visaoservicos",
    text: "Serviços",
  }
]

const LinksIfUzer: PersonalLinks[] = [
  {
    href: "/realizarservico",
    text: "Realizar serviço",
  }
]

const LinksIfClient: PersonalLinks[] = [
  {
    href: "/solicitarservico",
    text: "Solicitar serviço",
  },
  {
    href: "/uzers",
    text: "Uzers",
  }
]

export default function Header() {
  const { statusLogin, userType: tipousuario } = useAuth()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const [isLogged, setIsLogged] = useState<boolean>(statusLogin);
  const [userType, setUserType] = useState<string>(tipousuario)

  useEffect(() => {
    setIsLogged(statusLogin)
    setUserType(tipousuario)
    console.log(userType)
  }, [tipousuario, statusLogin, []])


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
          {isLogged ? (userType === "uzer" ? <>
            {/* if the user is a uzer */}
            {LinksIfUzer.map((link) => (
              <NewLink key={link.href} href={link.href} children={link.text} />
            ))}
          </> : (userType === "cliente" ? <>
            {/* if the user is a client */}
            {LinksIfClient.map((link) => (
              <NewLink key={link.href} href={link.href} children={link.text} />
            ))}
          </> : <>
            {/* if is not logged in */}
            {defaultLinks.map((link) => (
              <NewLink key={link.href} href={link.href} children={link.text} />
            ))}
          </>))
            :
            <>
              {/* if is not logged in */}
              {defaultLinks.map((link) => (
                <NewLink key={link.href} href={link.href} children={link.text} />
              ))}
            </>
          }
        </nav>
        <Suspense fallback={"loading"}>
          {isLogged ? <HeaderProfile /> : (
            <div className="flex gap-4 justify-between items-center mobile:hidden">
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
      {showMobileMenu && <HeaderMobile userType={userType} statusLogin={isLogged} setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} />}
    </header>
  )

  function NewLink({ href, children }: { href: string, children: any }) {
    return <Link href={href} className="mobile:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">{children}</Link>
  }
}

function HeaderMobile({ showMobileMenu, setShowMobileMenu, statusLogin, userType }: { showMobileMenu: boolean, setShowMobileMenu: (showMobileMenu: boolean) => void, statusLogin: boolean | undefined, userType: string | undefined }) {
  return (
    <div className="hidden mobile:flex w-full absolute top-0 bg-white flex-col z-10">
      <div className="flex items-center justify-between px-10 py-4 mb-6">
        <Link href="/" className="p-2">
          <Image width={50} priority height={50} src="/logo.svg" alt="Logo da UEZ Company" className="w-16 transition hover:scale-105" />
        </Link>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex items-center justify-center"
        >
          <Cross1Icon width={50} height={50} />
        </button>
      </div>
      <nav className="flex flex-col w-full items-start justify-between px-8 text-xl font-bold mb-10">
        {!statusLogin && (
          <div className="flex flex-col w-full gap-4 items-center mb-6">
            <Link href="/login" className="flex items-center justify-center text-base font-semibold p-3 border shadow w-full mx-auto rounded-lg text-black bg-white cursor-pointer hover:bg-roxazul hover:text-white duration-300">
              Entrar
            </Link>
            <Link href="/cadastro" className="flex items-center justify-center text-base font-semibold p-3 w-full border shadow mx-auto rounded-lg text-white bg-roxazul cursor-pointer hover:bg-black hover:text-white duration-300">
              Criar conta
            </Link>
          </div>
        )}
        {statusLogin && (
          <div className="flex flex-col w-full gap-4 items-center mb-6">
            <Link href="/login" className="flex items-center justify-center text-base font-semibold p-3 border shadow w-full mx-auto rounded-lg text-black bg-white cursor-pointer hover:bg-roxazul hover:text-white duration-300">
              Abrir Perfil
            </Link>
          </div>
        )}
        {statusLogin ? (userType === "uzer" ? <>
          {/* if the user is a uzer */}
          {LinksIfUzer.map((link) => (
            <NewLink key={link.href} href={link.href} children={link.text} />
          ))}
        </> : (userType === "cliente" ? <>
          {/* if the user is a client */}
          {LinksIfClient.map((link) => (
            <NewLink key={link.href} href={link.href} children={link.text} />
          ))}
        </> : <>
          {/* if is not logged in */}
          {defaultLinks.map((link) => (
            <NewLink key={link.href} href={link.href} children={link.text} />
          ))}
        </>))
          :
          <>
            {/* if is not logged in */}
            {defaultLinks.map((link) => (
              <NewLink key={link.href} href={link.href} children={link.text} />
            ))}
          </>
        }
      </nav>
    </div>
  )

  function NewLink({ href, children }: { href: string, children: any }) {
    return <Link href={href} className="hover:bg-gray-400 border-b text-lg transition-colors hover:text-white p-3 w-full text-left">{children}</Link>

  }
}
