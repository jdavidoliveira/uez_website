"use client"

import { Loader2, Pencil, Save } from "lucide-react"
import Image from "next/image"
import ConfirmModal from "./ConfirmModal"
import { useState } from "react"
import { useFetch as myUseFetch } from "@/hooks/useFetch"
import api from "@/hooks/api"
import { parseCookies } from "nookies"
import ClienteInterface from "@/types/Cliente"
import CardPedido from "./CardPedido"
import Pedido from "@/types/Pedido"
import HistoricoUzers from "./HistoricoUzers"
import Avaliacao from "../../../components/layout/Avaliacao"

export default function Editpage({
  clienteData: { photoUrl, nome, bannerImage, _id, avaliacao },
  pedidos,
}: {
  clienteData: ClienteInterface
  pedidos: Pedido[]
}) {
  const [nomeValue, setNomeValue] = useState<string>(nome)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [photoUrlValue, setPhotoUrlValue] = useState<string>(photoUrl)
  const [saved, setSaved] = useState<boolean>(false)

  function changePhoto() {
    setModalInfo({
      title: "Mudar foto de perfil",
      label: "Escolha uma imagem:",
      valueSetter: setImageFile,
      prevValue: imageFile,
      type: "image",
    })
    setShowModal(true)
  }

  function changeName() {
    setModalInfo({
      title: "Mudar nome",
      label: "Novo nome:",
      valueSetter: setNomeValue,
      prevValue: nome,
    })
    setShowModal(true)
  }

  const [modalInfo, setModalInfo] = useState<any>({
    title: "Escolha um",
    label: "Digite aqui:",
    valueSetter: "",
    prevValue: "",
    type: "text",
  })

  async function saveData() {
    setIsSaving(true)
    if (nomeValue !== nome) {
      await api
        .put(`/clientes/${_id}`, { nome: nomeValue })
        .then((res) => {
          setIsSaving(false)
          nome = nomeValue
          alert("Nome atualizado!")
        })
        .catch((error) => {
          setIsSaving(false)
          console.error(error)
        })
    }
    if (imageFile !== null) {
      const formData = new FormData()
      formData.append("profilephoto", imageFile)
      await api
        .post(`/clientes/profilephoto`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${parseCookies().uezaccesstoken}`,
          },
        })
        .then((res) => {
          setIsSaving(false)
          // photoUrl = photoUrlValue
          alert("Foto atualizada!")
        })
        .catch((error) => {
          setIsSaving(false)
          console.error(error)
        })
    }
    setIsSaving(false)
    setSaved(true)
  }

  const [showModal, setShowModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  return (
    <>
      {showModal && (
        <ConfirmModal
          title={modalInfo.title}
          label={modalInfo.label}
          valueSetter={modalInfo.valueSetter}
          closeButtonFunction={() => setShowModal(false)}
          prevValue={modalInfo.prevValue}
          type={modalInfo.type}
        />
      )}
      <section className="w-full flex flex-col md:pt-24 items-center justify-center animate-transitionY">
        <div className="bg-cinzero w-10/12 mobile:w-full desktop:w-full mdscreen:w-full relative">
          <div className="w-full h-64 group flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition relative">
            <Image
              fill
              src={bannerImage}
              className="transition object-cover object-center rounded-xl"
              alt="Imagem ilustrativa"
            />
            <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">
              Mudar Banner
            </h1>
          </div>
          <div
            title="Mudar foto de perfil"
            onClick={changePhoto}
            className="w-32 h-32 aspect-square rounded-full bg-cinzero absolute -bottom-10 left-5 shadow-lg group flex items-center justify-center transition-colors cursor-pointer"
          >
            <Image
              fill
              src={photoUrl}
              className="rounded-full object-cover aspect-square group-hover:opacity-30 transition-colors bg-cinzero"
              alt="Imagem de perfil"
            />
            <Pencil size={30} className="hidden group-hover:block transition-colors z-50 text-azulao" />
            <div className="md:hidden bg-azulao rounded-full absolute hover:bg-roxazul bottom-0 right-0 p-2 flex items-center justify-center">
              <Pencil size={24} className="transition-colors z-50 text-white" />
            </div>
          </div>
        </div>
        <div className="w-10/12 flex items-center mt-24 mb-10 mobile:mb-4 justify-between desktop:flex-col mobile:flex-col mdscreen:flex-col">
          <div className="flex-1 flex flex-col items-start self-start pl-2">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2" title="Mudar nome" onClick={changeName}>
              {nome} <Pencil size={20} className="text-azulao cursor-pointer" />
            </h1>
            <Avaliacao rating={avaliacao} />
          </div>
        </div>
      </section>
      <section className="w-11/12 h-full flex flex-col md:flex-row items-start justify-center animate-transitionY p-10 gap-4">
        <HistoricoUzers pedidos={pedidos} />
        <div className="md:w-1/2 w-full bg-white shadow-2xl rounded-3xl p-4 flex flex-col items-center">
          <h1 className="text-2xl mt-4 font-bold mb-4">Histórico de serviços</h1>
          {pedidos.map((pedido, index) => (
            <CardPedido
              idPedido={pedido._id}
              key={index}
              valor={pedido.valor}
              descricao={pedido.descricao}
              titulo={pedido.titulo}
              _id_uzer={pedido._id_uzer}
              status={pedido.status}
              disponivel={pedido.disponivel}
            />
          ))}
        </div>
      </section>
      {(nome !== nomeValue || imageFile !== null) && !saved && (
        <div
          className="group fixed bottom-5 left-10 rounded-full bg-azulao p-4 cursor-pointer animate-bounce"
          title="Salvar alterações"
          onClick={saveData}
        >
          {isSaving ? (
            <Loader2 size={30} color="white" className="text-azulao mx-auto animate-spin" />
          ) : (
            <>
              <div className="hidden font-bold text-base group-hover:flex flex-col items-center p-2 text-white">
                <h1 className="font-bold text-base">Alterações:</h1>
                {nome !== nomeValue && <h1 className="font-bold text-base text-yellow-300">Nome</h1>}
                {imageFile !== null && <h1 className="font-bold text-base text-yellow-300">Foto</h1>}
              </div>
              <Save size={30} color="white" className="text-azulao mx-auto group-hover:hidden" />
            </>
          )}
        </div>
      )}
    </>
  )
}
