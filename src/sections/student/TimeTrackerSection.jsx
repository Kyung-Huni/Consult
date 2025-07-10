import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function TimeTrackerSection({ studentId }) {
  const [times, setTimes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: '',
    duration: '',
    description: '',
    billable: false,
    status: 'unpaid',
  });

  // ✅ 데이터 불러오기
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`/students/${studentId}/timelogs`);
        setTimes(res.data);
      } catch (err) {
        console.error('시간 기록 불러오기 실패:', err);
      }
    };
    fetchLogs();
  }, [studentId]);

  // ✅ 시간 기록 추가
  const addTimeLog = async () => {
    try {
      const res = await axios.post(`/students/${studentId}/timelogs`, form);
      setTimes((prev) => [res.data, ...prev]);
      setForm({
        date: '',
        duration: '',
        description: '',
        billable: false,
        status: 'unpaid',
      });
      setShowForm(false);
    } catch (err) {
      console.error('시간 기록 추가 실패:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2">
          ⏱ Time Tracker
        </h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm bg-button hover:bg-button-hover text-white px-3 py-1 rounded"
        >
          {showForm ? 'Cancel' : '+ Add Time'}
        </button>
      </div>

      {showForm && (
        <div className="space-y-2 border-t pt-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Duration (hrs)"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: Number(e.target.value) })
            }
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm">
              <input
                type="checkbox"
                checked={form.billable}
                onChange={(e) =>
                  setForm({ ...form, billable: e.target.checked })
                }
              />{' '}
              Billable
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border px-2 py-1 text-sm rounded"
            >
              <option value="unpaid">Unpaid</option>
              <option value="invoiced">Invoiced</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <button
            onClick={addTimeLog}
            className="px-3 py-1 bg-button hover:bg-button-hover text-white text-sm rounded"
          >
            저장
          </button>
        </div>
      )}

      {times.length === 0 ? (
        <div className="text-sm text-gray-400">No time logs available</div>
      ) : (
        <ul className="space-y-2">
          {times.map((time) => (
            <li
              key={time.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <div>
                <div className="font-semibold">{time.description}</div>
                <div className="text-xs text-gray-500">
                  {time.date?.slice(0, 10)} · {time.duration} hrs
                </div>
              </div>
              <div className="text-xs text-right">
                <div
                  className={`font-semibold ${
                    time.billable ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {time.billable ? 'Billable' : 'Non-Billable'}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    time.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : time.status === 'unpaid'
                      ? 'bg-red-100 text-red-600'
                      : time.status === 'invoiced'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {time.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
