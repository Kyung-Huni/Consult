export default function ChecklistCard({ checklist }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">✅ 학생 할 일 마감</h2>
      {checklist.length === 0 ? (
        <p className="text-sm text-gray-400">진행 중인 할 일이 없습니다.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {checklist.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-500">
                  마감일: {new Date(item.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="text-xs text-gray-500">{item.studentName}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
