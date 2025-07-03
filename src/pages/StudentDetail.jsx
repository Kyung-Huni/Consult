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

import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function StudentDetail() {
  const { id: studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/students/${studentId}`);
        setStudent(res.data);
      } catch (err) {
        console.error('학생 정보 불러오기 실패:', err);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <StudentHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 왼쪽 섹션 */}
        <div className="space-y-6">
          <ChecklistSection studentId={student.id} />
          <StudentToDoSection todo={student.todo} />
          <MeetingSection studentId={student.id} />
          <ConversationSection studentId={student.id} />
          <CollegeListSection studentId={student.id} />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="space-y-6">
          <NotesSection studentId={student.id} />
          <ExamSection studentId={student.id} />
          <TimeTrackerSection times={student.times} />
          <ContactInfoSection email={student.email} phone={student.phone} />
          <AccessControlToggle access={student.access} studentId={student.id} />
        </div>
      </div>
    </div>
  );
}
