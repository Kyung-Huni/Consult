export default function ProfileSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-3">
      <h2 className="text-lg font-bold mb-2">👤 Profile</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-1"
            defaultValue="Consultant A"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-1"
            defaultValue="consultant@example.com"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-1"
            placeholder="********"
          />
        </div>
      </div>

      <button className="mt-2 text-xs bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
        Save Changes
      </button>
    </div>
  );
}
