import React, { useState } from "react";
import Input from "@/components/layout/Input/Input"; // Substitua pelo caminho correto para o seu componente Input
import { useFetch } from "@/hooks/useFetch";

async function App() {
  
  const servicos: Array<string | any> = await useFetch("/servicos")
  console.log(servicos)

  return (
    <div className="w-6/12 flex flex-col items-center justify-between gap-2 transition">
      <h1>Você selecionou: {servicos.length}</h1>
    </div>
  );
}

export default App;
