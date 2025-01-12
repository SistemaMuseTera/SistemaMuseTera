import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      },
    },
    errorFormat: 'pretty'
  }).$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        const maxRetries = 3
        let retryCount = 0
        let lastError: any = null
        
        while (retryCount < maxRetries) {
          try {
            // Adiciona um pequeno delay antes de cada tentativa (exceto a primeira)
            if (retryCount > 0) {
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
            }
            
            return await query(args)
          } catch (error: any) {
            lastError = error
            const isConnectionError = 
              error?.message?.includes('Can\'t reach database server') ||
              error?.message?.includes('Connection refused') ||
              error?.message?.includes('Connection terminated') ||
              error?.message?.includes('connect ETIMEDOUT') ||
              error?.code === 'P1001' || // Erro de conexão do Prisma
              error?.code === 'P1002'    // Erro de timeout do Prisma
            
            if (isConnectionError && retryCount < maxRetries - 1) {
              console.error(`Tentativa ${retryCount + 1} de ${maxRetries} falhou:`, error)
              retryCount++
              continue
            }
            
            // Se for a última tentativa ou não for erro de conexão, lança o erro
            console.error('Erro na operação do banco de dados:', {
              operation,
              error: error.message,
              code: error.code
            })
            throw new Error('Erro ao acessar o banco de dados. Por favor, tente novamente em alguns instantes.')
          }
        }
        
        // Se chegou aqui, todas as tentativas falharam
        console.error('Todas as tentativas de conexão falharam')
        throw lastError
      }
    }
  })
}

const prismaBase = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaBase
}

export const prisma = prismaBase
