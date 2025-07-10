export default function ViewEventModal({ event, onClose }) {
  const start = new Date(event.startTime || event.start || '');
  const end = new Date(event.endTime || event.end || '');

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow">
        <div className="font-bold text-lg">📌 {event.title}</div>
        <div className="text-sm text-gray-500">
          {start.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} ~{' '}
          {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm">{event.note || '내용 없음'}</div>
        <div className="text-right">
          <button onClick={onClose} className="text-sm text-blue-500">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
