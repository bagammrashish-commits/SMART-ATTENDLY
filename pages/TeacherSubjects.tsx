import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Book, Clock, Users, MapPin, Save, X } from 'lucide-react';
import { MOCK_SUBJECTS } from '../constants';
import { Subject } from '../types';

const TeacherSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Subject Form State
  const [newSubject, setNewSubject] = useState({
    name: '',
    batch: '',
    time: '',
    room: '',
    studentsCount: 0,
  });

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const subject: Subject = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSubject.name,
      faculty: 'Dr. Sarah Smith', // Current User
      totalClasses: 0,
      attendedClasses: 0,
      color: '#4A90A4', // Default color
      batch: newSubject.batch,
      time: newSubject.time,
      room: newSubject.room,
      studentsCount: newSubject.studentsCount || 0,
    };
    
    setSubjects([...subjects, subject]);
    setIsAdding(false);
    setNewSubject({ name: '', batch: '', time: '', room: '', studentsCount: 0 });
  };

  return (
    <div className="space-y-8 pb-10 relative min-h-[80vh]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-attendly-slate">My Subjects</h1>
          <p className="text-gray-500 text-sm">Manage the classes you teach</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-attendly-aqua text-white px-4 py-2 rounded-xl shadow-lg shadow-attendly-aqua/20 hover:bg-[#3d7a8b] transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Subject
        </button>
      </div>

      {/* Add Subject Modal/Form Overlay */}
      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-attendly-aqua/20 mb-8 relative z-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-attendly-slate">Add New Class</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleAddSubject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 ml-1">Subject Name</label>
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua"
                placeholder="e.g. Advanced Database Systems"
                value={newSubject.name}
                onChange={e => setNewSubject({...newSubject, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 ml-1">Batch / Section</label>
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua"
                placeholder="e.g. CS-2024-A"
                value={newSubject.batch}
                onChange={e => setNewSubject({...newSubject, batch: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 ml-1">Time</label>
              <input 
                type="time"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua"
                value={newSubject.time}
                onChange={e => setNewSubject({...newSubject, time: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 ml-1">Room / Lab</label>
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua"
                placeholder="e.g. Room 304"
                value={newSubject.room}
                onChange={e => setNewSubject({...newSubject, room: e.target.value})}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-gray-500 ml-1">Estimated Students</label>
              <input 
                type="number"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua"
                placeholder="40"
                value={newSubject.studentsCount}
                onChange={e => setNewSubject({...newSubject, studentsCount: parseInt(e.target.value)})}
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
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
                <Save size={18} /> Save Class
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg hover:shadow-attendly-aqua/5 border border-gray-100 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-attendly-aqua hover:text-white cursor-pointer transition-colors">
                   <Book size={14} />
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{ backgroundColor: subject.color, boxShadow: `0 4px 12px ${subject.color}40` }}
              >
                {subject.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-attendly-slate leading-tight">{subject.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{subject.batch}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-attendly-aqua" />
                <span className="text-sm text-gray-600">{subject.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-attendly-peach" />
                <span className="text-sm text-gray-600">{subject.room}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Users size={16} className="text-attendly-green" />
                <span className="text-sm text-gray-600">{subject.studentsCount} Students Enrolled</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSubjects;