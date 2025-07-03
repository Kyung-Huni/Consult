import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function MeetingsSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/meetings`);
      setItems(res.data);
    } catch (err) {
      console.error(
        '📛 상담 불러오기 실패:',
        err.response?.data || err.message
      );
    }
  };

  const addMeeting = async () => {
    if (!title.trim() || !date || !time) return;
    try {
      await axios.post(`/students/${studentId}/meetings`, {
        title,
        note,
        date: new Date(date + 'T' + time).toISOString(),
      });
      setShowModal(false);
      setTitle('');
      setDate('');
      setTime('');
      setNote('');
      fetchMeetings();
    } catch (err) {
      console.error('📛 상담 추가 실패:', err.response?.data || err.message);
    }
  };

  const deleteMeeting = async (id) => {
    try {
      await axios.delete(`/students/${studentId}/meetings/${id}`);
      fetchMeetings();
    } catch (err) {
      console.error('📛 상담 삭제 실패:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [studentId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Meetings with Student</h2>
        <button
          className="text-sm bg-button hover:bg-button-hover text-white border px-3 py-1 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Meeting
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No Upcoming Meetings</div>
      ) : (
        <ul className="space-y-3 text-sm">
          {[...items]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((item) => (
              <li key={item.id} className="border p-3 rounded relative">
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-500 text-xs">
                  {new Date(item.date).toLocaleString()}
                </div>
                {item.note && (
                  <div className="mt-1 text-gray-700">{item.note}</div>
                )}
                <button
                  onClick={() => deleteMeeting(item.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                >
                  delete
                </button>
              </li>
            ))}
        </ul>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-bold">Add New Meeting</h3>
            <input
              type="text"
              placeholder="Meeting Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Notes (optional)"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={addMeeting}
                className="px-4 py-2 bg-button text-white text-sm rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
