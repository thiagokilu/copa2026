import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import data from '../../matches.json'
import { useState } from 'react'

export default function FullCalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  // Converter matches para eventos do FullCalendar
  const events = data.matches
    .filter((match) => match?.home && match?.away && match?.date && match?.time_brt)
    .map((match) => {
      const start = `${match.date}T${match.time_brt}:00`
      
      return {
        id: match.id.toString(),
        title: `${match.home} vs ${match.away}`,
        start, // Apenas data de início
        extendedProps: {
          ...match
        }
      }
    })

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setShowModal(false)
  }

  return (
    <div className="p-6 bg-[#020617] min-h-screen">
      <div className="">
        <h1 className="text-3xl font-bold text-white mb-6">
          Calendário de Jogos - Copa 2026
        </h1>
        <div className="bg-[#0f172a] rounded-lg p-4">
          <style>{`
            .fc-toolbar-title {
              font-size: 1.2em !important;
              font-weight: bold !important;
              color: white !important;
            }
            .fc-header-toolbar {
              margin-bottom: 1em !important;
            }
            .fc-button-primary {
              background-color: #1e293b !important;
              border-color: #334155 !important;
              color: white !important;
            }
            .fc-button-primary:hover {
              background-color: #334155 !important;
              border-color: #475569 !important;
            }
            .fc-button-primary:active {
              background-color: #475569 !important;
              border-color: #64748b !important;
            }
            .fc-button-primary:not(:disabled):active, .fc-button-primary:not(:disabled).fc-button-active {
              background-color: #3b82f6 !important;
              border-color: #2563eb !important;
            }
            .fc-daygrid-day-number {
              color: white !important;
            }
            .fc-col-header-cell {
              background-color: #1e293b !important;
              color: white !important;
            }
            .fc-daygrid-day {
              background-color: #0f172a !important;
              border-color: #1e293b !important;
            }
            .fc-daygrid-day.fc-day-today {
              background-color: #1e293b !important;
            }
            .fc-daygrid-day:hover {
              background-color: #1e293b !important;
            }
            .fc-event-title {
              color: white !important;
              font-weight: bold !important;
            }
            .fc-event-time {
              color: rgba(255, 255, 255, 0.8) !important;
            }
            .fc-daygrid-event {
              border: none !important;
            }
          `}</style>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            initialDate="2026-06-11"
            locale={ptBrLocale}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            titleFormat={{ 
              year: 'numeric', 
              month: 'long' 
            }}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
              list: 'Lista'
            }}
            events={events}
            height="auto"
            aspectRatio={1.8}
            eventDisplay="block"
            displayEventTime={true}
            displayEventEnd={false} // Não exibir horário de fim
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventClick={handleEventClick}
            eventDidMount={(info: any) => {
              // Adicionar cores baseadas no grupo
              const groupColors: Record<string, string> = {
                'A': '#3b82f6',
                'B': '#22c55e', 
                'C': '#ef4444',
                'D': '#eab308',
                'E': '#f97316',
                'F': '#06b6d4',
                'G': '#8b5cf6',
                'H': '#ec4899',
                'I': '#14b8a6',
                'J': '#f59e0b',
                'K': '#6366f1',
                'L': '#84cc16'
              }
              
              const group = info.event.extendedProps.group
              const color = groupColors[group] || '#64748b'
              
              info.el.style.backgroundColor = color
              info.el.style.borderColor = color
              info.el.style.color = 'white'
              info.el.style.fontWeight = 'bold'
              info.el.style.fontSize = '12px'
              info.el.style.padding = '2px 6px'
              info.el.style.borderRadius = '4px'
              info.el.style.borderWidth = '0'
              info.el.style.cursor = 'pointer'
            }}
            noEventsContent={() => (
              <div className="text-center py-8 text-gray-400">
                Nenhum jogo encontrado neste período.
              </div>
            )}
          />
        </div>

        {/* Modal de Detalhes do Jogo */}
        {showModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {selectedEvent.home} vs {selectedEvent.away}
              </h2>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-semibold">Data:</span>
                  <span>{new Date(selectedEvent.date).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Horário:</span>
                  <span>{selectedEvent.time_brt}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Grupo:</span>
                  <span className="px-2 py-1 rounded text-xs font-bold text-white"
                        style={{ backgroundColor: selectedEvent.group === 'A' ? '#3b82f6' : selectedEvent.group === 'B' ? '#22c55e' : '#64748b' }}>
                    Grupo {selectedEvent.group}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Estádio:</span>
                  <span>{selectedEvent.stadium}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedEvent.status === 'FINISHED' ? 'bg-green-100 text-green-800' :
                    selectedEvent.status === 'IN_PLAY' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedEvent.status === 'SCHEDULED' ? 'Agendado' :
                     selectedEvent.status === 'FINISHED' ? 'Finalizado' :
                     selectedEvent.status === 'IN_PLAY' ? 'Em andamento' :
                     selectedEvent.status}
                  </span>
                </div>
                
                {selectedEvent.score && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Placar:</span>
                    <span className="font-bold text-lg">
                      {selectedEvent.score.home} - {selectedEvent.score.away}
                    </span>
                  </div>
                )}
              </div>
              
              <button
                onClick={closeModal}
                className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
