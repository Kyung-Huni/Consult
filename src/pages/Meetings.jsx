import { useEffect, useState } from 'react';
import axios from '../api/axios';
import MeetingCard from '../sections/meeting/MeetingCard';

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios
      .get('/meetings')
      .then((res) => setMeetings(res.data))
      .catch((err) => console.error('❌ 회의 불러오기 실패:', err));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">회의 기록</h2>
      {meetings.map((m) => (
        <MeetingCard key={m.id} meeting={m} />
      ))}
    </div>
  );
}
