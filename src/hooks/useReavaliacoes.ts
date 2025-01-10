'use client'

import { useState, useEffect } from 'react'
import { ReavaliacaoFormData } from '@/types/reavaliacao'

export function useReavaliacoes() {
  const [reavaliacoes, setReavaliacoes] = useState<ReavaliacaoFormData[]>([])

  useEffect(() => {
    const savedReavaliacoes = JSON.parse(localStorage.getItem('reavaliacoes') || '[]')
    setReavaliacoes(savedReavaliacoes)
  }, [])

  const addReavaliacao = (reavaliacao: ReavaliacaoFormData) => {
    const newReavaliacao = {
      ...reavaliacao,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const updatedReavaliacoes = [...reavaliacoes, newReavaliacao]
    localStorage.setItem('reavaliacoes', JSON.stringify(updatedReavaliacoes))
    setReavaliacoes(updatedReavaliacoes)

    // Dispara evento para atualizar outras partes da aplicação
    window.dispatchEvent(new Event('revaliacoesUpdated'))
  }

  const getReavaliacaoByPatientId = (patientId: string) => {
    return reavaliacoes.find(reavaliacao => reavaliacao.patientId === patientId)
  }

  return {
    reavaliacoes,
    addReavaliacao,
    getReavaliacaoByPatientId
  }
} 