'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import { Agendamento, AgendamentoFormData } from '@/types/agenda'

interface AgendamentoModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  selectedEvent: Agendamento | null
  onSave: (data: AgendamentoFormData) => void
  onUpdate: (id: string, data: Partial<Agendamento>) => void
}

export function AgendamentoModal({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  onSave,
  onUpdate
}: AgendamentoModalProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState<AgendamentoFormData>({
    patientId: '',
    data: '',
    horario: '',
    duracao: 50,
    tipo: 'sessao',
    observacoes: ''
  })

  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        data: selectedDate.toISOString().split('T')[0],
        horario: selectedDate.toTimeString().slice(0, 5)
      }))
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        patientId: selectedEvent.patientId,
        data: selectedEvent.start.toISOString().split('T')[0],
        horario: selectedEvent.start.toTimeString().slice(0, 5),
        duracao: (selectedEvent.end.getTime() - selectedEvent.start.getTime()) / 60000,
        tipo: selectedEvent.tipo,
        observacoes: selectedEvent.observacoes || ''
      })
    }
  }, [selectedEvent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEvent) {
      onUpdate(selectedEvent.id, {
        start: new Date(`${formData.data}T${formData.horario}`),
        end: new Date(new Date(`${formData.data}T${formData.horario}`).getTime() + formData.duracao * 60000),
        tipo: formData.tipo,
        observacoes: formData.observacoes
      })
    } else {
      onSave(formData)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-lg shadow-xl">
          <div className="p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {selectedEvent ? 'Editar Agendamento' : 'Novo Agendamento'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paciente
                </label>
                <PatientSelect
                  onSelect={(patient) => {
                    setSelectedPatient(patient)
                    setFormData(prev => ({ ...prev, patientId: patient?.id || '' }))
                  }}
                  selectedId={formData.patientId}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData(prev => ({ ...prev, horario: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as any }))}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="sessao">Sessão</option>
                    <option value="avaliacao">Avaliação</option>
                    <option value="reavaliacao">Reavaliação</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    value={formData.duracao}
                    onChange={(e) => setFormData(prev => ({ ...prev, duracao: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg"
                    min="15"
                    max="180"
                    step="5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {selectedEvent ? 'Atualizar' : 'Agendar'}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 