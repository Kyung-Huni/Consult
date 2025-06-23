import ToDoCard from '../sections/dashboard/ToDoCard';
import MeetingCard from '../sections/dashboard/MeetingCard';
import ChecklistCard from '../sections/dashboard/ChecklistCard';
import CalendarColumn from '../sections/dashboard/CalendarColumn';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* 왼쪽: 카드 3개 */}
      <div className="col-span-2 space-y-4">
        <ToDoCard />
        <MeetingCard />
        <ChecklistCard />
      </div>

      {/* 오른쪽: 캘린더 */}
      <div className="col-span-1">
        <CalendarColumn />
      </div>
    </div>
  );
}
