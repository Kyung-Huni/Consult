import { useState } from 'react';

const EXAM_SUBJECTS = {
  SAT: ['Math', 'EBRW'],
  ACT: ['English', 'Math', 'Reading', 'Science', 'Writing'],
};

export default function ExamModal({ onClose, onSave }) {
  const [type, setType] = useState('SAT');
  const [date, setDate] = useState('');
  const [scores, setScores] = useState({});

  const handleScoreChange = (subject, value) => {
    setScores((prev) => ({
      ...prev,
      [subject]: value,
    }));
  };

  const handleSubmit = () => {
    if (!date) return;

    const newExam = {
      id: Date.now(),
      type,
      date,
      scores,
    };

    onSave(newExam);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">시험 점수 추가</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">시험 종류</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setScores({}); // 시험 종류 변경시 점수 초기화
            }}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            {Object.keys(EXAM_SUBJECTS).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">시험 날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>

        {EXAM_SUBJECTS[type].map((subject) => (
          <div key={subject} className="space-y-1">
            <label className="block text-sm">{subject}</label>
            <input
              type="text"
              value={scores[subject] || ''}
              onChange={(e) => handleScoreChange(subject, e.target.value)}
              className="w-full border px-2 py-1 text-sm"
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-3 py-1 text-sm border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 text-sm bg-button hover:bg-button-hover text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
