export default function AccessControlToggle({ access = {} }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-4">
      <h2 className="text-lg font-bold mb-2">🔐 Student Access</h2>

      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">Allow login</div>
          <div className="text-xs text-gray-500">
            학생이 자신의 포털에 로그인할 수 있게 허용합니다.
          </div>
        </div>
        <input type="checkbox" checked={access.allowLogin} className="w-4 h-4" />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">Edit Checklist</div>
          <div className="text-xs text-gray-500">
            학생이 할 일을 직접 수정할 수 있도록 허용합니다.
          </div>
        </div>
        <input type="checkbox" checked={access.canEditChecklist} className="w-4 h-4" />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">View College List</div>
          <div className="text-xs text-gray-500">
            학생이 추천 또는 자신의 대학 목록을 확인할 수 있도록 허용합니다.
          </div>
        </div>
        <input type="checkbox" checked={access.canViewColleges} className="w-4 h-4" />
      </div>
    </div>
  );
}
