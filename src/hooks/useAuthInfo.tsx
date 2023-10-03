import nookies from "nookies";
export default function useAuth() {

    const token = nookies.get(undefined, "accessToken")
    // rota para verificar o token jwt


    const statusLogin = !!token

  return {statusLogin}
}
