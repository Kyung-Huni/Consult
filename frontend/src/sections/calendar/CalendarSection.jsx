import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarModal from './CalendarModal';

export default function CalendarSection() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/calendar');

        const events = res.data.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.start,
          end: e.end,
          allDay: e.allDay,
          color: e.color,
          studentName: e.studentName,
        }));

        setItems(events);
      } catch (err) {
        console.error('일정 불러오기 실패:', err);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = (arg) => {
    const { type } = arg.event.extendedProps;
    console.log('🧪 클릭된 이벤트:', arg.event);

    if (type === 'meeting') {
      setSelected({ type: 'view', event: arg.event.extendedProps });
    } else if (type === 'checklist') {
      alert('📌 Checklist 마감일은 조회만 가능합니다.');
    } else {
      console.warn('Unknown event type:', type);
    }
  };

  return (
    <div className="section-box">
      <h2 className="text-title">📅 Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={items}
        eventClick={handleEventClick}
        eventDisplay="block"
        eventContent={({ event }) => (
          <div
            className={`px-2 py-1 rounded-sm text-sm max-w-full overflow-hidden ${
              event.backgroundColor === 'orange'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-gray-600">
              {event.allDay
                ? `${event.extendedProps.studentName}`
                : `${event.startStr.slice(11, 16)} ~ ${
                    event.endStr?.slice(11, 16) || ''
                  }`}
            </div>
          </div>
        )}
      />
      {selected && (
        <CalendarModal selected={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
