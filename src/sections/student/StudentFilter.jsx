export default function StudentFilter() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <input
        type="text"
        placeholder="Search student..."
        className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <select className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none">
        <option value="">All Statuses</option>
        <option value="in-progress">Application In Progress</option>
        <option value="accepted">Accepted</option>
        <option value="incomplete">Checklist Incomplete</option>
      </select>
    </div>
  );
}
