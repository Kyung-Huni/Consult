export default function ToDoCard() {
  const todos = [
    { task: 'Send report to Student A', done: true },
    { task: 'Prepare Meeting - Student B', done: false },
    { task: 'Check Report - Student C', done: false },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">My To-do Items</h2>
      <ul className="space-y-2">
        {todos.map((t, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={t.done} readOnly />
            <span className={t.done ? 'line-through text-gray-400' : ''}>{t.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
