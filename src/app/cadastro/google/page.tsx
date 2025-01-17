import { Step1 } from "./Step1"
import Loading from "@/app/loading"
import { getProfessionsWithSpecialities } from "@/actions/getProfessions"

export default async function CadastroComGoogle() {
  const { professions, specialities } = await getProfessionsWithSpecialities()

  if (!professions || !specialities) return <Loading />

  return <Step1 professions={professions} specialities={specialities} />
}
