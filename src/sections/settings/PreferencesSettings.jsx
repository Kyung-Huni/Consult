export default function PreferencesSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-3">
      <h2 className="text-lg font-bold mb-2">🧩 Preferences</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Theme</label>
          <select className="w-full border rounded px-2 py-1">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Default Time Zone</label>
          <select className="w-full border rounded px-2 py-1">
            <option>Asia/Seoul</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>
        </div>
      </div>
    </div>
  );
}
