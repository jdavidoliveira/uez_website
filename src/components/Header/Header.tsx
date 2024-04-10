"use client"

import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import HeaderProfile from "./HeaderProfile"
import { useAuth } from "@/contexts/Auth"
import Image from "next/image"
import { useRouter } from "next/navigation"

type PersonalLinks = {
  href: string
  text: string
}

const defaultLinks: PersonalLinks[] = [
  {
    href: "/sobre",
    text: "Sobre nós",
  },
]

const LinksIfUzer: PersonalLinks[] = [
  {
    href: "/realizarservico",
    text: "Encontrar serviço",
  },
]

const LinksIfClient: PersonalLinks[] = [
  {
    href: "/solicitarservico",
    text: "Solicitar serviço",
  },
  {
    href: "/uzers",
    text: "Uzers",
  },
]

export default function Header() {
  const { statusLogin, userType: tipousuario } = useAuth()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const [isLogged, setIsLogged] = useState<boolean>(statusLogin)
  const [userType, setUserType] = useState<string>(tipousuario)

  return (
    <>
      <header className="bg-roxazul flex items-center px-4 py-4 gap-24">
          <button className="hidden mobile:block" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <HamburgerMenuIcon width={60} height={60} />
          </button>
            <Image
              width={60}
              height={60}
              src="/logoWhite.svg"
              alt="Logo da UEZ Company"
              className="mobile:hidden w-[75px] transition hover:scale-105"
            />

          <nav className="flex gap-10 w-full justify-between mobile:hidden">
            <div className="flex text-center items-center text-white">
                <a href=""> 
                  <span className="font-semibold text-base border-e-2 pr-8 "> Sobre nós</span>
                </a>

                <a href=""> 
                  <span className="font-semibold text-base border-e-2 pr-8 pl-8"> Explorar </span>
                </a>

                <a href=""> 
                  <span className="font-semibold text-base pl-8"> Suporte </span>
                </a>

            </div>

            
            <div className="flex gap-4 items-center  mobile:hidden">
            <Link
                href="/cadastro"
                className="flex items-center justify-center text-base font-semibold py-2 px-6 rounded-lg text-white  bg-roxazul cursor-pointer transition hover:bg-gray-900 hover:text-white duration-700"
              >
                Criar conta
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center text-base font-semibold py-2 px-6 rounded-lg text-black bg-white cursor-pointer hover:bg-gray-900 hover:text-white duration-700"
              >
                Entrar
              </Link>
            </div>
            
          </nav>

          {showMobileMenu && (
            <HeaderMobile
              userType={userType}
              statusLogin={isLogged}
              setShowMobileMenu={setShowMobileMenu}
              showMobileMenu={showMobileMenu}
            />
          )}
      </header>
    </>
  )
}

function HeaderMobile({
  showMobileMenu,
  setShowMobileMenu,
  statusLogin,
  userType,
}: {
  showMobileMenu: boolean
  setShowMobileMenu: (showMobileMenu: boolean) => void
  statusLogin: boolean | undefined
  userType: string | undefined
}) {
  return (
    <div className="hidden mobile:flex w-full absolute top-0 bg-white flex-col z-10">
      <div className="flex items-center justify-between px-10 py-4 mb-6">
        <Link href="/" className="p-2">
          <Image
            width={50}
            priority
            height={50}
            src="/logo.svg"
            alt="Logo da UEZ Company"
            className="w-16 transition hover:scale-105"
          />
        </Link>
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="flex items-center justify-center">
          <Cross1Icon width={50} height={50} />
        </button>
      </div>
      <nav className="flex flex-col w-full items-start justify-between px-8 text-xl font-bold mb-10">
          <div className="flex flex-col w-full gap-4 items-center mb-6">
            <Link
              href="/login"
              className="flex items-center justify-center text-base font-semibold p-3 border shadow w-full mx-auto rounded-lg text-black bg-white cursor-pointer hover:bg-roxazul hover:text-white duration-300"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="flex items-center justify-center text-base font-semibold p-3 w-full border shadow mx-auto rounded-lg text-white bg-roxazul cursor-pointer hover:bg-black hover:text-white duration-300"
            >
              Criar conta
            </Link>
          </div>
       
        {statusLogin && (
          <div className="flex flex-col w-full gap-4 items-center mb-6">
            <LogoutButton />
          </div>
        )}
        {statusLogin ? (
          userType === "uzer" ? (
            <>
              {/* if the user is a uzer */}
              {LinksIfUzer.map((link) => (
                <NewLink key={link.href} href={link.href}>
                  {link.text}
                </NewLink>
              ))}
            </>
          ) : userType === "cliente" ? (
            <>
              {/* if the user is a client */}
              {LinksIfClient.map((link) => (
                <NewLink key={link.href} href={link.href}>
                  {link.text}
                </NewLink>
              ))}
            </>
          ) : (
            <>
              {/* if is not logged in */}
              {defaultLinks.map((link) => (
                <NewLink key={link.href} href={link.href}>
                  {link.text}
                </NewLink>
              ))}
            </>
          )
        ) : (
          <>
            {/* if is not logged in */}
            {defaultLinks.map((link) => (
              <NewLink key={link.href} href={link.href}>
                {link.text}
              </NewLink>
            ))}
          </>
        )}
      </nav>
    </div>
  )

  function NewLink({ href, children }: { href: string; children: any }) {
    return (
      <Link
        href={href}
        className="hover:bg-gray-400 border-b text-lg transition-colors hover:text-white p-3 w-full text-left"
      >
        {children}
      </Link>
    )
  }
}

export function LogoutButton() {
  const router = useRouter()
  const { logout } = useAuth()

  function logoutFunction() {
    logout()
    router.refresh()
    router.refresh()
  }

  return (
    <button
      onClick={logoutFunction}
      className="flex items-center justify-center text-base font-semibold p-3 border shadow w-full mx-auto rounded-lg text-white bg-red-600 cursor-pointer hover:bg-black hover:text-white duration-300"
    >
      Sair
    </button>
  )
}
