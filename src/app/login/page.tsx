'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { FiMail, FiLock, FiAlertCircle, FiMusic } from 'react-icons/fi'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou senha inválidos')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Erro no login:', error)
      setError('Ocorreu um erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <FiMusic className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">MuseTera</h1>
          <p className="text-lg text-gray-600">Sistema de Gestão para Musicoterapeutas</p>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Bem-vindo(a) de volta!
            </h2>
            <p className="text-gray-600 mt-2">
              Faça login para acessar sua conta
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative group">
                <FiMail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-10 py-3 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 ease-in-out"
                  placeholder="Email"
                />
              </div>
              <div className="relative group">
                <FiLock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-10 py-3 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 ease-in-out"
                  placeholder="Senha"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-8">
          2025 MuseTera. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}