import { supabase } from './supabase'
import type { Database, Patient, Session } from '@/types/database.types'

// Funções para Pacientes
export async function getPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export async function getPatient(id: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createPatient(patient: Database['public']['Tables']['patients']['Insert']) {
  const { data, error } = await supabase
    .from('patients')
    .insert(patient)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Funções para Sessões
export async function getPatientSessions(patientId: string) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('patient_id', patientId)
    .order('date', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createSession(session: Database['public']['Tables']['sessions']['Insert']) {
  const { data, error } = await supabase
    .from('sessions')
    .insert(session)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateSession(
  id: string,
  updates: Database['public']['Tables']['sessions']['Update']
) {
  const { data, error } = await supabase
    .from('sessions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Dashboard
export async function getDashboardStats(patientId: string) {
  const { data: sessions, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('patient_id', patientId)
    .order('date', { ascending: false })
    .limit(10)
  
  if (error) throw error
  
  return {
    recentSessions: sessions,
    totalSessions: sessions.length,
    completedSessions: sessions.filter(s => s.status === 'completed').length,
  }
}
