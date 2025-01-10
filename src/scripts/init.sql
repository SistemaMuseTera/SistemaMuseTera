-- Criar tabela de pacientes
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  contact TEXT NOT NULL,
  emergency_contact TEXT,
  medical_history TEXT,
  goals TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);

-- Criar tabela de sessões
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- em minutos
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  activities TEXT[],
  mood_pre TEXT,
  mood_post TEXT,
  progress_notes TEXT
);

-- Criar índices para melhor performance
CREATE INDEX sessions_patient_id_idx ON sessions(patient_id);
CREATE INDEX sessions_date_idx ON sessions(date);
CREATE INDEX patients_name_idx ON patients(name);

-- Habilitar RLS (Row Level Security)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso
CREATE POLICY "Enable read access for all users" ON patients
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON sessions
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users only" ON patients
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users only" ON sessions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
