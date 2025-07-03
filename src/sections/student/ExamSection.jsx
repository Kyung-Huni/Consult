import { useState } from 'react';
import ExamModal from './ExamModal';

export default function ExamSection({ exams = [] }) {
  const [items, setItems] = useState(exams);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          🅰️ Exam Scores
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm bg-button hover:bg-button-hover text-white rounded border px-3 py-1"
        >
          + Add Exam
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No Exam Data</div>
      ) : (
        <div className="space-y-4">
          {items.map((exam) => {
            // 안전하게 scores 파싱
            let parsedScores = {};
            try {
              parsedScores =
                typeof exam.scores === 'string'
                  ? JSON.parse(exam.scores)
                  : exam.scores;
              console.log(exam);
              console.log('exam.scores:', exam.scores);
              console.log('typeof:', typeof exam.scores);
            } catch (err) {
              console.error('Failed to parse scores:', err);
            }

            return (
              <div
                key={exam.id}
                className="bg-yellow-100 p-4 rounded grid sm:grid-cols-6 gap-2 items-center"
              >
                <div className="font-semibold col-span-1 text-sm">
                  {exam.type}
                  <div className="text-xs">{exam.date}</div>
                </div>

                {Object.entries(parsedScores).map(([subject, score]) => (
                  <div
                    key={subject}
                    className="text-sm text-gray-800 col-span-1"
                  >
                    <div className="text-xs text-gray-500">{subject}</div>
                    <div>{score}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <ExamModal
          onClose={() => setShowModal(false)}
          onSave={(newExam) => {
            setItems((prev) => [...prev, newExam]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
