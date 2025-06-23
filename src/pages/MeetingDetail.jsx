import { useParams } from 'react-router-dom';

export default function MeetingDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">회의 #{id}</h2>
        <p className="text-sm text-gray-500">학생: 김지훈</p>
        <p className="text-sm text-gray-500">날짜: 2025-06-18</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">회의 메모</h3>
        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm"
          rows={6}
          defaultValue="에세이 2차 피드백 반영 필요. 대학 리스트 재정비."
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">요약</h3>
        <p className="text-sm text-gray-700">
          에세이 초안 내용이 약간 부족하며, 추천 대학 중 2곳은 우선순위 변경 권장됨.
        </p>
      </div>
    </div>
  );
}
