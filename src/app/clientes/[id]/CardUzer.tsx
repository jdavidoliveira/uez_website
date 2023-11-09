import Image from 'next/image'
import React from 'react'

export default function CardUzer({ photoUrl, nome, _id }: { photoUrl: string, nome: string, _id: string }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-10/12 m-2">
            <Image src={photoUrl} alt="profile photo" width={100} height={100} className="rounded-full w-24 h-24 object-cover" />
            <p className="text-gray-600 mb-4">{nome}</p>
        </div>
    )
}
