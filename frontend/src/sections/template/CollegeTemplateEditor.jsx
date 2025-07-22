import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function CollegeTemplateEditor({ id, isNew, type }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState(''); // ✅ 요약 추가
  const [colleges, setColleges] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isNew) {
      axios.get(`/templates/${id}`).then((res) => {
        setTitle(res.data.title);
        setSummary(res.data.summary || ''); // ✅ 기존 요약 불러오기
        try {
          const parsed = JSON.parse(res.data.content || '[]');
          setColleges(Array.isArray(parsed) ? parsed : []);
        } catch {
          setColleges([]);
        }
      });
    }
  }, [id, isNew]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        axios
          .get(`/colleges/search?name=${searchQuery}`)
          .then((res) => setSearchResults(res.data))
          .catch(() => setSearchResults([]));
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSave = async () => {
    const payload = {
      title,
      content: JSON.stringify(
        colleges.map((c) => ({
          collegeId: c.collegeId,
          name: c.name,
          location: c.location || '',
        }))
      ),
      summary, // ✅ 요약 전송
    };

    if (isNew) {
      await axios.post('/templates', { ...payload, type: type.toLowerCase() });
    } else {
      await axios.put(`/templates/${id}`, payload);
    }
    navigate(`/templates?type=${type}`);
  };

  const handleAddCollege = (college) => {
    if (!colleges.some((c) => c.collegeId === college.id)) {
      setColleges([...colleges, { collegeId: college.id, name: college.name }]);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemove = (index) => {
    setColleges(colleges.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">College Template Editor</h2>

      {/* 제목 입력 */}
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="추천 리스트 제목"
      />

      {/* ✅ 요약 입력 */}
      <textarea
        className="w-full border p-2 rounded text-sm"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="이 템플릿에 대한 요약을 작성하세요 (예: 추천 이유, 특징 등)"
        rows={3}
      />

      {/* 대학 리스트 */}
      <div className="space-y-2">
        {colleges.map((college, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              disabled
              className="w-full border p-2 rounded text-sm bg-gray-100"
              value={college.name}
            />
            <button
              onClick={() => handleRemove(idx)}
              className="text-red-500 text-sm"
            >
              ✕
            </button>
          </div>
        ))}

        {/* 자동완성 검색 */}
        <div className="space-y-1">
          <input
            type="text"
            className="w-full border p-2 rounded text-sm"
            placeholder="대학 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchResults.length > 0 && (
            <div className="border rounded bg-white shadow max-h-48 overflow-y-auto text-sm">
              {searchResults.map((college) => (
                <div
                  key={college.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddCollege(college)}
                >
                  {college.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 저장 버튼 */}
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
