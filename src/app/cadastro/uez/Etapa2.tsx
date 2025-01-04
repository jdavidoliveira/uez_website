"use client"

import React from "react"
import Input from "../Input"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signUpSchema, useSignupData } from "@/contexts/Signup"
import ErrorSpan from "./ErrorSpan"
import api from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"

interface Etapa2Props {
  back: () => void
  next: () => void
  etapa: number
}

const userFormSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter mais de 3 caracteres")
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "O nome deve conter apenas letras"),
  email: z.string().min(1, "O e-mail é obrigatório").email("Formato de e-mail inválido"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\(\d{2}\) \d{5}-\d{4}$/.test(val), {
      message: "O telefone deve estar no formato correto: (XX) XXXXX-XXXX",
    }),
  birth_date: z.string().min(1, "A data de nascimento é obrigatória"),
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
  const router = useRouter()

  async function NextStep() {
    const data = getValues()
    setSignupData((prev) => ({ ...prev, ...data }))
    if (signupData.usertype === "UEZER") {
      next()
    } else {
      await Finish()
    }
  }

  async function Finish() {
    console.log(signUpSchema.safeParse(signupData))

    if (!signUpSchema.safeParse(signupData).success) return toast("Verifique os dados informados")

    try {
      const { data } = await api.post("/register", signupData)
      toast(data.message)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push(`/login?userEmail=${signupData.email}`)
    } catch (error: AxiosError | any) {
      console.log(error)
      toast(error.response.data.message)
    }
  }

  return (
    <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-5 sm:w-10/12 sm:px-10">
      <h1 className="text-3xl font-semibold">Cadastre-se</h1>
      <form onSubmit={handleSubmit(NextStep)} className="flex w-10/12 flex-col gap-8 sm:w-8/12">
        <div className="flex flex-col gap-2">
          <Input
            label="Nome completo"
            inputType="text"
            placeholder="Nome completo"
            id="name"
            register={register}
            maxLength={60}
            className={errors.name ? "border border-red-500" : ""}
          />
          {errors.name && <ErrorSpan content={errors.name.message} className="w-full" />}
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
            label="Telefone (opcional)"
            inputType="tel"
            placeholder="(XX) XXXXX-XXXX"
            id="phone"
            maxLength={15}
            register={() =>
              register("phone", {
                onChange: (e) => {
                  if (e.target.value.length === 2 && !e.target.value.includes(" ")) {
                    setValue("phone", getValues("phone") + " ")
                  }
                  const rawTel = e.target.value.replace(/\D/g, "") // Remove não dígitos
                  const formattedTel = rawTel.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
                  setValue("phone", formattedTel)
                },
              })
            }
            className={errors.phone ? "border border-red-500" : ""}
          />
          {errors.phone && <ErrorSpan content={errors.phone.message} className="w-full" />}
          <Input
            label="Data de Nascimento"
            inputType="date"
            id="birth_date"
            register={() => register("birth_date")}
            className={errors.birth_date ? "border border-red-500" : ""}
          />
          {errors.birth_date && <ErrorSpan content={errors.birth_date.message} className="w-full" />}
        </div>
        <div className="mx-auto flex w-fit items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              back()
            }}
            className="mx-auto flex w-fit items-center justify-between rounded-lg bg-primary-purple p-2"
          >
            <ChevronLeft color="white" />
          </button>
          <span className="mx-6 text-lg font-medium">{etapa}</span>
          {signupData.usertype === "UEZER" ? (
            <button
              type="submit"
              className="mx-auto flex w-fit items-center justify-between rounded-lg bg-primary-purple p-2"
            >
              <ChevronRight color="white" />
            </button>
          ) : (
            <button
              type="submit"
              className="mx-auto flex w-fit items-center justify-between gap-1 rounded-lg bg-primary-purple p-2"
            >
              <span className="text-lg font-medium text-white">Concluído</span>
              <Check color="white" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
