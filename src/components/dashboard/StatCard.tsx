import { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'
import { DashboardStat } from '@/types/dashboard'

type StatCardProps = DashboardStat

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
              </div>
            )}
          </div>
          <div className="text-indigo-600">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  )
} 