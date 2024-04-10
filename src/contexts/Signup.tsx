"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

export const SignupContext = createContext<{
  signupData: ISignupData | null
  setSignupData: Dispatch<SetStateAction<ISignupData>>
}>({
  signupData: null,
  setSignupData: () => {},
})

const emptySignupData: ISignupData = {
  email: "",
  nome: "",
  telefone: "",
  dataNascimento: "",
  cpf: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  estado: "",
  cidade: "",
  usertype: "UZER", // ou 'CLIENTE', dependendo do caso
  idServico: "",
  dataNasc: "",
}

export function SignupDataProvider({ children }: any) {
  const [signupData, setSignupData] = useState<ISignupData>(emptySignupData)

  return <SignupContext.Provider value={{ signupData, setSignupData }}>{children}</SignupContext.Provider>
}

export function useSignupData() {
  return useContext(SignupContext)
}

export default SignupContext

export interface ISignupData {
  email: string
  nome: string
  telefone: string
  dataNascimento: string
  cpf: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  estado: string
  cidade: string
  usertype: "UZER" | "CLIENTE"
  idServico: string
  dataNasc: string
}
