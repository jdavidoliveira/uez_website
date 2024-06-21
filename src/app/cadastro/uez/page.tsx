"use client"

import React, { useEffect, useState } from "react"
import UserCard from "./UserCard"
import Input from "./Input"
import { z } from "zod"
import { ChevronRight, Divide, Eye, EyeOff } from "lucide-react"
import Etapa2 from "./Etapa2"
import { useSignupData } from "@/contexts/Signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ErrorSpan from "./ErrorSpan"
import "animate.css"
import { toast } from "sonner"
import Etapa3 from "./Etapa3"
import Etapa4 from "./Etapa4"
import { twMerge } from "tailwind-merge"

const userFormSchema = z.object({
  usertype: z.enum(["UZER", "CLIENTE"]),
  senha: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter mais de 6 caracteres")
    .max(24, "A senha deve ter menos de 24 caracteres"),
  username: z
    .string()
    .min(1, "O nome de usuário é obrigatório")
    .regex(/^[A-Za-z0123456789_]+$/, "O nome de usuário deve conter apenas letras"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Cadastro() {
  const { setSignupData, signupData } = useSignupData()
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })
  const [etapa, setEtapa] = useState(1)
  const [currentUserType, setCurrentUserType] = useState<"CLIENTE" | "UZER" | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function NextStep() {
    const data = getValues()
    setSignupData((prev) => {
      return { ...prev, ...data }
    })
    setEtapa((prev) => prev + 1)
  }

  useEffect(() => {
    if (errors.usertype) {
      toast("Selecione um tipo de usuário")
    }
  }, [errors.usertype])

  switch (etapa) {
    case 1:
      return (
        <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-5 sm:w-10/12 sm:px-10">
          <h1 className="text-3xl font-semibold">Cadastre-se</h1>
          <form onSubmit={handleSubmit(NextStep)} className=" flex w-10/12 flex-col gap-8 sm:w-auto">
            <div className="flex flex-col gap-2">
              <Input
                label="Nome de usuário"
                inputType="text"
                placeholder="Nome de usuário"
                id="username"
                register={register}
                className={errors.username ? "border border-red-500" : ""}
              />
              {errors.username && <ErrorSpan content={errors.username.message} className="w-full" />}
              <div className="flex items-end">
                <Input
                  label="Senha"
                  inputType={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  id="senha"
                  register={register}
                  className={(errors.senha ? "border border-red-500" : "") + " rounded-r-none"}
                />
                <button
                  className={twMerge(
                    "rounded-r-md bg-cinzero p-2",
                    errors.senha ? "border border-l-0 border-red-500" : "",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword((prev) => !prev)
                  }}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.senha && <ErrorSpan content={errors.senha.message} className="w-full" />}
            </div>
            <div className="relative grid h-52 grid-cols-2 gap-2">
              <UserCard
                usertype="CLIENTE"
                onClick={() => {
                  setCurrentUserType("CLIENTE")
                  setValue("usertype", "CLIENTE")
                }}
                isSelected={currentUserType === "CLIENTE"}
              />
              <UserCard
                usertype="UZER"
                onClick={() => {
                  setCurrentUserType("UZER")
                  setValue("usertype", "UZER")
                }}
                isSelected={currentUserType === "UZER"}
              />
            </div>
            <button
              type="submit"
              className="mx-auto flex w-fit items-center justify-between rounded-lg bg-primary-purple py-2 pl-4 pr-2"
            >
              <span className="text-lg font-medium text-white">Avançar</span> <ChevronRight color="white" />
            </button>
          </form>
        </div>
      )
    case 2:
      return <Etapa2 back={() => setEtapa(1)} next={() => setEtapa(3)} etapa={etapa} />
    case 3:
      return <Etapa3 back={() => setEtapa(2)} next={() => setEtapa(4)} etapa={etapa} />
    case 4:
      return <Etapa4 back={() => setEtapa(3)} etapa={etapa} />
    default:
      return null
  }
}
