import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, X, Save, User, Mail, Hash } from 'lucide-react';
import { MOCK_STUDENTS_LIST } from '../constants';
import { Student } from '../types';

const TeacherStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS_LIST);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    email: '',
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStudent.name,
      rollNo: newStudent.rollNo,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudent.name)}&background=random`,
    };
    
    setStudents([student, ...students]);
    setIsAdding(false);
    setNewStudent({ name: '', rollNo: '', email: '' });
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10 relative min-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-attendly-slate">Manage Students</h1>
          <p className="text-gray-500 text-sm">View and enroll students to the system</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-attendly-aqua text-white px-4 py-2 rounded-xl shadow-lg shadow-attendly-aqua/20 hover:bg-[#3d7a8b] transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* Add Student Modal Overlay */}
      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-attendly-aqua/20 mb-8 relative z-10 max-w-2xl mx-auto md:mx-0"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-attendly-slate">Register New Student</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleAddStudent} className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-attendly-aqua"
                    placeholder="e.g. John Doe"
                    value={newStudent.name}
                    onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 ml-1">Roll Number</label>
                <div className="relative">
                    <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-attendly-aqua"
                        placeholder="e.g. CS-2024-101"
                        value={newStudent.rollNo}
                        onChange={e => setNewStudent({...newStudent, rollNo: e.target.value})}
                    />
                </div>
                </div>
                <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 ml-1">Email Address</label>
                <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-attendly-aqua"
                        placeholder="e.g. john@college.edu"
                        value={newStudent.email}
                        onChange={e => setNewStudent({...newStudent, email: e.target.value})}
                    />
                </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-attendly-slate text-white px-8 py-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Save size={18} /> Save Student
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Toolbar */}
       <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search student..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-attendly-aqua"
                />
             </div>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 border border-gray-200">
                <Filter size={18} />
             </button>
          </div>
          <div className="text-xs text-gray-400 font-medium">
              Showing {filteredStudents.length} students
          </div>
       </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
            <div>
                <h3 className="font-bold text-attendly-slate">{student.name}</h3>
                <p className="text-sm text-gray-500">{student.rollNo}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeacherStudents;