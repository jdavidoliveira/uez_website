"use client"

import { useEffect, useState } from "react"
import { Check, ChevronLeft } from "lucide-react"
import "animate.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signUpSchema, useSignupData } from "@/contexts/Signup"
import { twMerge } from "tailwind-merge"
import api from "@/lib/api"
import Image from "next/image"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"
import { Category, Service } from "@/types/Service"

interface Etapa3Props {
  back: () => void
  etapa: number
}

const userFormSchema = z.object({
  serviceId: z.string().uuid("O serviço é obrigatório"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Etapa3({ back, etapa }: Etapa3Props) {
  const pathname = usePathname()
  const router = useRouter()
  const { watch, register, handleSubmit } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })
  const { signupData, setSignupData } = useSignupData()

  const [categories, setCategories] = useState<Category[]>([])
  const [availableServices, setAvailableServices] = useState<Service[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  async function updateServiceId(serviceId: string) {
    setSignupData((prev) => ({ ...prev, serviceId }))
  }

  async function finish() {
    const validationResult = signUpSchema.safeParse(signupData)
    if (!validationResult.success) {
      return toast(validationResult.error.issues.map((issue) => issue.message).join(", "))
    }

    try {
      const registerData = await api.post("/register", signupData)
      if (registerData.status !== 201) {
        return toast(registerData.data.message || "Erro ao registrar")
      }

      toast.success("Cadastro concluído com sucesso!")

      router.push(pathname.includes("uez") ? `/login?userEmail=${signupData.email}` : `/login?loggedWithGoogle=true`)
    } catch (error) {
      toast.error("Erro ao registrar. Tente novamente.")
      console.error(error)
    }
  }

  async function fetchCategories() {
    try {
      const response = await api.get<Category[]>("/categories")
      setCategories(response.data)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    }
  }

  async function fetchServicesByCategory() {
    if (!selectedCategory) return

    try {
      const response = await api.get<Service[]>(`/services/category/${selectedCategory.name}`)
      setAvailableServices(response.data)
    } catch (error) {
      console.error("Erro ao buscar serviços:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchServicesByCategory()
  }, [selectedCategory])

  const serviceId = watch("serviceId")

  return (
    <div className="animate__animated animate__fadeIn flex w-full flex-col items-center justify-center gap-10 px-2 sm:w-10/12 sm:px-5">
      <h1 className="text-3xl font-semibold">Cadastre-se</h1>
      <form onSubmit={handleSubmit(finish)} className="flex w-10/12 flex-col gap-8 sm:w-10/12">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <label htmlFor="categories" className="w-full text-center font-medium">
            Escolha seu cargo
          </label>
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-6">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                categoryName={category.name}
                isSelected={selectedCategory?.id === category.id}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedCategory(category)
                  updateServiceId(category.id)
                }}
              />
            ))}
          </div>
        </div>

        {availableServices && (
          <div className="animate__animated animate__fadeIn flex w-full flex-col gap-2">
            <label htmlFor="servico" className="w-full font-medium">
              Qual serviço você oferece?
            </label>
            <select
              id="servico"
              {...register("serviceId", {
                onChange: (e) => updateServiceId(e.target.value),
              })}
              className="w-full rounded-md bg-cinzero p-2"
            >
              {availableServices.map((service) => (
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
          {serviceId && (
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
