import { Link } from 'react-router-dom';

export default function CollegeCard({ college }) {
  return (
    <Link to={`/colleges/${college.slug}`}>
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <div className="text-xl font-semibold">{college.name}</div>
        <div className="text-sm text-gray-500">{college.location}</div>
        <div className="mt-2 text-xs text-gray-600">
          Type: {college.type} | 입학률: {college.acceptanceRate}
        </div>
      </div>
    </Link>
  );
}
