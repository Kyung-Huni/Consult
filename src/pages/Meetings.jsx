import MeetingCard from '../sections/meeting/MeetingCard';

export default function Meetings() {
  const meetings = [
    { id: 1, student: '김지훈', date: '2025-06-18', summary: 'Essay 피드백 회의' },
    { id: 2, student: '이수민', date: '2025-06-19', summary: '대학 선택 상담' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">회의 기록</h2>
      {meetings.map((m) => (
        <MeetingCard key={m.id} meeting={m} />
      ))}
    </div>
  );
}
