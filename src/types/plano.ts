export type Diagnostico = 
  | 'TEA' 
  | 'TDAH' 
  | 'Alzheimer'
  | 'Depressão'
  | 'Ansiedade'
  | 'Paralisia_Cerebral'
  | 'Sindrome_Down'
  | 'AVE'
  | 'Parkinson'
  | 'Esquizofrenia'
  | 'Demencia'
  | 'Deficiencia_Intelectual'
  | 'Deficiencia_Auditiva'
  | 'Deficiencia_Visual'
  | 'DPAC'
  | 'Outro'

export interface ObjetivoPadrao {
  id: string
  texto: string
  diagnosticos: Diagnostico[]
  categoria: 'desenvolvimento' | 'comunicacao' | 'motor' | 'comportamento' | 'emocional' | 'social'
}

export interface AtividadePadrao {
  id: string
  nome: string
  objetivo: string
  descricao: string
  diagnosticos: Diagnostico[]
  categoria: 'interacao' | 'percepcao' | 'movimento' | 'vocal' | 'comportamento'
}

// Dados pré-configurados
export const OBJETIVOS_PADRAO: ObjetivoPadrao[] = [
  // TEA
  {
    id: '1',
    texto: 'Promover o desenvolvimento emocional, social e cognitivo através da música',
    diagnosticos: ['TEA', 'Sindrome_Down', 'Deficiencia_Intelectual'],
    categoria: 'desenvolvimento'
  },
  {
    id: '2',
    texto: 'Melhorar a comunicação verbal e não verbal',
    diagnosticos: ['TEA', 'DPAC', 'Deficiencia_Auditiva'],
    categoria: 'comunicacao'
  },
  {
    id: '3',
    texto: 'Reduzir comportamentos restritivos e estereotipados',
    diagnosticos: ['TEA'],
    categoria: 'comportamento'
  },

  // TDAH
  {
    id: '4',
    texto: 'Desenvolver capacidade de foco e atenção',
    diagnosticos: ['TDAH', 'TEA'],
    categoria: 'desenvolvimento'
  },
  {
    id: '5',
    texto: 'Melhorar controle de impulsos através de atividades rítmicas',
    diagnosticos: ['TDAH'],
    categoria: 'comportamento'
  },

  // Alzheimer/Demência
  {
    id: '6',
    texto: 'Estimular memória através de músicas familiares',
    diagnosticos: ['Alzheimer', 'Demencia'],
    categoria: 'desenvolvimento'
  },
  {
    id: '7',
    texto: 'Manter conexões emocionais através de músicas biográficas',
    diagnosticos: ['Alzheimer', 'Demencia'],
    categoria: 'emocional'
  },

  // Paralisia Cerebral
  {
    id: '8',
    texto: 'Desenvolver controle motor através de instrumentos adaptados',
    diagnosticos: ['Paralisia_Cerebral', 'AVE'],
    categoria: 'motor'
  },
  {
    id: '9',
    texto: 'Estimular coordenação motora através de atividades rítmicas',
    diagnosticos: ['Paralisia_Cerebral', 'Parkinson', 'AVE'],
    categoria: 'motor'
  },

  // Síndrome de Down
  {
    id: '10',
    texto: 'Desenvolver habilidades de linguagem através do canto',
    diagnosticos: ['Sindrome_Down', 'Deficiencia_Intelectual'],
    categoria: 'comunicacao'
  },
  {
    id: '11',
    texto: 'Melhorar articulação e dicção',
    diagnosticos: ['Sindrome_Down', 'Deficiencia_Intelectual', 'DPAC'],
    categoria: 'comunicacao'
  },

  // AVE/AVC
  {
    id: '12',
    texto: 'Reabilitar funções motoras através da música',
    diagnosticos: ['AVE', 'Paralisia_Cerebral'],
    categoria: 'motor'
  },
  {
    id: '13',
    texto: 'Estimular recuperação da fala através do canto',
    diagnosticos: ['AVE'],
    categoria: 'comunicacao'
  },

  // Parkinson
  {
    id: '14',
    texto: 'Melhorar controle motor através de exercícios rítmicos',
    diagnosticos: ['Parkinson'],
    categoria: 'motor'
  },
  {
    id: '15',
    texto: 'Desenvolver estratégias para marcha e movimento',
    diagnosticos: ['Parkinson', 'AVE'],
    categoria: 'motor'
  },

  // Saúde Mental
  {
    id: '16',
    texto: 'Reduzir sintomas de ansiedade através da música',
    diagnosticos: ['Ansiedade', 'Depressão'],
    categoria: 'emocional'
  },
  {
    id: '17',
    texto: 'Promover expressão emocional através da improvisação musical',
    diagnosticos: ['Depressão', 'Esquizofrenia'],
    categoria: 'emocional'
  },
  {
    id: '18',
    texto: 'Desenvolver habilidades de socialização',
    diagnosticos: ['Esquizofrenia', 'Depressão'],
    categoria: 'social'
  },

  // Deficiências Sensoriais
  {
    id: '19',
    texto: 'Desenvolver percepção vibrotátil da música',
    diagnosticos: ['Deficiencia_Auditiva'],
    categoria: 'percepcao'
  },
  {
    id: '20',
    texto: 'Estimular orientação espacial através do som',
    diagnosticos: ['Deficiencia_Visual'],
    categoria: 'percepcao'
  },

  // Objetivos para TEA e Comunicação
  {
    id: '21',
    texto: 'Desenvolver habilidades de imitação musical e motora',
    diagnosticos: ['TEA', 'Sindrome_Down'],
    categoria: 'desenvolvimento'
  },
  {
    id: '22',
    texto: 'Estabelecer contato visual durante atividades musicais interativas',
    diagnosticos: ['TEA', 'Deficiencia_Intelectual'],
    categoria: 'social'
  },

  // Objetivos para Deficiências Sensoriais
  {
    id: '23',
    texto: 'Desenvolver discriminação de timbres e intensidades sonoras',
    diagnosticos: ['DPAC', 'Deficiencia_Auditiva', 'TEA'],
    categoria: 'percepcao'
  },
  {
    id: '24',
    texto: 'Aprimorar localização espacial através de estímulos sonoros',
    diagnosticos: ['Deficiencia_Visual', 'DPAC'],
    categoria: 'percepcao'
  },

  // Objetivos para Condições Neurológicas
  {
    id: '25',
    texto: 'Estimular memória de curto prazo através de sequências musicais',
    diagnosticos: ['Alzheimer', 'Demencia', 'AVE'],
    categoria: 'desenvolvimento'
  },
  {
    id: '26',
    texto: 'Melhorar fluência verbal através do canto terapêutico',
    diagnosticos: ['Parkinson', 'AVE', 'Sindrome_Down'],
    categoria: 'comunicacao'
  },

  // Novos objetivos
  {
    id: '27',
    texto: 'Desenvolver consciência corporal através de atividades musicais',
    diagnosticos: ['TEA', 'Paralisia_Cerebral', 'Sindrome_Down'],
    categoria: 'motor'
  },
  {
    id: '28',
    texto: 'Estimular expressão de emoções através da música',
    diagnosticos: ['TEA', 'Depressão', 'Esquizofrenia'],
    categoria: 'emocional'
  },
  {
    id: '29',
    texto: 'Desenvolver habilidades de planejamento motor',
    diagnosticos: ['TEA', 'TDAH', 'Paralisia_Cerebral'],
    categoria: 'motor'
  },
  {
    id: '30',
    texto: 'Desenvolver reconhecimento de padrões sonoros',
    diagnosticos: ['DPAC', 'Deficiencia_Auditiva', 'TEA'],
    categoria: 'percepcao'
  },
  {
    id: '31',
    texto: 'Estimular integração sensorial através da música',
    diagnosticos: ['Deficiencia_Visual', 'TEA', 'DPAC'],
    categoria: 'percepcao'
  },
  {
    id: '32',
    texto: 'Desenvolver orientação espacial através de pistas sonoras',
    diagnosticos: ['Deficiencia_Visual', 'Deficiencia_Auditiva'],
    categoria: 'percepcao'
  },
  {
    id: '33',
    texto: 'Estimular funções executivas através de atividades musicais',
    diagnosticos: ['Alzheimer', 'Demencia', 'Parkinson'],
    categoria: 'desenvolvimento'
  },
  {
    id: '34',
    texto: 'Manter habilidades cognitivas através de exercícios musicais',
    diagnosticos: ['Alzheimer', 'Demencia', 'AVE'],
    categoria: 'desenvolvimento'
  },
  {
    id: '35',
    texto: 'Desenvolver estratégias compensatórias através da música',
    diagnosticos: ['Parkinson', 'AVE', 'Paralisia_Cerebral'],
    categoria: 'motor'
  },
  {
    id: '36',
    texto: 'Desenvolver regulação emocional através da música',
    diagnosticos: ['Ansiedade', 'Depressão', 'Esquizofrenia'],
    categoria: 'emocional'
  },
  {
    id: '37',
    texto: 'Estimular interação social através de atividades musicais em grupo',
    diagnosticos: ['Depressão', 'Esquizofrenia', 'TEA'],
    categoria: 'social'
  },
  {
    id: '38',
    texto: 'Desenvolver estratégias de enfrentamento através da expressão musical',
    diagnosticos: ['Ansiedade', 'Depressão', 'Esquizofrenia'],
    categoria: 'emocional'
  },
  {
    id: '39',
    texto: 'Desenvolver autorregulação através de atividades rítmicas',
    diagnosticos: ['TDAH', 'TEA', 'Sindrome_Down'],
    categoria: 'comportamento'
  },
  {
    id: '40',
    texto: 'Estimular memória operacional através de sequências musicais',
    diagnosticos: ['TDAH', 'Alzheimer', 'Demencia'],
    categoria: 'desenvolvimento'
  },
  {
    id: '41',
    texto: 'Melhorar organização temporal através da música',
    diagnosticos: ['TDAH', 'TEA', 'Deficiencia_Intelectual'],
    categoria: 'desenvolvimento'
  },
  {
    id: '42',
    texto: 'Desenvolver coordenação motora fina através de instrumentos musicais',
    diagnosticos: ['Sindrome_Down', 'Paralisia_Cerebral', 'TEA'],
    categoria: 'motor'
  },
  {
    id: '43',
    texto: 'Estimular memória sequencial através de canções',
    diagnosticos: ['Sindrome_Down', 'Deficiencia_Intelectual', 'TDAH'],
    categoria: 'desenvolvimento'
  },
  {
    id: '44',
    texto: 'Desenvolver habilidades sociais através de atividades musicais em grupo',
    diagnosticos: ['Sindrome_Down', 'TEA', 'Deficiencia_Intelectual'],
    categoria: 'social'
  }
]

export const ATIVIDADES_PADRAO: AtividadePadrao[] = [
  // Atividades Interativas
  {
    id: '1',
    nome: 'Roda Musical',
    objetivo: 'Favorecer a interação social e o turn-taking',
    descricao: 'Utilizar instrumentos de percussão para criar uma roda de música onde cada participante tem sua vez de tocar',
    diagnosticos: ['TEA', 'TDAH', 'Sindrome_Down'],
    categoria: 'interacao'
  },
  {
    id: '2',
    nome: 'Banda Rítmica',
    objetivo: 'Desenvolver coordenação e trabalho em grupo',
    descricao: 'Formar uma banda com diferentes instrumentos, trabalhando ritmos simples e coordenação coletiva',
    diagnosticos: ['Paralisia_Cerebral', 'Sindrome_Down', 'TDAH'],
    categoria: 'movimento'
  },

  // Atividades de Memória
  {
    id: '3',
    nome: 'Recordação Musical',
    objetivo: 'Estimular memória autobiográfica',
    descricao: 'Utilizar músicas significativas da história do paciente para evocar memórias e emoções',
    diagnosticos: ['Alzheimer', 'Demencia'],
    categoria: 'percepcao'
  },

  // Atividades Motoras
  {
    id: '4',
    nome: 'Dança Rítmica',
    objetivo: 'Melhorar coordenação e equilíbrio',
    descricao: 'Movimentos corporais sincronizados com música, adaptados às capacidades do paciente',
    diagnosticos: ['Parkinson', 'AVE', 'Paralisia_Cerebral'],
    categoria: 'movimento'
  },

  // Atividades de Comunicação
  {
    id: '5',
    nome: 'Canto Terapêutico',
    objetivo: 'Desenvolver habilidades de fala e articulação',
    descricao: 'Exercícios vocais e músicas específicas para trabalhar aspectos da fala',
    diagnosticos: ['AVE', 'Sindrome_Down', 'DPAC'],
    categoria: 'vocal'
  },

  // Atividades Sensoriais
  {
    id: '6',
    nome: 'Exploração Sonora',
    objetivo: 'Desenvolver consciência sensorial',
    descricao: 'Exploração de diferentes timbres e texturas sonoras com instrumentos variados',
    diagnosticos: ['Deficiencia_Visual', 'Deficiencia_Auditiva', 'TEA'],
    categoria: 'percepcao'
  }
]

export interface PlanoTerapeutico {
  id: string
  patientId: string
  identificacao: {
    nome: string
    idade: number
    diagnostico: string
    dataInicio: Date
    dataReavaliacao: Date
  }
  objetivosGerais: string[]
  objetivosEspecificos: {
    interacaoSocial: string[]
    exploracaoSonora: string[]
    movimentacaoCorporal: string[]
    exploracaoVocal: string[]
    comportamentosRestritivos: string[]
  }
  atividades: Array<{
    id: string
    nome: string
    objetivo: string
    descricao: string
    categoria: 'interacao' | 'percepcao' | 'movimento' | 'vocal' | 'comportamento'
  }>
  cronograma: Array<{
    semana: string
    atividades: string[]
    objetivos: string[]
  }>
  avaliacoes: Array<{
    data: Date
    participacao: number // 1-5
    respostasSociais: number // 1-5
    comportamentosRestritivos: number // 1-5
    observacoes: string
  }>
  observacoesGerais: string
  status: 'ativo' | 'concluido' | 'em_revisao'
  createdAt: Date
  updatedAt: Date
} 