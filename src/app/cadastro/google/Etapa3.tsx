"use client"

import React, { useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Megaphone } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSignupData } from "@/contexts/Signup"
import { twMerge } from "tailwind-merge"
import api from "@/lib/api"
import Image from "next/image"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

interface Etapa4Props {
  back: () => void
  etapa: number
}

const userFormSchema = z.object({
  serviceId: z.string().uuid("O serviço é obrigatório"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa3({ back, etapa }: Etapa4Props) {
  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })

  const router = useRouter()

  const { signupData, setSignupData } = useSignupData()

  async function NextStep() {
    const data = getValues()
    setSignupData((prev) => ({ ...prev, ...data }))

    console.log(signupData)
  }

  const [currentCargo, setCurrentCargo] = useState<"Design" | "Programação" | "Social Media" | "Videomaking" | null>(
    null,
  )

  const [availableServicos, setAvailableServicos] = useState<any[] | null>(null)

  useEffect(() => {
    currentCargo && fetchServicos(currentCargo)
  }, [currentCargo])

  async function fetchServicos(categoria: "Design" | "Programação" | "Social Media" | "Videomaking") {
    const { data } = await api.get<any[]>(`/services/category/${categoria}`).catch((err) => err.response?.data)
    return setAvailableServicos(data)
  }

  return (
    <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-2 sm:w-10/12 sm:px-5">
      <h1 className="text-3xl font-semibold">Cadastre-se</h1>
      <form onSubmit={handleSubmit(NextStep)} className="flex w-10/12 flex-col gap-8 sm:w-10/12">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label htmlFor="logradouro" className="w-full text-center font-medium">
            Escolha seu cargo
          </label>
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-6">
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Design")
              }}
              className={twMerge(
                "flex items-center justify-center rounded-md bg-primary-purple",
                currentCargo === "Design" && "bg-cinzero",
              )}
            >
              <div className="flex h-full w-full items-center justify-center gap-2 px-6 py-3 text-white">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/designer.png"
                  alt="Imagem ilustrativa"
                  className="h-10 w-10"
                />
                <span className="text-lg font-medium">Designer</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Programação")
              }}
              className={twMerge(
                "flex items-center justify-center rounded-md bg-primary-purple",
                currentCargo === "Programação" && "bg-cinzero",
              )}
            >
              <div className="flex h-full w-full items-center justify-center gap-2 px-6 py-3 text-white">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/programacao.png"
                  alt="Imagem ilustrativa"
                  className="h-10 w-10"
                />
                <span className="text-lg font-medium">Programador</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Social Media")
              }}
              className={twMerge(
                "flex items-center justify-center rounded-md bg-primary-purple",
                currentCargo === "Social Media" && "bg-cinzero",
              )}
            >
              <div className="flex h-full w-full items-center justify-center gap-2 px-6 py-3 text-white">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/socialmedia.png"
                  alt="Imagem ilustrativa"
                  className="h-10 w-10"
                />
                <span className="text-lg font-medium">Social Media</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Videomaking")
              }}
              className={twMerge(
                "flex items-center justify-center rounded-md bg-primary-purple",
                currentCargo === "Videomaking" && "bg-cinzero",
              )}
            >
              <div className="flex h-full w-full items-center justify-center gap-2 px-6 py-3 text-white">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/videomaker.png"
                  alt="Imagem ilustrativa"
                  className="h-10 w-10"
                />
                <span className="text-lg font-medium">Video Maker</span>
              </div>
            </button>
          </div>
        </div>
        {availableServicos && (
          <div className="animate__animated animate__fadeIn flex w-full flex-col gap-2">
            <label htmlFor="logradouro" className="w-full font-medium">
              Qual serviço você oferece?
            </label>
            <select id="servico" {...register("serviceId")} className="w-full rounded-md bg-cinzero p-2">
              {availableServicos?.map((servico) => (
                <option key={servico.id} value={servico.id}>
                  {servico.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
          <button
            type="submit"
            className="mx-auto flex w-fit items-center justify-between gap-1 rounded-lg bg-primary-purple p-2"
          >
            <span className="text-lg font-medium text-white">Concluído</span>
            <Check color="white" />
          </button>
        </div>
      </form>
    </div>
  )
}
