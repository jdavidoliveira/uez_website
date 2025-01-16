"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useRouter } from "next/navigation"
import { signOut as logout } from "next-auth/react"

export default function LogoutButton() {
  const router = useRouter()

  return (
    <DropdownMenu.Item className="hover:bg-primary-dark-blue text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:text-white data-[disabled]:pointer-events-none">
      <button
        className="flex w-full justify-start border-none"
        onClick={async () => {
          await logout()
          router.refresh()
          router.refresh()
        }}
      >
        <span className="text-base">Sair</span>
      </button>
    </DropdownMenu.Item>
  )
}
