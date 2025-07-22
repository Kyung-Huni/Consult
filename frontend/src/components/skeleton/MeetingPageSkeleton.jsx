export default function MeetingPageSkeleton() {
  return (
    <div className="p-6 animate-pulse space-y-6">
      {/* 상단 타이틀 & 버튼 */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-8 w-40 bg-blue-200 rounded" />
      </div>

      {/* MeetingCard Skeleton 3개 */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
        >
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-16 bg-blue-300 rounded-full" />
        </div>
      ))}
    </div>
  );
}
