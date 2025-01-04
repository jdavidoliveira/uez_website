"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { z } from "zod"

/*
{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "birth_date": "string",
  "phone": "string",
  "specialityId": "string",
  "usertype": "UEZER",
  "username": "string",
  "image": "string"
}
*/

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  birth_date: z.string(),
  phone: z.string(),
  specialityId: z.string().uuid().optional(),
  usertype: z.enum(["UEZER", "CLIENT"]),
  username: z.string(),
})

export interface ISignupData {
  name: string
  email: string
  password: string
  phone?: string
  usertype: "UEZER" | "CLIENT"
  specialityId?: string
  birth_date: string
  username: string
  image?: string
}

const emptySignupData: ISignupData = {
  name: "",
  email: "",
  password: "",
  birth_date: "",
  usertype: "UEZER", // ou 'CLIENT', dependendo do caso
  username: "",
  phone: "",
}

export const SignupContext = createContext<{
  signupData: ISignupData
  setSignupData: Dispatch<SetStateAction<ISignupData>>
}>({
  signupData: emptySignupData,
  setSignupData: () => {},
})

export function SignupDataProvider({ children }: any) {
  const [signupData, setSignupData] = useState<ISignupData>(emptySignupData)

  return <SignupContext.Provider value={{ signupData, setSignupData }}>{children}</SignupContext.Provider>
}

export function useSignupData() {
  return useContext(SignupContext)
}

export default SignupContext
