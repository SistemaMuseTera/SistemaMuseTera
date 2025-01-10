export interface Patient {
  id: string
  created_at: string
  name: string
  date_of_birth: string
  contact: string
  emergency_contact?: string
  medical_history?: string
  goals?: string
  status: 'active' | 'inactive'
}

export interface Session {
  id: string
  created_at: string
  patient_id: string
  date: string
  duration: number // em minutos
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  activities?: string[]
  mood_pre?: string
  mood_post?: string
  progress_notes?: string
}

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: Patient
        Insert: Omit<Patient, 'id' | 'created_at'>
        Update: Partial<Omit<Patient, 'id' | 'created_at'>>
      }
      sessions: {
        Row: Session
        Insert: Omit<Session, 'id' | 'created_at'>
        Update: Partial<Omit<Session, 'id' | 'created_at'>>
      }
    }
  }
}
