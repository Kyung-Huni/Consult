import StudentFilter from '../sections/student/StudentFilter';
import StudentCard from '../sections/student/StudentCard';

export default function Students() {
  const dummyStudents = [
    { id: 1, name: '김지훈', school: '서울고등학교', status: 'Application In Progress' },
    { id: 2, name: '박수현', school: '한빛여고', status: 'Accepted' },
    { id: 3, name: '이정환', school: '강남고', status: 'Checklist Incomplete' },
  ];

  return (
    <div className="space-y-6">
      <StudentFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyStudents.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  );
}
