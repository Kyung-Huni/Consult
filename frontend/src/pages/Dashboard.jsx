import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ToDoCard from '../sections/dashboard/ToDoCard';
import MeetingCard from '../sections/dashboard/MeetingCard';
import ChecklistCard from '../sections/dashboard/ChecklistCard';
import CalendarColumn from '../sections/dashboard/CalendarColumn';
import { useAuth } from '../context/authContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ todos: [], meetings: [], checklist: [] });
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/dashboard');
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('대시보드 정보 불러오기 실패:', err);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="main-content">
      <h1 className="text-xxl font-bold mb-4">Welcome! {user.name}</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <ChecklistCard checklist={data.checklist} />
          <MeetingCard meetings={data.meetings} />
          <ToDoCard todos={data.todos} />
        </div>
        <div className="col-span-1">
          <CalendarColumn />
        </div>
      </div>
    </div>
  );
}
