"use client"

import * as Avatar from "@radix-ui/react-avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import LogoutButton from "./LogoutButton"
import { Session } from "next-auth"

export default function HeaderProfile({ session: { user } }: { session: Session }) {
  return (
    <div className="flex gap-8 justify-between items-center">
      {/* <Notifications /> */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-full w-16 h-16 inline-flex items-center justify-center text-black bg-white outline-none hover:bg-gray-600"
            aria-label="Customise options"
          >
            <Avatar.Root className="bg-white flex h-16 w-16 items-center justify-center rounded-full align-center">
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
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <ProfileItem href={`/chat`} text="Chat" />
            <ProfileItem
              href={user.userType === "CLIENTE" ? `/clientes/${user.id}` : `/uzers/${user.id}`}
              text="Abrir Perfil"
            />
            <DropdownMenu.Separator className="h-[1px] bg-black/10 mx-4 my-1" />
            <LogoutButton />

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

function ProfileItem({ href, text }: { href: string; text: string }) {
  return (
    <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
      <Link className="border-none w-full flex justify-start" href={href}>
        <span className="text-base">{text}</span>
      </Link>
    </DropdownMenu.Item>
  )
}
