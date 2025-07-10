import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const tabNames = ['Checklist', 'Meeting', 'Note', 'College', 'Email'];

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('type') || 'Checklist';
  const [activeTab, setActiveTab] = useState(initialTab);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get(`/templates?type=${activeTab.toLowerCase()}`);
      setTemplates(res.data);
    } catch (err) {
      console.error('📛 템플릿 불러오기 실패:', err);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(`/templates/${id}`);
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
    } catch (err) {
      console.error('📛 템플릿 삭제 실패:', err);
    }
  };

  const handleEdit = (tpl) => {
    navigate(`/templates/edit/${activeTab}/${tpl.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 상단: 제목 + 버튼 */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Templates</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
          onClick={() => navigate(`/templates/new/${activeTab}`)}
        >
          + New Template
        </button>
      </div>

      {/* 탭 필터 */}
      <div className="flex space-x-4 border-b pb-2">
        {tabNames.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm pb-1 ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 검색 입력 */}
      <input
        type="text"
        placeholder="Search templates..."
        className="border rounded px-3 py-1 text-sm w-full"
      />

      {/* 템플릿 리스트 */}
      <div className="space-y-4">
        {templates.length === 0 ? (
          <div className="text-sm text-gray-400">No templates found.</div>
        ) : (
          templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white shadow rounded p-4 border border-gray-200 text-sm"
            >
              <div className="font-semibold text-base">{tpl.title}</div>
              <div className="text-gray-500 mb-2 line-clamp-2">
                {tpl.content}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>
                  생성일:{' '}
                  {new Date(tpl.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <div className="flex gap-2">
                  <button
                    className="hover:underline"
                    onClick={() => handleEdit(tpl)}
                  >
                    Edit
                  </button>
                  <button
                    className="hover:underline text-red-500"
                    onClick={() => deleteTemplate(tpl.id)}
                  >
                    Delete
                  </button>
                  <button className="hover:underline text-blue-500">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
