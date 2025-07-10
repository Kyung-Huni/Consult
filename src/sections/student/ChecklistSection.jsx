// ChecklistSection.jsx (템플릿 일괄 적용 분리 구조)
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function ChecklistSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showInput, setShowInput] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    axios
      .get('/templates?type=checklist')
      .then((res) => setTemplates(res.data));
  }, []);

  const applyTemplate = async (template) => {
    const parsed = JSON.parse(template.content || '[]');
    for (const item of parsed) {
      await axios.post(`/students/${studentId}/checklist`, {
        title: item.task,
        dueDate: item.dueDate || new Date().toISOString().split('T')[0],
      });
    }
    fetchChecklist();
  };

  const fetchChecklist = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/checklist`);
      setItems(res.data);
    } catch (err) {
      console.error('Checklist 불러오기 실패:', err);
    }
  };

  const handleAdd = async () => {
    if (!title.trim() || !dueDate.trim()) return;
    try {
      await axios.post(`/students/${studentId}/checklist`, { title, dueDate });
      setTitle('');
      setDueDate('');
      setShowInput(false);
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
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">📝 Checklist</h2>
        <button
          onClick={() => setShowInput((prev) => !prev)}
          className="text-sm px-3 py-1 bg-button hover:bg-button-hover rounded text-white"
        >
          {showInput ? 'Cancel' : '+ Add Checklist'}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No checklist items.</div>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(item.id, item.isCompleted)}
                />
                <span
                  className={
                    item.isCompleted ? 'line-through text-gray-400' : ''
                  }
                >
                  {item.title}
                </span>
              </label>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}

      {showInput && (
        <>
          <div className="flex gap-2 items-center mb-2">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">+ 템플릿 선택</option>
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                const tpl = templates.find((t) => t.id === selectedTemplate);
                if (tpl) applyTemplate(tpl);
              }}
              className="bg-gray-100 px-3 py-1 rounded text-sm border"
            >
              📋 적용
            </button>
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 min-w-0 border rounded px-2 py-1 text-sm"
              placeholder="할 일 제목"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleAdd}
              className="shrink-0 bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              추가
            </button>
          </div>
        </>
      )}
    </div>
  );
}
