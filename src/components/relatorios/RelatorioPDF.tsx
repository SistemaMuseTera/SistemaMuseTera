'use client'

import { useRef } from 'react'
import { Patient } from '@/types'
import jsPDF from 'jspdf'

interface RelatorioPDFProps {
  data: any
  patient: Patient
  tipo: string
  onExport?: () => void
}

export function RelatorioPDF({ data, patient, tipo, onExport }: RelatorioPDFProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const formatarData = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(data)
  }

  const getTipoRelatorio = (tipo: string): string => {
    const tipos: Record<string, string> = {
      sessao: 'Relatório de Sessão',
      evolucao_mensal: 'Relatório de Evolução Mensal',
      evolucao_semestral: 'Relatório de Evolução Semestral',
      avaliacao: 'Relatório de Avaliação',
      alta: 'Relatório de Alta',
      familia: 'Relatório para Família',
      equipe: 'Relatório para Equipe'
    }
    return tipos[tipo] || tipo
  }

  const handleDownload = () => {
    const doc = new jsPDF()
    let yPos = 20

    // Configurações de fonte e tamanho
    doc.setFont('helvetica')
    
    // Título
    doc.setFontSize(18)
    doc.text(getTipoRelatorio(tipo), doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 15

    // Data
    doc.setFontSize(12)
    doc.text(`Data: ${formatarData(new Date())}`, doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 20

    // Dados do Paciente
    doc.setFontSize(14)
    doc.text('Dados do Paciente', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    doc.text(`Nome: ${patient.name}`, 20, yPos)
    yPos += 7
    doc.text(`Data de Nascimento: ${formatarData(patient.dateOfBirth)}`, 20, yPos)
    yPos += 15

    // Conteúdo do Relatório
    Object.entries(data).forEach(([secao, campos]: [string, any]) => {
      if (typeof campos === 'object' && campos !== null) {
        // Verifica se precisa adicionar nova página
        if (yPos > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage()
          yPos = 20
        }

        // Título da seção
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text(secao, 20, yPos)
        yPos += 10

        // Campos da seção
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
        Object.entries(campos).forEach(([campo, valor]: [string, any]) => {
          if (valor) {
            // Verifica se precisa adicionar nova página
            if (yPos > doc.internal.pageSize.getHeight() - 20) {
              doc.addPage()
              yPos = 20
            }

            // Se for array, junta os itens com vírgula
            const textoValor = Array.isArray(valor) ? valor.join(', ') : valor.toString()
            
            // Quebra o texto em linhas se for muito longo
            const linhas = doc.splitTextToSize(textoValor, doc.internal.pageSize.getWidth() - 40)
            
            doc.setFont('helvetica', 'bold')
            doc.text(`${campo}: `, 20, yPos)
            
            // Calcula a largura do label para posicionar o valor
            const labelWidth = doc.getTextWidth(`${campo}: `)
            
            doc.setFont('helvetica', 'normal')
            linhas.forEach((linha: string, index: number) => {
              if (index === 0) {
                doc.text(linha, 20 + labelWidth, yPos)
              } else {
                yPos += 7
                doc.text(linha, 20, yPos)
              }
            })
            
            yPos += 10
          }
        })
        yPos += 5
      }
    })

    // Assinatura
    if (yPos > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage()
      yPos = 20
    }

    yPos += 20
    doc.setFont('helvetica', 'normal')
    doc.text('_'.repeat(50), doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 7
    doc.text('Assinatura do Musicoterapeuta', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 7
    doc.text('CRM/CREFITO', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })

    // Salva o PDF
    const nomeArquivo = `${tipo.toLowerCase()}_${patient.name.toLowerCase().replace(/\s+/g, '_')}_${formatarData(new Date()).replace(/\//g, '_')}.pdf`
    doc.save(nomeArquivo)

    if (onExport) {
      onExport()
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
    >
      <span className="material-icons text-xl">picture_as_pdf</span>
      Exportar PDF
    </button>
  )
}