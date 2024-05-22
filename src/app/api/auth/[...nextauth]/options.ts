import api from "@/lib/api"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import action from "./action"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !process.env.NEXT_PUBLIC_API_URL) return null
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.password,
          }),
          credentials: "include",
        }).catch((err) => {
          console.log(err)
          return null
        })

        if (response) {
          await action({
            email: credentials.email,
            senha: credentials.password,
          })
        }

        const user = await response?.json()
        if (user && response && response.status !== 401) {
          return {
            id: user.user.id,
            name: user.user.nome,
            email: user.user.email,
            username: user.user.username,
            userType: user.user.userType,
            image: user.user.photoUrl,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user as any)
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
}
