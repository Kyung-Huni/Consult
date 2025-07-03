import ViewEventModal from './ViewEventModal';
import AddEventModal from './AddEventModal';

export default function CalendarModal({ selected, onClose, onAdd }) {
  if (!selected) return null;

  return selected.type === 'view' ? (
    <ViewEventModal event={selected.event} onClose={onClose} />
  ) : (
    <AddEventModal date={selected.date} onClose={onClose} onAdd={onAdd} />
  );
}
