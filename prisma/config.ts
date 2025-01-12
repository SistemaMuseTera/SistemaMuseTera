import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
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
      
      while (retryCount < maxRetries) {
        try {
          return await query(args)
        } catch (error: any) {
          if (error?.message?.includes('Cannot reach database server')) {
            console.error(`Database connection attempt ${retryCount + 1} failed:`, error)
            retryCount++
            if (retryCount === maxRetries) {
              throw new Error('Não foi possível conectar ao banco de dados após várias tentativas. Por favor, tente novamente em alguns instantes.')
            }
            // Espera um tempo antes de tentar novamente (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
            continue
          }
          throw error
        }
      }
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
