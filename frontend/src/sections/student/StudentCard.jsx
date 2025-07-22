import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function StudentCard({ student, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/students/${student.id}`)}
      className="card group relative flex justify-between items-center"
    >
      <Button
        variant="dangerText"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(student.id);
        }}
        className="absolute top-2 right-2 text-sm opacity-0 group-hover:opacity-100 transition"
      >
        Delete
      </Button>

      <div>
        <div className="text-lg font-semibold">{student.name}</div>
        <div className="text-soft-sm">{student.school}</div>
        <div className="mt-2 badge-grade">{student.grade}th Grade</div>
      </div>
    </div>
  );
}
