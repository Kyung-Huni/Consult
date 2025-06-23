export default function ChecklistCard() {
  const items = [
    { task: 'Apply To A', date: 'May 31', student: 'Student A' },
    { task: 'Sign Up for Test B', date: 'Jun 5', student: 'Student C' },
    { task: 'Submit Essay', date: 'Jun 10', student: 'Student B' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Upcoming Checklist Items</h2>
        <button className="text-xs text-gray-500 border px-2 py-1 rounded">Next 3 days ▼</button>
      </div>
      <ul className="text-sm space-y-2">
        {items.map((i, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{i.task}</span>
            <span className="text-gray-500">
              {i.date} · {i.student}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
