import { SlidersHorizontal, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import * as Slider from "@radix-ui/react-slider"
import * as Switch from "@radix-ui/react-switch"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

const maxValue = 500
const minValue = 1

export default function FilterButton() {
  const [showModal, setShowModal] = useState(false)
  const [values, setValues] = useState([50, 200])

  const form = useForm()
  const searchParams = useSearchParams()
  const [toMatch, setToMatch] = useState(false)

  useEffect(() => {
    const minValueParam = searchParams.get("minValue")
    const maxValueParam = searchParams.get("maxValue")
    const toMatchParam = searchParams.get("toMatch") === "true"
    const professionParam = searchParams.get("profession")
    const specialityParam = searchParams.get("speciality")

    if (minValueParam && maxValueParam) {
      setValues([parseInt(minValueParam, 10), parseInt(maxValueParam, 10)])
    }
    setToMatch(toMatchParam)
    if (professionParam) form.setValue("profession", professionParam)
    if (specialityParam) form.setValue("speciality", specialityParam)
  }, [searchParams, form.setValue])

  const handleSubmit = form.handleSubmit(async (data) => {
    data = { ...data, minValue: values[0], maxValue: values[1], toMatch: !!toMatch }
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString())
        if (key === "toMatch" && value.toString() === "true") {
          params.delete("maxValue")
          params.delete("minValue")
        }
      } else {
        params.delete(key)
      }
    })
    const queryString = params.toString()
    const newUrl = `${window.location.pathname}?${queryString}`
    window.history.pushState(null, "", newUrl)
    window.location.reload()
  })

  return (
    <>
      <button
        onClick={() => setShowModal((prev) => !prev)}
        className="flex items-center justify-center gap-2 rounded-md border px-4 py-3 shadow-lg"
      >
        <span className="font-bold">Filtro</span>
        <SlidersHorizontal />
      </button>
      {showModal && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-0 flex min-h-96 min-w-72 items-center justify-center rounded-xl border bg-gray-50 shadow"
        >
          <X className="absolute right-2 top-2 size-7 cursor-pointer" onClick={() => setShowModal(false)} />
          <div className="flex flex-col items-center justify-center gap-8">
            <div
              className={twMerge(
                "flex w-full flex-col items-center justify-center gap-2",
                toMatch && "opacity-60 grayscale",
              )}
            >
              <label className="mt-2 font-semibold">
                Faixa de preço: R${values[0]} - R${values[1]}
              </label>
              <Slider.Root
                value={values}
                onValueChange={(newValue) => setValues(newValue)}
                min={minValue}
                max={maxValue}
                step={1}
                disabled={toMatch}
                className="relative flex h-5 w-10/12 items-center disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed"
              >
                <Slider.Track className="relative h-1.5 flex-1 rounded-full bg-black disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed">
                  <Slider.Range className="absolute h-full rounded-full bg-primary-purple disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed" />
                </Slider.Track>
                <Slider.Thumb
                  className="block size-6 rounded-full bg-primary-gray shadow disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed"
                  aria-label="Min value"
                />
                <Slider.Thumb
                  className="block size-6 rounded-full bg-primary-gray shadow disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed"
                  aria-label="Max value"
                />
              </Slider.Root>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold">A combinar</span>
              <Switch.Root
                checked={toMatch}
                onCheckedChange={() => setToMatch((prev) => !prev)}
                className="relative flex h-6 w-12 items-center rounded-full bg-primary-dark-blue shadow-xl outline-none data-[state=checked]:bg-primary-purple"
              >
                <Switch.Thumb className="block size-6 -translate-x-1 rounded-full bg-white shadow-xl outline-none transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-7" />
              </Switch.Root>
            </div>
            <div className="flex w-full flex-col items-center justify-between gap-2">
              <input
                {...form.register("profession")}
                type="text"
                id="profissao"
                placeholder="Profissão"
                className="w-full rounded-md border px-2 py-1 font-semibold shadow"
              />
              <input
                {...form.register("speciality")}
                type="text"
                placeholder="Especialidade"
                id="especialidade"
                className="w-full rounded-md border px-2 py-1 font-semibold shadow"
              />
            </div>
            <button className="mt-6 rounded-md bg-gradient-to-r from-primary-blue to-primary-purple px-4 py-1.5 text-white">
              Aplicar
            </button>
          </div>
        </motion.form>
      )}
    </>
  )
}
