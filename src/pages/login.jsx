import React, { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('accessToken', token);
      setUser(user); // Context 전역 로그인 상태 설정
      navigate('/'); // 홈으로 이동
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
