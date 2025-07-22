export default function TemplatePageSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* 타이틀 + 설명 */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>

      {/* 탭 + 버튼 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-16 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-8 w-32 bg-blue-300 rounded" />
      </div>

      {/* 검색창 */}
      <div className="h-10 bg-gray-200 rounded w-full" />

      {/* 템플릿 카드 스켈레톤 3개 */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-xl shadow space-y-2">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-3 w-3/4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
