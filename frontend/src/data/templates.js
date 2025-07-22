// src/data/templates.js

const templates = {
  Checklist: [
    {
      id: 1,
      title: 'SAT 준비 체크리스트',
      items: [
        { task: 'SAT 진단 테스트', dueDate: '2025-07-01', assignedTo: 'Consultant A' },
        { task: 'Reading Section 복습', dueDate: '2025-07-10', assignedTo: 'Student' },
      ],
    },
  ],
  Meeting: [
    {
      id: 2,
      title: 'Initial Consultation',
      date: '2025-07-01',
      studentAccess: true,
      steps: ['Discuss goals', 'Set deadlines'],
    },
  ],
  Note: [],
  College: [],
};

export default templates;
