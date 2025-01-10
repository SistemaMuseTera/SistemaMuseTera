'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/Card'
import { AgendamentoModal } from '@/components/agenda/AgendamentoModal'
import { useAgendamentos } from '@/hooks/useAgendamentos'
import { Agendamento } from '@/types/agenda'

const Calendario = dynamic(
  () => import('@/components/agenda/Calendario').then(mod => mod.Calendario),
  { ssr: false }
)

export default function AgendaPage() {
  const { agendamentos, addAgendamento, updateAgendamento } = useAgendamentos()
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Agendamento | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedSlot(start)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleSelectEvent = (event: Agendamento) => {
    setSelectedEvent(event)
    setSelectedSlot(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSlot(null)
    setSelectedEvent(null)
  }

  return (
    <div className="p-6">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Agenda</h1>
          
          <div style={{ height: 'calc(100vh - 250px)' }}>
            <Calendario
              agendamentos={agendamentos}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </Card>

      <AgendamentoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedSlot}
        selectedEvent={selectedEvent}
        onSave={addAgendamento}
        onUpdate={updateAgendamento}
      />
    </div>
  )
} 