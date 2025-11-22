import React from 'react';
import { MOCK_HISTORY, MOCK_SUBJECTS } from '../constants';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { Medal, TrendingDown, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  // Mock data for weekly trend
  const data = [
    { name: 'Mon', val: 80 },
    { name: 'Tue', val: 100 },
    { name: 'Wed', val: 60 },
    { name: 'Thu', val: 100 },
    { name: 'Fri', val: 80 },
    { name: 'Sat', val: 90 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-2xl font-bold text-attendly-slate">Monthly Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Best Subject */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <Medal size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Best Performance</p>
            <p className="text-lg font-bold text-attendly-slate">{MOCK_SUBJECTS[0].name}</p>
            <p className="text-xs text-attendly-green font-medium flex items-center gap-1">
                <TrendingUp size={12} /> 84% Attendance
            </p>
          </div>
        </div>

         {/* Worst Subject */}
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Needs Attention</p>
            <p className="text-lg font-bold text-attendly-slate">{MOCK_SUBJECTS[4].name}</p>
            <p className="text-xs text-attendly-red font-medium flex items-center gap-1">
                <TrendingDown size={12} /> 60% Attendance
            </p>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gradient-to-br from-attendly-aqua to-teal-600 p-6 rounded-3xl shadow-lg shadow-attendly-aqua/30 text-white flex items-center justify-between">
           <div>
              <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Current Streak</p>
              <p className="text-3xl font-bold">7 Days</p>
           </div>
           <div className="text-4xl">🔥</div>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-attendly-slate mb-6">Weekly Trend</h3>
          <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                      <Tooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#4A90A4" 
                        strokeWidth={4} 
                        dot={{fill: '#4A90A4', strokeWidth: 2, r: 4, stroke: '#fff'}} 
                        activeDot={{r: 8}}
                      />
                  </LineChart>
              </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

export default Analytics;