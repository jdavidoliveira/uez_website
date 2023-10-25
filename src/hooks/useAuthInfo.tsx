import nookies from "nookies";
export default function useAuth() {

    const token = nookies.get(undefined, "uezaccesstoken")
    // rota para verificar o token jwt


    const statusLogin = !!token

  return {statusLogin}
}
