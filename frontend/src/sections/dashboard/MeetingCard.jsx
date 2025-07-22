import MeetingBoxItem from '../../components/ui/MeetingBoxItem';

export default function MeetingCard({ meetings }) {
  return (
    <div className="section-box">
      <div className="section-title">📅 Upcoming Meetings</div>
      {meetings.length === 0 ? (
        <p className="text-soft-sm">No Scheduled Meeting</p>
      ) : (
        <ul className="space-y-2">
          {meetings.map((m) => (
            <MeetingBoxItem
              key={m.id}
              title={m.title}
              startTime={m.startTime}
              name={m.student.name}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
