import { PrismaClient as PrismaClientType } from '.prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClientType()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma