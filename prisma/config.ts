import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
    datasources: {
      db: {
        url: process.env.DATABASE_URL?.replace(':6543', ':5432') || process.env.DATABASE_URL
      }
    }
  })

  return prisma.$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        const maxRetries = 3
        let retryCount = 0
        let lastError: any = null
        
        while (retryCount < maxRetries) {
          try {
            if (retryCount > 0) {
              console.log(`Tentativa ${retryCount + 1} de ${maxRetries} para operação ${operation}`)
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
            }
            
            return await query(args)
          } catch (error: any) {
            lastError = error
            console.error('Erro na operação do Prisma:', {
              operation,
              attempt: retryCount + 1,
              error: error.message,
              code: error.code
            })

            const isConnectionError = 
              error?.message?.includes('Can\'t reach database server') ||
              error?.message?.includes('Connection refused') ||
              error?.message?.includes('Connection terminated') ||
              error?.message?.includes('connect ETIMEDOUT') ||
              error?.code === 'P1001' || // Erro de conexão
              error?.code === 'P1002'    // Erro de timeout

            if (isConnectionError && retryCount < maxRetries - 1) {
              retryCount++
              continue
            }

            throw error
          }
        }
        
        console.error('Todas as tentativas de conexão falharam')
        throw lastError
      }
    }
  })
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma as PrismaClient
}

export { prisma }
