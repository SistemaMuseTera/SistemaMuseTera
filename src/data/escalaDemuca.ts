import { EscalaDemuca } from '@/types/escala'

export const ESCALA_DEMUCA: EscalaDemuca = [
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
      'Percepção do pulso musical',
      'Percepção do ritmo',
      'Reprodução do pulso',
      'Reprodução do ritmo',
      'Improvisação rítmica'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Exploração sonora',
    parametros: [
      'Exploração dos instrumentos',
      'Percepção dos sons',
      'Discriminação dos sons',
      'Percepção da intensidade',
      'Percepção da altura',
      'Percepção do timbre',
      'Percepção da duração'
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
      'Vocalização',
      'Emissão de sons',
      'Reprodução de sons',
      'Canto',
      'Improvisação vocal'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  },
  {
    categoria: 'Movimentação com a música',
    parametros: [
      'Movimentação espontânea',
      'Movimentação dirigida',
      'Coordenação motora',
      'Expressão corporal',
      'Dança'
    ],
    escala: {
      nao: 0,
      pouco: 1,
      muito: 2
    }
  }
]
