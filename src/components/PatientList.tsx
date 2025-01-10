'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Patient } from '@/types/database.types'
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline'

interface PatientListProps {
  patients: Patient[]
}

export default function PatientList({ patients }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Barra de pesquisa e botão de adicionar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar pacientes..."
          className="flex-1 p-2 border rounded-lg w-full sm:w-auto text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href="/patients/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 w-full sm:w-auto"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Novo Paciente</span>
        </Link>
      </div>

      {/* Lista de pacientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Link
            key={patient.id}
            href={`/patients/${patient.id}`}
            className="block p-4 border rounded-lg hover:border-blue-500 transition-colors hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <UserCircleIcon className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">{patient.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {new Date(patient.date_of_birth).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <span className={`
                text-xs sm:text-sm 
                px-2 py-1 rounded-full 
                ${patient.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'}
              `}>
                {patient.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
          {searchTerm 
            ? 'Nenhum paciente encontrado com este termo de busca'
            : 'Nenhum paciente cadastrado ainda'}
        </div>
      )}
    </div>
  )
}
