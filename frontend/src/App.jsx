import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Layout from './layouts/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Colleges from './pages/Colleges';
import CollegeDetail from './pages/CollegeDetail';
import Meetings from './pages/Meetings';
import MeetingDetail from './pages/MeetingDetail';
import Templates from './pages/Templates';
import TemplateEditor from './pages/TemplateEditor';
import CalendarPage from './pages/Calendar';
import Settings from './pages/Settings';
import Login from './pages/login';
import Practice from './pages/Practice';

// Authentication
import { AuthProvider } from './context/authContext';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import PublicRoute from './routes/PublicRoute';

// Practice
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:id" element={<CollegeDetail />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/meetings/:id" element={<MeetingDetail />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/new/:type" element={<TemplateEditor />} />
            <Route
              path="/templates/edit/:type/:id"
              element={<TemplateEditor />}
            />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<Settings />} />

            {/* Practice */}
            <Route path="/practice" element={<Practice />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
