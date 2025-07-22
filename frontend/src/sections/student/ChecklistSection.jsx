// ChecklistSection.jsx (템플릿 일괄 적용 분리 구조)
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function ChecklistSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showInput, setShowInput] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <div className="flex justify-between items-center">
        <h2 className="section-title text-sectionChecklist">📝 Checklist</h2>
        <Button
          variant="ghostText"
          onClick={() => setShowInput((prev) => !prev)}
          className="text-sm text-sectionChecklist hover:underline"
        >
          {showInput ? 'Cancel' : '+ Add Checklist'}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-soft-sm">No checklist items.</div>
      ) : (
        <ul className="space-y-2 text-base">
          {items.map((item) => (
            <li
              key={item.id}
              className="group list-box-item flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleToggle(item.id, item.isCompleted)}
              />
              <span
                className={
                  item.isCompleted ? 'line-through text-soft-base' : ''
                }
              >
                {item.title}
              </span>
              <span className="ml-auto text-soft-xs">
                Due: {item.dueDate.slice(0, 10)}
              </span>
              <Button
                variant="dangerText"
                onClick={() => handleDelete(item.id)}
                className="text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition"
              >
                delete
              </Button>
            </li>
          ))}
        </ul>
      )}

      {showInput && (
        <div>
          <div className="flex flex-wrap w-full gap-2 items-center mb-2">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="form-input"
            >
              <option value="">+ Select Template</option>
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.title}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={() => {
                const tpl = templates.find((t) => t.id === selectedTemplate);
                if (tpl) applyTemplate(tpl);
              }}
              className="px-3 py-1 text-xs"
            >
              Apply
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input flex-1 min-w-0"
              placeholder="Checklist Name"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
            <Button
              variant="primary"
              onClick={handleAdd}
              className="text-sm px-3 py-1"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
