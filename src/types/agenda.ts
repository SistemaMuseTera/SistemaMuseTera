export interface Agendamento {
  id: string
  patientId: string
  title: string
  start: Date
  end: Date
  status: 'agendado' | 'concluido' | 'cancelado'
  observacoes?: string
  tipo: 'sessao' | 'avaliacao' | 'reavaliacao'
}

export interface AgendamentoFormData {
  patientId: string
  data: string
  horario: string
  duracao: number // em minutos
  tipo: 'sessao' | 'avaliacao' | 'reavaliacao'
  observacoes?: string
} 