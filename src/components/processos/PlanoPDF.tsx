'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { PlanoTerapeutico } from '@/types/plano'

interface PlanoPDFProps {
  plano: PlanoTerapeutico
  paciente: {
    nome: string
    idade: number
    diagnostico: string
  }
  objetivosSelecionados: Array<{
    texto: string
    categoria: string
  }>
  onClose: () => void
}

export function PlanoPDF({ plano, paciente, objetivosSelecionados, onClose }: PlanoPDFProps) {
  const [isReady, setIsReady] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState({
    jspdf: false,
    autotable: false
  })

  const handleScriptsLoad = (scriptName: 'jspdf' | 'autotable') => {
    setScriptsLoaded(prev => ({
      ...prev,
      [scriptName]: true
    }))
  }

  useEffect(() => {
    // Verifica se ambos os scripts foram carregados
    if (scriptsLoaded.jspdf && scriptsLoaded.autotable) {
      setIsReady(true)
    }
  }, [scriptsLoaded])

  const generatePDF = () => {
    // Verificação mais robusta dos scripts
    if (typeof window !== 'undefined') {
      // Importar scripts dinamicamente se não estiverem disponíveis
      const loadScript = (src: string) => {
        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = src
          script.async = true
          script.onload = () => resolve()
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      const generatePDFContent = () => {
        try {
          // @ts-ignore
          const jsPDF = window.jspdf.jsPDF
          // @ts-ignore
          const autoTable = window.jspdf.autoTable
          
          const doc = new jsPDF()

          // Título
          doc.setFontSize(20)
          doc.text('Plano Terapêutico Musicoterapêutico', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' })

          // Identificação do Paciente
          doc.setFontSize(16)
          doc.text('Identificação do Paciente', 20, 40)
          
          doc.setFontSize(12)
          doc.text(`Nome: ${paciente.nome}`, 20, 50)
          doc.text(`Idade: ${paciente.idade} anos`, 20, 57)
          doc.text(`Diagnóstico: ${paciente.diagnostico}`, 20, 64)
          doc.text(`Data de Início: ${new Date(plano.identificacao.dataInicio).toLocaleDateString('pt-BR')}`, 20, 71)
          if (plano.identificacao.dataReavaliacao) {
            doc.text(`Reavaliação: ${new Date(plano.identificacao.dataReavaliacao).toLocaleDateString('pt-BR')}`, 20, 78)
          }

          // Objetivos Terapêuticos
          doc.setFontSize(16)
          doc.text('Objetivos Terapêuticos', 20, 95)

          let yPos = 105
          doc.setFontSize(12)
          objetivosSelecionados.forEach((objetivo) => {
            const objetivoText = `• ${objetivo.texto}`
            const categoriaText = `Categoria: ${objetivo.categoria}`
            
            const splitObjetivo = doc.splitTextToSize(objetivoText, 170)
            
            if (yPos > 250) {
              doc.addPage()
              yPos = 20
            }

            doc.text(splitObjetivo, 20, yPos)
            yPos += (splitObjetivo.length * 7)
            doc.setFontSize(10)
            doc.text(categoriaText, 25, yPos)
            doc.setFontSize(12)
            yPos += 10
          })

          // Cronograma
          if (yPos > 220) {
            doc.addPage()
            yPos = 20
          }

          doc.setFontSize(16)
          doc.text('Cronograma de Atividades', 20, yPos + 10)

          const tableData = plano.cronograma.map(semana => [
            semana.semana,
            semana.atividades.join(', '),
            semana.objetivos.join(', ')
          ])

          // @ts-ignore
          doc.autoTable({
            startY: yPos + 20,
            head: [['Semana', 'Atividades', 'Objetivos']],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [66, 66, 66] }
          })

          // Rodapé
          const pageCount = doc.getNumberOfPages()
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.setFontSize(8)
            doc.text(
              `Página ${i} de ${pageCount}`,
              doc.internal.pageSize.getWidth() / 2,
              doc.internal.pageSize.getHeight() - 10,
              { align: 'center' }
            )
          }

          // Salvar o PDF
          doc.save(`plano_terapeutico_${paciente.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`)
        } catch (error) {
          console.error('Erro ao gerar PDF:', error)
          alert('Erro ao gerar o PDF. Por favor, tente novamente.')
        }
      }

      // Verificar se os scripts já estão carregados
      if (window.jspdf && window.jspdf.jsPDF && window.jspdf.autoTable) {
        generatePDFContent()
      } else {
        // Carregar scripts e gerar PDF
        Promise.all([
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js')
        ])
        .then(() => {
          generatePDFContent()
        })
        .catch(error => {
          console.error('Erro ao carregar scripts:', error)
          alert('Não foi possível carregar as bibliotecas de PDF. Tente novamente.')
        })
      }
    } else {
      alert('Função de geração de PDF não disponível neste ambiente.')
    }
  }

  return (
    <div className="space-y-4">
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" 
        onLoad={() => handleScriptsLoad('jspdf')}
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js" 
        onLoad={() => handleScriptsLoad('autotable')}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Visualizar Plano Terapêutico</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={generatePDF}
          disabled={!isReady}
          className={`w-full px-4 py-2 text-white rounded-lg ${
            isReady 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isReady ? 'Gerar PDF' : 'Carregando...'}
        </button>
      </div>
    </div>
  )
}