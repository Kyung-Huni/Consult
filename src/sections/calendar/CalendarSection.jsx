import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarModal from './CalendarModal';

export default function CalendarSection({ meetings = [] }) {
  const [items, setItems] = useState(meetings);
  const [selected, setSelected] = useState(null);

  const events = items.map((item) => ({
    id: item.id,
    title: item.title,
    start: `${item.date}T${item.time}`,
    note: item.note,
  }));

  const handleDateClick = (arg) => {
    setSelected({ type: 'add', date: arg.dateStr });
  };

  const handleEventClick = (arg) => {
    const event = items.find((m) => m.id === parseInt(arg.event.id));
    if (event) setSelected({ type: 'view', event });
  };

  const addMeeting = (newMeeting) => {
    setItems((prev) => [...prev, newMeeting]);
    setSelected(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <h2 className="text-lg font-bold mb-4">📅 Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        eventDisplay="block"
        eventContent={({ event }) => (
          <div className="bg-blue-100 border-1-4 border-blue-500 text-blue-700 hover:bg-blue-300 rounded-sm px-2 py-1 text-sm">
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-gray-600">{event.startStr.slice(11, 16)}</div>
          </div>
        )}
      />
      {selected && (
        <CalendarModal selected={selected} onClose={() => setSelected(null)} onAdd={addMeeting} />
      )}
    </div>
  );
}
