'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { 
  CalendarIcon, 
  ClockIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function DetalhePacientePage() {
  const params = useParams()
  const id = params.id

  // Aqui você buscaria os dados do paciente usando o ID
  const patient = {
    id,
    name: 'João Silva',
    dateOfBirth: new Date('1990-01-01'),
    contactInfo: {
      email: 'joao@email.com',
      phone: '(11) 99999-9999'
    },
    status: 'active',
    lastSession: new Date('2024-03-15'),
    nextSession: new Date('2024-03-22')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{patient.name}</h1>
        <Link
          href={`/pacientes/${id}/editar`}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <PencilIcon className="h-5 w-5" />
          Editar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Data de Nascimento</dt>
                <dd>{patient.dateOfBirth.toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd>{patient.contactInfo.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Telefone</dt>
                <dd>{patient.contactInfo.phone}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sessões</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Última Sessão</p>
                  <p>{patient.lastSession.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Próxima Sessão</p>
                  <p>{patient.nextSession.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 