export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">🔐 관리자 전용 페이지</h1>
      <p>이곳은 관리자만 접근할 수 있는 공간입니다.</p>

      <div className="mt-6 space-y-4">
        <button className="px-4 py-2 rounded bg-blue-600 text-white">
          Refresh Token 상태 확인
        </button>
        <button className="px-4 py-2 rounded bg-red-600 text-white">
          전체 유저 불러오기 (예정)
        </button>
      </div>
    </div>
  );
}
