import { useEffect, useState } from 'react';
import axios from '../api/axios';
import MeetingCard from '../sections/meeting/MeetingCard';
import Button from '../components/ui/Button';
import MeetingPageSkeleton from '../components/skeleton/MeetingPageSkeleton';

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetingRes, studentRes] = await Promise.all([
          axios.get('/meetings'),
          axios.get('/students'),
        ]);
        setMeetings(meetingRes.data);
        setStudents(studentRes.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ 데이터 불러오기 실패:', err);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!selectedId || !title || !startTime || !endTime) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      await axios.post(`/students/${selectedId}/meeting`, {
        title,
        startTime,
        endTime,
      });
      alert('✅ 상담 추가됨');

      // 입력 초기화
      setSelectedId('');
      setTitle('');
      setStartTime('');
      setEndTime('');

      // 목록 갱신
      const res = await axios.get('/meetings');
      setMeetings(res.data);
    } catch (err) {
      console.error('❌ 상담 추가 실패:', err);
      alert('❌ 실패');
    }
  };

  if (loading) return <MeetingPageSkeleton />;

  return (
    <div className="main-content">
      <div>
        <h2 className="text-title">Meetings</h2>
        <p className="text-description text-gray-600">
          View and manage meetings with students.
        </p>
      </div>

      {/* 토글 버튼 */}
      <div className="flex items-center">
        <Button
          variant="primary"
          onClick={() => setShowForm((prev) => !prev)}
          className="text-base px-3 py-1"
        >
          {showForm ? 'Cancel' : '+ Add New Meeting'}
        </Button>
      </div>

      {/* 상담 추가 폼 */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-box space-y-4">
          <select
            className="w-full form-input"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">학생 선택</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="상담 제목"
            className="w-full form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full form-input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full form-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <Button
            variant="primary"
            onClick={handleCreate}
            className="text-sm px-3 py-1"
          >
            💾 Save
          </Button>
        </div>
      </div>

      {/* 상담 목록 */}
      {meetings.length === 0 ? (
        <div className="text-soft-sm">상담 기록이 없습니다.</div>
      ) : (
        meetings.map((m) => <MeetingCard key={m.id} meeting={m} />)
      )}
    </div>
  );
}
