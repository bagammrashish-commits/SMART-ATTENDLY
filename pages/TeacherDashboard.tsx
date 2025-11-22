import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_TEACHER } from '../constants';
import { Users, Clock, Calendar, ChevronRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const classes = [
    { id: 1, name: 'Data Structures', batch: 'CS-A', time: '09:30 AM', students: 45, room: 'Lab 3' },
    { id: 2, name: 'Data Structures', batch: 'CS-B', time: '11:00 AM', students: 42, room: 'Room 204' },
    { id: 3, name: 'Advanced Algorithms', batch: 'CS-Final', time: '02:00 PM', students: 30, room: 'Room 101' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-attendly-slate">Welcome, {MOCK_TEACHER.name.split(' ')[1]}! 👋</h1>
          <p className="text-gray-500 mt-1">You have 3 classes scheduled for today.</p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <Calendar size={18} className="text-attendly-aqua" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
           <div className="w-12 h-12 rounded-2xl bg-attendly-aqua/10 text-attendly-aqua flex items-center justify-center">
              <Users size={24} />
           </div>
           <div>
              <p className="text-2xl font-bold text-attendly-slate">117</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Students Today</p>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
           <div className="w-12 h-12 rounded-2xl bg-attendly-peach/20 text-attendly-peach flex items-center justify-center">
              <ClipboardList size={24} />
           </div>
           <div>
              <p className="text-2xl font-bold text-attendly-slate">3</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Classes</p>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
           <div className="w-12 h-12 rounded-2xl bg-attendly-green/20 text-green-600 flex items-center justify-center">
              <Clock size={24} />
           </div>
           <div>
              <p className="text-2xl font-bold text-attendly-slate">5h</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Teaching Hours</p>
           </div>
        </motion.div>
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="text-xl font-bold text-attendly-slate mb-6">Today's Schedule</h2>
        <div className="grid gap-4">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-attendly-aqua/5 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-attendly-mint flex flex-col items-center justify-center text-attendly-aqua font-bold border border-attendly-aqua/10">
                       <span className="text-sm leading-none">{cls.time.split(' ')[0]}</span>
                       <span className="text-[10px] leading-none mt-1 opacity-70">{cls.time.split(' ')[1]}</span>
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-attendly-slate">{cls.name}</h3>
                       <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">{cls.batch}</span>
                          <span>•</span>
                          <span className="text-xs">{cls.room}</span>
                          <span>•</span>
                          <span className="text-xs">{cls.students} Students</span>
                       </p>
                    </div>
                 </div>

                 <Link 
                    to="/teacher/attendance"
                    className="bg-attendly-slate text-white px-6 py-3 rounded-xl shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2 font-medium min-w-[180px]"
                 >
                    Take Attendance <ChevronRight size={16} />
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;