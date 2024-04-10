"use client"

import React, { useEffect, useState } from "react"
import UserCard from "./UserCard"
import Input from "./Input"
import { z } from "zod"
import { ChevronRight, Divide } from "lucide-react"
import Etapa2 from "./Etapa2"
import { useSignupData } from "@/contexts/Signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ErrorSpan from "./ErrorSpan"
import "animate.css"
import { toast } from "sonner"
import Etapa3 from "./Etapa3"
import Etapa4 from "./Etapa4"

// const userFormSchema = z.object({
//   cep: z
//     .string()
//     .min(1, "O CEP é obrigatório")
//     .regex(/^[0-9]{5}-[0-9]{3}$/, "Formato de CEP inválido"),
//   endereco: z.object({
//     logradouro: z.string().min(1, "O logradouro é obrigatório"),
//     numero: z.string().min(1, "O número é obrigatório"),
//     complemento: z.optional(z.string()),
//     bairro: z.string().min(1, "O bairro é obrigatório"),
//     cidade: z.string().min(1, "A cidade é obrigatória"),
//     estado: z.string().min(1, "O estado é obrigatório"),
//   }),
//   idServico: z.string().min(1, "O serviço é obrigatório"),
// })
const userFormSchema = z.object({
  userType: z.enum(["UZER", "CLIENTE"]),
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
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })
  const [etapa, setEtapa] = useState(4)
  const [currentUserType, setCurrentUserType] = React.useState<"CLIENTE" | "UZER" | null>(null)
  const { setSignupData, signupData } = useSignupData()

  async function NextStep() {
    const data = getValues()
    setSignupData((prev) => {
      return { ...prev, ...data }
    })
    setEtapa((prev) => prev + 1)
  }

  useEffect(() => {
    if (errors.userType) {
      toast("Selecione um tipo de usuário")
    }
  }, [errors.userType])

  switch (etapa) {
    case 1:
      return (
        <div className="flex flex-col items-center justify-center gap-10 sm:px-10 px-5 sm:w-10/12 w-full animate__animated animate__fadeIn">
          <h1 className="font-semibold text-3xl">Cadastre-se</h1>
          <form onSubmit={handleSubmit(NextStep)} className=" flex flex-col gap-8 sm:w-auto w-10/12">
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
              <Input
                label="Senha"
                inputType="password"
                placeholder="Senha"
                id="senha"
                register={register}
                className={errors.senha ? "border border-red-500" : ""}
              />
              {errors.senha && <ErrorSpan content={errors.senha.message} className="w-full" />}
            </div>
            <div className="grid grid-cols-2 gap-2 h-52 relative">
              <UserCard
                usertype="CLIENTE"
                onClick={() => {
                  setCurrentUserType("CLIENTE")
                  setValue("userType", "CLIENTE")
                }}
                isSelected={currentUserType === "CLIENTE"}
              />
              <UserCard
                usertype="UZER"
                onClick={() => {
                  setCurrentUserType("UZER")
                  setValue("userType", "UZER")
                }}
                isSelected={currentUserType === "UZER"}
              />
            </div>
            <button
              type="submit"
              className="bg-primary-purple pl-4 py-2 rounded-lg flex justify-between items-center w-fit mx-auto pr-2"
            >
              <span className="font-medium text-lg text-white">Avançar</span> <ChevronRight color="white" />
            </button>
          </form>
        </div>
      )

    case 2:
      return <Etapa2 back={() => setEtapa(1)} next={() => setEtapa(3)} etapa={etapa} />
    case 3:
      return <Etapa3 back={() => setEtapa(2)} next={() => setEtapa(4)} etapa={etapa} />
    case 4:
      return <Etapa4 back={() => setEtapa(3)} next={() => setEtapa(5)} etapa={etapa} />
    default:
      return null
  }
}
