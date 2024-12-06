"use client"

import React, { FormEvent, useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Megaphone } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signUpSchema, useSignupData } from "@/contexts/Signup"
import { twMerge } from "tailwind-merge"
import api from "@/lib/api"
import Image from "next/image"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { Category, Service } from "@/types/Service"

interface Etapa3Props {
  back: () => void
  etapa: number
}

const userFormSchema = z.object({
  serviceId: z.string().uuid("O serviço é obrigatório"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa3({ back, etapa }: Etapa3Props) {
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

  const [categories, setCategories] = useState<Category[]>([])
  const [availableServices, setAvailableServices] = useState<Service[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>({ id: "", name: "Design" })

  async function NextStep() {
    const data = getValues()

    setSignupData((prev) => {
      return { ...prev, ...data }
    })

    await Finish()
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

  async function fetchData() {
    try {
      const searchOfCategories = await api.get<Category[]>(`/categories`)
      return setCategories(searchOfCategories.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchServicesByCategory() {
    try {
      const searchOfServices = await api.get<Service[]>(`/services/category/${selectedCategory?.name}`)
      return setAvailableServices(searchOfServices.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchServicesByCategory()
  }, [selectedCategory])

  return (
    <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-2 sm:w-10/12 sm:px-5">
      <h1 className="text-3xl font-semibold">Cadastre-se</h1>
      <form onSubmit={handleSubmit(NextStep)} className="flex w-10/12 flex-col gap-8 sm:w-10/12">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label htmlFor="logradouro" className="w-full text-center font-medium">
            Escolha seu cargo
          </label>
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-6">
            {categories.map((category) => (
              <CategoryButton
                categoryName={category.name}
                key={category.id}
                isSelected={selectedCategory?.name === category.name}
                onClick={(e: FormEvent) => {
                  e.preventDefault()
                  setSelectedCategory(category)
                }}
              />
            ))}
          </div>
        </div>
        {availableServices && (
          <div className="animate__animated animate__fadeIn flex w-full flex-col gap-2">
            <label htmlFor="logradouro" className="w-full font-medium">
              Qual serviço você oferece?
            </label>
            <select id="servico" {...register("serviceId")} className="w-full rounded-md bg-cinzero p-2">
              {availableServices?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
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
          {getValues().serviceId && (
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

interface CategoryButtonProps {
  onClick: (e?: any) => void
  categoryName: string
  isSelected: boolean
}

function CategoryButton({ onClick, categoryName, isSelected }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge("flex items-center justify-center rounded-md bg-primary-purple", isSelected && "bg-azulao")}
    >
      <div className="flex h-full w-full items-center justify-center gap-2 px-6 py-3 text-white">
        <Image
          width={100}
          height={100}
          src={`/images/icons/categorias/${categoryName
            .toLowerCase()
            .replace(" ", "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")}.png`}
          alt="Imagem ilustrativa"
          className="h-10 w-10"
        />
        <span className="text-lg font-medium">{categoryName}</span>
      </div>
    </button>
  )
}
