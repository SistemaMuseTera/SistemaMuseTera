import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Testa a conexão com o banco
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json(
      { status: 'healthy', database: 'connected' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Health check falhou:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 503 }
    )
  }
}
