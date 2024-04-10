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

interface Etapa4Props {
  back: () => void
  next: () => void
  etapa: number
}

const userFormSchema = z.object({
  idServico: z.string().uuid("O serviço é obrigatório"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa4({ back, next, etapa }: Etapa4Props) {
  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })

  const { signupData, setSignupData } = useSignupData()

  async function NextStep() {
    const data = getValues()
    setSignupData((prev) => ({ ...prev, ...data }))

    const { data: response } = await api.post("/register", signupData).catch((err) => err.response?.data)
    alert(response.message)
  }

  const [currentCargo, setCurrentCargo] = useState<"Design" | "Programação" | "Social Media" | "Videomaking" | null>(
    null
  )

  const [availableServicos, setAvailableServicos] = useState<any[] | null>(null)

  useEffect(() => {
    currentCargo && fetchServicos(currentCargo)
  }, [currentCargo])

  async function fetchServicos(categoria: "Design" | "Programação" | "Social Media" | "Videomaking") {
    const { data } = await api.get<any[]>(`/servicos/categoria/${categoria}`).catch((err) => err.response?.data)
    setAvailableServicos(data)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 sm:px-5 px-2 sm:w-10/12 w-full animate__animated animate__fadeIn">
      <h1 className="font-semibold text-3xl">Cadastre-se</h1>
      <form onSubmit={handleSubmit(NextStep)} className="flex flex-col gap-8 sm:w-10/12 w-10/12">
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <label htmlFor="logradouro" className="font-medium w-full text-center">
            Escolha seu cargo
          </label>
          <div className="grid grid-cols-2 sm:gap-6 gap-3 w-full">
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Design")
              }}
              className={twMerge(
                "bg-primary-purple flex items-center justify-center rounded-md",
                currentCargo === "Design" && "bg-cinzero"
              )}
            >
              <div className="text-white w-full h-full flex items-center py-3 px-6 justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/designer.png"
                  alt="Imagem ilustrativa"
                  className="w-10 h-10"
                />
                <span className="font-medium text-lg">Designer</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Programação")
              }}
              className={twMerge(
                "bg-primary-purple flex items-center justify-center rounded-md",
                currentCargo === "Programação" && "bg-cinzero"
              )}
            >
              <div className="text-white w-full h-full flex items-center py-3 px-6 justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/programacao.png"
                  alt="Imagem ilustrativa"
                  className="w-10 h-10"
                />
                <span className="font-medium text-lg">Programador</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Social Media")
              }}
              className={twMerge(
                "bg-primary-purple flex items-center justify-center rounded-md",
                currentCargo === "Social Media" && "bg-cinzero"
              )}
            >
              <div className="text-white w-full h-full flex items-center py-3 px-6 justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/socialmedia.png"
                  alt="Imagem ilustrativa"
                  className="w-10 h-10"
                />
                <span className="font-medium text-lg">Social Media</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setCurrentCargo("Videomaking")
              }}
              className={twMerge(
                "bg-primary-purple flex items-center justify-center rounded-md",
                currentCargo === "Videomaking" && "bg-cinzero"
              )}
            >
              <div className="text-white w-full h-full flex items-center py-3 px-6 justify-center gap-2">
                <Image
                  width={100}
                  height={100}
                  src="/images/icons/categorias/videomaker.png"
                  alt="Imagem ilustrativa"
                  className="w-10 h-10"
                />
                <span className="font-medium text-lg">Video Maker</span>
              </div>
            </button>
          </div>
        </div>
        {availableServicos && (
          <div className="flex flex-col gap-2 w-full animate__animated animate__fadeIn">
            <label htmlFor="logradouro" className="font-medium w-full">
              Qual serviço você oferece?
            </label>
            <select id="servico" {...register("idServico")} className="bg-cinzero p-2 rounded-md w-full">
              {availableServicos?.map((servico) => (
                <option key={servico.id} value={servico.id}>
                  {servico.nome}
                </option>
              ))}
            </select>
          </div>
        )}

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
            className="bg-primary-purple p-2 rounded-lg flex justify-between items-center w-fit mx-auto gap-1"
          >
            <span className="font-medium text-lg text-white">Concluído</span>
            <Check color="white" />
          </button>
        </div>
      </form>
    </div>
  )
}
