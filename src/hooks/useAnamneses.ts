'use client'

import { useState, useEffect } from 'react'
import { AnamneseFormData } from '@/types/anamnese'

export function useAnamneses() {
  const [anamneses, setAnamneses] = useState<AnamneseFormData[]>([])

  useEffect(() => {
    const savedAnamneses = JSON.parse(localStorage.getItem('anamneses') || '[]')
    setAnamneses(savedAnamneses)
  }, [])

  const addAnamnese = (anamnese: AnamneseFormData) => {
    const newAnamnese = {
      ...anamnese,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const updatedAnamneses = [...anamneses, newAnamnese]
    localStorage.setItem('anamneses', JSON.stringify(updatedAnamneses))
    setAnamneses(updatedAnamneses)

    // Dispara evento para atualizar outras partes da aplicação
    window.dispatchEvent(new Event('anamnesesUpdated'))
  }

  const getAnamneseByPatientId = (patientId: string) => {
    return anamneses.find(anamnese => anamnese.patientId === patientId)
  }

  return {
    anamneses,
    addAnamnese,
    getAnamneseByPatientId
  }
} 