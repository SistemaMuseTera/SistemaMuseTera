'use client'

import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  UserIcon
} from '@heroicons/react/24/outline'

const processosFuncoes = [
  {
    id: 'anamnese',
    title: 'Anamnese',
    description: 'Cadastro de informações iniciais do paciente',
    icon: UserIcon,
    href: '/processos/anamnese',
    features: [
      'Histórico médico e musical',
      'Formulário configurável'
    ]
  },
  {
    id: 'avaliacao',
    title: 'Avaliação',
    description: 'Avaliação inicial do paciente',
    icon: ClipboardDocumentListIcon,
    href: '/processos/avaliacao',
    features: [
      'Avaliação completa',
      'Registro de observações',
      'Definição de objetivos'
    ]
  },
  {
    id: 'plano',
    title: 'Plano Terapêutico',
    description: 'Definição de objetivos e metas',
    icon: DocumentTextIcon,
    href: '/processos/plano',
    features: [
      'Objetivos personalizados',
      'Sugestões automáticas'
    ]
  },
  {
    id: 'intervencoes',
    title: 'Intervenções',
    description: 'Atividades musicoterapêuticas',
    icon: MusicalNoteIcon,
    href: '/processos/intervencoes',
    features: [
      'Biblioteca de atividades',
      'Personalização'
    ]
  },
  {
    id: 'reavaliacao',
    title: 'Reavaliação',
    description: 'Acompanhamento do progresso',
    icon: ArrowPathIcon,
    href: '/processos/reavaliacao',
    features: [
      'Comparação de resultados',
      'Relatórios automáticos'
    ]
  },
  {
    id: 'relatorio',
    title: 'Relatório',
    description: 'Documentação das sessões',
    icon: DocumentDuplicateIcon,
    href: '/relatorios/novo',
    features: [
      'Registro detalhado',
      'Modelos pré-prontos',
      'Histórico completo'
    ]
  }
]

export default function ProcessosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processos Terapêuticos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie todas as etapas do processo terapêutico
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processosFuncoes.map((funcao) => {
          const Icon = funcao.icon
          return (
            <Link key={funcao.id} href={funcao.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {funcao.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {funcao.description}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {funcao.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 