import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

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

  const [loading, setLoading] = useState(true);

  // ✅ 데이터 불러오기
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`/students/${studentId}/timelogs`);
        setTimes(res.data);
        setLoading(false);
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

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <div className="flex justify-between items-center">
        <h2 className="section-title text-sectionTime">⏱ Time Tracker</h2>
        <Button
          variant="ghostText"
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm text-sectionTime hover:underline"
        >
          {showForm ? 'Cancel' : '+ Add Time'}
        </Button>
      </div>

      {showForm && (
        <div className="space-y-2 border-t pt-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full form-input"
          />
          <input
            type="number"
            placeholder="Duration (hrs)"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: Number(e.target.value) })
            }
            className="w-full form-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full form-input"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.billable}
                onChange={(e) =>
                  setForm({ ...form, billable: e.target.checked })
                }
              />
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
          <Button
            variant="primary"
            onClick={addTimeLog}
            className="text-sm px-3 py-1"
          >
            Save
          </Button>
        </div>
      )}

      {times.length === 0 ? (
        <div className="text-soft-sm">No time logs available</div>
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
              <div className="text-xs text-right space-y-1">
                <div
                  className={`font-semibold ${
                    time.billable ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {time.billable ? 'Billable' : 'Non-Billable'}
                </div>
                <div
                  className={`badge ${
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
