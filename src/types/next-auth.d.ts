import NextAuth, { User } from "next-auth"
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      username: string
      usertype: "UZER" | "CLIENT"
      image: string
    }
    needsSignUp: boolean
  }

  interface User {
    id: string
    email: string
    name: string
    username: string
    usertype: "UZER" | "CLIENT"
    image: string
  }
}
