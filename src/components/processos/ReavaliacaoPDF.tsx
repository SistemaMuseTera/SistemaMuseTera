'use client'

import { Patient } from '@/types'
import { ReavaliacaoQuestion, REAVALIACAO_QUESTIONS } from '@/types/reavaliacao'
import jsPDF from 'jspdf'

interface ReavaliacaoPDFProps {
  patient: Patient
  data: Record<string, string | string[]>
}

export function ReavaliacaoPDF({ patient, data }: ReavaliacaoPDFProps) {
  const handleDownload = () => {
    const doc = new jsPDF()
    let yPos = 20

    // Configurações de fonte e tamanho
    doc.setFont('helvetica')
    
    // Título
    doc.setFontSize(18)
    doc.text('Reavaliação Musicoterapêutica', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 15

    // Data e identificação
    doc.setFontSize(10)
    doc.text(new Date().toLocaleDateString('pt-BR'), doc.internal.pageSize.getWidth() - 20, yPos, { align: 'right' })
    doc.text('MuseTera', doc.internal.pageSize.getWidth() - 20, yPos + 5, { align: 'right' })
    yPos += 20

    // Dados do Paciente
    doc.setFontSize(14)
    doc.text('Dados do Paciente', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    doc.text(`Nome: ${patient?.name || 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Data de Nascimento: ${patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString('pt-BR') : 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Contato: ${patient?.contactInfo?.phone || 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Status: ${patient?.status === 'active' ? 'Ativo' : 'Inativo'}`, 20, yPos)
    yPos += 15

    // Questões da Reavaliação
    const questionsByCategory = REAVALIACAO_QUESTIONS.reduce((acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = []
      }
      acc[question.category].push(question)
      return acc
    }, {} as Record<string, ReavaliacaoQuestion[]>)

    Object.entries(questionsByCategory).forEach(([category, questions]) => {
      // Verifica se precisa adicionar nova página
      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage()
        yPos = 20
      }

      // Título da categoria
      doc.setFontSize(14)
      doc.text(translateCategory(category), 20, yPos)
      yPos += 10

      // Questões
      doc.setFontSize(12)
      questions.forEach(question => {
        // Verifica se precisa adicionar nova página
        if (yPos > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage()
          yPos = 20
        }

        doc.setFont('helvetica', 'bold')
        doc.text(question.question, 20, yPos)
        yPos += 7

        doc.setFont('helvetica', 'normal')
        const resposta = formatValue(data?.[question.id])
        const linhas = doc.splitTextToSize(resposta, doc.internal.pageSize.getWidth() - 40)
        linhas.forEach((linha: string) => {
          if (yPos > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage()
            yPos = 20
          }
          doc.text(linha, 20, yPos)
          yPos += 7
        })
        yPos += 3
      })
      yPos += 10
    })

    // Salva o PDF
    doc.save(`reavaliacao_${patient.name.toLowerCase().replace(/\s+/g, '_')}.pdf`)
  }

  return (
    <button
      onClick={handleDownload}
      className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      Exportar PDF
    </button>
  )
}

function translateCategory(category: string) {
  const translations: Record<string, string> = {
    desenvolvimento_musical: 'Desenvolvimento Musical',
    aspectos_comportamentais: 'Aspectos Comportamentais',
    aspectos_sociais: 'Aspectos Sociais',
    aspectos_cognitivos: 'Aspectos Cognitivos',
    aspectos_motores: 'Aspectos Motores',
    aspectos_comunicativos: 'Aspectos Comunicativos'
  }
  return translations[category] || category
}

function formatValue(value: string | string[] | undefined): string {
  if (!value) return '-'
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value
}