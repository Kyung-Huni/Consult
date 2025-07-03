import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function ChecklistSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const fetchChecklist = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/checklist`);
      setItems(res.data);
    } catch (err) {
      console.error('Checklist 불러오기 실패:', err);
    }
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      await axios.post(`/students/${studentId}/checklist`, {
        title: newTitle,
      });
      setNewTitle('');
      fetchChecklist();
    } catch (err) {
      console.error('항목 추가 실패:', err);
    }
  };

  const handleToggle = async (itemId, currentState) => {
    try {
      await axios.patch(`/students/${studentId}/checklist/${itemId}`, {
        isCompleted: !currentState,
      });
      fetchChecklist();
    } catch (err) {
      console.error('업데이트 실패:', err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/students/${studentId}/checklist/${itemId}`);
      fetchChecklist();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  useEffect(() => {
    fetchChecklist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold mb-2">📝 Checklist</h2>

      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="할 일 입력..."
          className="flex-1 border px-3 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleToggle(item.id, item.isCompleted)}
              />
              <span
                className={item.isCompleted ? 'line-through text-gray-400' : ''}
              >
                {item.title}
              </span>
            </label>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-sm text-red-500 hover:underline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
