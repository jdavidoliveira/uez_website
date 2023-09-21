// api.js
import axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:3333/api"; // URL da API

const instance = axios.create({
    baseURL: baseURL,
});

export async function useFetch(endpoint: string): Promise<any> {
    fetch(`${baseURL}/${endpoint}`, {
        next: {
            revalidate: 60
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch((error: Error | any) => {
            console.error(`Erro ao buscar os dados: ${error.response.data.message}`);
            return {
                message: error.response.data.message,
                status: error.response.status,
            };
        })
}

export async function login(email: string, senha: string): Promise<any> {
    return instance
        .post("/login", { email, senha })
        .then((response) => {
            console.log("Login bem-sucedido!", response.data);
            return response.data;
        })
        .catch((error: Error | any) => {
            console.error(`Erro ao fazer o login: ${error.response.data.message}`);
            return {
                message: error.response.data.message,
                status: error.response.status,
            };
        });
}

export async function register(user: any): Promise<any> {
    return instance
        .post("/register", user)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error: Error | any) => {
            console.error(`Erro ao fazer o cadastro: ${error.response.data.message}`);
            return {
                message: error.response.data.message,
                status: error.response.status,
            };
        });
}

export async function fetchData(endpoint: string): Promise<any> {
    const token = localStorage.getItem("acessToken");
    if (!token) {
        window.alert("Não logado, redirecionando...");
        window.location.href = "/";
        return Promise.resolve({ message: "Token não encontrado, faça login." });
    }

    return instance
        .get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error: Error | any) => {
            console.error(`Erro ao fazer buscar os dados: ${error.response.data.message}`);
            return error;
        });
}

export async function fetchPublicData(endpoint: string): Promise<any> {
    return instance
        .get(endpoint)
        .then((response) => {
            return response;
        })
        .catch((error: Error | any) => {
            console.error(`Erro ao buscar os dados: ${error.response.data.message}`);
            return error;
        });
}

export default instance;
