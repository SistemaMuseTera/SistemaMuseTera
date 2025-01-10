'use client'

import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const baseClasses = 'bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5'
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses

  return (
    <div className={combinedClasses}>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  )
}