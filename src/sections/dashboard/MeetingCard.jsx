export default function MeetingCard({ meetings }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">📅 다가오는 상담 일정</h2>
      {meetings.length === 0 ? (
        <p className="text-sm text-gray-400">예정된 상담이 없습니다.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {meetings.map((m) => (
            <li
              key={m.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <div className="font-medium">{m.title}</div>
                <div className="text-xs text-gray-500">
                  {new Date(m.startTime).toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-gray-500">{m.studentName}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
