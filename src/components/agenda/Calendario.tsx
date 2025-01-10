'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Agendamento } from '@/types/agenda'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('pt-br')
const localizer = momentLocalizer(moment)

interface CalendarioProps {
  agendamentos: Agendamento[]
  onSelectSlot: (slotInfo: { start: Date }) => void
  onSelectEvent: (event: Agendamento) => void
}

export function Calendario({ agendamentos, onSelectSlot, onSelectEvent }: CalendarioProps) {
  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={agendamentos}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Não há eventos neste período."
        }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="week"
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
        eventPropGetter={(event: Agendamento) => ({
          className: event.status || 'default'
        })}
      />
    </div>
  )
} 