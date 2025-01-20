"use client"

import { Pencil, Upload } from "lucide-react"
import { toast } from "sonner"
import Modal from "react-modal"
import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { AxiosError } from "axios"
import Image from "next/image"

Modal.setAppElement("body")

interface EditImageButtonProps {
  userId: string
  isImage?: boolean
}

export function EditImageButton({ userId, isImage }: EditImageButtonProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  function handleEdit(e: FormEvent) {
    e.preventDefault()
    setModalIsOpen(true)
  }

  async function handleConfirm() {
    if (selectedImage) {
      try {
        const formData = new FormData()
        formData.append("image", selectedImage)
        toast.loading("Enviando imagem...", {
          description: "Pode demorar um pouco.",
        })

        const response = await api.patch(`/users/${isImage ? "image" : "banner"}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.dismiss()

        toast(response.data.message || "Imagem editada com sucesso!", {
          description: "Pode demorar um pouco até que as alterações sejam visiveis.",
        })
        setModalIsOpen(false)
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message)
        }
      }
    }
  }

  return (
    <>
      <button
        onClick={handleEdit}
        className="absolute inset-0 flex transform-gpu flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <Pencil className="text-white" size={25} />
        <p className="mt-2 text-sm font-semibold text-white">Editar</p>
      </button>
      <Modal
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        className="mx-auto flex max-w-md scale-100 transform flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-lg transition-transform duration-300"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2 className="text-lg font-medium">Escolha uma imagem para upload</h2>
        <input className="hidden" type="file" id="imageforupload" accept="image/*" onChange={handleImageChange} />
        {previewImage && <Image src={previewImage} alt="Preview" width={1920} height={1080} />}
        {!selectedImage && (
          <label
            htmlFor="imageforupload"
            title="Escolher/Trocar imagem"
            className="rounded-lg bg-primary-purple p-2 text-white transition-opacity duration-200 hover:bg-primary-purple/75"
          >
            <Upload />
          </label>
        )}
        {selectedImage && (
          <div className="flex items-center gap-3">
            <label
              htmlFor="imageforupload"
              className="mx-auto flex items-center gap-2 rounded-md bg-primary-purple p-2 text-white"
            >
              <Upload />
            </label>
            <span>ou</span>
            <button className="mx-auto rounded-md bg-primary-blue p-2 text-white" onClick={handleConfirm}>
              Confirmar
            </button>
          </div>
        )}
      </Modal>
    </>
  )
}
