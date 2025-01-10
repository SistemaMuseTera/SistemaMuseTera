import { Resource } from '@/types/library'
import { Card } from '@/components/ui/Card'
import { 
  DocumentTextIcon, 
  VideoCameraIcon,
  MusicalNoteIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const resourceIcons = {
  article: DocumentTextIcon,
  video: VideoCameraIcon,
  playlist: MusicalNoteIcon,
  document: DocumentTextIcon
}

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = resourceIcons[resource.type]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{resource.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {resource.description}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {resource.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm text-gray-500">
          <span>{resource.author}</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            <span>{resource.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 