// MeetingsSection.jsx (템플릿 선택 시 제목+메모 자동 입력)
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function MeetingsSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    axios.get('/templates?type=meeting').then((res) => setTemplates(res.data));
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/meeting`);
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
      await axios.post(`/students/${studentId}/meeting`, {
        title,
        note,
        startTime: new Date(date + 'T' + time).toISOString(),
        endTime: new Date(
          new Date(date + 'T' + time).getTime() + 30 * 60000
        ).toISOString(),
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
      await axios.delete(`/students/${studentId}/meeting/${id}`);
      fetchMeetings();
    } catch (err) {
      console.error('📛 상담 삭제 실패:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((item) => (
              <li key={item.id} className="border p-3 rounded relative">
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-500 text-xs">
                  {new Date(item.startTime).toLocaleString()}
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

            <div className="flex gap-2 items-center">
              <select
                value={selectedTemplate}
                onChange={(e) => {
                  const tpl = templates.find((t) => t.id === e.target.value);
                  if (tpl) {
                    setSelectedTemplate(tpl.id);
                    setTitle(tpl.title);
                    setNote(tpl.content);
                  }
                }}
                className="border rounded px-2 py-1 text-sm w-full"
              >
                <option value="">+ 템플릿 선택</option>
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.title}
                  </option>
                ))}
              </select>
            </div>

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
