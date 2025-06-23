export default function CollegeFilter() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <input
        type="text"
        placeholder="Search colleges..."
        className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <select className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none">
        <option value="">All Regions</option>
        <option value="east">East Coast</option>
        <option value="west">West Coast</option>
        <option value="mid">Midwest</option>
      </select>
    </div>
  );
}
