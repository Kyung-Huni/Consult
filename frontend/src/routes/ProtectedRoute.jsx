import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>로딩 중...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
