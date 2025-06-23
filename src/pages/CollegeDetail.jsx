import { useState } from 'react';
import { useParams } from 'react-router-dom';

import colleges from '../data/colleges';

export default function CollegeDetail() {
  const { id } = useParams();
  const college = colleges.find((c) => c.slug === id);

  const [note, setNote] = useState(college.note);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!college) return <div>College not Found</div>;

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  function InfoCard({ label, value }) {
    return (
      <div className="bg-gray-50 p-4 rounded shadow">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 기본 정보 + 관심등록 버튼 */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold mb-1">{college.name}</div>
          <div className="text-sm text-gray-500">{college.location}</div>
        </div>
        <button
          onClick={toggleFavorite}
          className={`text-sm px-3 py-1 rounded ${
            isFavorite ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {isFavorite ? '⭐ 관심 등록됨' : '+ 관심목록 등록'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard label="학비" value={college.tuition} />
        <InfoCard label="입학률" value={college.acceptanceRate} />
        <InfoCard label="학생 수" value={college.studentTotal} />
        <InfoCard label="종류" value={college.type} />
      </div>

      {/* SAT/ACT 점수 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded shadow">
          <div className="text-sm text-gray-500">SAT 범위</div>
          <div className="text-lg font-semibold">{college.satRange}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <div className="text-sm text-gray-500">ACT 범위</div>
          <div className="text-lg font-semibold">{college.actRange}</div>
        </div>
      </div>

      {/* 입학 요건 */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-2">입학 요건</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {college.requirements && college.requirements.length > 0 ? (
            college.requirements.map((req, index) => <li key={index}>{req}</li>)
          ) : (
            <li>요건 정보 없음</li>
          )}
        </ul>
      </div>

      {/* 공식 홈페이지 링크 */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <div className="text-lg font-bold mb-1">📎 공식 사이트</div>
          <div className="text-sm text-gray-500">
            대학 정보를 더 자세히 보려면 아래 링크를 클릭하세요.
          </div>
        </div>
        <a
          href={college.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 underline hover:text-blue-700"
        >
          방문하기 →
        </a>
      </div>

      {/* 메모 */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-2">메모</h2>
        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm"
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="대학 관련 메모를 입력하세요..."
        />
      </div>
    </div>
  );
}
