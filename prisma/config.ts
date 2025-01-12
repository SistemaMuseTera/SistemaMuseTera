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
              error?.code === 'P1001' || // Erro de conexão do Prisma
              error?.code === 'P1002'    // Erro de timeout do Prisma
            
            if (isConnectionError) {
              console.error(`Tentativa ${retryCount + 1} de ${maxRetries} falhou:`, error)
              retryCount++
              continue
            }
            
            throw error
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
