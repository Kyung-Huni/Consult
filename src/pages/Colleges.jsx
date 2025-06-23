import CollegeFilter from '../sections/college/CollegeFilter';
import CollegeCard from '../sections/college/CollegeCard';

import colleges from '../data/colleges';

export default function Colleges() {
  return (
    <div className="space-y-6">
      <CollegeFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
    </div>
  );
}
