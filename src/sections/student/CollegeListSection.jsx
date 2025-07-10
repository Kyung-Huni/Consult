// CollegeSection.jsx (템플릿 적용 기능 + 검색창 제거)
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function CollegeSection({ studentId }) {
  const [colleges, setColleges] = useState([]);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    axios.get('/templates?type=college').then((res) => setTemplates(res.data));
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/colleges`);
      setColleges(res.data);
    } catch (err) {
      console.error('대학 목록 불러오기 실패:', err);
    }
  };

  const applyTemplate = async (template) => {
    const parsed = JSON.parse(template.content || '[]');
    console.log(JSON.parse(template.content));
    for (const college of parsed) {
      await axios.post(`/students/${studentId}/colleges`, {
        name: college.name,
        location: college.location || '',
      });
    }
    fetchColleges();
  };

  useEffect(() => {
    fetchColleges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 text-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">🎓 Student’s List of Colleges</h2>
        <div className="flex gap-2 items-center">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
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
            className="bg-gray-100 px-3 py-1 rounded border text-sm"
          >
            📋 적용
          </button>
        </div>
      </div>

      {colleges.length === 0 ? (
        <div className="text-sm text-gray-400">No colleges found.</div>
      ) : (
        <ul className="space-y-2">
          {colleges.map((c) => (
            <li key={c.id} className="border p-3 rounded">
              <Link to={`/colleges/${c.slug}`} className="block">
                <div className="font-semibold text-blue-600 hover:underline">
                  {c.name}
                </div>
                <div className="text-xs text-gray-500">{c.location}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
