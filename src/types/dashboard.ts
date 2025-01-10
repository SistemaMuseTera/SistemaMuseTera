export interface DashboardStat {
  title: string
  value: string | number
  icon: JSX.Element
  trend?: {
    value: number
    isPositive: boolean
  }
}

export interface PatientProgress {
  name: string
  data: {
    date: string
    score: number
  }[]
}

export interface UpcomingSession {
  id: string
  patientName: string
  date: Date
  time: string
  type: string
}

export interface PendingTask {
  id: string
  title: string
  dueDate: Date
  priority: 'alta' | 'média' | 'baixa'
} 