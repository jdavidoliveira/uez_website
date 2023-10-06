'use client'

export function getLocalStorage(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const data: string | number | boolean | null = window.localStorage.getItem(key)
        return data && JSON.parse(data)
    }
}

export function setLocalStorage(key: string, value: unknown) {
    if (typeof window !== 'undefined' && window.localStorage) {
        if(!value) {
            window.localStorage.removeItem(key)
        } else  window.localStorage.setItem(key, JSON.stringify(value))
    }
}