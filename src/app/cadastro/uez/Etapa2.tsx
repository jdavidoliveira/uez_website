"use client"

import React from "react"
import Input from "./Input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSignupData } from "@/contexts/Signup"
import ErrorSpan from "./ErrorSpan"

interface Etapa2Props {
  back: () => void
  next: () => void
  etapa: number
}

const userFormSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter mais de 3 caracteres")
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "O nome deve conter apenas letras"),
  email: z.string().min(1, "O e-mail é obrigatório").email("Formato de e-mail inválido"),
  telefone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .min(10, "O telefone deve ter 10 dígitos")
    .max(15, "O telefone deve ter no máximo 15 dígitos"),
  cpf: z
    .string()
    .min(1, "O CPF é obrigatório")
    .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/, "Formato de CPF inválido")
    .min(14, "O CPF deve ter 14 dígitos")
    .max(14, "O CPF deve ter 14 dígitos"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa2({ back, next, etapa }: Etapa2Props) {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })

  const { signupData, setSignupData } = useSignupData()

  async function NextStep() {
    const data = getValues()
    setSignupData((prev) => ({ ...prev, ...data }))
    next()
    console.log("currentSignupdata", signupData)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 sm:px-10 px-5 sm:w-10/12 w-full animate__animated animate__fadeIn">
      <h1 className="font-semibold text-3xl">Cadastre-se</h1>
      <form onSubmit={handleSubmit(NextStep)} className="flex flex-col gap-8 sm:w-8/12 w-10/12">
        <div className="flex flex-col gap-2">
          <Input
            label="Nome completo"
            inputType="text"
            placeholder="Nome completo"
            id="nome"
            register={register}
            maxLength={60}
            className={errors.nome ? "border border-red-500" : ""}
          />
          {errors.nome && <ErrorSpan content={errors.nome.message} className="w-full" />}
          <Input
            label="Email"
            inputType="email"
            placeholder="seuemail@email.com"
            id="email"
            maxLength={100}
            register={register}
            className={errors.email ? "border border-red-500" : ""}
          />
          {errors.email && <ErrorSpan content={errors.email.message} className="w-full" />}
          <Input
            label="Telefone"
            inputType="tel"
            placeholder="(XX) XXXXX-XXXX"
            id="telefone"
            maxLength={15}
            register={() =>
              register("telefone", {
                onChange: (e) => {
                  if (e.target.value.length === 2 && !e.target.value.includes(" ")) {
                    setValue("telefone", getValues("telefone") + " ")
                  }
                  const rawTel = e.target.value.replace(/\D/g, "") // Remove não dígitos
                  const formattedTel = rawTel.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
                  setValue("telefone", formattedTel)
                },
              })
            }
            className={errors.telefone ? "border border-red-500" : ""}
          />
          {errors.telefone && <ErrorSpan content={errors.telefone.message} className="w-full" />}
          <Input
            label="CPF"
            inputType="text"
            placeholder="XXX.XXX.XXX-XX"
            id="cpf"
            maxLength={14}
            register={() =>
              register("cpf", {
                onChange: (e) => {
                  const rawCpf = e.target.value.replace(/\D/g, "") // Remove não dígitos
                  const formattedCpf = rawCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") // Formata como XXX.XXX.XXX-XX
                  setValue("cpf", formattedCpf)
                },
              })
            }
            className={errors.cpf ? "border border-red-500" : ""}
          />
          {errors.cpf && <ErrorSpan content={errors.cpf.message} className="w-full" />}
        </div>
        <div className="w-fit mx-auto flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              back()
            }}
            className="bg-primary-purple p-2 rounded-lg flex justify-between items-center w-fit mx-auto"
          >
            <ChevronLeft color="white" />
          </button>
          <span className="font-medium text-lg mx-6">{etapa}</span>
          <button
            type="submit"
            className="bg-primary-purple p-2 rounded-lg flex justify-between items-center w-fit mx-auto"
          >
            <ChevronRight color="white" />
          </button>
        </div>
      </form>
    </div>
  )
}
