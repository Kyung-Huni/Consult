import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function MeetingDetail() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    axios.get(`/meetings/${id}`).then((res) => {
      setMeeting(res.data);
      setNote(res.data.note || '');
    });
  }, [id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(`/meetings/${id}`, { note });
      setSavedAt(new Date());
    } catch (err) {
      console.error('❌ 저장 실패:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!meeting) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">회의: {meeting.title}</h2>
        <p className="text-sm text-gray-500">학생: {meeting.student}</p>
        <p className="text-sm text-gray-500">
          날짜: {new Date(meeting.date).toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">회의 메모</h3>
        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm"
          rows={6}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-400">
            {savedAt && `최근 저장: ${savedAt.toLocaleTimeString()}`}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {saving ? '저장 중...' : '💾 저장'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">요약</h3>
        <p className="text-sm text-gray-700">{meeting.summary}</p>
      </div>
    </div>
  );
}
