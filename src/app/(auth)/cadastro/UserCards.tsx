'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface UserCardsProps {
  setUserType: any;
  userType: "cliente" | "uzer" | "null" | string;
}

export default function UserCards({ setUserType, userType }: UserCardsProps) {
  function selecionar(tipo: string) {
    if (tipo === "cliente") {
      setUserType("cliente");
      setSelected1(" border-4 border-blue-600");
      setSelected2("");
    } else if (tipo === "uzer") {
      setUserType("uzer");
      setSelected2(" border-4 border-blue-600");
      setSelected1("");
    } else return
  }

  const [selected1class, setSelected1] = useState("");
  const [selected2class, setSelected2] = useState("");

  useEffect(() => selecionar(userType));

  return (
    <div className="mt-2 max-w-4xl w-full flex items-center justify-between mx-auto mb-0 animate-transitionX">
      <div
        className={twMerge("w-[45%] min-h-[200px] bg-azulao text-white cursor-pointer rounded-3xl duration-300 p-3 flex flex-col items-center justify-around hover:scale-105", selected1class)}
        onClick={() => selecionar("cliente")}
      >
        <h2 className="mx-auto my-0 text-3xl font-medium">Cliente</h2>
        <Image
          src="/images/icons/cliente-icons8.png"
          alt="Imagem ilustrativa do cliente"
          width={125}
          height={125}
          className="mt-3 h-32"
        />
        <p className="text-xs text-center my-2 mx-0">
          Peça serviços para Uzers da nossa plataforma, de forma gratuita,
          rápida e eficiente.
        </p>
      </div>
      <div
        className={twMerge("w-[45%] min-h-[200px] bg-azulao text-white cursor-pointer rounded-3xl duration-300 p-3 flex flex-col items-center justify-around hover:scale-105", selected2class)}
        onClick={() => selecionar("uzer")}
      >
        <h2 className="mx-auto my-0 text-3xl font-medium">Uzer</h2>
        <Image
          src="/images/icons/uzer-icons8.png"
          alt="Imagem ilustrativa do Uzer"
          width={125}
          height={125}
          className="mt-3 h-32"
        />
        <p className="text-xs text-center my-2 mx-0">
          Faça serviços para Clientes da nossa plataforma, de forma gratuita,
          rápida e eficiente
        </p>
      </div>
    </div>
  );
}