import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function CollegeCard({ college, studentId }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      await axios.post(`/students/${studentId}/colleges`, {
        id: college.id,
        name: college.name,
        location: college.location || '',
      });
      setAdded(true);
    } catch (err) {
      console.error('대학 추가 실패:', err);
    }
  };

  return (
    <div
      className="relative border rounded p-4 bg-white shadow transition cursor-pointer hover:shadow-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/colleges/${college.id}`)}
    >
      <div className="font-semibold text-blue-700">{college.name}</div>
      <div className="text-xs text-gray-500">{college.location}</div>

      {hover && !added && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ 부모 div 클릭 방지
            handleAdd();
          }}
          className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
        >
          학생에게 추가
        </button>
      )}

      {added && (
        <div className="absolute top-2 right-2 text-xs text-green-600 font-bold">
          ✅ 추가됨
        </div>
      )}
    </div>
  );
}
