export default function MeetingCard() {
  const meetings = [
    { date: 'Jun 1', time: '10:00 AM', student: 'Student B' },
    { date: 'Jun 8', time: '13:00 PM', student: 'Student A' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Upcoming Meetings</h2>
      <ul className="space-y-3">
        {meetings.map((m, idx) => (
          <li key={idx} className="flex items-center justify-between text-sm">
            <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium w-14 text-center">
              {m.date}
            </div>
            <div>
              {m.time} <span className="text-gray-500">with {m.student}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
