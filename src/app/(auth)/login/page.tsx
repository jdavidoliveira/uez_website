"use client"

import Modal from "@/components/Modal/Modal"
import Input from "@/components/Forms/Input/Input"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import api from "@/lib/api"

const userFormSchema = z.object({
  email: z.string().email("Formato de e-mail inválido").min(1, "O e-mail é obrigatório"),
  senha: z.string().min(6, "A senha deve ter mais de 6 caracteres").max(24, "A senha deve ter menos de 24 caracteres"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Login() {
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
          const result = await api.post("/login", {
            email,
            senha,
          })

          api.interceptors.request.use((config) => {
            config.headers.set("cookie", result?.headers["set-cookie"])
            config.withCredentials = true
            return config
          })
        } catch (error) {
          console.log(error)
        }
        return router.replace("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex max-h-full w-[30%] flex-col items-center justify-center rounded-3xl bg-white p-3 font-Montserrat mobile:h-full mobile:w-full mobile:justify-start mobile:rounded-none"
      onSubmit={handleSubmit(logar)}
    >
      <div className="mx-auto my-4 flex h-full w-4/5 flex-col items-center justify-between gap-4 mobile:h-4/5 mobile:max-h-96">
        <h1 className="my-2 text-3xl font-extrabold">Login</h1>
        <div className="flex w-full flex-col items-center justify-center">
          <label htmlFor="email" title="E-mail" className="self-start text-base font-medium">
            E-mail:
          </label>
          <div className="flex h-10 w-full items-center">
            <input
              className={`h-10 w-full rounded-lg bg-cinzero px-3 py-2 text-base font-medium outline-none ${
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
              className={`h-10 w-full rounded-lg bg-cinzero px-3 py-2 text-base font-medium outline-none ${
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
                className="flex h-full cursor-pointer items-center justify-center border-none bg-cinzero px-3 py-2 hover:bg-[#e9e9e9]"
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
          className="flex w-full items-center justify-center rounded-lg border-none bg-azulao px-4 py-2 text-xl font-extrabold text-white hover:bg-[#0f0f5c]"
        >
          {isSubmitting ? <LoadingSpinner size={10} /> : "Entrar"}
        </button>
        <div className="flex w-full items-center justify-between">
          <span className="mx-4 flex items-center justify-center">
            <p className="text-sm font-medium">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-[#5e5bff] hover:underline">
                Cadastre-se
              </Link>{" "}
            </p>
          </span>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} handleClick={() => setShowModal(false)} noButton={!haveButton} />}
    </form>
  )
}
