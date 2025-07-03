import { useEffect, useState } from 'react';
import axios from '../api/axios';

import StudentFilter from '../sections/student/StudentFilter';
import StudentCard from '../sections/student/StudentCard';
import StudentFormModal from '../sections/student/StudentFormModal';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchStudents = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const res = await axios.get('/students', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error(
        '학생 목록 불러오기 실패',
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <div className="p-4">불러오는 중...</div>;

  return (
    <div className="space-y-6">
      <StudentFilter />
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + 학생 추가
      </button>
      {showModal && (
        <StudentFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchStudents}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  );
}
