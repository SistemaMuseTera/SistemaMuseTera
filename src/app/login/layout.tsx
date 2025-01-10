import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - MuseTera',
  description: 'Sistema de Gestão para Musicoterapeutas',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {children}
    </div>
  )
}
