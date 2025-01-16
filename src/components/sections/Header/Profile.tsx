"use client"

import * as Avatar from "@radix-ui/react-avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import LogoutButton from "./LogoutButton"
import { Session } from "next-auth"
import { useState } from "react"
import CreateOrderOverlay from "@/components/sections/CreateOrder"
import Notifications from "../Notifications/Notifications"

export default function Profile({ session: { user } }: { session: Session }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  return (
    <div className="flex items-center justify-between gap-8">
      <Notifications />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black outline-none hover:bg-gray-600"
            aria-label="Customise options"
          >
            <Avatar.Root className="align-center flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <Avatar.Image
                className="h-full w-full rounded-full object-cover"
                src={user.image}
                alt="Foto do usuário"
              />
              <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                User
              </Avatar.Fallback>
            </Avatar.Root>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
            sideOffset={5}
          >
            {/* <ProfileItem href={`/chat`} text="Chat" /> */}
            {user.usertype === "CLIENT" && <ProfileButton onClick={() => setIsOverlayOpen(true)} text="Criar Pedido" />}
            <ProfileItem href={`/users/${user.username}`} text="Abrir Perfil" />
            <DropdownMenu.Separator className="mx-4 my-1 h-[1px] bg-black/10" />
            <LogoutButton />
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {isOverlayOpen && <CreateOrderOverlay onClose={() => setIsOverlayOpen(false)} />}
    </div>
  )
}

function ProfileItem({ href, text }: { href: string; text: string }) {
  return (
    <DropdownMenu.Item className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-primary-dark-blue group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-black outline-none hover:text-white data-[disabled]:pointer-events-none">
      <Link className="flex w-full justify-start border-none" href={href}>
        <span className="text-base">{text}</span>
      </Link>
    </DropdownMenu.Item>
  )
}

function ProfileButton({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <DropdownMenu.Item
      asChild
      className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-primary-dark-blue group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-black outline-none hover:text-white data-[disabled]:pointer-events-none"
    >
      <button onClick={onClick} className="flex w-full justify-start border-none">
        <span className="text-base">{text}</span>
      </button>
    </DropdownMenu.Item>
  )
}
