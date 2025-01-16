import Link from "next/link"
import { Link as ILink } from "../Links"
import Image from "next/image"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export default function HeaderMobile({ closeFunction, links }: { closeFunction: () => void; links: ILink[] }) {
  return (
    <motion.div
      className="bg-primary-dark-blue fixed top-0 z-50 hidden w-full flex-col shadow-2xl mobile:flex"
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
        {links.map((link, index) => (
          <NewLinkMobile key={link.href} href={link.href} isLast={links.length - 1 === index}>
            {link.text}
          </NewLinkMobile>
        ))}
      </nav>
    </motion.div>
  )
}

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
