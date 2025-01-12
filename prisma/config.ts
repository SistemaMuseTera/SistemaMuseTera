import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty'
  })

  return prisma.$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        try {
          return await query(args)
        } catch (error: any) {
          console.error('Erro na operação do Prisma:', {
            operation,
            error: error.message,
            code: error.code
          })
          
          if (error?.message?.includes('Can\'t reach database server')) {
            throw new Error('Não foi possível conectar ao banco de dados. Por favor, tente novamente em alguns instantes.')
          }
          
          throw error
        }
      }
    }
  })
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma as PrismaClient
}

export { prisma }
