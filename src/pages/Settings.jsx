import ProfileSettings from '../sections/settings/ProfileSettings';
import NotificationSettings from '../sections/settings/NotificationSettings';
import PreferencesSettings from '../sections/settings/PreferencesSettings';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold mb-4">⚙️ Settings</h1>

      <ProfileSettings />
      <NotificationSettings />
      <PreferencesSettings />
    </div>
  );
}
