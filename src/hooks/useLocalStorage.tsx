'use client'

export function getLocalStorage(key: string) {
    const data: string | number | boolean | null = window?.localStorage?.getItem(key)
    return data && JSON.parse(data)
}

export function setLocalStorage(key: string, value: unknown) {
    window?.localStorage?.setItem(key, JSON.stringify(value))
}