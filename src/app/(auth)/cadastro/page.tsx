'use client'

import React, { useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useSearchParams } from 'next/navigation';
import UserCards from './UserCards';
import Button from '@/components/layout/Button/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/Modal/Modal';

const userFormSchema = z.object({
  nome: z.string(),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email('Formato de e-mail inválido'),
  senha: z.string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter mais de 6 caracteres")
    .max(24, "A senha deve ter menos de 24 caracteres"),
  cpf: z.string()
    .nonempty("O CPF é obrigatório"),
  telefone: z.string()
    .nonempty("O telefone é obrigatório"),
  cep: z.string()
    .nonempty("O CEP é obrigatório"),
  endereco: z.object({
    logradouro: z.string()
      .nonempty("O logradouro é obrigatório"),
    numero: z.string()
      .nonempty("O número é obrigatório"),
    complemento: z.string()
      .optional(),
    bairro: z.string()
      .nonempty("O bairro é obrigatório"),
    cidade: z.string()
      .nonempty("A cidade é obrigatória"),
    estado: z.string()
      .nonempty("O estado é obrigatório"),
  }),
  tipoServico: z.array(z.string()),
  areaAtuacao: z.number(),
  categoriaServico: z.string(),
  nomeServico: z.string(),
})

type userFormData = z.infer<typeof userFormSchema>

export default function Cadastro() {

  const { get } = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm<userFormData>({
    /* @ts-ignore */
    resolver: zodResolver(userFormSchema)
  })

  const [userType, setUserType] = useState<"cliente" | "uzer" | "null" | string>(get("userType") || "null");
  const [formStep, setFormStep] = useState<number>(1);

  // const [email, setEmail] = useState("");
  // const [nome, setNome] = useState("");
  // const [cpf, setCpf] = useState("");
  // const [rg, setRg] = useState("");
  // const [senha, setSenha] = useState("");
  // const [telefone, setTelefone] = useState("");
  // const [cep, setCep] = useState("");
  // const [endereco, setEndereco] = useState({
  //   logradouro: "",
  //   numero: "",
  //   complemento: "",
  //   bairro: "",
  //   cidade: "",
  //   estado: "",
  // });
  // const [dataNasc, setDataNasc] = useState("");
  // const [tipoServico, setTipoServico] = useState([]);
  // const [areaAtuacao, setAreaAtuacao] = useState(1);
  // const [categoriaServico, setCategoriaServico] = useState("");
  // const [nomeServico, setNomeServico] = useState("");

  // const [categoriaServicosArray, setCategoriaServicosArray] = useState([{ "nomeCategoria": "Carregando..." }]);
  // const [servicosArray, setServicosArray] = useState([{ "nomeServico": "Selecione uma categoria" }]);

  const [submitButtonContent, setSubmitButtonContent] = useState<any>("Finalizar")

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('null');
  const [haveButton, setHaveButton] = useState(true)

  function toggleModal(message: string, hasButton: boolean = true) {
    setModalMessage(message)
    setHaveButton(hasButton)
    setShowModal(prevState => !prevState)
  }

  return (
    <form className="bg-white rounded-3xl py-4 px-8 max-w-full min-h-[95%] w-[45%] flex flex-col items-center justify-center mobile:w-full">
      <div className="w-full h-full flex flex-col items-center justify-between gap-4">
        <h1 className="font-extrabold text-3xl my-0">CADASTRO</h1>
        {formStep === 1 && (
          <div className="flex flex-col items-center justify-center gap-4 w-11/12 animate-transitionX">
            <div className="flex flex-col items-center justify-center w-full">
              <label htmlFor="nome" title="Nome" className="self-start text-base font-medium">
                Nome:
              </label>
              <div className="flex items-center w-full h-10">
                <input
                  className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none ${errors.nome && "border-2 rounded border-red-500"}`}
                  type="text"
                  id="nome"
                  maxLength={200}
                  {...register("nome")}

                />
              </div>
              {errors.senha && <span className="font-medium text-xs self-start my-1">{errors.senha.message}</span>}
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <label htmlFor="email" title="E-mail" className="self-start text-base font-medium">
                E-mail:
              </label>
              <div className="flex items-center w-full h-10">
                <input
                  className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none ${errors.email && "border-2 rounded border-red-500"}`}
                  type="text"
                  id="email"
                  maxLength={200}
                  placeholder="example@gmail.com"
                  {...register("email")}
                />
              </div>
              {errors.email && <span className="font-medium text-xs self-start my-1">{errors.email.message}</span>}
            </div>
            <UserCards userType={userType} setUserType={setUserType} />
          </div>
        )}
        {formStep === 2 && (
          <div className="flex flex-col items-center justify-center gap-4 w-11/12 animate-transitionX">
            <div className="flex flex-col items-center justify-center w-full">
              <label htmlFor="nome" title="Nome" className="self-start text-base font-medium">
                Nome:
              </label>
              <div className="flex items-center w-full h-10">
                <input
                  className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none ${errors.nome && "border-2 rounded border-red-500"}`}
                  type="text"
                  id="nome"
                  maxLength={200}
                  {...register("nome")}

                />
              </div>
              {errors.senha && <span className="font-medium text-xs self-start my-1">{errors.senha.message}</span>}
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <label htmlFor="email" title="E-mail" className="self-start text-base font-medium">
                E-mail:
              </label>
              <div className="flex items-center w-full h-10">
                <input
                  className={`bg-cinzero w-full h-10 font-medium text-base px-3 py-2 outline-none ${errors.email && "border-2 rounded border-red-500"}`}
                  type="text"
                  id="email"
                  maxLength={200}
                  placeholder="example@gmail.com"
                  {...register("email")}
                />
              </div>
              {errors.email && <span className="font-medium text-xs self-start my-1">{errors.email.message}</span>}
            </div>
            <UserCards userType={userType} setUserType={setUserType} />
          </div>
        )}
        <div className="w-4/5 flex items-center justify-between gap-4">
          <Button className="w-1/4 flex justify-center items-center py-2 px-4" handleClick={() => setFormStep(prevState => prevState === 1 ? 1 : prevState - 1)}>
            Anterior
          </Button>
          <Button className="w-1/4 flex justify-center items-center py-2 px-4" handleClick={() => {

            setFormStep(prevState => prevState + 1)
          }}>
            {userType === "cliente" && formStep === 3 || userType === "uzer" && formStep === 4 ? submitButtonContent : "Próximo"}
          </Button>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} handleClick={() => setShowModal(false)} noButton={!haveButton} />}
    </form>
  )
}
