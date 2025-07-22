import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function CalendarColumn() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/dashboard');
        const formatted = res.data.meetings.map((m) => {
          const start = new Date(m.startTime);
          const hour = start.getHours();
          const label =
            hour === 0
              ? '12 AM'
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? '12 PM'
              : `${hour - 12} PM`;

          return {
            time: label,
            text: `${m.title} ${start.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`,
          };
        });
        setEvents(formatted);
      } catch (err) {
        console.error('캘린더 정보 불러오기 실패:', err);
      }
    };

    fetch();
  }, []);

  const hours = Array.from({ length: 15 }, (_, i) => {
    const hour = 7 + i;
    if (hour === 12) return '12 PM';
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  });

  return (
    <div className="calendar-box">
      <h2 className="section-title">📅 Today</h2>
      <div className="space-y-1">
        {hours.map((h, idx) => {
          const event = events.find((e) => e.time === h);
          return (
            <div key={idx} className="calendar-hour">
              <div className="calendar-label">{h}</div>
              {event ? (
                <div className="calendar-event">{event.text}</div>
              ) : (
                <div className="calendar-empty">-</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
