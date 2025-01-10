export type TipoRelatorio = 
  | 'avaliacao_inicial'
  | 'sessao'
  | 'evolucao_mensal'
  | 'evolucao_semestral'
  | 'alta'
  | 'reavaliacao'
  | 'familia'
  | 'equipe'

export interface SecaoRelatorio {
  id: string
  titulo: string
  tipo: 'texto' | 'checkbox' | 'radio' | 'escala' | 'lista'
  obrigatorio: boolean
  opcoes?: string[]
  descricao?: string
}

export interface TemplateRelatorio {
  tipo: TipoRelatorio
  titulo: string
  descricao: string
  secoes: SecaoRelatorio[]
}

export interface Relatorio {
  id: string
  tipo: TipoRelatorio
  patientId: string
  therapistId: string
  data: Date
  respostas: Record<string, any>
  status: 'rascunho' | 'finalizado'
  createdAt: Date
  updatedAt: Date
}

// Templates pré-configurados
export const TEMPLATES_RELATORIO: Record<TipoRelatorio, TemplateRelatorio> = {
  avaliacao_inicial: {
    tipo: 'avaliacao_inicial',
    titulo: 'Relatório de Avaliação Inicial',
    descricao: 'Avaliação inicial do paciente para estabelecimento de linha de base e planejamento terapêutico',
    secoes: [
      {
        id: 'dados_gerais',
        titulo: 'Dados Gerais',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Informações sobre encaminhamento, queixa principal e histórico'
      },
      {
        id: 'aspectos_musicais',
        titulo: 'Aspectos Musicais',
        tipo: 'lista',
        obrigatorio: true,
        opcoes: [
          'Preferências musicais',
          'Experiência musical prévia',
          'Resposta a diferentes estilos',
          'Habilidades rítmicas',
          'Habilidades vocais',
          'Interação com instrumentos'
        ]
      },
      {
        id: 'aspectos_comportamentais',
        titulo: 'Aspectos Comportamentais',
        tipo: 'escala',
        obrigatorio: true,
        opcoes: [
          'Atenção e concentração',
          'Interação social',
          'Comunicação',
          'Comportamentos repetitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'conclusoes',
        titulo: 'Conclusões e Recomendações',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Impressões gerais, objetivos propostos e recomendações terapêuticas'
      }
    ]
  },

  sessao: {
    tipo: 'sessao',
    titulo: 'Relatório de Sessão',
    descricao: 'Registro detalhado das atividades e observações da sessão',
    secoes: [
      {
        id: 'atividades_realizadas',
        titulo: 'Atividades Realizadas',
        tipo: 'lista',
        obrigatorio: true
      },
      {
        id: 'participacao',
        titulo: 'Participação e Engajamento',
        tipo: 'escala',
        obrigatorio: true,
        opcoes: [
          'Interesse nas atividades',
          'Interação com terapeuta',
          'Resposta aos estímulos musicais',
          'Iniciativa',
          'Manutenção da atenção'
        ]
      },
      {
        id: 'observacoes',
        titulo: 'Observações Específicas',
        tipo: 'texto',
        obrigatorio: false,
        descricao: 'Comportamentos, respostas ou eventos relevantes'
      }
    ]
  },

  evolucao_mensal: {
    tipo: 'evolucao_mensal',
    titulo: 'Relatório de Evolução Mensal',
    descricao: 'Acompanhamento mensal do progresso do paciente',
    secoes: [
      {
        id: 'objetivos_trabalhados',
        titulo: 'Objetivos Trabalhados',
        tipo: 'checkbox',
        obrigatorio: true,
        opcoes: [
          'Desenvolvimento musical',
          'Habilidades sociais',
          'Comunicação',
          'Aspectos motores',
          'Aspectos cognitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'evolucao_por_area',
        titulo: 'Evolução por Área',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descreva o progresso em cada área trabalhada'
      }
    ]
  },

  evolucao_semestral: {
    tipo: 'evolucao_semestral',
    titulo: 'Relatório de Evolução Semestral',
    descricao: 'Análise detalhada do progresso em 6 meses de terapia',
    secoes: [
      {
        id: 'objetivos_alcancados',
        titulo: 'Objetivos Alcançados',
        tipo: 'checkbox',
        obrigatorio: true,
        opcoes: [
          'Desenvolvimento musical',
          'Habilidades sociais',
          'Comunicação',
          'Aspectos motores',
          'Aspectos cognitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'evolucao_detalhada',
        titulo: 'Evolução Detalhada',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descreva detalhadamente o progresso em cada área'
      },
      {
        id: 'ajustes_plano',
        titulo: 'Ajustes no Plano Terapêutico',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Sugestões de modificações nos objetivos e estratégias'
      }
    ]
  },

  alta: {
    tipo: 'alta',
    titulo: 'Relatório de Alta',
    descricao: 'Documentação da conclusão do processo terapêutico',
    secoes: [
      {
        id: 'motivo_alta',
        titulo: 'Motivo da Alta',
        tipo: 'radio',
        obrigatorio: true,
        opcoes: [
          'Objetivos alcançados',
          'Alta a pedido',
          'Encaminhamento',
          'Outros'
        ]
      },
      {
        id: 'objetivos_alcancados',
        titulo: 'Objetivos Alcançados',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descreva os objetivos alcançados durante o tratamento'
      },
      {
        id: 'recomendacoes',
        titulo: 'Recomendações',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Orientações para manutenção dos ganhos terapêuticos'
      }
    ]
  },

  reavaliacao: {
    tipo: 'reavaliacao',
    titulo: 'Relatório de Reavaliação',
    descricao: 'Reavaliação periódica do paciente',
    secoes: [
      {
        id: 'evolucao_geral',
        titulo: 'Evolução Geral',
        tipo: 'escala',
        obrigatorio: true,
        opcoes: [
          'Aspectos musicais',
          'Comunicação',
          'Interação social',
          'Aspectos motores',
          'Aspectos cognitivos',
          'Regulação emocional'
        ]
      },
      {
        id: 'novos_objetivos',
        titulo: 'Novos Objetivos',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Definição de novos objetivos terapêuticos'
      }
    ]
  },

  familia: {
    tipo: 'familia',
    titulo: 'Relatório para Família',
    descricao: 'Comunicação com a família sobre o progresso do paciente',
    secoes: [
      {
        id: 'atividades_realizadas',
        titulo: 'Atividades Realizadas',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descrição das principais atividades do período'
      },
      {
        id: 'progresso_observado',
        titulo: 'Progresso Observado',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Evolução observada em linguagem acessível'
      },
      {
        id: 'orientacoes',
        titulo: 'Orientações para Casa',
        tipo: 'lista',
        obrigatorio: true,
        opcoes: [
          'Atividades musicais sugeridas',
          'Estratégias de comunicação',
          'Rotinas recomendadas',
          'Exercícios específicos'
        ]
      }
    ]
  },

  equipe: {
    tipo: 'equipe',
    titulo: 'Relatório para Equipe Interdisciplinar',
    descricao: 'Comunicação com outros profissionais da equipe',
    secoes: [
      {
        id: 'objetivos_terapeuticos',
        titulo: 'Objetivos Terapêuticos',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Objetivos trabalhados e estratégias utilizadas'
      },
      {
        id: 'evolucao_tecnica',
        titulo: 'Evolução Técnica',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Descrição técnica do progresso observado'
      },
      {
        id: 'sugestoes_interdisciplinares',
        titulo: 'Sugestões Interdisciplinares',
        tipo: 'texto',
        obrigatorio: true,
        descricao: 'Sugestões para trabalho integrado com a equipe'
      }
    ]
  }
} 