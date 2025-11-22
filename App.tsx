import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Calendar from './pages/Calendar';
import MarkAttendance from './pages/MarkAttendance';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherAttendance from './pages/TeacherAttendance';
import TeacherSubjects from './pages/TeacherSubjects';
import TeacherMessages from './pages/TeacherMessages';
import TeacherStudents from './pages/TeacherStudents';
import Layout from './components/Layout';

// Wrapper to handle conditional layout rendering
const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
           {/* Student Routes */}
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/subjects" element={<Subjects />} />
           <Route path="/calendar" element={<Calendar />} />
           <Route path="/mark" element={<MarkAttendance />} />
           <Route path="/analytics" element={<Analytics />} />
           <Route path="/notifications" element={<Notifications />} />
           <Route path="/settings" element={<Settings />} />
           
           {/* Teacher Routes */}
           <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
           <Route path="/teacher/attendance" element={<TeacherAttendance />} />
           <Route path="/teacher/subjects" element={<TeacherSubjects />} />
           <Route path="/teacher/students" element={<TeacherStudents />} />
           <Route path="/teacher/messages" element={<TeacherMessages />} />
           <Route path="/teacher/reports" element={<Analytics />} />
           <Route path="/teacher/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;