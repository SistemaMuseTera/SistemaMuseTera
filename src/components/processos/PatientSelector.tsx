'use client'

import { useState, useEffect } from 'react'
import { Patient } from '@/types'

interface PatientSelectorProps {
  onSelect: (patient: Patient) => void
  selectedId?: string
}

export function PatientSelector({ onSelect, selectedId }: PatientSelectorProps) {
  const [patients, setPatients] = useState<Patient[]>([
    // Dados mockados para exemplo
    {
      id: '1',
      name: 'João Silva',
      dateOfBirth: new Date('2018-01-01'),
      contactInfo: { phone: '11999999999' },
      therapistId: '1',
      status: 'active',
      createdAt: new Date()
    },
    // ... mais pacientes
  ])

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Selecione o Paciente
      </label>
      <select
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={selectedId || ''}
        onChange={(e) => {
          const patient = patients.find(p => p.id === e.target.value)
          if (patient) onSelect(patient)
        }}
      >
        <option value="">Selecione...</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>
    </div>
  )
} 