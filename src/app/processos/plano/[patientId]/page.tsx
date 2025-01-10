'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { 
  PlusIcon, 
  TrashIcon,
  PencilIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

// Objetivos gerais padrão que podem ser personalizados
const objetivosGeraisPadrao = [
  'Promover o desenvolvimento emocional, social e cognitivo através da música',
  'Melhorar a comunicação verbal e não verbal',
  'Estimular a coordenação motora e a percepção rítmica',
  'Reduzir comportamentos restritivos e estereotipados',
  'Favorecer a expressão criativa e emocional'
]

// Atividades padrão que podem ser personalizadas
const atividadesPadrao = [
  {
    id: '1',
    nome: 'Roda Musical',
    objetivo: 'Favorecer a interação social e o turn-taking',
    descricao: 'Utilizar instrumentos de percussão para criar uma roda de música onde cada participante tem sua vez de tocar',
    categoria: 'interacao'
  },
  {
    id: '2',
    nome: 'Caça ao Som',
    objetivo: 'Trabalhar percepção sonora',
    descricao: 'Esconder instrumentos ou fontes sonoras na sala e guiar o paciente para encontrá-los seguindo o som',
    categoria: 'percepcao'
  },
  // ... mais atividades
]

export default function PlanoTerapeuticoPage({ params }: { params: { patientId: string } }) {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [plano, setPlano] = useState({
    identificacao: {
      nome: '',
      idade: '',
      diagnostico: '',
      dataInicio: '',
      dataReavaliacao: ''
    },
    objetivosGerais: [...objetivosGeraisPadrao],
    objetivosEspecificos: {
      interacaoSocial: [''],
      exploracaoSonora: [''],
      movimentacaoCorporal: [''],
      exploracaoVocal: [''],
      comportamentosRestritivos: ['']
    },
    atividades: [...atividadesPadrao],
    cronograma: [
      {
        semana: '1-2',
        atividades: ['Roda Musical', 'Imitação Vocal'],
        objetivos: ['Interação Social', 'Exploração Vocal']
      }
    ],
    observacoesGerais: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Plano:', plano)
    // Implementar lógica de salvamento
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plano Terapêutico</h1>
          <p className="mt-1 text-sm text-gray-500">
            Definição e acompanhamento do plano de tratamento
          </p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          {editMode ? (
            <>
              <CheckIcon className="h-5 w-5" />
              Concluir Edição
            </>
          ) : (
            <>
              <PencilIcon className="h-5 w-5" />
              Editar Plano
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identificação */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Identificação do Paciente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={plano.identificacao.nome}
                  onChange={(e) => setPlano({
                    ...plano,
                    identificacao: { ...plano.identificacao, nome: e.target.value }
                  })}
                  disabled={!editMode}
                />
              </div>
              {/* Adicionar outros campos de identificação */}
            </div>
          </div>
        </Card>

        {/* Objetivos Gerais */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Objetivos Gerais</h2>
            <div className="space-y-4">
              {plano.objetivosGerais.map((objetivo, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={objetivo}
                    onChange={(e) => {
                      const newObjetivos = [...plano.objetivosGerais]
                      newObjetivos[index] = e.target.value
                      setPlano({ ...plano, objetivosGerais: newObjetivos })
                    }}
                    disabled={!editMode}
                  />
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        const newObjetivos = plano.objetivosGerais.filter((_, i) => i !== index)
                        setPlano({ ...plano, objetivosGerais: newObjetivos })
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  type="button"
                  onClick={() => setPlano({
                    ...plano,
                    objetivosGerais: [...plano.objetivosGerais, '']
                  })}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                >
                  <PlusIcon className="h-5 w-5" />
                  Adicionar Objetivo
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* Atividades */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Atividades Terapêuticas</h2>
            <div className="space-y-4">
              {plano.atividades.map((atividade) => (
                <div key={atividade.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{atividade.nome}</h3>
                      <p className="text-sm text-gray-500">{atividade.objetivo}</p>
                    </div>
                    {editMode && (
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-sm">{atividade.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Cronograma */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Cronograma</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Atividades
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Objetivos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plano.cronograma.map((semana, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {semana.semana}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {semana.atividades.join(', ')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {semana.objetivos.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Salvar Plano
          </button>
        </div>
      </form>
    </div>
  )
} 