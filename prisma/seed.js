const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('Admin@123', 10)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@musicoterapia.com' },
      update: {},
      create: {
        name: 'Administrador',
        email: 'admin@musicoterapia.com',
        password: hashedPassword,
        professionalRegister: 'MT-001',
      },
    })

    console.log('Usuário admin criado:', admin)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
