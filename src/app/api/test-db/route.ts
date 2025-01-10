import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Tenta buscar todos os usuários
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Conexão com o banco de dados OK',
      users 
    })
  } catch (error) {
    console.error('Erro ao acessar o banco:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao conectar com o banco de dados' 
    }, { status: 500 })
  }
}
