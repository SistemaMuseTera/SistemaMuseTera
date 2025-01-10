'use client'

import { useState, useEffect } from 'react'
import { Agendamento, AgendamentoFormData } from '@/types/agenda'

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  useEffect(() => {
    const savedAgendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    setAgendamentos(savedAgendamentos.map((ag: any) => ({
      ...ag,
      start: new Date(ag.start),
      end: new Date(ag.end)
    })))
  }, [])

  const addAgendamento = (data: AgendamentoFormData) => {
    const start = new Date(`${data.data}T${data.horario}`)
    const end = new Date(start.getTime() + data.duracao * 60000)

    const newAgendamento: Agendamento = {
      id: crypto.randomUUID(),
      patientId: data.patientId,
      title: `${data.tipo.charAt(0).toUpperCase() + data.tipo.slice(1)}`,
      start,
      end,
      status: 'agendado',
      observacoes: data.observacoes,
      tipo: data.tipo
    }

    const updatedAgendamentos = [...agendamentos, newAgendamento]
    localStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos))
    setAgendamentos(updatedAgendamentos)
  }

  const updateAgendamento = (id: string, data: Partial<Agendamento>) => {
    const updatedAgendamentos = agendamentos.map(ag => 
      ag.id === id ? { ...ag, ...data } : ag
    )
    localStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos))
    setAgendamentos(updatedAgendamentos)
  }

  const deleteAgendamento = (id: string) => {
    const updatedAgendamentos = agendamentos.filter(ag => ag.id !== id)
    localStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos))
    setAgendamentos(updatedAgendamentos)
  }

  return {
    agendamentos,
    addAgendamento,
    updateAgendamento,
    deleteAgendamento
  }
} 