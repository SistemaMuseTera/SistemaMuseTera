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

  prisma.$on('beforeExit', async () => {
    console.log('Disconnecting from database...')
    await prisma.$disconnect()
  })

  return prisma.$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        try {
          const result = await query(args)
          return result
        } catch (error: any) {
          console.error('Database operation failed:', {
            operation,
            error: error.message,
            code: error.code
          })

          // Tenta reconectar se o erro for de conexão
          if (error?.message?.includes('Can\'t reach database server')) {
            try {
              console.log('Attempting to reconnect...')
              await prisma.$disconnect()
              await prisma.$connect()
              return await query(args)
            } catch (reconnectError: any) {
              console.error('Reconnection failed:', reconnectError.message)
              throw new Error('Database connection error. Please try again.')
            }
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
