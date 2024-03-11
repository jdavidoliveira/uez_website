"use client"
import { useEffect, useState } from "react"

export default function Cronometro() {
  const dataAtual = Number(new Date())
  const dataFinal = Number(new Date("April 10, 2024 00:00:00"))

  const [tempoRestante, setTempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const diferenca = Math.floor((dataFinal - dataAtual) / 1000) // diferença em segundos

      const dias = Math.floor(diferenca / 86400)
      const horas = Math.floor((diferenca % 86400) / 3600)
      const minutos = Math.floor((diferenca % 3600) / 60)
      const segundos = diferenca % 60

      setTempoRestante({
        dias,
        horas,
        minutos,
        segundos,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, []) // Executar o efeito apenas uma vez ao montar o componente

  return (
    <div className="flex items-end justify-center my-20 relative">
      <h1 className="text-2xl font-bold h-full md:flex items-center justify-center mr-6 absolute -left-36 hidden">
        FALTAM:
      </h1>
      <Par data={tempoRestante.dias} title="Dias" />
      <DoisPontos />
      <Par data={tempoRestante.horas} title="Horas" />
      <DoisPontos />
      <Par data={tempoRestante.minutos} title="Minutos" />
    </div>
  )

  function Par({ data, title }: { data: number | string; title?: string }) {
    const [first, setFirst] = useState(data.toString().substring(0, 1))
    const [second, setSecond] = useState(data.toString().substring(1, 2))

    useEffect(() => {
      if (data.toString().length > 1) {
        setFirst(data.toString().substring(0, 1))
        setSecond(data.toString().substring(1, 2))
      } else {
        setFirst("0")
        setSecond(data.toString())
      }
    }, [data])

    return (
      <div className="flex flex-col items-center justify-center relative">
        <span className="md:text-3xl text-2xl font-medium mb-2 absolute -top-10">{title || "Dias"}</span>
        <div className="grid grid-cols-2 md:gap-4 gap-2">
          <div className="py-4 px-5 bg-[#535FFF] rounded-xl text-white font-bold text-4xl flex justify-center items-center">
            {first}
          </div>
          <div className="py-4 px-5 bg-[#535FFF] rounded-xl text-white font-bold text-4xl flex justify-center items-center">
            {second}
          </div>
        </div>
      </div>
    )
  }

  function DoisPontos() {
    return (
      <div className="h-full font-bold flex flex-col sm:gap-8 gap-6 items-center justify-center md:mx-6 sm:mx-4 mx-3">
        <div className="w-3 h-3 bg-black rounded-full"></div>
        <div className="w-3 h-3 bg-black rounded-full"></div>
      </div>
    )
  }
}
