// components/skeleton/SectionSkeleton.jsx
export default function SectionSkeleton() {
  return (
    <div className="bg-white p-4 rounded-xl shadow animate-pulse space-y-3">
      <div className="h-5 bg-gray-300 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}
