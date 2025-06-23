export default function Header() {
  return (
    <header className="h-16 bg-white shadow fixed left-64 top-0 right-0 z-10 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">대시보드</h1>
      <div className="text-sm text-gray-600">사용자 이름</div>
    </header>
  );
}
