'use client'

import { Patient } from '@/types'
import jsPDF from 'jspdf'

interface AvaliacaoPDFProps {
  patient: Patient
  data: Record<string, string>
  observacoes: string
}

const ESCALA_DEMUCA = [
  {
    categoria: 'Comportamentos restritivos',
    parametros: [
      'Estereotipias',
      'Agressividade',
      'Desinteresse',
      'Passividade',
      'Resistência',
      'Reclusão (isolamento)',
      'Pirraça'
    ],
    escala: {
      nao: 2,
      pouco: 1,
      muito: 0
    }
  },
  {
    categoria: 'Interação social / Cognição',
    parametros: [
      'Contato visual',
      'Comunicação verbal',
      'Interação com instrumentos musicais',
      'Interação com outros objetos',
      'Interação com educador ou musicoterapeuta',
      'Interação com pais (se aplicável)',
      'Interação com pares (se aplicável)',
      'Atenção',
      'Imitação'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Percepção / Exploração rítmica',
    parametros: [
      'Pulso interno',
      'Regulação temporal',
      { nome: 'Apoio', multiplicador: 2 },
      { nome: 'Ritmo real', multiplicador: 2 },
      { nome: 'Contrastes de andamento', multiplicador: 2 }
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Percepção / Exploração sonora',
    parametros: [
      'Som/silêncio',
      'Timbre',
      'Planos de altura',
      'Movimento sonoro',
      'Contrastes de intensidade',
      'Repetição de ideias rítmicas e/ou melódicas',
      'Senso de conclusão'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Exploração vocal',
    parametros: [
      'Vocalizações',
      'Balbucios',
      'Sílabas canônica',
      { nome: 'Imitação de canções', multiplicador: 2 },
      { nome: 'Criação vocal', multiplicador: 2 }
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Movimentação corporal com a música',
    parametros: [
      'Andar',
      'Correr',
      'Parar',
      'Dançar',
      'Pular',
      'Girar',
      'Balançar'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  }
]

function calcularPontuacao(categoria: typeof ESCALA_DEMUCA[0], avaliacoes: Record<string, string>) {
  return categoria.parametros.reduce((total, parametro) => {
    const nome = typeof parametro === 'string' ? parametro : parametro.nome
    const multiplicador = typeof parametro === 'string' ? 1 : parametro.multiplicador || 1
    const valor = avaliacoes[nome]
    if (!valor) return total
    return total + (categoria.escala[valor as keyof typeof categoria.escala] * multiplicador)
  }, 0)
}

export function AvaliacaoPDF({ patient, data, observacoes }: AvaliacaoPDFProps) {
  const handleDownload = () => {
    const doc = new jsPDF()
    let yPos = 20

    // Configurações de fonte e tamanho
    doc.setFont('helvetica')
    
    // Título
    doc.setFontSize(18)
    doc.text('Avaliação Musicoterapêutica', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
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

    // Avaliação DEMUCA
    ESCALA_DEMUCA.forEach(categoria => {
      // Verifica se precisa adicionar nova página
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage()
        yPos = 20
      }

      // Título da categoria
      doc.setFontSize(14)
      doc.text(`${categoria.categoria} - Pontuação: ${calcularPontuacao(categoria, data)}`, 20, yPos)
      yPos += 10

      // Parâmetros
      doc.setFontSize(12)
      categoria.parametros.forEach(parametro => {
        const nome = typeof parametro === 'string' ? parametro : parametro.nome
        const valor = data[nome] || 'Não avaliado'

        // Verifica se precisa adicionar nova página
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          yPos = 20
        }

        doc.text(`${nome}: ${valor}`, 20, yPos)
        yPos += 7
      })
      yPos += 10
    })

    // Observações
    if (observacoes) {
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(14)
      doc.text('Observações', 20, yPos)
      yPos += 10

      doc.setFontSize(12)
      const linhas = doc.splitTextToSize(observacoes, doc.internal.pageSize.getWidth() - 40)
      linhas.forEach((linha: string) => {
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          yPos = 20
        }
        doc.text(linha, 20, yPos)
        yPos += 7
      })
    }

    // Salva o PDF
    doc.save(`avaliacao_${patient.name.toLowerCase().replace(/\s+/g, '_')}.pdf`)
  }

  return (
    <button
      onClick={handleDownload}
      className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
    >
      <DocumentArrowDownIcon className="h-4 w-4" />
      Exportar PDF
    </button>
  )
}
