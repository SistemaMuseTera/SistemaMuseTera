'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import Link from 'next/link'
import { ReavaliacaoQuestion, REAVALIACAO_QUESTIONS } from '@/types/reavaliacao'
import { ReavaliacaoPDF } from '@/components/processos/ReavaliacaoPDF'
import { useReavaliacoes } from '@/hooks/useReavaliacoes'

export default function ReavaliacaoPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Reavaliação Musicoterapêutica</h1>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <PatientSelect
                    onSelect={setSelectedPatient}
                    selectedId={selectedPatient?.id}
                  />
                </div>
                <Link
                  href="/pacientes/novo"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Novo Paciente
                </Link>
              </div>
            </div>

            {selectedPatient && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Reavaliação de {selectedPatient.name}
                </h2>
                <ReavaliacaoForm patient={selectedPatient} />
              </div>
            )}

            {!selectedPatient && (
              <div className="text-center py-6 text-gray-500">
                Selecione um paciente para iniciar a reavaliação musicoterapêutica
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

function ReavaliacaoForm({ patient }: { patient: Patient }) {
  const router = useRouter()
  const { addReavaliacao } = useReavaliacoes()
  const [formData, setFormData] = useState<Record<string, string | string[]>>({})
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const reavaliacaoData = {
        patientId: patient.id,
        respostas: formData,
        observacoes: formData.observacoes as string
      }

      addReavaliacao(reavaliacaoData)
      alert('Reavaliação salva com sucesso!')
      router.push('/pacientes')
    } catch (error) {
      console.error('Erro ao salvar reavaliação:', error)
      alert('Erro ao salvar reavaliação. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      evolucao_musical: 'Evolução Musical',
      evolucao_comportamental: 'Evolução Comportamental',
      evolucao_social: 'Evolução Social',
      objetivos: 'Objetivos',
      recomendacoes: 'Recomendações'
    }
    return translations[category] || category
  }

  // Agrupa as questões por categoria
  const questionsByCategory = REAVALIACAO_QUESTIONS.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {} as Record<string, ReavaliacaoQuestion[]>)

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {Object.entries(questionsByCategory).map(([category, questions]) => (
        <Card key={category}>
          <div className="p-3">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {translateCategory(category)}
            </h3>
            <div className="space-y-3">
              {questions.map((question) => (
                <div key={question.id} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {question.question}
                  </label>
                  {question.type === 'text' && (
                    <textarea
                      className="w-full p-1.5 border rounded-md resize-none text-sm"
                      rows={2}
                      value={formData[question.id] as string || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder="Digite aqui..."
                    />
                  )}
                  {question.type === 'multiple' && (
                    <div className="grid grid-cols-2 gap-1.5 text-sm">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={Array.isArray(formData[question.id]) && formData[question.id].includes(option)}
                            onChange={(e) => {
                              const currentValue = Array.isArray(formData[question.id]) ? formData[question.id] : []
                              const newValue = e.target.checked
                                ? [...currentValue, option]
                                : currentValue.filter(v => v !== option)
                              handleInputChange(question.id, newValue)
                            }}
                            className="rounded border-gray-300 h-3.5 w-3.5"
                          />
                          <span className="text-gray-700 text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === 'escala' && (
                    <div className="flex gap-2">
                      {question.options?.map((valor) => (
                        <label key={valor} className="flex items-center gap-1">
                          <input
                            type="radio"
                            name={question.id}
                            value={valor}
                            checked={formData[question.id] === valor}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            className="sr-only"
                          />
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full border
                            ${formData[question.id] === valor
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {valor}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <ReavaliacaoPDF 
          patient={patient}
          data={formData}
        />
      </div>
    </form>
  )
} 