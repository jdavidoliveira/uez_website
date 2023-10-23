import { useFetch } from "@/hooks/useFetch";

import { cookies } from "next/headers";
import { Metadata } from "next";
import { UzersClient } from "./UzersClient";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
    title: "Uzers",
    description: "Uzers",
    keywords: "Uzers",
}

export default async function Uzers() {
    const serverData = await useFetch<any[]>('/uzers', {
        headers: {
            Authorization: `Bearer ${cookies().get("uezaccesstoken")?.value}`
        },
        next: {
            revalidate: 60 * 1 // 1 minutes
        },
    }).then(response => {
        return response
    }).catch(error => console.error(error))

    return (
        <>
            <Header />
            <UzersClient serverData={serverData} />
        </>
    )


}

