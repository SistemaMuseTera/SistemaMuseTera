'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { usePatients } from '@/hooks/usePatients'
import { 
  DocumentTextIcon, 
  DocumentPlusIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline'

interface Relatorio {
  id: string
  tipo: string
  patientId: string
  data: string
  conteudo: any
  status: 'rascunho' | 'finalizado'
}

export default function ListaRelatoriosPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const { patients } = usePatients()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRelatorios = () => {
      const savedRelatorios = JSON.parse(localStorage.getItem('relatorios') || '[]')
      setRelatorios(savedRelatorios)
      setLoading(false)
    }

    loadRelatorios()
  }, [])

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId)
    return patient?.name || 'Paciente não encontrado'
  }

  const getTipoRelatorio = (tipo: string) => {
    const tipos = {
      sessao: 'Relatório de Sessão',
      mensal: 'Relatório Mensal',
      semestral: 'Relatório Semestral',
      avaliacao: 'Relatório de Avaliação',
      alta: 'Relatório de Alta',
      familia: 'Relatório para Família',
      equipe: 'Relatório para Equipe'
    }
    return tipos[tipo as keyof typeof tipos] || tipo
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lista de Relatórios</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualize e gerencie todos os relatórios
          </p>
        </div>
        <Link
          href="/relatorios"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <DocumentPlusIcon className="h-5 w-5" />
          Novo Relatório
        </Link>
      </div>

      <div className="space-y-4">
        {relatorios.map((relatorio) => (
          <Card key={relatorio.id} className="hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getTipoRelatorio(relatorio.tipo)}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4" />
                        {getPatientName(relatorio.patientId)}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(relatorio.data).toLocaleDateString()}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        relatorio.status === 'finalizado' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {relatorio.status === 'finalizado' ? 'Finalizado' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/relatorios/${relatorio.id}`}
                  className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Ver detalhes
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>
        ))}

        {relatorios.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum relatório</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece criando um novo relatório
            </p>
            <div className="mt-6">
              <Link
                href="/relatorios"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <DocumentPlusIcon className="h-5 w-5" />
                Novo Relatório
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 