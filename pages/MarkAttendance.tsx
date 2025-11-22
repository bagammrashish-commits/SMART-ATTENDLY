import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, CalendarCheck } from 'lucide-react';
import { MOCK_SUBJECTS } from '../constants';

// Mocking "Today's" schedule
const TODAYS_CLASSES = [MOCK_SUBJECTS[0], MOCK_SUBJECTS[1], MOCK_SUBJECTS[3]];

const MarkAttendance: React.FC = () => {
  // State to track status per subject id
  const [statuses, setStatuses] = useState<Record<string, 'Present' | 'Absent' | 'Late' | null>>({});
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setStatuses(prev => ({
      ...prev,
      [id]: prev[id] === status ? null : status
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-attendly-slate">Mark Attendance</h1>
          <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button 
            onClick={handleSave}
            className="bg-attendly-slate text-white px-8 py-3 rounded-xl shadow-xl shadow-gray-900/10 hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
        >
            {isSaved ? <Check size={18} /> : <CalendarCheck size={18} />}
            {isSaved ? 'Saved!' : 'Save Entry'}
        </button>
      </div>

      <div className="grid gap-4">
        {TODAYS_CLASSES.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Subject Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: subject.color }}>
                {subject.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-attendly-slate">{subject.name}</h3>
                <p className="text-xs text-gray-400">09:30 AM - 10:30 AM • {subject.faculty}</p>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-center">
              
              {/* Present */}
              <button
                onClick={() => handleToggle(subject.id, 'Present')}
                className={`
                  flex-1 md:flex-none h-12 px-6 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 font-medium
                  ${statuses[subject.id] === 'Present' 
                    ? 'bg-attendly-green text-teal-900 border-attendly-green shadow-lg shadow-attendly-green/20 scale-105' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                  }
                `}
              >
                <Check size={18} />
                <span className="hidden md:inline">Present</span>
              </button>

              {/* Absent */}
              <button
                onClick={() => handleToggle(subject.id, 'Absent')}
                className={`
                  flex-1 md:flex-none h-12 px-6 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 font-medium
                  ${statuses[subject.id] === 'Absent' 
                    ? 'bg-attendly-red text-rose-900 border-attendly-red shadow-lg shadow-attendly-red/20 scale-105' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                  }
                `}
              >
                <X size={18} />
                <span className="hidden md:inline">Absent</span>
              </button>

              {/* Late */}
              <button
                onClick={() => handleToggle(subject.id, 'Late')}
                className={`
                  flex-1 md:flex-none h-12 px-6 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 font-medium
                  ${statuses[subject.id] === 'Late' 
                    ? 'bg-attendly-peach text-orange-900 border-attendly-peach shadow-lg shadow-attendly-peach/20 scale-105' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                  }
                `}
              >
                <Clock size={18} />
                <span className="hidden md:inline">Late</span>
              </button>

            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="text-attendly-aqua text-sm font-medium hover:underline">
            Copy yesterday's status
        </button>
      </div>
    </div>
  );
};

export default MarkAttendance;