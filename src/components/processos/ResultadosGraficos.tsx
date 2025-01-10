'use client'

import { Card } from '@/components/ui/Card'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calcularPorcentagens } from '@/utils/avaliacaoCalculos'
import { useEffect, useState } from 'react'

const COLORS = ['#4ade80', '#ff87ab']
const CHART_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308']

interface ResultadosGraficosProps {
  avaliacoes: Record<string, string>
}

export function ResultadosGraficos({ avaliacoes }: ResultadosGraficosProps) {
  const resultados = calcularPorcentagens(avaliacoes)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getPieChartSize = () => {
    if (windowWidth < 640) return { width: 300, height: 250 }
    if (windowWidth < 1024) return { width: 350, height: 300 }
    return { width: 400, height: 300 }
  }

  const getBarChartSize = () => {
    if (windowWidth < 640) return { width: 300, height: 300 }
    if (windowWidth < 1024) return { width: 400, height: 300 }
    return { width: 500, height: 300 }
  }

  const pieSize = getPieChartSize()
  const barSize = getBarChartSize()

  return (
    <Card className="p-4 sm:p-6 mt-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
        Resultados da Escala e Gráficos
      </h2>
      <div id="resultados-graficos" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Habilidades Adquiridas
          </h3>
          <div className="flex justify-center">
            <PieChart width={pieSize.width} height={pieSize.height}>
              <Pie
                data={resultados.habilidades}
                cx={pieSize.width / 2}
                cy={pieSize.height / 2}
                innerRadius={pieSize.width * 0.15}
                outerRadius={pieSize.width * 0.25}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {resultados.habilidades.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
              />
            </PieChart>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Desempenho por Categoria
          </h3>
          <div className="flex justify-center">
            <BarChart
              width={barSize.width}
              height={barSize.height}
              data={resultados.categorias}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 65,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fill: '#4b5563', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: '#4b5563', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="value" 
                name="Porcentagem"
                radius={[4, 4, 0, 0]}
              >
                {resultados.categorias.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </Card>
  )
}
