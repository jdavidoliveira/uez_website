"use client"

import Button from '@/components/layout/Button/Button'
import Input from '@/components/layout/Input/Input'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {

  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const [passwordType, setPasswordType] = useState("password");
  const [ctt, setCtt] = useState<React.ReactNode | string>("");

  return (
    <form className="bg-white rounded-3xl p-3 max-h-full w-[37%] flex flex-col items-center justify-center font-Montserrat mobile:w-full mobile:h-full mobile:rounded-none mobile:justify-start">
      <div className="w-4/5 h-full flex flex-col items-center justify-between gap-4 my-4 mx-auto mobile:h-4/5 mobile:max-h-96">
        <h1 className="font-extrabold text-3xl my-2">Login</h1>
        <Input
          label={"E-mail:"}
          type="email"
          id="email"
          value={email}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          maxLength={50}
        />
        <Input
          label={"Senha:"}
          type={passwordType}
          id="senha"
          value={senha}
          maxLength={24}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSenha(e.target.value);
            if (e.target.value.length > 0) {
              setCtt(<EyeOpenIcon />);
            } else {
              setCtt("");
            }
          }}
          auxButton={ctt}
          onAuxButtonClick={() => {
            setPasswordType((state) =>
              state === "password" ? "text" : "password"
            );
            setCtt(ctt === <EyeOpenIcon /> ? <EyeClosedIcon /> : <EyeOpenIcon />);
          }}
        />
        <div className="w-full flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Input type="checkbox" id="manterlogin" isBorded noLabel />
            <label htmlFor="manterlogin" className="font-bold text-sm">Manter-se conectado</label>
          </span>
          <span className="flex items-center justify-center"><Link href="/esqueci-senha" className="font-extrabold text-sm text-azulao italic hover:underline">Esqueci minha senha</Link></span>
        </div>
        <Button value="Entrar" handleClick={() => alert("Entrar")} className="w-full py-3" />
        <div className="w-full flex items-center justify-between">
          <span className="flex items-center justify-center mx-4">
            <p className="font-medium text-sm">Não tem uma conta? <Link href="/cadastro" className="text-[#5e5bff] hover:underline">Cadastre-se</Link> </p>
          </span>
        </div>
      </div>
    </form>
  )
}
