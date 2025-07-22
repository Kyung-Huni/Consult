export default function NotificationSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-3">
      <h2 className="text-lg font-bold mb-2">🔔 Notifications</h2>

      <label className="flex justify-between items-center">
        <span className="text-sm">Upcoming Meeting Reminder</span>
        <input type="checkbox" defaultChecked className="w-4 h-4" />
      </label>

      <label className="flex justify-between items-center">
        <span className="text-sm">Checklist Due Reminder</span>
        <input type="checkbox" defaultChecked className="w-4 h-4" />
      </label>

      <label className="flex justify-between items-center">
        <span className="text-sm">Weekly Summary</span>
        <input type="checkbox" className="w-4 h-4" />
      </label>
    </div>
  );
}
