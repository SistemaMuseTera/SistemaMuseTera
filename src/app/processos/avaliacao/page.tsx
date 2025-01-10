'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from '@/components/processos/PatientSelect'
import { Patient } from '@/types'
import { formatarData } from '@/utils/formatters'
import { ClipboardDocumentCheckIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import jsPDF from 'jspdf'
import { ResultadosGraficos } from '@/components/processos/ResultadosGraficos'
import { ESCALA_DEMUCA } from '@/data/escalaDemuca'

const calcularPontuacao = (categoria: typeof ESCALA_DEMUCA[0], avaliacoes: Record<string, string>) => {
  let total = 0
  
  categoria.parametros.forEach((parametro: string | { nome: string; multiplicador?: number }) => {
    const nomeParametro = typeof parametro === 'string' ? parametro : parametro.nome
    const resposta = avaliacoes[nomeParametro]
    if (!resposta) return

    let pontos = 0
    if (resposta === 'nao') pontos = categoria.escala.nao
    if (resposta === 'pouco') pontos = categoria.escala.pouco
    if (resposta === 'muito') pontos = categoria.escala.muito

    // Aplica multiplicador se existir
    if (typeof parametro === 'object' && parametro.multiplicador) {
      pontos *= parametro.multiplicador
    }

    total += pontos
  })

  return total
}

export default function AvaliacaoPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [avaliacoes, setAvaliacoes] = useState<Record<string, string>>({})
  const [avaliacaoAtual, setAvaliacaoAtual] = useState('1')
  const [observacoes, setObservacoes] = useState('')

  const handleAvaliacaoChange = (parametro: string, valor: string) => {
    setAvaliacoes(prev => ({
      ...prev,
      [parametro]: valor
    }))
  }

  const handleDownloadPDF = () => {
    if (!selectedPatient) return

    const doc = new jsPDF()
    let yPos = 20

    // Configurações de fonte e tamanho
    doc.setFont('helvetica')
    
    // Título
    doc.setFontSize(18)
    doc.text('Avaliação DEMUCA', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
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
    doc.text(`Nome: ${selectedPatient?.name || 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Data de Nascimento: ${selectedPatient?.dateOfBirth ? new Date(selectedPatient.dateOfBirth).toLocaleDateString('pt-BR') : 'Não informado'}`, 20, yPos)
    yPos += 7
    doc.text(`Contato: ${selectedPatient?.contactInfo?.phone || 'Não informado'}`, 20, yPos)
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
      const pontuacao = calcularPontuacao(categoria, avaliacoes)
      doc.text(`${categoria.categoria} - Pontuação: ${pontuacao}`, 20, yPos)
      yPos += 10

      // Parâmetros
      doc.setFontSize(12)
      categoria.parametros.forEach((parametro: string | { nome: string; multiplicador?: number }) => {
        const nome = typeof parametro === 'string' ? parametro : parametro.nome
        const multiplicador = typeof parametro === 'string' ? '' : ` (x${parametro.multiplicador})`
        const valor = avaliacoes[nome] || 'Não avaliado'

        // Verifica se precisa adicionar nova página
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          yPos = 20
        }

        doc.text(`${nome}${multiplicador}: ${valor}`, 20, yPos)
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

    // Adiciona nova página para os gráficos
    doc.addPage()
    yPos = 20

    // Título da seção de gráficos
    doc.setFontSize(18)
    doc.text('Resultados da Escala e Gráficos', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' })
    yPos += 20

    // Captura o elemento do gráfico e converte para imagem
    const graficosElement = document.querySelector('#resultados-graficos') as HTMLElement
    if (graficosElement) {
      // Usa html2canvas para converter o elemento em imagem
      import('html2canvas').then(async (html2canvas) => {
        const canvas = await html2canvas.default(graficosElement)
        const imgData = canvas.toDataURL('image/png')
        
        // Adiciona a imagem ao PDF
        const imgWidth = doc.internal.pageSize.getWidth() - 40
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        doc.addImage(imgData, 'PNG', 20, yPos, imgWidth, imgHeight)
        yPos += imgHeight + 20

        // Adiciona resultados explicativos
        doc.setFontSize(14)
        doc.text('Resultados Explicativos', 20, yPos)
        yPos += 10

        doc.setFontSize(12)
        ESCALA_DEMUCA.forEach(categoria => {
          const pontuacao = calcularPontuacao(categoria, avaliacoes)
          const explicacao = getExplicacaoResultado(categoria, pontuacao)
          
          if (yPos > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage()
            yPos = 20
          }

          doc.text(`${categoria.categoria}:`, 20, yPos)
          yPos += 7
          const linhasExplicacao = doc.splitTextToSize(explicacao, doc.internal.pageSize.getWidth() - 40)
          linhasExplicacao.forEach((linha: string) => {
            if (yPos > doc.internal.pageSize.getHeight() - 20) {
              doc.addPage()
              yPos = 20
            }
            doc.text(linha, 30, yPos)
            yPos += 7
          })
          yPos += 5
        })

        // Salva o PDF
        doc.save(`avaliacao_demuca_${avaliacaoAtual}_${selectedPatient.name.toLowerCase().replace(/\s+/g, '_')}.pdf`)
      })
    } else {
      // Se não encontrar o elemento dos gráficos, salva o PDF mesmo assim
      doc.save(`avaliacao_demuca_${avaliacaoAtual}_${selectedPatient.name.toLowerCase().replace(/\s+/g, '_')}.pdf`)
    }
  }

  // Função auxiliar para gerar explicações dos resultados
  const getExplicacaoResultado = (categoria: typeof ESCALA_DEMUCA[0], pontuacao: number) => {
    const max = categoria.parametros.length * Math.max(categoria.escala.muito, categoria.escala.pouco, categoria.escala.nao)
    const percentual = (pontuacao / max) * 100

    if (percentual >= 80) {
      return `Desenvolvimento excelente (${percentual.toFixed(1)}%). O paciente demonstra forte domínio nesta área.`
    } else if (percentual >= 60) {
      return `Bom desenvolvimento (${percentual.toFixed(1)}%). Há um progresso significativo, mas ainda existe espaço para melhorias.`
    } else if (percentual >= 40) {
      return `Desenvolvimento moderado (${percentual.toFixed(1)}%). Algumas habilidades presentes, mas necessita de mais atenção.`
    } else if (percentual >= 20) {
      return `Desenvolvimento inicial (${percentual.toFixed(1)}%). Demonstra sinais iniciais de desenvolvimento nesta área.`
    } else {
      return `Desenvolvimento limitado (${percentual.toFixed(1)}%). Esta área requer atenção especial no tratamento.`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Avaliação DEMUCA
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Escala de Desenvolvimento Musical de Crianças com Autismo
          </p>
        </div>

        <Card>
          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Paciente
                  </label>
                  <PatientSelect
                    onSelect={setSelectedPatient}
                    selectedId={selectedPatient?.id}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Número da Avaliação
                  </label>
                  <div className="relative">
                    <select
                      value={avaliacaoAtual}
                      onChange={(e) => setAvaliacaoAtual(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="1">Avaliação 1</option>
                      <option value="2">Avaliação 2</option>
                      <option value="3">Avaliação 3</option>
                      <option value="4">Avaliação 4</option>
                      <option value="5">Avaliação 5</option>
                    </select>
                  </div>
                </div>
              </div>

              {selectedPatient && (
                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {selectedPatient.name}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-gray-600">
                          Data de Nascimento: {formatarData(selectedPatient.dateOfBirth)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-indigo-50 px-2 sm:px-3 py-1.5 rounded-lg">
                        <ClipboardDocumentCheckIcon className="h-4 sm:h-5 w-4 sm:w-5 text-indigo-600" />
                        <span className="text-xs sm:text-sm font-medium text-indigo-700">Avaliação {avaliacaoAtual}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {ESCALA_DEMUCA.map((categoria, categoriaIndex) => (
                      <div key={categoriaIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-100 p-3 sm:p-4 border-b border-gray-200">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                            {categoria.categoria}
                          </h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr className="bg-gray-50">
                                <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 w-2/4">
                                  Parâmetros
                                </th>
                                <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">
                                  Não
                                </th>
                                <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">
                                  Pouco
                                </th>
                                <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">
                                  Muito
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {categoria.parametros.map((parametro, index) => (
                                <tr 
                                  key={typeof parametro === 'string' ? parametro : parametro.nome}
                                  className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                  <td className="whitespace-normal px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                      <span>{typeof parametro === 'string' ? parametro : parametro.nome}</span>
                                      {typeof parametro === 'object' && parametro.multiplicador === 2 && (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                          x2
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  {['nao', 'pouco', 'muito'].map((valor) => (
                                    <td key={valor} className="whitespace-normal px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-center">
                                      <div className="flex justify-center">
                                        <input
                                          type="radio"
                                          name={typeof parametro === 'string' ? parametro : parametro.nome}
                                          value={valor}
                                          checked={avaliacoes[typeof parametro === 'string' ? parametro : parametro.nome] === valor}
                                          onChange={() => handleAvaliacaoChange(typeof parametro === 'string' ? parametro : parametro.nome, valor)}
                                          className={`w-4 sm:w-5 h-4 sm:h-5 cursor-pointer appearance-none rounded-full transition-all duration-200 ease-in-out
                                            ${valor === 'nao' 
                                              ? `border-2 border-red-500 ${
                                                  avaliacoes[typeof parametro === 'string' ? parametro : parametro.nome] === valor 
                                                    ? 'bg-red-500 ring-2 ring-red-200' 
                                                    : 'bg-white hover:bg-red-50'
                                                }` 
                                              : valor === 'pouco'
                                              ? `border-2 border-yellow-500 ${
                                                  avaliacoes[typeof parametro === 'string' ? parametro : parametro.nome] === valor 
                                                    ? 'bg-yellow-500 ring-2 ring-yellow-200' 
                                                    : 'bg-white hover:bg-yellow-50'
                                                }`
                                              : `border-2 border-green-500 ${
                                                  avaliacoes[typeof parametro === 'string' ? parametro : parametro.nome] === valor 
                                                    ? 'bg-green-500 ring-2 ring-green-200' 
                                                    : 'bg-white hover:bg-green-50'
                                                }`
                                            }`}
                                        />
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                              <tr className="bg-gray-50">
                                <td className="whitespace-normal px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 text-right">
                                  Pontuação
                                </td>
                                <td className="whitespace-normal px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 text-center">
                                  {categoria.escala.nao}
                                </td>
                                <td className="whitespace-normal px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 text-center">
                                  {categoria.escala.pouco}
                                </td>
                                <td className="whitespace-normal px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 text-center">
                                  {categoria.escala.muito}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-6 sm:mt-8">
                    <button
                      type="button"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                    >
                      <DocumentArrowDownIcon className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      Baixar Avaliação
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      {selectedPatient && <ResultadosGraficos avaliacoes={avaliacoes} />}
    </div>
  )
}