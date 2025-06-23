// src/data/students.js

const students = [
  {
    id: 1,
    name: 'Student A',
    school: 'ABC High School',
    grade: 11,
    email: 'studentA@example.com',
    phone: '010-1234-5678',
    access: {
      allowLogin: true,
      canEditChecklist: false,
      canViewColleges: true,
    },
    colleges: [
      { id: 1, status: 'Applied' },
      { id: 4, status: 'Interested' },
    ], // college id 참조
    meetings: [101, 102], // meeting id 참조
    checklist: [
      { id: 1, text: 'Submit Essay Draft', done: true, due: '2025-06-20' },
      { id: 2, text: 'Resume Upload', done: false, due: '2025-06-25' },
    ],
    todo: [
      { id: 1, text: 'Schedule Mock Interview', done: false, due: '2025-06-20' },
      { id: 2, text: 'Finalize College List', done: true, due: '2025-06-25' },
    ],
    notes: [
      {
        id: 1,
        content: 'Student needs help with essay structure.',
        date: '2025-06-18 14:00',
        author: 'Consultant A',
      },
    ],
    exams: [
      {
        id: 1,
        type: 'ACT',
        date: '2024-06-07',
        scores: {
          English: 29,
          Math: 27,
          Reading: 28,
          Science: 24,
          Writing: '--',
        },
      },
    ],
    times: [
      {
        id: 1,
        date: '2025-06-01',
        duration: 1.5, // 시간 단위 (1.5시간 = 1시간 30분)
        description: 'Initial consultation meeting',
        billable: true, // 청구 가능한 시간인지
        status: 'paid', // 'unpaid' | 'invoiced' | 'paid'
      },
      {
        id: 2,
        date: '2025-06-03',
        duration: 0.75,
        description: 'Internal planning (non-billable)',
        billable: false,
        status: 'non-billable',
      },
      {
        id: 3,
        date: '2025-06-10',
        duration: 2.0,
        description: 'Application strategy session',
        billable: true,
        status: 'unpaid',
      },
    ],

    conversation: [
      { id: 1, sender: 'Student', text: 'Hi, can we meet this week?', time: '2025-06-18 10:00' },
      { id: 2, sender: 'You', text: "Sure, let's schedule.", time: '2025-06-18 10:02' },
    ],
  },
];

export default students;
