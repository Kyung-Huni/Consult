// MeetingTemplateEditor.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function MeetingTemplateEditor({ id, isNew, type }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!isNew) {
      axios.get(`/templates/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    const payload = { title, content };
    if (isNew) {
      await axios.post('/templates', { ...payload, type: type.toLowerCase() });
    } else {
      await axios.put(`/templates/${id}`, payload);
    }
    navigate(`/templates?type=${type}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Meeting Template Editor</h2>
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="템플릿 이름"
      />
      <textarea
        className="w-full border p-2 rounded text-sm"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="회의 관련 기본 안내 문구를 입력하세요."
      />
      <div className="text-right">
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
