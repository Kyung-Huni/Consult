import { useNavigate } from 'react-router-dom';

export default function CollegeCard({ college }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/colleges/${college.id}`)}
      className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50 transition"
    >
      <h2 className="font-bold text-lg">{college.school.name}</h2>
      <p className="text-sm text-gray-600">
        {college.school.city}, {college.school.state}
      </p>
      <p className="text-xs">
        입학률:{' '}
        {college.latest?.admissions?.admission_rate?.overall ?? '정보 없음'}
      </p>
    </div>
  );
}
