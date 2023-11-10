"use client"

import axios from "axios";
import { parseCookies } from "nookies";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api";
const token = parseCookies().uezaccesstoken

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Authorization": `Bearer ${token || ""}`
    }
})

export default api
