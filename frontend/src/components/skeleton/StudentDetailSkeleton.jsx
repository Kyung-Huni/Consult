export default function StudentDetailSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* 상단: 이름 + 학교명 */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/6 bg-gray-200 rounded" />
      </div>

      {/* Checklist */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Student To-do */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>

      {/* Notes */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-300 rounded p-3 space-y-2">
            <div className="h-3 w-1/4 bg-gray-300 rounded" />
            <div className="h-3 w-3/4 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Exam Section */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded" />
          ))}
        </div>
      </div>

      {/* Meetings */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>

      {/* Time Tracker */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <div className="h-5 w-28 bg-green-300 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
}
