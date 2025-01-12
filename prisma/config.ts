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
  errorFormat: 'pretty',
  rejectOnNotFound: false,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
