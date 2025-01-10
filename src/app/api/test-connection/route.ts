import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Teste conexão Prisma
    const prismaTest = await prisma.$queryRaw`SELECT 1 as result`

    // Teste conexão Supabase
    const { data: supabaseTest, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      status: 'success',
      message: 'Conexão estabelecida com sucesso',
      prisma: prismaTest,
      supabase: supabaseTest
    })
  } catch (error) {
    console.error('Erro ao testar conexão:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Erro ao acessar o banco',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
