import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import templates from '../../data/templates'; // Checklist 템플릿 포함된 더미 데이터라고 가정

export default function ChecklistTemplateEditor({ id }) {
  const navigate = useNavigate();

  const initial = templates.Checklist.find((t) => t.id === parseInt(id));
  const [template, setTemplate] = useState(initial);

  if (!template) return <div>Template not found</div>;

  const handleChangeTitle = (e) => {
    setTemplate({ ...template, title: e.target.value });
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...template.items];
    updatedItems[index][key] = value;
    setTemplate({ ...template, items: updatedItems });
  };

  const addItem = () => {
    const newItem = { task: '', dueDate: '', assignedTo: '' };
    setTemplate({ ...template, items: [...template.items, newItem] });
  };

  const deleteItem = (index) => {
    const updated = template.items.filter((_, i) => i !== index);
    setTemplate({ ...template, items: updated });
  };

  const handleSave = () => {
    console.log('✅ 저장된 템플릿:', template);
    navigate('/templates'); // 저장 후 리스트로 돌아감
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📝 Checklist Template Editor</h2>

      <input
        className="w-full p-2 border rounded"
        placeholder="템플릿 이름"
        value={template.title}
        onChange={handleChangeTitle}
      />

      <div className="space-y-4">
        {template.items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 border rounded space-y-2 relative">
            <button
              onClick={() => deleteItem(idx)}
              className="absolute top-2 right-2 text-sm text-red-500"
            >
              ✕
            </button>
            <input
              className="w-full p-1 border rounded"
              placeholder="할 일 내용"
              value={item.task}
              onChange={(e) => handleItemChange(idx, 'task', e.target.value)}
            />
            <input
              className="w-full p-1 border rounded"
              placeholder="마감일"
              value={item.dueDate}
              onChange={(e) => handleItemChange(idx, 'dueDate', e.target.value)}
            />
            <input
              className="w-full p-1 border rounded"
              placeholder="담당자"
              value={item.assignedTo}
              onChange={(e) => handleItemChange(idx, 'assignedTo', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={addItem} className="bg-gray-100 border text-sm px-4 py-2 rounded">
          + 항목 추가
        </button>
        <button onClick={handleSave} className="bg-button text-white text-sm px-4 py-2 rounded">
          저장
        </button>
      </div>
    </div>
  );
}
