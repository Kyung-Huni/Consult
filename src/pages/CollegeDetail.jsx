import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null); // 내 DB
  const [scorecard, setScorecard] = useState(null); // 외부 API
  const [note, setNote] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 외부 API에서 항상 가져옴
        const external = await axios.get('/colleges/searchById', {
          params: { id },
        });
        const found = external.data.results?.[0];
        if (!found) throw new Error('대학을 찾을 수 없음');
        setScorecard(found);

        // 2. 내 DB에서 메모/즐겨찾기 여부 조회 (optional)
        try {
          const dbRes = await axios.get(`/colleges/${id}`);
          setCollege(dbRes.data);
          setNote(dbRes.data.note || '');
        } catch (err) {
          if (err.response?.status === 404) {
            // ❗️ DB에 없는 경우는 무시 (새로운 대학인 경우)
            setCollege(null);
          } else {
            throw err; // 다른 오류는 그대로 던짐
          }
        }
      } catch (err) {
        console.error('대학 정보 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  function InfoCard({ label, value }) {
    return (
      <div className="bg-gray-50 p-4 rounded shadow">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-lg font-semibold">{value ?? '정보 없음'}</div>
      </div>
    );
  }

  const getValue = (fn) => {
    try {
      const val = fn();
      return val != null && val !== '' ? val : '정보 없음';
    } catch {
      return '정보 없음';
    }
  };

  if (loading) return <div className="p-6">불러오는 중...</div>;
  if (!college || !scorecard)
    return <div className="p-6">해당 대학을 찾을 수 없습니다.</div>;

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
            isFavorite
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {isFavorite ? '⭐ 관심 등록됨' : '+ 관심목록 등록'}
        </button>
      </div>

      {/* 요약 정보 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          label="학비"
          value={getValue(
            () => `$${scorecard['latest.cost.attendance.academic_year']}`
          )}
        />
        <InfoCard
          label="입학률"
          value={getValue(
            () =>
              `${(
                scorecard['latest.admissions.admission_rate.overall'] * 100
              ).toFixed(1)}%`
          )}
        />
        <InfoCard
          label="학생 수"
          value={getValue(() => scorecard['latest.student.size'])}
        />
        <InfoCard
          label="종류"
          value={getValue(() =>
            scorecard['school.ownership'] === 1 ? '공립' : '사립'
          )}
        />
      </div>

      {/* SAT/ACT 점수 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          label="SAT 범위"
          value={
            scorecard['latest.admissions.sat_scores.midpoint.math'] == null ||
            scorecard[
              'latest.admissions.sat_scores.midpoint.critical_reading'
            ] == null
              ? '정보 없음'
              : `${scorecard['latest.admissions.sat_scores.midpoint.math']} / ${scorecard['latest.admissions.sat_scores.midpoint.critical_reading']}`
          }
        />
        <InfoCard
          label="ACT 범위"
          value={getValue(
            () => scorecard['latest.admissions.act_scores.midpoint.cumulative']
          )}
        />
      </div>

      {/* 입학 요건 (정적 정보) */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-2">입학 요건</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>고등학교 졸업장 또는 동등 학력</li>
          <li>SAT / ACT 점수 제출 권장</li>
          <li>에세이 및 추천서 (대학에 따라)</li>
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
          href={`https://${scorecard['school.school_url']}`}
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
