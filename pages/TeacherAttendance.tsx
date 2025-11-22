import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, ArrowLeft, Search, Filter, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_STUDENTS_LIST } from '../constants';

const TeacherAttendance: React.FC = () => {
  const navigate = useNavigate();
  
  // Initialize students from mock list, default status 'Present'
  const [students, setStudents] = useState(
    MOCK_STUDENTS_LIST.map(s => ({ ...s, status: 'Present' as 'Present' | 'Absent' | 'Late' }))
  );
  const [isSaved, setIsSaved] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle status for a single student
  const handleStatusChange = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setIsSaved(false);
  };

  // Bulk Actions
  const markAll = (status: 'Present' | 'Absent' | 'Late') => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
    setIsSaved(false);
  };

  const handleSubmit = () => {
    setIsSaved(true);
    setTimeout(() => {
        navigate('/teacher/dashboard');
    }, 1500);
  };

  // Search Filter
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Counts
  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const lateCount = students.filter(s => s.status === 'Late').length;

  return (
    <div className="space-y-6 pb-24">
       {/* Header & Navigation */}
       <div className="flex items-center gap-4 mb-2">
          <Link to="/teacher/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
             <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
             <h1 className="text-2xl font-bold text-attendly-slate">Data Structures</h1>
             <p className="text-sm text-gray-500">Batch CS-A • 09:30 AM</p>
          </div>
       </div>

       {/* Toolbar */}
       <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search student..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-attendly-aqua"
                />
             </div>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 border border-gray-200">
                <Filter size={18} />
             </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
             <span className="text-xs font-medium text-gray-400 uppercase mr-2 hidden lg:inline">Bulk Actions:</span>
             <button onClick={() => markAll('Present')} className="text-xs font-medium text-attendly-aqua bg-attendly-aqua/10 px-3 py-2 rounded-lg hover:bg-attendly-aqua/20 transition-colors whitespace-nowrap">
                Mark All Present
             </button>
             <button onClick={() => markAll('Absent')} className="text-xs font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap">
                Mark All Absent
             </button>
          </div>
       </div>

       {/* Summary Stats */}
       <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          <div className="bg-green-50 px-4 py-3 rounded-xl border border-green-100 flex items-center gap-3 min-w-[140px] shadow-sm">
             <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
             <div>
                <p className="text-xs text-green-700 font-medium uppercase">Present</p>
                <p className="text-lg font-bold text-green-900">{presentCount}</p>
             </div>
          </div>
          <div className="bg-red-50 px-4 py-3 rounded-xl border border-red-100 flex items-center gap-3 min-w-[140px] shadow-sm">
             <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
             <div>
                <p className="text-xs text-red-700 font-medium uppercase">Absent</p>
                <p className="text-lg font-bold text-red-900">{absentCount}</p>
             </div>
          </div>
          <div className="bg-orange-50 px-4 py-3 rounded-xl border border-orange-100 flex items-center gap-3 min-w-[140px] shadow-sm">
             <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
             <div>
                <p className="text-xs text-orange-700 font-medium uppercase">Late</p>
                <p className="text-lg font-bold text-orange-900">{lateCount}</p>
             </div>
          </div>
       </div>

       {/* Student List */}
       <div className="space-y-3">
          {filteredStudents.map((student, index) => (
             <motion.div
               key={student.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.03 }}
               className={`
                  bg-white p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md
                  ${student.status === 'Absent' ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}
               `}
             >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                   <div>
                      <p className="font-bold text-attendly-slate text-lg sm:text-base">{student.name}</p>
                      <p className="text-sm text-gray-400 font-medium">{student.rollNo}</p>
                   </div>
                </div>

                <div className="flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
                   <button 
                     onClick={() => handleStatusChange(student.id, 'Present')}
                     className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${student.status === 'Present' ? 'bg-white text-green-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:bg-gray-200/50'}`}
                   >
                      <Check size={16} strokeWidth={3} />
                      <span className="sm:hidden">Present</span>
                   </button>
                   <button 
                     onClick={() => handleStatusChange(student.id, 'Late')}
                     className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${student.status === 'Late' ? 'bg-white text-orange-500 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:bg-gray-200/50'}`}
                   >
                      <Clock size={16} strokeWidth={3} />
                      <span className="sm:hidden">Late</span>
                   </button>
                   <button 
                     onClick={() => handleStatusChange(student.id, 'Absent')}
                     className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${student.status === 'Absent' ? 'bg-white text-red-500 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:bg-gray-200/50'}`}
                   >
                      <X size={16} strokeWidth={3} />
                      <span className="sm:hidden">Absent</span>
                   </button>
                </div>
             </motion.div>
          ))}
          
          {filteredStudents.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                  <p>No students found matching "{searchTerm}"</p>
              </div>
          )}
       </div>

       {/* Footer Submit */}
       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 md:pl-72 z-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
             <div className="text-sm text-gray-500 hidden sm:block">
                 <span className="font-bold text-attendly-slate">{filteredStudents.length}</span> students in list
             </div>
             <button 
               onClick={handleSubmit}
               disabled={isSaved}
               className="bg-attendly-aqua text-white px-8 py-3 rounded-xl shadow-lg shadow-attendly-aqua/20 hover:bg-[#3d7a8b] transition-all font-medium w-full sm:w-auto flex items-center justify-center gap-2"
             >
                {isSaved ? <Check size={18} /> : <Save size={18} />}
                {isSaved ? 'Attendance Saved!' : 'Save Attendance'}
             </button>
          </div>
       </div>
    </div>
  );
};

export default TeacherAttendance;