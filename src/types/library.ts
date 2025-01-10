export type ResourceType = 'article' | 'video' | 'playlist' | 'document'

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  url?: string
  fileUrl?: string
  thumbnail?: string
  tags: string[]
  author: string
  createdAt: Date
  updatedAt: Date
}

export interface Playlist {
  id: string
  title: string
  description: string
  songs: {
    title: string
    artist: string
    duration: string
    url?: string
  }[]
  category: string
  createdBy: string
  createdAt: Date
} 