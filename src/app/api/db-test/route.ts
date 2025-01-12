import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Tenta fazer uma consulta simples
    const result = await prisma.$queryRaw`SELECT current_timestamp`
    
    return NextResponse.json({
      status: 'ok',
      timestamp: result[0].current_timestamp,
      database_url: process.env.DATABASE_URL?.replace(/:[^:]+@/, ':****@') // Oculta a senha
    })
  } catch (error: any) {
    console.error('Erro ao testar conexão:', error)
    
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}
