import { useEffect, useState } from 'react';
import axios from '../api/axios';
import CollegeCard from '../sections/college/CollegeCard';
import CollegeFilterModal from '../sections/college/CollegeFilterModal';

import popularColleges from '../data/popularColleges';
import frequentColleges from '../data/frequentColleges';

export default function Colleges() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [popular, setPopular] = useState([]);
  const [frequent, setFrequent] = useState([]);

  const [filterOpen, setFilterOpen] = useState(false);

  // 초기 인기/자주 대학 조회
  useEffect(() => {
    const fetchInitialColleges = async () => {
      try {
        const [pop, freq] = await Promise.all([
          Promise.all(
            popularColleges.map((name) =>
              axios.get('/colleges/search', { params: { name } })
            )
          ),
          Promise.all(
            frequentColleges.map((name) =>
              axios.get('/colleges/search', { params: { name } })
            )
          ),
        ]);
        setPopular(pop.flatMap((r) => r.data.results || []));
        setFrequent(freq.flatMap((r) => r.data.results || []));
      } catch (err) {
        console.error('초기 대학 데이터 불러오기 실패:', err);
      }
    };
    fetchInitialColleges();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <button
          onClick={() => setFilterOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          🔍 상세 검색
        </button>
      </div>

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

      {searchResults.length === 0 && (
        <>
          <Section title="🔥 인기 대학">
            {popular.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </Section>

          <Section title="📈 자주 검색된 대학">
            {frequent.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </Section>
        </>
      )}
    </div>
  );
}

// 섹션 컴포넌트
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
