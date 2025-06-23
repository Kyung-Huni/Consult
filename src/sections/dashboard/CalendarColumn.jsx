export default function CalendarColumn() {
  const events = [
    { time: '9 AM', text: 'Meeting with Student A 09:00–10:00' },
    { time: '11 AM', text: 'Phone Call Student B 11:00' },
    { time: '1 PM', text: 'Meeting with Student C 1:00–2:00' },
  ];

  const hours = Array.from(
    { length: 15 },
    (_, i) => `${7 + i} ${i === 0 ? 'AM' : i < 5 ? 'AM' : i < 12 ? 'PM' : ''}`
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">My Calendar</h2>
      <div className="space-y-1 text-sm">
        {hours.map((h, idx) => {
          const event = events.find((e) => e.time === h);
          return (
            <div key={idx} className="border-t pt-2 pb-1">
              <div className="text-gray-400 font-medium">{h}</div>
              {event ? (
                <div className="text-indigo-600 font-semibold">{event.text}</div>
              ) : (
                <div className="text-gray-300">-</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
