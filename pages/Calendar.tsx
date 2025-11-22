import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_HISTORY, MOCK_SUBJECTS } from '../constants';
import { AttendanceRecord } from '../types';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() + 1));

  // Helper to get status for a specific day
  const getDayStatus = (day: number) => {
    const dateStr = new Date(year, currentDate.getMonth(), day).toISOString().split('T')[0];
    // Just checking if ANY class happened this day and what the worst status was
    const records = MOCK_HISTORY.filter(r => r.date.startsWith(dateStr));
    
    if (records.length === 0) return null;
    
    if (records.some(r => r.status === 'Absent')) return 'Absent';
    if (records.some(r => r.status === 'Late')) return 'Late';
    return 'Present';
  };

  const getStatusColor = (status: string | null) => {
    switch(status) {
      case 'Present': return 'bg-attendly-green text-teal-800';
      case 'Absent': return 'bg-attendly-red text-rose-800';
      case 'Late': return 'bg-attendly-peach text-orange-800';
      default: return 'bg-transparent text-attendly-slate';
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-attendly-slate">Calendar</h1>
        <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 p-1">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><ChevronLeft size={20}/></button>
          <span className="px-4 font-medium text-attendly-slate min-w-[140px] text-center">{monthName} {year}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><ChevronRight size={20}/></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-hidden flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 grid-rows-5 gap-2 flex-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = getDayStatus(day);
            const colorClass = getStatusColor(status);

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`
                  relative rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 border border-transparent hover:border-gray-200
                  ${status ? colorClass : 'bg-gray-50 hover:bg-gray-100'}
                `}
              >
                <span className={`text-lg font-semibold ${status ? 'opacity-100' : 'text-gray-400'}`}>{day}</span>
                {status && (
                  <span className="text-[10px] font-medium uppercase mt-1 opacity-80">{status}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-attendly-green"></div> <span className="text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-attendly-red"></div> <span className="text-gray-600">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-attendly-peach"></div> <span className="text-gray-600">Late</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;