import { useState } from 'react';
import axios from '../../api/axios';

export default function AccessControlToggle({ access = {}, studentId }) {
  const [settings, setSettings] = useState({
    allowLogin: access.allowLogin ?? false,
    allowChecklistEdit: access.allowChecklistEdit ?? false,
  });

  const toggleSetting = async (key) => {
    const newValue = !settings[key];

    try {
      await axios.patch(`/student/${studentId}/access`, {
        [key]: newValue,
      });

      setSettings((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    } catch (err) {
      console.error('Access 설정 변경 실패:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm space-y-4">
      <h2 className="text-lg font-bold mb-2">🔐 Student Access</h2>

      {/* 로그인 허용 토글 */}
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">Allow login</div>
          <div className="text-xs text-gray-500">
            학생이 자신의 포털에 로그인할 수 있게 허용합니다.
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.allowLogin}
          onChange={() => toggleSetting('allowLogin')}
          className="w-4 h-4"
        />
      </div>

      {/* 체크리스트 편집 허용 토글 */}
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">Edit Checklist</div>
          <div className="text-xs text-gray-500">
            학생이 할 일을 직접 수정할 수 있도록 허용합니다.
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.allowChecklistEdit}
          onChange={() => toggleSetting('allowChecklistEdit')}
          className="w-4 h-4"
        />
      </div>
    </div>
  );
}
