'use client'

import { Card } from '@/components/ui/Card'
import { PatientProgress } from '@/types/dashboard'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface ProgressChartProps {
  patients: PatientProgress[]
}

export function ProgressChart({ patients }: ProgressChartProps) {
  const colors = ['#4F46E5', '#06B6D4', '#8B5CF6', '#10B981']

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Progresso dos Pacientes</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {patients.map((patient, index) => (
                <Line
                  key={patient.name}
                  data={patient.data}
                  name={patient.name}
                  type="monotone"
                  dataKey="score"
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
} 