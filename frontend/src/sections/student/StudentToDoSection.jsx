import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function StudentToDoSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showInput, setInput] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchToDo = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/todo`);
      setItems(res.data);
      setLoading(false);
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

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <div className="flex justify-between items-center">
        <h2 className="section-title text-sectionTodo">
          ☑️ Student To-do Card
        </h2>
        <Button
          variant="ghostText"
          onClick={() => setInput((prev) => !prev)}
          className="text-sm"
        >
          {showInput ? 'Cancel' : '+ Add Task'}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-soft-sm">No To-Do items available.</div>
      ) : (
        <ul className="space-y-2 text-base">
          {items.map((item) => (
            <li
              key={item.id}
              className="relative group list-box-item flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id, item.done)}
              />
              <span className={item.done ? 'line-through text-soft-base' : ''}>
                {item.text}
              </span>
              <span className="ml-auto text-soft-xs">
                Due: {item.due.slice(0, 10)}
              </span>
              <Button
                variant="dangerText"
                onClick={() => deleteItem(item.id)}
                className="text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition"
              >
                delete
              </Button>
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
            className="form-input flex-1 min-w-0"
            placeholder="할 일 제목"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className=" form-input shrink-0"
          />
          <Button
            variant="primary"
            onClick={addItem}
            className="shrink-0 text-sm px-3 py-1"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
