'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { Card } from '@/components/ui/Card'
import { PatientSelect } from './PatientSelect'
import { Patient } from '@/types'
import { 
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { 
  Diagnostico, 
  OBJETIVOS_PADRAO, 
  ATIVIDADES_PADRAO,
  PlanoTerapeutico 
} from '@/types/plano'

export function PlanoTerapeuticoPanel() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [diagnostico, setDiagnostico] = useState<Diagnostico>('TEA')
  
  // Filtra objetivos e atividades baseado no diagnóstico selecionado
  const objetivosDisponiveis = OBJETIVOS_PADRAO.filter(
    obj => obj.diagnosticos.includes(diagnostico)
  )
  
  const atividadesDisponiveis = ATIVIDADES_PADRAO.filter(
    atv => atv.diagnosticos.includes(diagnostico)
  )

  const [plano, setPlano] = useState<PlanoTerapeutico>({
    id: '',
    patientId: selectedPatient?.id || '',
    identificacao: {
      nome: selectedPatient?.name || '',
      idade: selectedPatient ? calculateAge(new Date(selectedPatient.dateOfBirth)) : 0,
      diagnostico: diagnostico,
      dataInicio: new Date(),
      dataReavaliacao: new Date()
    },
    objetivosGerais: [],
    objetivosEspecificos: {
      interacaoSocial: [],
      exploracaoSonora: [],
      movimentacaoCorporal: [],
      exploracaoVocal: [],
      comportamentosRestritivos: []
    },
    atividades: atividadesDisponiveis.map(atv => ({
      id: atv.id,
      nome: atv.nome,
      objetivo: atv.objetivo,
      descricao: atv.descricao,
      categoria: atv.categoria
    })),
    cronograma: [
      {
        semana: '1-2',
        atividades: ['Roda Musical'],
        objetivos: ['Interação Social']
      }
    ],
    avaliacoes: [],
    observacoesGerais: '',
    status: 'ativo',
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [autotableLoaded, setAutotableLoaded] = useState(false)

  const handleDiagnosticoChange = (novoDiagnostico: Diagnostico) => {
    setDiagnostico(novoDiagnostico)
    // Atualiza objetivos e atividades baseado no novo diagnóstico
    const novasAtividades = ATIVIDADES_PADRAO.filter(
      atv => atv.diagnosticos.includes(novoDiagnostico)
    )
    
    setPlano(prev => ({
      ...prev,
      identificacao: { ...prev.identificacao, diagnostico: novoDiagnostico },
      atividades: novasAtividades.map(atv => ({
        id: atv.id,
        nome: atv.nome,
        objetivo: atv.objetivo,
        descricao: atv.descricao,
        categoria: atv.categoria
      }))
    }))
  }

  const handleObjetivoToggle = (objetivo: typeof OBJETIVOS_PADRAO[0]) => {
    setPlano(prev => ({
      ...prev,
      objetivosGerais: prev.objetivosGerais.includes(objetivo.texto)
        ? prev.objetivosGerais.filter(texto => texto !== objetivo.texto)
        : [...prev.objetivosGerais, objetivo.texto]
    }))
  }

  const generatePDF = () => {
    try {
      // Verificar se as bibliotecas estão carregadas
      if (!jspdfLoaded || !autotableLoaded) {
        throw new Error('Bibliotecas de PDF não carregadas. Aguarde e tente novamente.')
      }

      // Log detalhado para depuração
      console.log('Dados para geração de PDF:', {
        selectedPatient,
        diagnostico,
        plano: {
          identificacao: plano.identificacao,
          objetivosGerais: plano.objetivosGerais
        }
      })

      // Verificar se o objeto jspdf está disponível
      if (typeof window === 'undefined' || !window.jspdf || !window.jspdf.jsPDF) {
        throw new Error('Biblioteca jsPDF não carregada')
      }

      // @ts-ignore
      const jsPDF = window.jspdf.jsPDF
      const doc = new jsPDF()

      // Verificações de dados
      if (!selectedPatient) {
        throw new Error('Nenhum paciente selecionado')
      }

      // Título
      doc.setFontSize(20)
      doc.text('Plano Terapêutico Musicoterapêutico', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' })

      // Identificação do Paciente
      doc.setFontSize(16)
      doc.text('Identificação do Paciente', 20, 40)
      
      doc.setFontSize(12)
      doc.text(`Nome: ${selectedPatient.name || 'Não informado'}`, 20, 50)
      
      const idade = selectedPatient.dateOfBirth 
        ? calculateAge(new Date(selectedPatient.dateOfBirth)) 
        : 'Não informada'
      doc.text(`Idade: ${idade} anos`, 20, 57)
      
      doc.text(`Diagnóstico: ${diagnostico || 'Não informado'}`, 20, 64)
      
      const dataInicio = plano.identificacao.dataInicio 
        ? plano.identificacao.dataInicio.toLocaleDateString('pt-BR') 
        : 'Não informada'
      doc.text(`Data de Início: ${dataInicio}`, 20, 71)
      
      if (plano.identificacao.dataReavaliacao) {
        doc.text(`Reavaliação: ${plano.identificacao.dataReavaliacao.toLocaleDateString('pt-BR')}`, 20, 78)
      }

      // Objetivos Terapêuticos
      doc.setFontSize(16)
      doc.text('Objetivos Terapêuticos', 20, 95)

      let yPos = 105
      doc.setFontSize(12)
      
      // Verificar se há objetivos
      if (!plano.objetivosGerais || plano.objetivosGerais.length === 0) {
        doc.text('Nenhum objetivo geral definido', 20, yPos)
        yPos += 10
      } else {
        plano.objetivosGerais.forEach((objetivo) => {
          const objetivoText = `• ${objetivo}`
          const objetivoPadrao = OBJETIVOS_PADRAO.find(obj => obj.texto === objetivo)
          const categoriaText = `Categoria: ${objetivoPadrao?.categoria || 'Não categorizado'}`
          
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
      }

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
      const nomeArquivo = selectedPatient.name 
        ? selectedPatient.name.toLowerCase().replace(/\s+/g, '_') 
        : 'plano_terapeutico'
      doc.save(`plano_terapeutico_${nomeArquivo}.pdf`)
    } catch (error) {
      console.error('Erro detalhado ao gerar PDF:', {
        errorMessage: error instanceof Error ? error.message : 'Erro desconhecido',
        errorStack: error instanceof Error ? error.stack : 'Sem stack trace'
      })
      alert(`Erro ao gerar o PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
          console.log('jsPDF carregado')
          setJspdfLoaded(true)
        }}
        onError={() => {
          console.error('Erro ao carregar jsPDF')
          setJspdfLoaded(false)
        }}
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.15/jspdf.plugin.autotable.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
          console.log('jsPDF AutoTable carregado')
          setAutotableLoaded(true)
        }}
        onError={() => {
          console.error('Erro ao carregar jsPDF AutoTable')
          setAutotableLoaded(false)
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            MuseTera - Plano Terapêutico
          </h1>
        </div>

        <Card className="w-full">
          <div className="p-4 sm:p-6 space-y-4">
            <PatientSelect 
              onSelect={setSelectedPatient}
              selectedId={selectedPatient?.id}
              className="w-full"
            />

            {selectedPatient && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnóstico Principal
                  </label>
                  <select
                    className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={diagnostico}
                    onChange={(e) => handleDiagnosticoChange(e.target.value as Diagnostico)}
                  >
                    <optgroup label="Transtornos do Neurodesenvolvimento" className="font-semibold">
                      <option value="TEA">Transtorno do Espectro Autista (TEA)</option>
                      <option value="TDAH">TDAH</option>
                      <option value="Deficiencia_Intelectual">Deficiência Intelectual</option>
                    </optgroup>

                    <optgroup label="Síndromes Genéticas" className="font-semibold">
                      <option value="Sindrome_Down">Síndrome de Down</option>
                    </optgroup>

                    <optgroup label="Condições Neurológicas" className="font-semibold">
                      <option value="Paralisia_Cerebral">Paralisia Cerebral</option>
                      <option value="AVE">AVE/AVC</option>
                      <option value="Parkinson">Doença de Parkinson</option>
                      <option value="Alzheimer">Doença de Alzheimer</option>
                      <option value="Demencia">Outras Demências</option>
                    </optgroup>

                    <optgroup label="Saúde Mental" className="font-semibold">
                      <option value="Depressão">Depressão</option>
                      <option value="Ansiedade">Ansiedade</option>
                      <option value="Esquizofrenia">Esquizofrenia</option>
                    </optgroup>

                    <optgroup label="Deficiências Sensoriais" className="font-semibold">
                      <option value="Deficiencia_Auditiva">Deficiência Auditiva</option>
                      <option value="Deficiencia_Visual">Deficiência Visual</option>
                      <option value="DPAC">Distúrbio do Processamento Auditivo Central</option>
                    </optgroup>

                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={plano.identificacao.dataInicio.toISOString().split('T')[0]}
                    onChange={(e) => setPlano(prev => ({
                      ...prev,
                      identificacao: { ...prev.identificacao, dataInicio: new Date(e.target.value) }
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Prevista para Reavaliação
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={plano.identificacao.dataReavaliacao.toISOString().split('T')[0]}
                    onChange={(e) => setPlano(prev => ({
                      ...prev,
                      identificacao: { ...prev.identificacao, dataReavaliacao: new Date(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {selectedPatient && (
          <>
            <Card className="w-full">
              <div className="p-4 sm:p-6">
                <h3 className="text-md sm:text-lg font-semibold mb-4">Objetivos Disponíveis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {objetivosDisponiveis.map((objetivo) => (
                    <label 
                      key={objetivo.id} 
                      className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          type="checkbox"
                          checked={plano.objetivosGerais.includes(objetivo.texto)}
                          onChange={() => handleObjetivoToggle(objetivo)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{objetivo.texto}</p>
                        <span className="text-xs text-gray-500 mt-1">
                          Categoria: {objetivo.categoria.charAt(0).toUpperCase() + objetivo.categoria.slice(1)}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-600 text-center sm:text-left">
                  {plano.objetivosGerais.length} objetivo(s) selecionado(s)
                </div>
              </div>
            </Card>

            <div className="flex justify-center sm:justify-end">
              <button 
                onClick={generatePDF} 
                disabled={!jspdfLoaded || !autotableLoaded}
                className={`
                  w-full sm:w-auto max-w-xs
                  ${!jspdfLoaded || !autotableLoaded 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  } 
                  text-white font-bold py-2 px-4 rounded transition-colors
                `}
              >
                {!jspdfLoaded || !autotableLoaded 
                  ? 'Carregando bibliotecas...' 
                  : 'Gerar PDF'
                }
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// Função auxiliar para calcular idade
function calculateAge(dateOfBirth: Date): number {
  const today = new Date()
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const m = today.getMonth() - dateOfBirth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }
  return age
}