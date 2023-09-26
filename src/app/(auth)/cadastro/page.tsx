'use client'

import React, { useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useSearchParams } from 'next/navigation';
import UserCards from './UserCards';
import Button from '@/components/layout/Button/Button';

export default function Cadastro() {

  const { get } = useSearchParams();


  const [formState, setFormState] = useState({
    isValid: false,
    message: "Preencher dados",
  });

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [userType, setUserType] = useState<"cliente" | "uzer" | "null" | string>(get("userType") || "null"); //
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [dataNasc, setDataNasc] = useState("");
  const [tipoServico, setTipoServico] = useState([]);
  const [areaAtuacao, setAreaAtuacao] = useState(1);
  const [categoriaServico, setCategoriaServico] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para controlar a exibição do modal de erro
  const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar a mensagem de erro

  const [categoriaServicosArray, setCategoriaServicosArray] = useState([{ "nomeCategoria": "Carregando..." }]);
  const [servicosArray, setServicosArray] = useState([{ "nomeServico": "Selecione uma categoria" }]);

  const [submitButtonContent, setSubmitButtonContent] = useState<any>("Finalizar")

  const formData = {
    nome,
    setNome,
    email,
    setEmail,
    userType,
    setUserType,
    senha,
    setSenha,
    telefone,
    setTelefone,
    cpf,
    setCpf,
    rg,
    setRg,
    dataNasc,
    setDataNasc,
    cep,
    setCep,
    endereco,
    setEndereco,
    tipoServico,
    setTipoServico,
    areaAtuacao,
    setAreaAtuacao,
    categoriaServico,
    setCategoriaServico,
    nomeServico,
    setNomeServico,
    formState,
    setFormState,
    setStep,
    setShowErrorModal,
    setErrorMessage,
    cadastrar,
    submitButtonContent,
    setSubmitButtonContent,
    categoriaServicosArray,
    setCategoriaServicosArray,
    setServicosArray,
    servicosArray,
  };

  async function cadastrar() {
    setSubmitButtonContent(<LoadingSpinner color={"white"} />)
    if (formState.isValid) {
      switch (userType) {
        case "cliente":
          const cliente = {
            nome,
            email,
            senha,
            cpf,
            rg,
            dataNasc,
            cep,
            telefone,
            endereco,
            userType,
          };
          console.log("Cadastrando cliente", cliente);
          alert("Cadastrando cliente" + cliente);

          break;
        case "uzer":
          const uzer = {
            nome,
            email,
            senha,
            cpf,
            rg,
            dataNasc,
            cep,
            endereco,
            telefone,
            tipoServico,
            areaAtuacao,
            categoriaServico,
            nomeServico,
            userType,
          };
          console.log("Cadastrando uzer", uzer);
          alert("Cadastrando uzer" + uzer);
          break;
        default:
          setSubmitButtonContent("Finalizar")
          setErrorMessage("Não foi possivel cadastrar o usuário")
          setShowErrorModal(true)
      }
    } else {
      setSubmitButtonContent("Finalizar")
      setErrorMessage("Tente Novamente")
      setShowErrorModal(true)
    }
  }
  return (
    <form className="bg-white rounded-3xl py-4 px-8 max-w-full min-h-[95%] max-h-full w-[45%] flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-between gap-4">
        <h1 className="font-extrabold text-3xl my-0">CADASTRO</h1>
        <UserCards userType={userType} setUserType={setUserType} />
        <div className="w-4/5 flex items-center justify-between gap-4">
          <Button className="w-1/4 h-full flex justify-center items-center py-3" handleClick={() => setStep(prevState => prevState === 1 ? 1 : prevState - 1)}>
            Anterior
          </Button>
          <Button className="w-1/4 h-full flex justify-center items-center py-3" handleClick={() => setStep(prevState => prevState + 1)}>
            {userType === "cliente" && step === 3 || userType === "uzer" && step === 4 ? submitButtonContent : "Próximo"}
          </Button>
        </div>
      </div>
    </form>
  )
}
