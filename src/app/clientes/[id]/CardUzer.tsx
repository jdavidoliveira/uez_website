import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardUzer({ photoUrl, nome, _id }: { photoUrl: string, nome: string, _id: string }) {
    return (
        <Link href={`/uzers/${_id}`} title='Ver perfil do uzer' className="bg-white shadow-[3px_3px_10px_rgba(0,0,0,0.3)] rounded-3xl flex flex-col gap-3 items-center p-2 w-full h-fit transition hover:scale-105 cursor-pointer">
            <Image src={photoUrl} alt="profile photo" width={100} height={100} className="rounded-full w-4/6  object-cover" />
            <p className="text-black text-sm font-normal mb-4 text-center">{nome.length > 13 ? `${nome.substring(0, 13)}...` : nome}</p>
        </Link>
    )
}
