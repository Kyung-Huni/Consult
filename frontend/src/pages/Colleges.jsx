// Colleges.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import CollegeCard from '../sections/college/CollegeCard';
import CollegeFilterModal from '../sections/college/CollegeFilterModal';
import popularColleges from '../data/popularColleges';
import Button from '../components/ui/Button';
import CollegeCardSkeleton from '../components/skeleton/CollegeCardSkeleton';

export default function Colleges() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const [filterOpen, setFilterOpen] = useState(false);

  // Error
  const [searchError, setSearchError] = useState('');
  const [popularError, setPopularError] = useState('');

  // 🔹 초기 인기 대학 불러오기
  useEffect(() => {
    const fetchPopularColleges = async () => {
      try {
        const results = await Promise.all(
          popularColleges.map((name) =>
            axios.get('/colleges/search', { params: { name } })
          )
        );
        setPopular(results.flatMap((r) => r.data.results || []));
      } catch (err) {
        console.error('인기 대학 불러오기 실패:', err);
        setPopularError('인기 대학 목록을 불러오지 못했습니다.');
      } finally {
        setPopularLoading(false);
      }
    };
    fetchPopularColleges();
  }, []);

  // 🔹 학생 목록 불러오기
  useEffect(() => {
    axios.get('/students').then((res) => setStudents(res.data));
  }, []);

  // 🔍 검색 실행
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get('/colleges/search', {
        params: { name: query },
      });
      setSearchResults(res.data.results || []);
    } catch (err) {
      console.error('검색 실패:', err);
      setSearchError('검색에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div>
        <h1 className="text-title">Colleges</h1>
        <p className="text-description text-gray-600">
          Search and recommend colleges for your students
        </p>
      </div>

      {/* 🎓 검색 및 추천 */}
      <section className="mb-8">
        <h2 className="text-subtitle">🎓 College Search & Recommendation</h2>
        <p className="text-description text-gray-600 mb-2">
          Please select a student to start recommending colleges.
        </p>
        <div className="flex justify-between gap-2">
          <select
            value={selectedStudentId}
            onChange={setSelectedStudentId}
            className="form-input"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* 상세 검색 버튼 */}
          <Button variant="primary" className="text-sm px-4 py-2">
            🔍 Advanced Search
          </Button>
        </div>
        {/* 학생 선택 */}
      </section>

      {/* 🔍 검색 모달 */}
      <CollegeFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        query={query}
        onQueryChange={setQuery}
        onSearch={() => {
          handleSearch();
          setFilterOpen(false);
        }}
        loading={loading}
      />

      {/* 검색 결과 또는 인기 대학 표시 */}
      {searchResults.length > 0 ? (
        <Section title={<h2 className="text-subtitle">🔍 Search Results</h2>}>
          {searchError && (
            <p className="text-sm text-red-500 mb-2">{searchError}</p>
          )}
          {loading ? (
            <CollegeCardSkeleton count={8} />
          ) : (
            searchResults.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                studentId={selectedStudentId}
              />
            ))
          )}
        </Section>
      ) : (
        <Section title={<h2 className="text-subtitle">🔥 Popular Colleges</h2>}>
          {popularError && (
            <p className="text-sm text-red-500 mb-2">{popularError}</p>
          )}
          {popularLoading ? (
            <CollegeCardSkeleton count={8} />
          ) : (
            popular.map((college) => (
              <CollegeCard
                key={`popular-${college.id}`}
                college={college}
                studentId={selectedStudentId}
              />
            ))
          )}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
