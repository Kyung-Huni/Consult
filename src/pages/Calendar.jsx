import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const [value, setValue] = useState(new Date());

  const schedules = [
    { date: '2025-06-20', title: '김지훈 회의' },
    { date: '2025-06-24', title: '이수민 상담' },
  ];

  const tileContent = ({ date }) => {
    const day = date.toISOString().slice(0, 10);
    const matched = schedules.find((s) => s.date === day);
    return matched ? (
      <div className="mt-1 text-xs text-indigo-600 font-medium">{matched.title}</div>
    ) : null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl">
      <h2 className="text-xl font-bold mb-4">전체 일정</h2>
      <Calendar onChange={setValue} value={value} tileContent={tileContent} locale="ko-KR" />
    </div>
  );
}
