'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { ANAMNESE_QUESTIONS, AnamneseFormData } from '@/types/anamnese'
import { Patient } from '@/types'

interface AnamneseFormProps {
  patient: Patient
  onSubmit: (data: AnamneseFormData) => void
  initialData?: AnamneseFormData
}

export function AnamneseForm({ patient, onSubmit, initialData }: AnamneseFormProps) {
  const [formData, setFormData] = useState<AnamneseFormData>(initialData || {
    patientId: patient.id,
    respostas: {},
    observacoes: ''
  })

  const [editMode, setEditMode] = useState(!initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      respostas: {
        ...prev.respostas,
        [questionId]: value
      }
    }))
  }

  const renderQuestion = (question: typeof ANAMNESE_QUESTIONS[0]) => {
    const value = formData.respostas[question.id]

    switch (question.type) {
      case 'single':
        return (
          <select
            className="w-full p-2 border rounded-lg"
            value={value as string || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            disabled={!editMode}
          >
            <option value="">Selecione...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'multiple':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const currentValue = Array.isArray(value) ? value : []
                    const newValue = e.target.checked
                      ? [...currentValue, option]
                      : currentValue.filter(v => v !== option)
                    handleInputChange(question.id, newValue)
                  }}
                  disabled={!editMode}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'text':
        return (
          <textarea
            className="w-full p-2 border rounded-lg"
            value={value as string || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            disabled={!editMode}
            rows={3}
          />
        )

      default:
        return null
    }
  }

  const categories = {
    historico_medico: 'Histórico Médico',
    historico_musical: 'Histórico Musical',
    desenvolvimento: 'Desenvolvimento',
    comportamento: 'Comportamento',
    social: 'Social'
  }

  const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
              <div className="mt-1 space-y-1">
                <p className="text-sm text-gray-600">
                  Idade: {calculateAge(patient.dateOfBirth)} anos
                </p>
                <p className="text-sm text-gray-600">
                  Data de Nascimento: {new Date(patient.dateOfBirth).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Contato: {patient.contactInfo.phone}
                </p>
              </div>
            </div>
            {initialData && (
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                {editMode ? 'Concluir Edição' : 'Editar'}
              </button>
            )}
          </div>
        </div>
      </Card>

      {Object.entries(categories).map(([category, title]) => (
        <Card key={category}>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            <div className="space-y-6">
              {ANAMNESE_QUESTIONS
                .filter(q => q.category === category)
                .map((question) => (
                  <div key={question.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {question.question}
                    </label>
                    {renderQuestion(question)}
                  </div>
                ))}
            </div>
          </div>
        </Card>
      ))}

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Observações Gerais</h3>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={formData.observacoes || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
            disabled={!editMode}
            rows={4}
          />
        </div>
      </Card>

      {editMode && (
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setFormData({ patientId: patient.id, respostas: {}, observacoes: '' })}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Salvar
          </button>
        </div>
      )}
    </form>
  )
} 