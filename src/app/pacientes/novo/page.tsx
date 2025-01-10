'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Patient } from '@/types'
import { usePatients } from '@/hooks/usePatients'

export default function NovoPacientePage() {
  const router = useRouter()
  const { addPatient } = usePatients()
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newPatient: Patient = {
      id: crypto.randomUUID(),
      name: formData.name,
      dateOfBirth: new Date(formData.dateOfBirth),
      contactInfo: {
        phone: formData.phone,
      },
      therapistId: '1',
      status: 'active',
      createdAt: new Date()
    }

    addPatient(newPatient)
    router.push('/pacientes')
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <Card>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="border-b pb-3">
            <h2 className="text-xl font-semibold">Novo Paciente</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                required
                placeholder="(00) 00000-0000"
                className="w-full p-2 border rounded-lg"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
} 