const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = 'https://uwzswsqvmcinkczzlutv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3enN3c3F2bWNpbmtjenpsdXR2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjUxNDg4OSwiZXhwIjoyMDUyMDkwODg5fQ.tA8hqKL_sZPg-pN34FGPMBoGSU9kTRJjApAfHNQJmBQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createUser() {
  try {
    // Primeiro, criar o usuário no auth do Supabase
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin2@musicoterapia.com',
      password: 'admin123456',
      email_confirm: true
    })

    if (authError) {
      console.error('Erro ao criar usuário no auth:', authError.message)
      return
    }

    console.log('Usuário criado no auth com sucesso:', authUser)

    // Agora criar o usuário na tabela User
    const hashedPassword = await bcrypt.hash('admin123456', 10)
    const now = new Date().toISOString()
    
    const { data: dbUser, error: dbError } = await supabase
      .from('User')
      .insert([
        {
          id: authUser.user.id,
          name: 'Admin',
          email: 'admin2@musicoterapia.com',
          password: hashedPassword,
          professionalRegister: 'ADMIN-001',
          createdAt: now,
          updatedAt: now
        }
      ])
      .select()

    if (dbError) {
      console.error('Erro ao criar usuário no banco:', dbError.message)
      return
    }

    console.log('Usuário criado no banco com sucesso:', dbUser)
  } catch (error) {
    console.error('Erro:', error)
  }
}

createUser()
