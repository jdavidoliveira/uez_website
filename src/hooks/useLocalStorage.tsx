'use client'

import { useEffect, useState } from "react"

export function getLocalStorage(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const data: string | number | boolean | null = window.localStorage.getItem(key)
        console.log(data)
        return data && JSON.parse(data)
    }
}

export function setLocalStorage(key: string, value: unknown) {
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
}