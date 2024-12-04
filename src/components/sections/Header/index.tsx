"use client"

import { ArrowUp, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ClientLinks, CommonLinks, UzerLinks } from "./Links"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import HeaderProfile from "./HeaderProfile"
import { useSession } from "next-auth/react"

export default function Header() {
  const session = useSession()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0)
  const [prevScrollPosition, setPrevScrollPosition] = useState(0)
  const [showHeader, setShowHeader] = useState(true)

  const handleScroll = () => {
    const currentPosition = window.scrollY
    if (currentPosition > prevScrollPosition && currentPosition > 100) {
      setShowHeader(false)
    } else {
      setShowHeader(true)
    }
    setCurrentScrollPosition(currentPosition)
    setPrevScrollPosition(currentPosition)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPosition])

  return (
    <>
      {/* header de placeholder pra encher linguica */}
      <div
        className={twMerge(
          `relative left-0 right-0 top-0 z-40 flex w-full items-center justify-center bg-azulao p-3 opacity-0 shadow transition`,
        )}
      >
        <div className="flex w-11/12 items-center justify-between">
          <nav className="flex items-center justify-between gap-10 text-xl font-bold mdscreen:gap-5">
            <button className="block sm:hidden">
              <Menu size={60} color="white" />
            </button>
            <Link href="/" className="hidden p-2 sm:block">
              <Image
                width={60}
                height={60}
                src="/logo.svg"
                alt="Logo da UEZ Company"
                className="w-[75px] invert transition hover:scale-105 mobile:hidden"
              />
            </Link>
          </nav>
          <div className="flex items-center justify-between gap-4 sm:hidden">
            <Link
              href="/login"
              className="flex cursor-pointer items-center justify-center rounded-lg bg-azulao px-6 py-3 text-base font-semibold text-white duration-300 hover:w-full hover:bg-roxazul hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="flex cursor-pointer items-center justify-center rounded-lg bg-roxazul px-6 py-3 text-base font-semibold text-white duration-300 hover:w-full hover:bg-primary-purple hover:text-white"
            >
              Criar conta
            </Link>
          </div>
          <div className="hidden items-center justify-center sm:flex">
            <Link
              href="/login"
              className="flex cursor-pointer items-center justify-center rounded-l-lg bg-primary-blue px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary-purple hover:text-white"
            >
              Entrar
            </Link>
            <div className="h-12 w-[1px] bg-white" />
            <Link
              href="/cadastro"
              className="flex cursor-pointer items-center justify-center rounded-r-lg bg-primary-blue px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary-purple hover:text-white"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
      <motion.header
        className={twMerge(
          `fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center bg-azulao p-3 shadow transition`,
          currentScrollPosition > 0
            ? "border-b border-white/40 bg-opacity-70 shadow backdrop-blur-xl transition-opacity"
            : "",
          showHeader ? "translate-y-0 transition-all duration-300" : "-translate-y-full transition-all duration-300",
        )}
      >
        <div className="flex w-11/12 items-center justify-between">
          <nav className="flex items-center justify-between gap-10 text-xl font-bold mdscreen:gap-5">
            <button className="block sm:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu size={60} color="white" />
            </button>
            <Link href="/" className="hidden p-2 sm:block">
              <Image
                width={60}
                height={60}
                src="/logo.svg"
                alt="Logo da UEZ Company"
                className="w-[75px] invert transition hover:scale-105 mobile:hidden"
              />
            </Link>
            {session &&
              (session.data?.user.usertype === "UZER"
                ? UzerLinks.map((link) => (
                    <NewLink key={link.href} href={link.href}>
                      {link.text}
                    </NewLink>
                  ))
                : session.data?.user.usertype === "CLIENT"
                  ? ClientLinks.map((link) => (
                      <NewLink key={link.href} href={link.href}>
                        {link.text}
                      </NewLink>
                    ))
                  : // se o tipo de usuário não é UZER nem CLIENTE, então é CommonLinks
                    CommonLinks.map((link) => (
                      <NewLink key={link.href} href={link.href}>
                        {link.text}
                      </NewLink>
                    )))}
          </nav>
          {session.data ? (
            <HeaderProfile session={session.data} />
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 sm:hidden">
                <Link
                  href="/login"
                  className="flex cursor-pointer items-center justify-center rounded-md bg-transparent p-3 text-base font-semibold text-white duration-300 hover:bg-roxazul hover:text-white"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="flex cursor-pointer items-center justify-center rounded-md bg-roxazul px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary-purple hover:text-white"
                >
                  Criar conta
                </Link>
              </div>
              <div className="hidden items-center justify-center sm:flex">
                <Link
                  href="/login"
                  className="flex cursor-pointer items-center justify-center rounded-l-lg bg-primary-blue px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary-purple hover:text-white"
                >
                  Entrar
                </Link>
                <div className="h-12 w-[1px] bg-white" />
                <Link
                  href="/cadastro"
                  className="flex cursor-pointer items-center justify-center rounded-r-lg bg-primary-blue px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary-purple hover:text-white"
                >
                  Cadastrar
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.header>
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={twMerge(
          "fixed bottom-10 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black transition-opacity",
          currentScrollPosition > 100 ? "opacity-100" : "opacity-0",
        )}
      >
        <ArrowUp size={20} color="white" />
      </motion.button>
      {showMobileMenu && <HeaderMobile closeFunction={() => setShowMobileMenu(false)} />}
    </>
  )

  function NewLink({ href, children }: { href: string; children: any }) {
    return (
      <Link href={href} className="rounded-lg p-2 text-white hover:bg-gray-400 hover:text-white mobile:hidden">
        {children}
      </Link>
    )
  }

  function HeaderMobile({ closeFunction }: { closeFunction: () => void }) {
    return (
      <motion.div
        className="fixed top-0 z-50 hidden w-full flex-col bg-azulao shadow-2xl mobile:flex"
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mb-6 flex items-center justify-between px-10 py-4">
          <Link href="/" className="p-2">
            <Image
              width={50}
              priority
              height={50}
              src="/images/icons/uez-white.png"
              alt="Logo da UEZ Company"
              className="pointer-events-none w-16 transition hover:scale-105"
            />
          </Link>
          <button onClick={() => closeFunction()} className="flex items-center justify-center">
            <X width={30} height={30} color="white" className="pointer-events-none" />
          </button>
        </div>
        <nav className="mb-10 flex w-full flex-col items-start justify-between px-8 text-xl font-bold">
          {session.data?.user.usertype === "UZER" &&
            UzerLinks.map((link, index) => (
              <NewLinkMobile key={link.href} href={link.href} isLast={UzerLinks.length - 1 === index}>
                {link.text}
              </NewLinkMobile>
            ))}
          {session.data?.user.usertype === "CLIENT"
            ? ClientLinks.map((link, index) => (
                <NewLinkMobile key={link.href} href={link.href} isLast={ClientLinks.length - 1 === index}>
                  {link.text}
                </NewLinkMobile>
              ))
            : // se o tipo de usuário não é UZER nem CLIENTE, então é CommonLinks
              CommonLinks.map((link, index) => (
                <NewLinkMobile key={link.href} href={link.href} isLast={CommonLinks.length - 1 === index}>
                  {link.text}
                </NewLinkMobile>
              ))}
        </nav>
      </motion.div>
    )

    function NewLinkMobile({ href, children, isLast }: { href: string; children: any; isLast?: boolean }) {
      return (
        <Link
          href={href}
          className={twMerge(
            "w-full p-3 text-center text-lg font-medium text-white transition-colors hover:scale-105 hover:text-white",
            isLast ? "" : "border-b border-white/50",
          )}
        >
          {children}
        </Link>
      )
    }
  }
}
