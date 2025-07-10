import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function StudentToDoSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showInput, setInput] = useState(false);

  const fetchToDo = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/todo`);
      setItems(res.data);
    } catch (err) {
      console.error('할 일 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchToDo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const addItem = async () => {
    if (!newText.trim() || !dueDate) return;
    try {
      await axios.post(`/students/${studentId}/todo`, {
        text: newText,
        due: dueDate,
      });
      setNewText('');
      setDueDate('');
      setInput(false);
      fetchToDo();
    } catch (err) {
      console.error('할 일 추가 실패:', err);
    }
  };

  const toggleItem = async (id, currentState) => {
    try {
      await axios.patch(`/students/${studentId}/todo/${id}`, {
        done: !currentState,
      });
      fetchToDo();
    } catch (err) {
      console.error('업데이트 실패:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/students/${studentId}/todo/${id}`);
      fetchToDo();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Student To-do Card</h2>
        <button
          className="bg-button hover:bg-button-hover text-white px-3 py-1 rounded text-sm"
          onClick={() => setInput((prev) => !prev)}
        >
          {showInput ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No To-Do items available.</div>
      ) : (
        <ul className="space-y-2 text-sm mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id, item.done)}
              />
              <span className={item.done ? 'line-through text-gray-400' : ''}>
                {item.text}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                Due: {item.due.slice(0, 10)}
              </span>
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
            placeholder="할 일 제목"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="shrink-0 border rounded px-2 py-1 text-sm"
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
