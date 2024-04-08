"use client"

import Modal from '@/components/Modal/Modal'
import Input from '@/components/Forms/Input/Input'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useEffect, useState, } from 'react'
import Image from "next/image"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from "@/contexts/Auth"
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { useRouter, useSearchParams } from 'next/navigation'

const userFormSchema = z.object({
  name: z.string().min(1, "Um nome deve ser informado").min(3, "O nome indicado deve ser valido"),
  senha: z.string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter mais de 6 caracteres")
    .max(24, "A senha deve ter menos de 24 caracteres"),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Login() {
  const { statusLogin, login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams();
  if (statusLogin) router.replace("/")

  const { register, handleSubmit, formState: { errors, } } = useForm<userFormData>({
    /* @ts-ignore */
    resolver: zodResolver(userFormSchema)
  })


  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('null');
  const [haveButton, setHaveButton] = useState(true)
  function toggleModal(message: string, hasButton: boolean = true) {
    setModalMessage(message)
    setHaveButton(hasButton)
    setShowModal(prevState => !prevState)
  }

  async function logar({ name, senha }: { name: string, senha: string }) {
    setIsSubmitting(true)
    const logError = await login(name, senha)
    if (logError) {
      toggleModal(logError)
      setIsSubmitting(false)
    } else {
      toggleModal("Login feito com sucesso!", false)
      setIsSubmitting(false)
      new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/")
    }
  }

  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [pwChangerIcon, setPwChangerIcon] = useState<React.ReactNode | string>(<EyeClosedIcon width={20} height={20} />);
  const [showPasswordChanger, setShowPasswordChanger] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form className="bg-white rounded-3xl p-3 max-h-full w-[35%] flex flex-col items-center h-[600px] justify-between font-Montserrat mobile:w-full mobile:h-full mobile:rounded-none mobile:justify-start " onSubmit={handleSubmit(logar)}>
      <legend className='font-extrabold text-2xl mt-4'>
        Login
      </legend>

     <div className='border border-x-0 border-t-0 border-b-gray-400 w-full h-[30%] flex flex-col justify-between items-center'>
      <div> ㅤ</div>

      <h1 className='px-10 p-1 shadow-xl  shadow-slate-300 rounded-xl border items-center border-slate-200 gap-4 flex hover:border-slate-400 hover:rounded-3xl duration-1000 cursor-pointer hover:shadow-2xl hover:shadow-slate-400'>
          <Image width={20} height={20} alt='logo da Goole' src="/google.svg" className='flex items-center mt-[6px]'/>
          Entrar com o google
      </h1>

      <div> ㅤ</div>
      <span className='-m-5 bg-white p-2'>OU</span>
     </div>
  

      <div className='gap-5 flex flex-col w-[90%]'>
        <div className="flex flex-col items-center justify-center w-full ">
            <label htmlFor="email" title="E-mail" className="self-start text-base font-medium">
              Nome de usuário 
            </label>
            <div className="flex items-center w-full h-10">
              <input
                className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none rounded-lg`}
                type="text"
                id="nameUser"
                maxLength={200}
                
                {...register("name")}
              />
            </div>
            {errors.name && <span className="font-medium text-xs self-start my-1">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="senha" title="Senha" className="self-start text-base font-medium">
              Senha:
            </label>
            <div className="flex items-center w-full h-10">
              <input
                className={`bg-cinzero w-full h-10 font-medium rounded-lg text-base px-3 py-2 outline-none ${errors.senha && "border-2 rounded border-red-500"}`}
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
                  }
                })}

              />
              {showPasswordChanger && <button
                title="Exibir/ocultar senha"
                type="button"
                className="bg-cinzero hover:bg-[#e9e9e9] border-none py-2 px-3 h-full cursor-pointer flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordType(prevState => {
                    setPwChangerIcon(prevState === "text" ? <EyeClosedIcon width={20} height={20} /> : <EyeOpenIcon width={20} height={20} />)
                    return prevState === "text" ? "password" : "text"
                  })

                }}
              >
                {pwChangerIcon}
              </button>}
            </div>
            {errors.senha && <span className="font-medium text-xs self-start my-1">{errors.senha.message}</span>}
          </div>

          <div className="w-full flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Input type="checkbox" id="manterlogin" className="w-4 h-4 border border-black bg-white" noLabel />
              <label htmlFor="manterlogin" className="font-bold text-sm">Manter-se conectado</label>
            </span>
            <span className="flex items-center justify-center"><Link href="/esqueci-senha" className="font-extrabold text-xs text-azulao italic hover:underline">Esqueci minha senha</Link></span>
          </div>
          <button type="submit" className="bg-azulao border-none flex items-center justify-center py-2 px-4 rounded-lg text-white text-xl font-extrabold hover:bg-[#0f0f5c] w-full">
            {isSubmitting ? <LoadingSpinner size={10} /> : "Entrar"}
          </button>
          <div className="w-full flex items-center justify-between">
            <span className="flex items-center justify-center mx-4">
              <p className="font-medium text-sm">Não tem uma conta? <Link href="/cadastro" className="text-[#5e5bff] hover:underline">Cadastre-se</Link> </p>
            </span>
        </div>
      </div>
    </form>
  )
}
