// src/pages/StudentDetail.jsx
import StudentHeader from '../sections/student/StudentHeader';
import ChecklistSection from '../sections/student/ChecklistSection';
import StudentToDoSection from '../sections/student/StudentToDoSection';
import MeetingSection from '../sections/student/MeetingSection';
import ConversationSection from '../sections/student/ConversationSection';
import CollegeListSection from '../sections/student/CollegeListSection';
import NotesSection from '../sections/student/NotesSection';
import ExamSection from '../sections/student/ExamSection';
import TimeTrackerSection from '../sections/student/TimeTrackerSection';
import ContactInfoSection from '../sections/student/ContactInfoSection';
import AccessControlToggle from '../sections/student/AccessControlToggle';

// Data Binding
import { useParams } from 'react-router-dom';
import students from '../data/students';
import meetings from '../data/meetings';
import colleges from '../data/colleges';

export default function StudentDetail() {
  const { id } = useParams();
  const student = students.find((s) => s.id === parseInt(id));

  if (!student) return <div>Student not found</div>;

  const studentMeetings = (student.meetings || [])
    .map((id) => meetings.find((m) => m.id === id))
    .filter(Boolean);

  const studentColleges = (student.colleges || [])
    .map(({ id, status }) => {
      const college = colleges.find((c) => c.id === id);
      return college ? { ...college, status } : null;
    })
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <StudentHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 왼쪽 섹션 */}
        <div className="space-y-6">
          <ChecklistSection checklist={student.checklist} />
          <StudentToDoSection todo={student.todo} />
          <MeetingSection meetings={studentMeetings} />
          <ConversationSection conversation={student.conversation} />
          <CollegeListSection colleges={studentColleges} />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="space-y-6">
          <NotesSection notes={student.notes} />
          <ExamSection exams={student.exams} />
          <TimeTrackerSection times={student.times} />
          <ContactInfoSection email={student.email} phone={student.phone} />
          <AccessControlToggle access={student.access} />
        </div>
      </div>
    </div>
  );
}
