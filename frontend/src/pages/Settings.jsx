import ProfileSettings from '../sections/settings/ProfileSettings';
import NotificationSettings from '../sections/settings/NotificationSettings';
import PreferencesSettings from '../sections/settings/PreferencesSettings';

export default function SettingsPage() {
  return (
    <div className="main-content">
      <h1 className="text-title">⚙️ Settings</h1>

      <ProfileSettings />
      <NotificationSettings />
      <PreferencesSettings />
    </div>
  );
}
