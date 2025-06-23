import { useNavigate } from 'react-router-dom';

export default function MeetingCard({ meeting }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <div className="font-semibold">{meeting.student}</div>
        <div className="text-sm text-gray-500">
          {meeting.date} · {meeting.summary}
        </div>
      </div>
      <button
        onClick={() => navigate(`/meetings/${meeting.id}`)}
        className="text-sm px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        View
      </button>
    </div>
  );
}
