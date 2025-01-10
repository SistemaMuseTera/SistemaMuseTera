import { getPatients } from '@/lib/api'
import PatientList from '@/components/PatientList'

export default async function PatientsPage() {
  const patients = await getPatients()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pacientes</h1>
      <PatientList patients={patients} />
    </div>
  )
}
