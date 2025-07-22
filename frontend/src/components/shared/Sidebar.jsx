import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import logo from '../../Images/Logo.png';

import {
  LayoutDashboard,
  User,
  School,
  CalendarDays,
  CalendarClock,
  FileText,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', path: '/students', icon: User },
  { label: 'Colleges', path: '/colleges', icon: School },
  { label: 'Calendar', path: '/calendar', icon: CalendarDays },
  { label: 'Meetings', path: '/meetings', icon: CalendarClock },
  { label: 'Templates', path: '/templates', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-sidebarBg text-sidebarText h-screen fixed left-0 top-0 p-6 flex flex-col justify-between">
      <div>
        <div className="flex gap-1">
          <img src={logo} alt="ConsultAI" className="h-10" />
          <div className="text-2xl font-bold mb-8 text-white">Consult.AI</div>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded text-sm transition font-medium ${
                  isActive
                    ? 'bg-sidebarActive text-white'
                    : 'hover:bg-sidebarHover hover:text-white text-sidebarText'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 로그아웃 */}
      <button
        onClick={handleLogout}
        className="mt-8 text-xs text-sidebarText hover:text-white hover:underline border-t border-slate-700 pt-4 text-left"
      >
        Logout
      </button>
    </aside>
  );
}
