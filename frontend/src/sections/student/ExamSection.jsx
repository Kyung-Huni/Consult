import { useEffect, useState } from 'react';
import ExamModal from './ExamModal';
import axios from '../../api/axios';
import Button from '../../components/ui/Button';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function ExamSection({ studentId }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/exams`);
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error('시험 데이터 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <div className="flex justify-between items-center">
        <h2 className="section-title text-sectionExam">🅰️ Exam Scores</h2>
        <Button
          variant="ghostText"
          onClick={() => setShowModal(true)}
          className="text-sm text-sectionExam hover:underline"
        >
          + Add Exam
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-soft-sm">No Exam Data</div>
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
                  <div className="text-xs text-gray-500">
                    {exam.date.slice(0, 10)}
                  </div>
                </div>

                {Object.entries(parsedScores).map(
                  ([subject, score], idx, arr) => (
                    <div
                      key={subject}
                      className={`col-span-1 pl-3 border-l ${
                        idx === 0 ? 'border-l-0 pl-0' : 'border-gray-300'
                      }`}
                    >
                      <div className="text-xs text-gray-500">{subject}</div>
                      <div className="text-base font-semibold text-gray-800">
                        {score}
                      </div>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <ExamModal
          studentId={studentId}
          onClose={() => setShowModal(false)}
          onSave={fetchExams}
        />
      )}
    </div>
  );
}
