import useAuth from "@/hooks/useAuthInfo";

export default async function Testes() {

  const { statusLogin } = useAuth()

  return (
    <main className="w-full h-full">
        {statusLogin ? <h1>Tá logado!</h1> : <h1>Não logado!</h1>}
    </main>
  );
}
