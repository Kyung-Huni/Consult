export default function TimeTrackerSection({ times = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">⏱ times Tracker</h2>
      {times.length === 0 ? (
        <div className="text-sm text-gray-400">No time logs available</div>
      ) : (
        <ul className="space-y-2">
          {times.map((time) => (
            <li key={time.id} className="flex justify-between items-center p-3 bg-gray-50 rounded ">
              <div>
                <div className="font-semibold">{time.description}</div>
                <div className="tex-xs text-gray-500">
                  {time.date} · {time.duration} hrs
                </div>
              </div>
              <div className="text-xs text-right">
                <div
                  className={`font-semibold ${time.billable ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {time.billable ? 'Billable' : 'Non-Billable'}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    time.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : time.status === 'unpaid'
                      ? 'bg-red-100 text-red-600'
                      : time.status === 'invoiced'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {time.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
