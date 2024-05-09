"use client"

import { Cross, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CommonLinks } from "./Links"

export default function HeaderClient() {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <header className={`w-full flex items-center p-3 justify-center shadow bg-white relative`}>
      <div className="w-11/12 flex items-center justify-between">
        <nav className="flex items-center justify-between gap-10 text-xl font-bold mdscreen:gap-5">
          <button className="hidden mobile:block" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu size={60} />
          </button>
          <Link href="/" className="mobile:hidden p-2">
            <Image
              width={60}
              height={60}
              src="/logo.svg"
              alt="Logo da UEZ Company"
              className="mobile:hidden w-[75px] transition hover:scale-105"
            />
          </Link>
          {CommonLinks.map((link) => (
            <NewLink key={link.href} href={link.href}>
              {link.text}
            </NewLink>
          ))}
        </nav>
        <div className="flex gap-4 justify-between items-center mobile:hidden">
          <Link
            href="/login"
            className="flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg text-black bg-white cursor-pointer hover:bg-roxazul hover:text-white duration-300"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg text-white bg-roxazul cursor-pointer hover:bg-black hover:text-white duration-300"
          >
            Criar conta
          </Link>
        </div>
      </div>
      {showMobileMenu && <HeaderMobile setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} />}
    </header>
  )

  function NewLink({ href, children }: { href: string; children: any }) {
    return (
      <Link href={href} className="mobile:hidden hover:bg-gray-400 hover:text-white p-2 rounded-lg">
        {children}
      </Link>
    )
  }
}

function HeaderMobile({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean
  setShowMobileMenu: (showMobileMenu: boolean) => void
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
          <X width={50} height={50} />
        </button>
      </div>
      <nav className="flex flex-col w-full items-start justify-between px-8 text-xl font-bold mb-10">
        {CommonLinks.map((link) => (
          <NewLink key={link.href} href={link.href}>
            {link.text}
          </NewLink>
        ))}
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
