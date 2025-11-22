import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_SUBJECTS } from '../constants';
import { User, MoreHorizontal } from 'lucide-react';

const Subjects: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-attendly-slate">Your Subjects</h1>
          <p className="text-gray-500 text-sm">Detailed analytics per course</p>
        </div>
        <button className="text-attendly-aqua bg-attendly-aqua/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-attendly-aqua/20 transition-colors">
          + Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_SUBJECTS.map((subject, index) => {
          const percentage = Math.round((subject.attendedClasses / subject.totalClasses) * 100);
          const isRisk = percentage < 75;

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-attendly-aqua/5 border border-gray-100 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: subject.color, boxShadow: `0 4px 12px ${subject.color}40` }}
                >
                  {subject.name.charAt(0)}
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-attendly-slate mb-1">{subject.name}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-6">
                <User size={12} />
                <span>{subject.faculty}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                   <div>
                     <span className="text-3xl font-bold text-attendly-slate">{percentage}%</span>
                     <span className="text-xs text-gray-400 ml-1">Attendance</span>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-medium text-gray-500">{subject.attendedClasses}/{subject.totalClasses} Classes</p>
                   </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${isRisk ? 'bg-attendly-red' : 'bg-attendly-aqua'}`} 
                    style={{ backgroundColor: isRisk ? '#FF8FAB' : subject.color }}
                  />
                </div>

                {isRisk && (
                  <p className="text-xs text-attendly-red font-medium mt-2 bg-red-50 p-2 rounded-lg inline-block">
                    ⚠️ Falling behind schedule
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Subjects;