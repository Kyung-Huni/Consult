import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ToDoCard from '../sections/dashboard/ToDoCard';
import MeetingCard from '../sections/dashboard/MeetingCard';
import ChecklistCard from '../sections/dashboard/ChecklistCard';
import CalendarColumn from '../sections/dashboard/CalendarColumn';
import { useAuth } from '../context/authContext';

export default function Dashboard() {
  const [data, setData] = useState({ todos: [], meetings: [], checklist: [] });
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('대시보드 정보 불러오기 실패:', err);
      }
    };

    fetchDashboard();
  }, []);

  if (!user) return <p>로그인 정보를 불러오는 중...</p>;

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">환영합니다! {user.name} 님</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <ToDoCard todos={data.todos} />
          <MeetingCard meetings={data.meetings} />
          <ChecklistCard checklist={data.checklist} />
        </div>
        <div className="col-span-1">
          <CalendarColumn />
        </div>
      </div>
    </div>
  );
}
