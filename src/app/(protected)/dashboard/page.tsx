'use client'

import { useState, useEffect } from 'react'
import { 
  UserGroupIcon, 
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { StatCard } from '@/components/dashboard/StatCard'
import { ProgressChart } from '@/components/dashboard/ProgressChart'
import { UpcomingSessions } from '@/components/dashboard/UpcomingSessions'
import { Card } from '@/components/ui/Card'

export default function DashboardPage() {
  // Dados mockados para exemplo
  const stats = [
    {
      title: 'Pacientes Ativos',
      value: 42,
      icon: <UserGroupIcon className="h-8 w-8" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Sessões esta Semana',
      value: 28,
      icon: <CalendarIcon className="h-8 w-8" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Taxa de Conclusão',
      value: '89%',
      icon: <ClipboardDocumentCheckIcon className="h-8 w-8" />,
      trend: { value: 3, isPositive: true }
    }
  ]

  const progressData = [
    {
      name: 'João Silva',
      data: [
        { date: '01/03', score: 65 },
        { date: '08/03', score: 72 },
        { date: '15/03', score: 78 },
        { date: '22/03', score: 85 }
      ]
    },
    {
      name: 'Maria Santos',
      data: [
        { date: '01/03', score: 70 },
        { date: '08/03', score: 75 },
        { date: '15/03', score: 73 },
        { date: '22/03', score: 80 }
      ]
    }
  ]

  const upcomingSessions = [
    {
      id: '1',
      patientName: 'João Silva',
      date: new Date('2024-03-25'),
      time: '14:00',
      type: 'Sessão Regular'
    },
    {
      id: '2',
      patientName: 'Maria Santos',
      date: new Date('2024-03-25'),
      time: '15:30',
      type: 'Avaliação Inicial'
    }
  ]

  const pendingTasks = [
    {
      id: '1',
      title: 'Relatório Pendente - João Silva',
      dueDate: new Date('2024-03-24'),
      priority: 'alta'
    },
    {
      id: '2',
      title: 'Atualizar Plano Terapêutico - Maria Santos',
      dueDate: new Date('2024-03-25'),
      priority: 'média'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart patients={progressData} />
        </div>
        <div>
          <UpcomingSessions sessions={upcomingSessions} />
        </div>
      </div>

      <div>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tarefas Pendentes</h3>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <ExclamationCircleIcon 
                      className={`h-5 w-5 ${
                        task.priority === 'alta' ? 'text-red-500' : 'text-yellow-500'
                      }`} 
                    />
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        Vence em: {task.dueDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    Concluir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 