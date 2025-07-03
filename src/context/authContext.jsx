import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, email, name }
  const [isLoading, setIsLoading] = useState(true);

  // 🔁 자동 로그인: refreshToken으로 재인증 시도
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post('/auth/refresh');
        setUser(res.data.user);
        localStorage.setItem('accessToken', res.data.token);
      } catch (err) {
        console.log('자동 로그인 실패:', err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (e) {
      console.log('logout error', e);
    }
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
