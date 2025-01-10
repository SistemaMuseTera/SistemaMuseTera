import { getPatient, getPatientSessions } from '@/lib/api'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default async function PatientPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [patient, sessions] = await Promise.all([
    getPatient(id),
    getPatientSessions(id),
  ])

  if (!patient) {
    return <div>Paciente não encontrado</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho do paciente */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <span className="text-gray-500">Data de Nascimento</span>
            <p>{new Date(patient.date_of_birth).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-500">Contato</span>
            <p>{patient.contact}</p>
          </div>
          <div>
            <span className="text-gray-500">Status</span>
            <p className="capitalize">{patient.status}</p>
          </div>
        </div>
      </div>

      {/* Seção de Sessões */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sessões</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Nova Sessão
          </button>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <CalendarIcon className="w-5 h-5" />
                    {new Date(session.date).toLocaleDateString()}
                    <ClockIcon className="w-5 h-5 ml-2" />
                    {session.duration} minutos
                  </div>
                  {session.notes && (
                    <p className="text-gray-600">{session.notes}</p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    session.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : session.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {session.status === 'completed'
                    ? 'Concluída'
                    : session.status === 'cancelled'
                    ? 'Cancelada'
                    : 'Agendada'}
                </span>
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma sessão registrada ainda
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
