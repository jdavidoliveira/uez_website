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

      async authorize(credentials, req) {
        if (!credentials) return null
        const response = await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.password,
          }),
          credentials: "include",
        }).catch(() => null)

        if (response) {
          // api.interceptors.request.use((config) => {
          //   config.headers.set("cookie", response?.headers["set-cookie"])
          //   return config
          // })
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
    async jwt({ token, user, account }) {
      user && (token.user = user as any)
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
}
