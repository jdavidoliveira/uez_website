"use client"

import { useAuth } from '@/contexts/Auth'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {

    const router = useRouter()
    const { logout } = useAuth()

    return (
        <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <button className="border-none w-full flex justify-start" onClick={async () => {
                await logout()
                router.refresh()
                router.refresh()
            }}><span className="text-base">Sair</span></button>
        </DropdownMenu.Item>
    )
}
