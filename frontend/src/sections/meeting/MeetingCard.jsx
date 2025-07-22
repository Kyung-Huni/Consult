import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Button from '../../components/ui/Button';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function MeetingCard({ meeting }) {
  const navigate = useNavigate();
  const formattedDate = dayjs(meeting.date)
    .tz('Asia/Seoul')
    .format('YYYY-MM-DD HH:mm');

  return (
    <div className="section-box flex justify-between items-center">
      <div>
        <div className="text-lg font-semibold">{meeting.title}</div>
        <div className="text-soft-sm">
          {formattedDate} · {meeting.student}
        </div>
      </div>
      <Button
        variant="primary"
        onClick={() => navigate(`/meetings/${meeting.id}`)}
        className="text-sm px-4 py-1"
      >
        View
      </Button>
    </div>
  );
}
