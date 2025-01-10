export interface ReavaliacaoQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'date' | 'escala'
  options?: string[]
  category: 'evolucao_musical' | 'evolucao_comportamental' | 'evolucao_social' | 'objetivos' | 'recomendacoes'
}

export const REAVALIACAO_QUESTIONS: ReavaliacaoQuestion[] = [
  // Evolução Musical
  {
    id: 'habilidades_musicais',
    question: 'Evolução das Habilidades Musicais',
    type: 'multiple',
    options: [
      'Melhora na percepção rítmica',
      'Desenvolvimento da expressão vocal',
      'Ampliação do repertório musical',
      'Maior exploração instrumental',
      'Aumento da criatividade musical',
      'Melhor coordenação motora musical',
      'Desenvolvimento da improvisação'
    ],
    category: 'evolucao_musical'
  },
  {
    id: 'respostas_musicais',
    question: 'Respostas aos Estímulos Musicais',
    type: 'multiple',
    options: [
      'Maior engajamento nas atividades',
      'Melhor resposta a comandos musicais',
      'Iniciativa musical espontânea',
      'Interação musical mais adequada',
      'Maior tempo de participação',
      'Melhor regulação através da música'
    ],
    category: 'evolucao_musical'
  },
  {
    id: 'preferencias_atuais',
    question: 'Preferências Musicais Atuais',
    type: 'text',
    category: 'evolucao_musical'
  },

  // Evolução Comportamental
  {
    id: 'mudancas_comportamento',
    question: 'Mudanças Comportamentais Observadas',
    type: 'multiple',
    options: [
      'Redução de comportamentos inadequados',
      'Melhor regulação emocional',
      'Aumento do tempo de atenção',
      'Maior flexibilidade',
      'Redução da ansiedade',
      'Melhor organização comportamental'
    ],
    category: 'evolucao_comportamental'
  },
  {
    id: 'nivel_participacao',
    question: 'Nível de Participação',
    type: 'escala',
    options: ['1', '2', '3', '4', '5'],
    category: 'evolucao_comportamental'
  },
  {
    id: 'observacoes_comportamentais',
    question: 'Observações Comportamentais Específicas',
    type: 'text',
    category: 'evolucao_comportamental'
  },

  // Evolução Social
  {
    id: 'interacao_social',
    question: 'Evolução na Interação Social',
    type: 'multiple',
    options: [
      'Melhora no contato visual',
      'Aumento da reciprocidade social',
      'Maior iniciativa de interação',
      'Melhor participação em grupo',
      'Desenvolvimento do vínculo terapêutico',
      'Maior engajamento social'
    ],
    category: 'evolucao_social'
  },
  {
    id: 'comunicacao',
    question: 'Desenvolvimento da Comunicação',
    type: 'multiple',
    options: [
      'Aumento do vocabulário',
      'Melhor expressão verbal',
      'Desenvolvimento da comunicação não-verbal',
      'Maior compreensão de comandos',
      'Redução de ecolalias',
      'Comunicação mais funcional'
    ],
    category: 'evolucao_social'
  },

  // Objetivos
  {
    id: 'objetivos_alcancados',
    question: 'Objetivos Alcançados',
    type: 'multiple',
    options: [
      'Desenvolvimento musical',
      'Melhora na comunicação',
      'Evolução social',
      'Regulação emocional',
      'Desenvolvimento motor',
      'Organização comportamental'
    ],
    category: 'objetivos'
  },
  {
    id: 'objetivos_andamento',
    question: 'Objetivos em Andamento',
    type: 'text',
    category: 'objetivos'
  },
  {
    id: 'novos_objetivos',
    question: 'Novos Objetivos Propostos',
    type: 'text',
    category: 'objetivos'
  },

  // Recomendações
  {
    id: 'ajustes_plano',
    question: 'Ajustes no Plano Terapêutico',
    type: 'text',
    category: 'recomendacoes'
  },
  {
    id: 'recomendacoes_familia',
    question: 'Recomendações para Família',
    type: 'text',
    category: 'recomendacoes'
  },
  {
    id: 'encaminhamentos',
    question: 'Encaminhamentos Necessários',
    type: 'text',
    category: 'recomendacoes'
  }
]

export interface ReavaliacaoFormData {
  id?: string
  patientId: string
  respostas: Record<string, string | string[]>
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
} 