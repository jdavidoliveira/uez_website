"use client"

import React, { useState } from "react";
import Input from "@/components/layout/Input/Input"; // Substitua pelo caminho correto para o seu componente Input

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Desenvolvedor de Software", "Opção 2", "Opção 3", "Opção 4"];

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="w-6/12 flex flex-col items-center justify-between gap-2 transition">
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
      <Input
        label="Selecione uma opção"
        type="select"
        id="selectInput"
        handleChange={handleSelectChange}
        value={selectedOption}
        options={options}
        size={10}
      />
      <p>Você selecionou: {selectedOption}</p>
    </div>
  );
}

export default App;
