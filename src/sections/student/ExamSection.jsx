export default function ExamSection({ exams = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">🅰️ Exam Scores</h2>

      {exams.length === 0 ? (
        <div className="text-sm text-gray-400">No Exam Data</div>
      ) : (
        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-yellow-100 p-4 rounded grid sm:grid-cols-6 gap-2 items-center"
            >
              <div className="font-semibold col-span-1 text-sm">
                {exam.type}
                <div className="text-xs">{exam.date}</div>
              </div>

              {Object.entries(exam.scores).map(([subject, score]) => (
                <div key={subject} className="text-sm text-gray-800 col-span-1">
                  <div className="text-xs text-gray-500">{subject}</div>
                  <div>{score}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
