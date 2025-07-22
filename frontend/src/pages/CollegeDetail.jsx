import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import axios from '../api/axios';
import Button from '../components/ui/Button';

export default function CollegeDetail() {
  const { id } = useParams();

  const [collegeInfo, setCollegeInfo] = useState(null); // 외부 API
  const [note, setNote] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const external = await axios.get('/colleges/searchById', {
          params: { id },
        });
        const found = external.data.results?.[0];
        if (!found) throw new Error('대학을 찾을 수 없음');
        setCollegeInfo(found);

        try {
          const dbRes = await axios.get(`/colleges/${id}`);
          setNote(dbRes.data.note || '');
          setIsFavorite(dbRes.data.isFavorite ?? false);
        } catch (err) {
          if (isAxiosError(err) && err.response?.status === 404) {
            // ❗ 404는 정상 → 무시 (콘솔에도 안 찍음)
          } else {
            console.error('DB 조회 중 오류 발생:', err); // ❗ 진짜 문제만 찍음
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

  const saveNoteOnly = async () => {
    try {
      await axios.put(`/colleges/${id}`, {
        name: collegeInfo.school.name,
        location: `${collegeInfo.school.city}, ${collegeInfo.school.state}`,
        note,
        isFavorite,
      });
      alert('✅ 메모 저장됨');
    } catch {
      alert('❌ 저장 실패');
    }
  };

  const toggleFavorite = async () => {
    const updated = !isFavorite;
    setIsFavorite(updated);
    try {
      await axios.put(`/colleges/${id}`, { note, isFavorite: updated });
    } catch {
      alert('❌ 즐겨찾기 저장 실패');
      setIsFavorite(!updated);
    }
  };

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
  if (!collegeInfo)
    return <div className="p-6">해당 대학을 찾을 수 없습니다.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <div className="text-title mb-1">{collegeInfo?.school?.name}</div>
          <div className="text-description text-gray-00">
            {collegeInfo?.school?.city}, {collegeInfo?.school?.state}
          </div>
        </div>
        <Button
          variant="favorite"
          onClick={toggleFavorite}
          className={`text-sm px-3 py-1 rounded ${
            isFavorite
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {isFavorite ? '⭐ 관심 등록됨' : '+ 관심목록 등록'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          label="학비"
          value={getValue(
            () => `$${collegeInfo?.latest?.cost?.attendance?.academic_year}`
          )}
        />
        <InfoCard
          label="입학률"
          value={getValue(() => {
            const rate =
              collegeInfo?.latest?.admissions?.admission_rate?.overall;
            return rate != null ? `${(rate * 100).toFixed(1)}%` : '정보 없음';
          })}
        />
        <InfoCard
          label="학생 수"
          value={getValue(() => collegeInfo?.latest?.student?.size)}
        />
        <InfoCard
          label="종류"
          value={getValue(() =>
            collegeInfo?.school?.ownership === 1 ? '공립' : '사립'
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          label="SAT 범위"
          value={getValue(() => {
            const math =
              collegeInfo?.latest?.admissions?.sat_scores?.midpoint?.math;
            const reading =
              collegeInfo?.latest?.admissions?.sat_scores?.midpoint
                ?.critical_reading;
            return math && reading ? `${math} / ${reading}` : '정보 없음';
          })}
        />
        <InfoCard
          label="ACT 범위"
          value={getValue(
            () =>
              collegeInfo?.latest?.admissions?.act_scores?.midpoint?.cumulative
          )}
        />
      </div>

      <div className="section-box">
        <h2 className="section-title">입학 요건</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>고등학교 졸업장 또는 동등 학력</li>
          <li>SAT / ACT 점수 제출 권장</li>
          <li>에세이 및 추천서 (대학에 따라)</li>
        </ul>
      </div>

      <div className="section-box">
        <div>
          <div className="section-title">📎 공식 사이트</div>
          <div className="text-sm text-gray-600">
            대학 정보를 더 자세히 보려면 아래 링크를 클릭하세요.
          </div>
          <a
            href={`https://${collegeInfo?.school?.school_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Visit College WebSite →
          </a>
        </div>
      </div>

      <div className="section-box">
        <h2 className="section-title">메모</h2>
        <textarea
          className="w-full form-input"
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="대학 관련 메모를 입력하세요..."
        />
        <Button
          variant="primary"
          onClick={saveNoteOnly}
          className="mt-2 text-sm px-3 py-1"
        >
          💾 Save
        </Button>
      </div>
    </div>
  );
}
