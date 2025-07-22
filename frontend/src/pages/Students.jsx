import { useEffect, useState } from 'react';
import axios from '../api/axios';

// import StudentFilter from '../sections/student/StudentFilter';
import StudentCard from '../sections/student/StudentCard';
import StudentFormModal from '../sections/student/StudentFormModal';
import Button from '../components/ui/Button';

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('정말 이 학생을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/students/${id}`);
      // 삭제 후 목록 갱신
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('❌ 학생 삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <div className="p-4">불러오는 중...</div>;

  return (
    <div className="main-content">
      {/* <StudentFilter /> - 보류, 추후 도입 고려*/}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-title">Students</h2>
          <p className="text-description text-gray-600">
            Manage all student profiles and their academic records.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="text-base px-3 py-1"
        >
          + Add Student
        </Button>
      </div>

      {showModal && (
        <StudentFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchStudents}
        />
      )}

      <div className="card-grid">
        {students.map((s) => (
          <StudentCard key={s.id} student={s} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
