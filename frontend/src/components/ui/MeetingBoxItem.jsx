// components/ui/MeetingBoxItem.jsx
export default function MeetingBoxItem({ title, startTime, name }) {
  const date = new Date(startTime);
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // JUN
  const day = date.getDate();
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }); // 예: 10:30 AM

  return (
    <li className="list-box-item flex items-start gap-4">
      {/* 좌측 날짜 박스 */}
      <div className="date-box bg-indigo-500 text-white rounded-md px-2 py-1 text-center">
        <div className="text-xs">{month}</div>
        <div className="text-lg font-bold leading-none">{day}</div>
      </div>

      {/* 우측 내용 */}
      <div className="flex-1 space-y-1">
        <div className="font-medium">{title}</div>
        <div className="text-soft-xs">{name}</div>
        <div className="text-soft-xs">{time}</div>
      </div>
    </li>
  );
}
