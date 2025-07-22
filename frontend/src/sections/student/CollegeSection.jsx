// CollegeSection.jsx
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

const STATUS_OPTIONS = ['Recommended', 'Applied', 'Accepted', 'Rejected'];

export default function CollegeSection({ studentId }) {
  const [colleges, setColleges] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchColleges = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/colleges`);
      setColleges(res.data);
      setLoading(false);
    } catch (err) {
      console.error('대학 목록 불러오기 실패:', err);
    }
  };

  const applyTemplate = async (template) => {
    const parsed = JSON.parse(template.content || '[]');
    for (const college of parsed) {
      console.log(college.collegeId);
      await axios.post(`/students/${studentId}/colleges`, {
        id: college.collegeId, // Scorecard 기준 ID
        name: college.name,
        location: college.location || '',
        status: 'Recommended',
        isSuggested: true,
      });
    }
    fetchColleges();
  };

  const updateCollege = async (collegeId, updates) => {
    await axios.put(`/students/${studentId}/colleges/${collegeId}`, updates);
    fetchColleges();
  };

  const handleDelete = async (collegeId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`/students/${studentId}/colleges/${collegeId}`);
      fetchColleges(); // 목록 다시 불러오기
    } catch (err) {
      console.error('대학 삭제 실패:', err);
    }
  };

  useEffect(() => {
    axios.get('/templates?type=college').then((res) => setTemplates(res.data));
    fetchColleges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const suggested = colleges.filter((c) => c.isSuggested);
  const applied = colleges.filter((c) => !c.isSuggested);

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box space-y-6 text-sm">
      {/* 템플릿 적용 */}
      <div className="flex justify-between items-center">
        <h2 className="section-title text-sectionCollege">🎓 College List</h2>
        <div className="flex gap-2 items-center">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="form-input text-sm"
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
            className="text-sm px-4 py-2"
          >
            Apply
          </Button>
        </div>
      </div>

      {/* 추천 대학 섹션 */}
      <div>
        <h3 className="text-subtitle mb-2">🌟 My Suggested Colleges</h3>

        {suggested.length === 0 ? (
          <div className="text-soft-sm">No suggested colleges.</div>
        ) : (
          <ul className="space-y-2">
            {suggested.map((c) => (
              <li
                key={c.id}
                className="relative group list-box-item flex justify-between items-center"
              >
                {/* 왼쪽: 이름, 지역 */}
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-soft-xs">{c.location}</div>
                </div>

                {/* 가운데: 상태 변경 */}
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateCollege(c.id, { status: e.target.value })
                  }
                  className="form-input text-xs px-2 py-1 ml-auto"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* 우측 상단: 삭제 버튼 */}
                <Button
                  variant="dangerText"
                  onClick={() => handleDelete(c.id)}
                  className="px-4 py-1 opacity-0 group-hover:opacity-100 transition"
                >
                  delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 실제 지원 대학 섹션 */}
      <div>
        <h3 className="text-subtitle mb-2">📥 Student’s List of Colleges</h3>
        {applied.length === 0 ? (
          <div className="text-soft-sm">No colleges found.</div>
        ) : (
          <ul className="space-y-2">
            {applied.map((c) => (
              <li
                key={c.id}
                className="list-box-item flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-soft-xs">{c.location}</div>
                </div>
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateCollege(c.id, { status: e.target.value })
                  }
                  className="text-xs border px-2 py-1 rounded"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
