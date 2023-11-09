import Image from 'next/image'
import React from 'react'

export default function CardUzer({ photoUrl, nome, _id }: { photoUrl: string, nome: string, _id: string }) {
    return (
        <div className="bg-white shadow-2xl rounded-xl flex flex-col gap-3 items-center p-6 w-full aspect-square">
            <Image src={photoUrl} alt="profile photo" width={100} height={100} className="rounded-full w-24 h-24 object-cover" />
            <p className="text-black font-medium mb-4 text-center">{nome}</p>
        </div>
    )
}
