import { useState } from 'react';
import axios from '../../api/axios';

export default function StudentFormModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/student', form);
      onSuccess(); // 부모에서 fetchStudents 실행
      onClose();
    } catch (err) {
      console.error('등록 실패:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-lg font-bold">학생 등록</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="이름"
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="이메일"
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="전화번호"
            className="w-full p-2 border rounded"
          />
          <input
            name="school"
            value={form.school}
            onChange={handleChange}
            placeholder="학교"
            className="w-full p-2 border rounded"
          />
          <input
            name="grade"
            value={form.grade}
            onChange={handleChange}
            placeholder="학년"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
