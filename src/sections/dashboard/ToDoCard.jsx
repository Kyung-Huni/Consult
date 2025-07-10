export default function ToDoCard({ todos }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">📌 학생 할 일</h2>
      {todos.length === 0 ? (
        <p className="text-sm text-gray-400">할 일이 없습니다.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {todos.map((t) => (
            <li key={t.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={t.done} readOnly />
                <span className={t.done ? 'line-through text-gray-400' : ''}>
                  {t.text}
                </span>
              </div>
              <span className="text-xs text-gray-500">{t.studentName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
