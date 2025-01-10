import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Teste conexão Prisma
    const prismaTest = await prisma.user.findMany({
      take: 1
    })

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
      prismaConnection: 'ok',
      prismaData: prismaTest,
      supabaseConnection: 'ok',
      supabaseData: supabaseTest
    })
  } catch (error: any) {
    console.error('Erro ao testar conexão:', error)
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 })
  }
}
