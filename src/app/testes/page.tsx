"use client"

import MiniModal from "@/components/Modal/MiniModal";
import useAuth from "@/hooks/useAuthInfo";
import { useState } from "react";

export default function Testes() {

  const { statusLogin } = useAuth()
  const [showQuickModal, setShowQuickModal] = useState(true)


  return (
    <main className="w-full h-full">
        {statusLogin ? <h1>Tá logado!</h1> : <h1>Não logado!</h1>}
        {showQuickModal && <MiniModal messageCategory="Descrição do serviço:" message="Insira uma descrição para o serviço" closeFunction={() => setShowQuickModal(false)} />}
    </main>
  );
}
