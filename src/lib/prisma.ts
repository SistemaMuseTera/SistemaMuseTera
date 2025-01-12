import { PrismaClient as PrismaClientType } from '.prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClientType({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    errorFormat: 'pretty'
  })
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Verificar conexão com o banco
prisma.$connect()
  .then(() => {
    console.log('Conexão com o banco estabelecida com sucesso')
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco:', error)
  })