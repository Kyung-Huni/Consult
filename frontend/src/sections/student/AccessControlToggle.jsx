import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SectionSkeleton from '../../components/skeleton/SectionSkeleton';

export default function AccessControlToggle({ studentId }) {
  const [settings, setSettings] = useState({
    allowLogin: false,
    allowChecklistEdit: false,
  });

  const [loading, setLoading] = useState(true);

  const fetchAccessControl = async () => {
    try {
      const res = await axios.get(`/students/${studentId}/access`);
      setSettings({
        allowLogin: res.data.allowLogin ?? false,
        allowChecklistEdit: res.data.allowChecklistEdit ?? false,
      });
      setLoading(false);
    } catch (err) {
      console.error('Access 설정 불러오기 실패:', err);
    }
  };

  const toggleSetting = async (key) => {
    const newValue = !settings[key];

    try {
      await axios.patch(`/students/${studentId}/access`, {
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

  useEffect(() => {
    fetchAccessControl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  if (loading) return <SectionSkeleton />;

  return (
    <div className="section-box">
      <h2 className="section-title text-sectionAccess">🔐 Student Access</h2>

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
