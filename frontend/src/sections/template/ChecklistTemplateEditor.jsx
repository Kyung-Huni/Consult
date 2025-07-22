// ChecklistTemplateEditor.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function ChecklistTemplateEditor({ id, isNew, type }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isNew) {
      axios.get(`/templates/${id}`).then((res) => {
        setTitle(res.data.title);
        const parsed = JSON.parse(res.data.content || '[]');
        setItems(Array.isArray(parsed) ? parsed : []);
      });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    const payload = {
      title,
      content: JSON.stringify(items),
    };

    if (isNew) {
      await axios.post('/templates', { ...payload, type: type.toLowerCase() });
    } else {
      await axios.put(`/templates/${id}`, payload);
    }
    navigate(`/templates?type=${type}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Checklist Template Editor</h2>
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="템플릿 이름"
      />
      {items.map((item, idx) => (
        <div key={idx} className="space-y-2 border p-4 rounded relative">
          <button
            onClick={() => setItems(items.filter((_, i) => i !== idx))}
            className="absolute top-2 right-2 text-red-500"
          >
            ✕
          </button>
          <input
            className="w-full border p-1 rounded"
            placeholder="할 일"
            value={item.task}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].task = e.target.value;
              setItems(updated);
            }}
          />
          <input
            type="date"
            className="w-full border p-1 rounded"
            placeholder="마감일"
            value={item.dueDate}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].dueDate = e.target.value;
              setItems(updated);
            }}
          />
          <input
            className="w-full border p-1 rounded"
            placeholder="담당자"
            value={item.assignedTo}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].assignedTo = e.target.value;
              setItems(updated);
            }}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button
          onClick={() =>
            setItems([...items, { task: '', dueDate: '', assignedTo: '' }])
          }
          className="text-sm px-3 py-2 border rounded"
        >
          + 항목 추가
        </button>
        <button
          onClick={handleSave}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
}
