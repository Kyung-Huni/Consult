// src/pages/Calendar.jsx
import CalendarSection from '../sections/calendar/CalendarSection';
import meetings from '../data/meetings';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <CalendarSection meetings={meetings} />
    </div>
  );
}
