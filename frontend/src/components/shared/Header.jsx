import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/students': 'Students',
  '/colleges': 'Colleges',
  '/calendar': 'Calendar',
  '/meetings': 'Meetings',
  '/templates': 'Templates',
  '/settings': 'Settings',
};

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'AI 컨설팅';

  return (
    <header className="ml-64 h-16 bg-sidebarBg text-white flex items-center justify-between px-6 shadow fixed top-0 left-0 right-0 z-10">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="text-sm text-white">Consultant : {user?.name}</div>
    </header>
  );
}
