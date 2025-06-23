import { useState } from 'react';

export default function ChecklistSection({ checklist = [] }) {
  const [items, setItems] = useState(checklist);
  const [newText, setNewText] = useState(''); // Input 값을 상태로 제어, Controlled Component
  const [showInput, setShowInput] = useState(false); // 입력창 보이기 토글

  const toggleItem = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const addItem = () => {
    if (!newText.trim()) return; // 문자열 앞뒤 공백 제거 (공백 무시 조건)
    const newItem = {
      id: Date.now(),
      text: newText,
      done: false,
    };
    setItems((prev) => [...prev, newItem]);
    setNewText('');
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">📋 My Checklist</h2>
        <button
          onClick={() => setShowInput((prev) => !prev)}
          className="bg-button hover:bg-button-hover text-white px-3 py-1 rounded text-sm"
        >
          {showInput ? 'Cancel' : '+ Add Checklist'}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No checklist items.</div>
      ) : (
        <ul className="space-y-2 text-sm mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <input type="checkbox" checked={item.done} onChange={() => toggleItem(item.id)} />
              <span className={item.done ? 'line-through text-gray-400' : ''}>{item.text}</span>
              {item.due && <span className="ml-auto text-xs text-gray-400">Due: {item.due}</span>}
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {showInput && (
        <div className="flex flex-wrap gap-2 w-full">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 min-w-0 border rounded px-2 py-1 text-sm"
            placeholder="새 항목 입력"
          />
          <button
            onClick={addItem}
            className="shrink-0 bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            추가
          </button>
        </div>
      )}
    </div>
  );
}
