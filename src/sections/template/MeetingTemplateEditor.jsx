import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import templates from '../../data/templates'; // Meeting 템플릿도 포함

export default function MeetingTemplateEditor({ id }) {
  const navigate = useNavigate();

  const initial = templates.Meeting.find((t) => t.id === parseInt(id));
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
    const newItem = { title: '', defaultTime: '', note: '' };
    setTemplate({ ...template, items: [...template.items, newItem] });
  };

  const deleteItem = (index) => {
    const updated = template.items.filter((_, i) => i !== index);
    setTemplate({ ...template, items: updated });
  };

  const handleSave = () => {
    console.log('✅ 저장된 Meeting 템플릿:', template);
    navigate('/templates');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📍 Meeting Template Editor</h2>

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
              placeholder="미팅 제목"
              value={item.title}
              onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
            />
            <input
              type="time"
              className="w-full p-1 border rounded"
              value={item.defaultTime}
              onChange={(e) => handleItemChange(idx, 'defaultTime', e.target.value)}
            />
            <textarea
              className="w-full p-1 border rounded"
              placeholder="메모"
              rows={2}
              value={item.note}
              onChange={(e) => handleItemChange(idx, 'note', e.target.value)}
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
