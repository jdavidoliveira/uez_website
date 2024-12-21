"use client"

import Modal from "@/components/layout/modals/Modal"
import Input from "@/components/layout/inputs/Generic"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import LoadingSpinner from "@/components/layout/LoadingSpinner"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import api from "@/lib/api"
import Image from "next/image"

const userFormSchema = z.object({
  email: z.string().email("Formato de e-mail inválido").min(1, "O e-mail é obrigatório"),
  senha: z.string().min(6, "A senha deve ter mais de 6 caracteres").max(24, "A senha deve ter menos de 24 caracteres"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Login() {
  useEffect(() => {
    if (searchParams.get("loggedWithGoogle") === "true") {
      signIn("google", { callbackUrl: "/" })
    }
  }, [])
  const session = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormData>({
    /* @ts-ignore */
    resolver: zodResolver(userFormSchema),
  })
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("null")
  const [haveButton, setHaveButton] = useState(true)
  function toggleModal(message: string, hasButton: boolean = true) {
    setModalMessage(message)
    setHaveButton(hasButton)
    setShowModal((prevState) => !prevState)
  }

  const [passwordType, setPasswordType] = useState<"password" | "text">("password")
  const [pwChangerIcon, setPwChangerIcon] = useState<React.ReactNode | string>(<EyeClosedIcon width={20} height={20} />)
  const [showPasswordChanger, setShowPasswordChanger] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (session.status === "authenticated") {
    return router.replace("/")
  }

  async function logar({ email, senha }: { email: string; senha: string }) {
    setIsSubmitting(true)
    try {
      const result = await signIn("credentials", { email, password: senha, redirect: false })
      if (result?.error) {
        toggleModal(result?.status === 401 ? "Credenciais inválidas!" : result?.error, true)
        return setIsSubmitting(false)
      } else {
        try {
          const result = await api.post("/auth", {
            email,
            senha,
          })

          api.interceptors.request.use((config) => {
            config.headers.set("cookie", result?.headers["set-cookie"])
            config.withCredentials = true
            return config
          })
        } catch (error) {
          console.error(error)
        }
        return searchParams.has("redirectToLastPage") ? router.back() : router.replace("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="flex max-h-full flex-col items-center justify-between gap-4 rounded-xl bg-white px-10 py-6 font-Montserrat"
      onSubmit={handleSubmit(logar)}
    >
      <h1 className="my-2 text-center text-2xl font-semibold ">Faça login na sua conta da UEZ</h1>
      <div className="flex w-full flex-col items-center justify-center">
        <label htmlFor="email" title="E-mail" className="self-start text-base font-medium">
          E-mail:
        </label>
        <div className="flex h-10 w-full items-center">
          <input
            className={`h-10 w-full rounded-md bg-cinzero px-3 py-2 text-base font-medium outline-none ${
              errors.email && "rounded border-2 border-red-500"
            }`}
            type="text"
            id="email"
            maxLength={200}
            defaultValue={searchParams.get("userEmail") ?? ""}
            placeholder="example@gmail.com"
            {...register("email")}
          />
        </div>
        {errors.email && <span className="my-1 self-start text-xs font-medium">{errors.email.message}</span>}
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <label htmlFor="senha" title="Senha" className="self-start text-base font-medium">
          Senha:
        </label>
        <div className="flex h-10 w-full items-center">
          <input
            className={`h-10 w-full rounded-l-md bg-cinzero px-3 py-2 text-base font-medium outline-none ${
              errors.senha && "rounded border-2 border-red-500"
            }`}
            type={passwordType}
            id="senha"
            maxLength={24}
            {...register("senha", {
              onChange: (e) => {
                if (e.target.value.length > 0) {
                  setShowPasswordChanger(true)
                } else {
                  setShowPasswordChanger(false)
                }
              },
            })}
          />
          {showPasswordChanger && (
            <button
              title="Exibir/ocultar senha"
              type="button"
              className="flex h-full cursor-pointer items-center justify-center rounded-r-md border-none bg-cinzero px-3 py-2 hover:bg-[#e9e9e9]"
              onClick={(e) => {
                e.preventDefault()
                setPasswordType((prevState) => {
                  setPwChangerIcon(
                    prevState === "text" ? (
                      <EyeClosedIcon width={20} height={20} />
                    ) : (
                      <EyeOpenIcon width={20} height={20} />
                    ),
                  )
                  return prevState === "text" ? "password" : "text"
                })
              }}
            >
              {pwChangerIcon}
            </button>
          )}
        </div>
        {errors.senha && <span className="my-1 self-start text-xs font-medium">{errors.senha.message}</span>}
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          <Input type="checkbox" id="manterlogin" className="h-4 w-4 border border-black bg-white" noLabel />
          <label htmlFor="manterlogin" className="text-sm font-bold">
            Manter-se conectado
          </label>
        </span>
        <span className="flex items-center justify-center">
          <Link href="/esqueci-senha" className="text-xs font-extrabold italic text-azulao hover:underline">
            Esqueci minha senha
          </Link>
        </span>
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-md border-none bg-azulao px-4 py-2 text-xl font-extrabold text-white hover:bg-[#0f0f5c]"
      >
        {isSubmitting ? <LoadingSpinner size={10} /> : "Entrar"}
      </button>
      <div className="flex w-full items-center justify-between">
        <span className="ml-1 flex items-center justify-center">
          <p className="text-sm font-medium">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-[#5e5bff] hover:underline">
              Cadastre-se
            </Link>{" "}
          </p>
        </span>
      </div>
      <div className="flex w-full items-center justify-between  ">
        <hr className="h-[1px] w-[45%] border bg-black/50" />
        <span>ou</span>
        <hr className="h-[1px] w-[45%] border bg-black/50" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          className="flex min-w-full items-center justify-center gap-2 rounded-lg border border-black/20 px-4 py-2 shadow-[5px_5px_10px_0_rgba(0,0,0,0.25)] hover:border-black/30"
          title="Cadastre-se com Google"
          onClick={(e) => {
            e.preventDefault()
            return signIn("google")
          }}
        >
          <Image src="/images/icons/google.svg" alt="Google Icon" width={31} height={31} />{" "}
          <span className="font-semibold text-black/50">Entrar com Google</span>{" "}
        </button>
      </div>
      {showModal && <Modal message={modalMessage} handleClick={() => setShowModal(false)} noButton={!haveButton} />}
    </form>
  )
}
