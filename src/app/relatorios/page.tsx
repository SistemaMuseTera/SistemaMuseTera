'use client'

import { RelatorioForm } from '@/components/relatorios/RelatorioForm'
import { useRouter } from 'next/navigation'

export default function RelatoriosPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      const relatorios = JSON.parse(localStorage.getItem('relatorios') || '[]')
      relatorios.push({
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('relatorios', JSON.stringify(relatorios))
      
      router.push('/relatorios/lista')
    } catch (error) {
      console.error('Erro ao salvar relatório:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Novo Relatório</h1>
        <p className="mt-1 text-sm text-gray-500">
          Preencha os campos abaixo para gerar o relatório
        </p>
      </div>

      <RelatorioForm onSubmit={handleSubmit} />
    </div>
  )
} 