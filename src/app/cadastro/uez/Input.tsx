import React, { HTMLInputTypeAttribute } from "react"
import { UseFormRegister } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface InputProps {
  label: string
  inputType: HTMLInputTypeAttribute
  placeholder?: string
  id: string
  register?: UseFormRegister<any> | any
  className?: string
  maxLength?: number
  value?: any
}

export default function Input({
  inputType,
  label,
  placeholder,
  id,
  register,
  className,
  maxLength = 20,
  value,
}: InputProps) {
  const today = new Date()
  const year = today.getFullYear() - 18
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  const minDate = `${year}-${month}-${day}`
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="w-full font-medium">
        {label}
      </label>
      {register ? (
        <input
          type={inputType}
          id={id}
          max={inputType === "date" ? minDate : undefined}
          className={twMerge("w-full rounded-md bg-cinzero p-2", className)}
          placeholder={placeholder}
          maxLength={maxLength}
          {...register(id)}
        />
      ) : (
        <input
          type={inputType}
          id={id}
          max={inputType === "date" ? minDate : undefined}
          className={twMerge("w-full rounded-md bg-cinzero p-2", className)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
    </div>
  )
}
