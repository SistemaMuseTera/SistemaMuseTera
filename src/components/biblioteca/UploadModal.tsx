'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ResourceType } from '@/types/library'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'article' as ResourceType,
    tags: '',
    file: null as File | null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de upload
    console.log('Form data:', formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-lg font-semibold">
              Adicionar Novo Recurso
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Título</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Descrição</label>
              <textarea
                required
                rows={3}
                className="w-full p-2 border rounded-lg"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Tipo</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as ResourceType }))}
              >
                <option value="article">Artigo</option>
                <option value="video">Vídeo</option>
                <option value="playlist">Playlist</option>
                <option value="document">Documento</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Tags (separadas por vírgula)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.tags}
                onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Arquivo</label>
              <input
                type="file"
                className="w-full"
                onChange={e => setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Adicionar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 