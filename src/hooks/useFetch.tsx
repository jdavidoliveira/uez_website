import { baseURL } from "@/services/api";

export async function useFetch<T>(endpoint: string, config: NextFetchRequestConfig = {}) {
    endpoint = endpoint.replace(/^\//, '')
    const res: Response = await fetch(`${baseURL}/${endpoint}`, {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = res.body as T

    return data;
}