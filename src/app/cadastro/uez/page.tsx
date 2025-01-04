import { api } from "@/lib/serverapi"
import Step1 from "./Step1"
import { Profession, Speciality } from "@/types/Speciality"
import Loading from "@/app/loading"

export default async function CadastroComUez() {
  const searchOfProfessions = await api.get<Profession[]>("/professions", {
    next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
  })

  const searchOfSpecialities = await api.get<Speciality[]>("/specialities", {
    next: { revalidate: 60 * 60 * 24 * 1 }, // 1 day in seconds
  })

  if (!searchOfProfessions.ok || !searchOfSpecialities.ok) return <Loading />

  return <Step1 professions={searchOfProfessions.data} specialities={searchOfSpecialities.data} />
}
