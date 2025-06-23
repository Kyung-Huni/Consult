import { useNavigate } from 'react-router-dom';

export default function StudentCard({ student }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/students/${student.id}`)}
      className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
      <div className="text-lg font-semibold">{student.name}</div>
      <div className="text-sm text-gray-500">{student.school}</div>
      <div className="mt-2 text-xs inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
        {student.status}
      </div>
    </div>
  );
}
