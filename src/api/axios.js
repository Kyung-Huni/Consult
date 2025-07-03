import axios from 'axios';

// 기본 인스턴스
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // 백엔드 주소
  withCredentials: true, // 쿠키 전송 허용
});

// 요청에 Access Token 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답에서 401 오류 시 Refresh Token으로 Access Token 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.inlcudes('/auth/login')
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          'http://localhost:4000/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newToken = res.data.token;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return axiosInstance(originalRequest); // 재시도
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
