import { useFetch } from "@/hooks/useFetch";

import { cookies } from "next/headers";
import { UzersClient } from "./UzersClient";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default async function Uzers() {
    const serverData = await useFetch<any[]>('/uzers', {
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`
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
            <Footer />
        </>
    )


}

