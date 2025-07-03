export default function ViewEventModal({ event, onClose }) {
  const { title, date, time, note } = event;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow">
        <div className="font-bold text-lg">📌 {title}</div>
        <div className="text-sm text-gray-500">
          {date} {time}
        </div>
        <div className="text-sm">{note}</div>
        <div className="text-right">
          <button onClick={onClose} className="text-sm text-blue-500">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
