import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Button from '../components/ui/Button';

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
      <div className="section-box">
        <h2 className="text-title">{meeting.title}</h2>
        <p className="text-soft-base">StudentName: {meeting.student}</p>
        <p className="text-soft-base">
          Date: {new Date(meeting.date).toLocaleString()}
        </p>
      </div>

      <div className="section-box">
        <h3 className="section-title">Meeting Notes</h3>
        <textarea
          className="w-full border border-gray-300 rounded p-4 text-sm"
          rows={6}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-soft-xs">
            {savedAt && `Last Saved : ${savedAt.toLocaleTimeString()}`}
          </div>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1 text-sm"
          >
            {saving ? 'Saving...' : '💾 Save'}
          </Button>
        </div>
      </div>

      <div className="section-box">
        <h3 className="section-title">Summary</h3>
        <p className="text-sm text-gray-700">{meeting.summary}</p>
      </div>
    </div>
  );
}
