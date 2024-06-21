"use client"

import React from "react"
import Input from "./Input"
import { Check, ChevronLeft, ChevronRight, Search } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSignupData } from "@/contexts/Signup"
import ErrorSpan from "./ErrorSpan"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
import api from "@/lib/api"
import axios, { AxiosError } from "axios"
import { redirect, useRouter } from "next/navigation"

const estados_brasil = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

interface Etapa3Props {
  back: () => void
  next: () => void
  etapa: number
}

const userFormSchema = z.object({
  cep: z
    .string()
    .min(1, "O CEP é obrigatório")
    .regex(/^[0-9]{5}-[0-9]{3}$/, "Formato de CEP inválido"),
  logradouro: z.string().min(1, "O logradouro é obrigatório"),
  numero: z.string().min(1, "O número é obrigatório"),
  complemento: z.optional(z.string()),
  bairro: z.string().min(1, "O bairro é obrigatório"),
  cidade: z.string().min(1, "A cidade é obrigatória"),
  estado: z.enum(
    [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
    {
      errorMap: () => ({ message: "O estado é obrigatório" }),
    },
  ),
  dataNasc: z.string().min(1, "A data de nascimento é obrigatória"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa3({ back, next, etapa }: Etapa3Props) {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })
  const router = useRouter()

  const { signupData, setSignupData } = useSignupData()

  async function NextStep() {
    const data = getValues()
    let finalSignupdata: any
    setSignupData((prev) => {
      finalSignupdata = { ...prev, ...data }
      return { ...prev, ...data }
    })
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (signupData?.usertype === "UZER") {
      next()
    } else {
      const generalSchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        cpf: z.string().regex(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/),
        cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/),
        telefone: z.string(),
        logradouro: z.string().min(1, "O logradouro é obrigatório"),
        numero: z.string().min(1, "O número é obrigatório"),
        complemento: z.optional(z.string()),
        bairro: z.string().min(1, "O bairro é obrigatório"),
        cidade: z.string().min(1, "A cidade é obrigatória"),
        estado: z.string().min(1, "O estado é obrigatório"),
        usertype: z.enum(["UZER", "CLIENTE"]),
        username: z.string(),
        dataNasc: z.string(),
      })
      const dataTest = generalSchema.safeParse(finalSignupdata)
      if (!dataTest.success) return toast("Verifique os dados informados")

      try {
        const { data } = await api.post("/register", finalSignupdata)

        toast(data.message)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        router.push(`/login?userEmail=${finalSignupdata?.email}`)
      } catch (error: AxiosError | any) {
        console.log(error)
        toast(error.response.data.message)
      }
    }
    console.log("currentSignupdata", signupData)
  }

  async function searchForCep() {
    const cep = getValues("cep")
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    setValue("logradouro", data.logradouro || "")
    setValue("bairro", data.bairro || "")
    setValue("cidade", data.localidade || "")
    setValue("estado", data.uf || "")
    if (Object.hasOwn(data, "erro")) return toast("CEP não encontrado")
  }

  return (
    <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-5 sm:w-10/12 sm:px-10">
      <h1 className="text-3xl font-semibold">Cadastre-se</h1>
      <form onSubmit={handleSubmit(NextStep)} className="flex w-10/12 flex-col gap-8 sm:w-8/12">
        <div className="flex flex-col gap-2">
          <Input
            label="Data de Nascimento"
            inputType="date"
            id="datanascimento"
            register={() => register("dataNasc")}
            className={errors.dataNasc ? "border border-red-500" : ""}
          />
          {errors.dataNasc && <ErrorSpan content={errors.dataNasc.message} className="w-full" />}
          <div className="flex items-end">
            <Input
              label="CEP"
              inputType="text"
              placeholder="XXXXX-XXX"
              id="cep"
              maxLength={9}
              register={() =>
                register("cep", {
                  onChange: () => {
                    const rawCep = getValues("cep").replace(/\D/g, "")
                    const cep = rawCep.replace(/(\d{5})(\d{3})/, "$1-$2")
                    setValue("cep", cep) // Atualiza o estado com o Cep formatado
                  },
                })
              }
              className={(errors.cep ? "border border-red-500" : "") + "rounded-r-none"}
            />
            <button
              className="rounded-r-md bg-cinzero p-2"
              onClick={async (e) => {
                e.preventDefault()
                searchForCep()
              }}
            >
              <Search />
            </button>
          </div>
          {errors.cep && <ErrorSpan content={errors.cep.message} className="w-full" />}
          <div className="flex w-full items-center justify-between gap-6">
            <div className="flex w-10/12 flex-col gap-2">
              <label htmlFor="logradouro" className="w-full font-medium">
                Logradouro
              </label>
              <input
                type="text"
                id="logradouro"
                className={twMerge(
                  "w-full rounded-md bg-cinzero p-2",
                  errors.logradouro ? "border border-red-500" : "",
                )}
                {...register("logradouro")}
              />
            </div>
            <div className="flex w-2/12 flex-col gap-2">
              <label htmlFor="numero" className="w-full font-medium">
                Nº
              </label>
              <input
                type="number"
                id="numero"
                className={twMerge("w-full rounded-md bg-cinzero p-2", errors.numero ? "border border-red-500" : "")}
                {...register("numero")}
              />
            </div>
          </div>
          {(errors.logradouro || errors.numero) && (
            <ErrorSpan
              content={`${errors?.logradouro?.message ? errors?.logradouro?.message + " | " : ""} ${
                errors?.numero?.message ?? ""
              }`}
              className="w-full"
            />
          )}
          <Input
            label="Bairro"
            inputType="text"
            id="bairro"
            register={register}
            className={errors.bairro ? "border border-red-500" : ""}
          />
          {errors.bairro && <ErrorSpan content={errors.bairro.message} className="w-full" />}
          <div className="flex w-full items-center justify-between gap-6">
            <div className="flex w-10/12 flex-col gap-2">
              <label htmlFor="cidade" className="w-full font-medium">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                className={twMerge("w-full rounded-md bg-cinzero p-2", errors.cidade ? "border border-red-500" : "")}
                {...register("cidade")}
              />
            </div>
            <div className="flex w-2/12 flex-col gap-2">
              <label htmlFor="estado" className="w-full font-medium">
                Estado
              </label>
              <input
                list="estados_brasil"
                type="text"
                id="estado"
                className={twMerge("w-full rounded-md bg-cinzero p-2", errors.estado ? "border border-red-500" : "")}
                {...register("estado")}
              />
            </div>
          </div>
          <datalist id="estados_brasil">
            {estados_brasil.map((sigla) => (
              <option value={sigla} key={sigla}>
                {sigla}
              </option>
            ))}
          </datalist>
          {(errors.cidade || errors.estado) && (
            <ErrorSpan
              content={`${errors?.cidade?.message ? errors?.cidade?.message + " | " : ""} ${
                errors?.estado?.message ?? ""
              }`}
              className="w-full"
            />
          )}
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
          {signupData?.usertype === "UZER" ? (
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
