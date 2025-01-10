import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwrnuoqkxjyidljwneof.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cm51b3FreGp5aWRsanduZW9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjI0NjE3MiwiZXhwIjoyMDUxODIyMTcyfQ.SCpDaAi7IPOYWHAmsNPxlCLtQ4KUhXKxkRsItOKtU5o'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@example.com',
    password: 'admin123456',
    email_confirm: true,
    user_metadata: {
      name: 'Admin User',
      professionalRegister: '12345'
    }
  })

  if (error) {
    console.error('Erro ao criar usuário:', error.message)
    return
  }

  console.log('Usuário criado com sucesso:', data)
}

createUser()
