import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <aside className="w-64 bg-white shadow h-screen fixed left-0 top-0 p-6">
      <div className="text-xl font-bold mb-8">AI 컨설팅</div>
      <nav className="flex flex-col items-center gap-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-indigo-500">
          Dashboard
        </Link>
        <Link to="/students" className="text-gray-700 hover:text-indigo-500">
          Students
        </Link>
        <Link to="/colleges" className="text-gray-700 hover:text-indigo-500">
          Colleges
        </Link>
        <Link to="/calendar" className="text-gray-700 hover:text-indigo-500">
          Calendar
        </Link>
        <Link to="/meetings" className="text-gray-700 hover:text-indigo-500">
          Meetings
        </Link>
        <Link to="/templates" className="text-gray-700 hover:text-indigo-500">
          Templates
        </Link>
        <Link to="/settings" className="text-gray-700 hover:text-indigo-500">
          Settings
        </Link>
        <button className="w-full border-t-2" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
