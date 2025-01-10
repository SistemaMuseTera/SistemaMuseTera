import { Card } from '@/components/ui/Card'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { UpcomingSession } from '@/types/dashboard'

interface UpcomingSessionsProps {
  sessions: UpcomingSession[]
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Próximas Sessões</h3>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  {session.patientName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{session.patientName}</p>
                  <p className="text-sm text-gray-500">{session.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{session.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{session.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 