export interface AnamneseQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'date'
  options?: string[]
  category: 'dados_pessoais' | 'historia_musical' | 'desenvolvimento' | 'comportamento' | 'saude' | 'social' | 'preferencias_musicais'
}

export const ANAMNESE_QUESTIONS: AnamneseQuestion[] = [
  // Dados Pessoais e Familiares
  {
    id: 'responsavel',
    question: 'Nome do Responsável',
    type: 'text',
    category: 'dados_pessoais'
  },
  {
    id: 'parentesco',
    question: 'Parentesco',
    type: 'text',
    category: 'dados_pessoais'
  },
  {
    id: 'encaminhamento',
    question: 'Encaminhado por',
    type: 'text',
    category: 'dados_pessoais'
  },
  {
    id: 'queixa_principal',
    question: 'Queixa Principal',
    type: 'text',
    category: 'dados_pessoais'
  },

  // História Musical
  {
    id: 'experiencia_musical',
    question: 'Experiência Musical Prévia',
    type: 'multiple',
    options: [
      'Aulas de música',
      'Canta em casa',
      'Toca instrumento',
      'Participa de coral',
      'Dança',
      'Nenhuma experiência prévia'
    ],
    category: 'historia_musical'
  },
  {
    id: 'musica_em_casa',
    question: 'Relação com Música em Casa',
    type: 'multiple',
    options: [
      'Ouve música frequentemente',
      'Canta espontaneamente',
      'Dança ao ouvir música',
      'Toca instrumentos',
      'Demonstra interesse por sons',
      'Reage negativamente a sons/músicas'
    ],
    category: 'historia_musical'
  },
  {
    id: 'preferencias_musicais',
    question: 'Preferências Musicais',
    type: 'multiple',
    options: [
      'Músicas infantis',
      'MPB',
      'Rock',
      'Sertanejo',
      'Gospel',
      'Clássica',
      'Outros gêneros'
    ],
    category: 'preferencias_musicais'
  },
  {
    id: 'reacoes_sonoras',
    question: 'Reações a Estímulos Sonoros',
    type: 'multiple',
    options: [
      'Hipersensibilidade a sons',
      'Busca estímulos sonoros',
      'Demonstra prazer com música',
      'Apresenta medo de sons específicos',
      'Responde a chamados',
      'Localiza fonte sonora'
    ],
    category: 'historia_musical'
  },

  // Desenvolvimento
  {
    id: 'desenvolvimento_motor',
    question: 'Desenvolvimento Motor',
    type: 'multiple',
    options: [
      'Controle cervical',
      'Sentar sem apoio',
      'Engatinhar',
      'Marcha independente',
      'Coordenação motora fina',
      'Coordenação motora grossa'
    ],
    category: 'desenvolvimento'
  },
  {
    id: 'desenvolvimento_linguagem',
    question: 'Desenvolvimento da Linguagem',
    type: 'multiple',
    options: [
      'Balbucios',
      'Primeiras palavras',
      'Frases simples',
      'Comunicação não-verbal',
      'Ecolalia',
      'Ausência de fala'
    ],
    category: 'desenvolvimento'
  },

  // Comportamento
  {
    id: 'comportamento_social',
    question: 'Comportamento Social',
    type: 'multiple',
    options: [
      'Contato visual',
      'Interação com pares',
      'Brincadeira compartilhada',
      'Isolamento social',
      'Comportamentos repetitivos',
      'Interesses restritos'
    ],
    category: 'comportamento'
  },
  {
    id: 'regulacao_emocional',
    question: 'Regulação Emocional',
    type: 'multiple',
    options: [
      'Irritabilidade',
      'Ansiedade',
      'Agressividade',
      'Choro frequente',
      'Mudanças bruscas de humor',
      'Dificuldade em lidar com frustrações'
    ],
    category: 'comportamento'
  },

  // Saúde
  {
    id: 'diagnosticos',
    question: 'Diagnósticos',
    type: 'multiple',
    options: [
      'TEA',
      'TDAH',
      'Síndrome de Down',
      'Paralisia Cerebral',
      'Deficiência Intelectual',
      'Transtornos de Ansiedade',
      'Outros'
    ],
    category: 'saude'
  },
  {
    id: 'medicamentos',
    question: 'Medicamentos em Uso',
    type: 'text',
    category: 'saude'
  },
  {
    id: 'outros_tratamentos',
    question: 'Outros Tratamentos',
    type: 'multiple',
    options: [
      'Fonoaudiologia',
      'Terapia Ocupacional',
      'Psicologia',
      'Fisioterapia',
      'Psicopedagogia',
      'Equoterapia'
    ],
    category: 'saude'
  },

  // Social
  {
    id: 'escolaridade',
    question: 'Escolaridade',
    type: 'single',
    options: [
      'Não frequenta escola',
      'Educação Infantil',
      'Ensino Fundamental I',
      'Ensino Fundamental II',
      'Escola Especial'
    ],
    category: 'social'
  },
  {
    id: 'adaptacao_escolar',
    question: 'Adaptação Escolar',
    type: 'text',
    category: 'social'
  },
  {
    id: 'atividades_extras',
    question: 'Atividades Extracurriculares',
    type: 'text',
    category: 'social'
  }
]

export interface AnamneseFormData {
  id?: string
  patientId: string
  respostas: Record<string, string | string[]>
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
} 