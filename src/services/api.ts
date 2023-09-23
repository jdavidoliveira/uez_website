import { useFetch, ApiError } from "@/hooks/useFetch";
import { getLocalStorage } from "@/hooks/useLocalStorage";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api"; // URL da API

const token = getLocalStorage("token") || "";

const login = async (email: string, password: string): Promise<void> => {
    try {
        const { token } = await useFetch<{ token: string }>("/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            })
        })
    } catch (error: any) {
        console.error(`Erro da API: ${error.message}`);
    }
}