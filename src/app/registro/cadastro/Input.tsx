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
}

export default function Input({ inputType, label, placeholder, id, register, className, maxLength = 20 }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="font-medium w-full">
        {label}
      </label>
      {register ? (
        <input
          type={inputType}
          id={id}
          className={twMerge("bg-cinzero p-2 rounded-md w-full", className)}
          placeholder={placeholder}
          maxLength={maxLength}
          {...register(id)}
        />
      ) : (
        <input
          type={inputType}
          id={id}
          className={twMerge("bg-cinzero p-2 rounded-md w-full", className)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
    </div>
  )
}
