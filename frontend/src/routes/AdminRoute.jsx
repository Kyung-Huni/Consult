import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>로딩 중...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;

  return children;
}
