'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Resource, ResourceType } from '@/types/library'
import { 
  DocumentTextIcon, 
  VideoCameraIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import ResourceCard from '@/components/biblioteca/ResourceCard'
import UploadModal from '@/components/biblioteca/UploadModal'

const resourceTypes: { type: ResourceType; label: string; icon: any }[] = [
  { type: 'article', label: 'Artigos', icon: DocumentTextIcon },
  { type: 'video', label: 'Vídeos', icon: VideoCameraIcon },
  { type: 'playlist', label: 'Playlists', icon: MusicalNoteIcon },
]

// Dados mockados para exemplo
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introdução à Musicoterapia',
    description: 'Um guia completo sobre os fundamentos da musicoterapia',
    type: 'article',
    author: 'Dr. João Silva',
    tags: ['fundamentos', 'iniciantes'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Técnicas de Relaxamento com Música',
    description: 'Vídeo tutorial sobre técnicas de relaxamento',
    type: 'video',
    url: 'https://youtube.com/watch?v=example',
    thumbnail: '/images/relaxamento.jpg',
    author: 'Dra. Maria Santos',
    tags: ['relaxamento', 'prática'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  // Adicione mais recursos aqui
]

export default function BibliotecaPage() {
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const filteredResources = mockResources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Biblioteca</h1>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5" />
          Adicionar Recurso
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-64 p-4">
          <h2 className="font-semibold mb-4">Tipos de Recurso</h2>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedType === 'all' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            {resourceTypes.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                  selectedType === type ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex-1 space-y-6">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  )
} 