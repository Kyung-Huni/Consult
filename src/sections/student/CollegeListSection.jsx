import { useNavigate } from 'react-router-dom';

export default function CollegeListSection({ colleges = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <h2 className="text-lg font-bold mb-4">🎓 Student’s List of Colleges</h2>

      {colleges.length === 0 ? (
        <div className="text-sm text-gray-400">No College List</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {colleges.map((college) => (
            <div
              key={college.id}
              onClick={() => navigate(`/colleges/${college.slug}`)}
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded border cursor-pointer"
            >
              <div className="text-base font-semibold">{college.name}</div>
              <div className="text-xs text-gray-500">{college.location}</div>
              <div className="text-xs mt-1 text-indigo-600">Status: {college.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
