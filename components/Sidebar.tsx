import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BookOpen, CheckCircle, BarChart3, Settings, LogOut, Users, ClipboardCheck, MessageSquare, Bell, UserPlus } from 'lucide-react';
import { APP_NAME, MOCK_USER, MOCK_TEACHER } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we are in teacher mode based on URL
  const isTeacher = location.pathname.startsWith('/teacher');
  
  const user = isTeacher ? MOCK_TEACHER : MOCK_USER;
  const roleSubtitle = isTeacher ? MOCK_TEACHER.department : MOCK_USER.course;

  const handleLogout = () => {
    navigate('/');
  };

  const studentNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CalendarDays, label: 'Calendar', path: '/calendar' },
    { icon: BookOpen, label: 'Subjects', path: '/subjects' },
    { icon: CheckCircle, label: 'Mark Attendance', path: '/mark' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const teacherNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher/dashboard' },
    { icon: ClipboardCheck, label: 'Take Attendance', path: '/teacher/attendance' },
    { icon: Users, label: 'Students', path: '/teacher/students' },
    { icon: BookOpen, label: 'Subjects', path: '/teacher/subjects' },
    { icon: MessageSquare, label: 'Messages', path: '/teacher/messages' },
    { icon: BarChart3, label: 'Reports', path: '/teacher/reports' },
    { icon: Settings, label: 'Settings', path: '/teacher/settings' },
  ];

  const navItems = isTeacher ? teacherNavItems : studentNavItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-2xl shadow-attendly-aqua/5
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-attendly-aqua tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-attendly-aqua to-attendly-green flex items-center justify-center text-white text-sm">
                A
              </div>
              {APP_NAME}
            </h1>
            <p className="text-xs text-gray-400 ml-10 mt-1">Track Better. Attend Smarter.</p>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-attendly-aqua/10 text-attendly-aqua font-medium shadow-sm' 
                    : 'text-gray-500 hover:bg-attendly-mint/50 hover:text-attendly-slate'
                  }
                `}
              >
                <item.icon size={20} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-attendly-mint/30 p-3 rounded-xl flex items-center gap-3 mb-3">
              <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-semibold text-attendly-slate truncate">{user.name}</h4>
                <p className="text-xs text-gray-500 truncate">{roleSubtitle}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-2 text-sm text-gray-400 hover:text-attendly-red transition-colors"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;