'use client'

import { Tab } from '@headlessui/react'
import { PlanoTerapeuticoPanel } from '@/components/processos/PlanoTerapeuticoPanel'

export default function ProcessosPage({ params }: { params: { patientId: string } }) {
  return (
    <div className="space-y-6">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5">
            Plano Terapêutico
          </Tab>
          {/* Adicione outras tabs conforme necessário */}
        </Tab.List>
        
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <PlanoTerapeuticoPanel patientId={params.patientId} />
          </Tab.Panel>
          {/* Adicione outros painéis conforme necessário */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
} 