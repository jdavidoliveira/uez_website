import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }).catch((err) => {
          console.error(err)
          return null
        })

        const data = await response?.json()

        if (data && response && response.status !== 401) {
          //esse é o user do jwt
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
            usertype: data.user.usertype,
            image: data.user.image,
            token: data.token,
            status: data.user.status,
          }
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        // Adicionando o status ao token do usuário
        token.user = { ...user, status: user.status }
        token.accessToken = user.token
      }
      if (account?.provider === "google") {
        const googleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            googleId: account.providerAccountId,
            access_token: account.access_token,
            image: user.image,
          }),
        })

        const googleData = await googleResponse.json()

        // Adicionando o status ao token retornado pela API do Google
        token.user = { ...googleData.user, status: googleData.user.status }
        token.accessToken = googleData.token
      }

      return token
    },
    async session({ session, token }) {
      // Atualizando a sessão com o status do token
      if (token.user) {
        session.user = token.user as any
        session.accessToken = token.accessToken as string
      }

      return session
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
  },
}
