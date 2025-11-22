import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, YAxis, CartesianGrid, TooltipProps } from 'recharts';
import { MOCK_SUBJECTS, MOCK_USER } from '../constants';
import { AlertTriangle, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Calculate stats
  const totalClasses = MOCK_SUBJECTS.reduce((acc, sub) => acc + sub.totalClasses, 0);
  const attendedClasses = MOCK_SUBJECTS.reduce((acc, sub) => acc + sub.attendedClasses, 0);
  const overallPercentage = Math.round((attendedClasses / totalClasses) * 100);

  // Pie Chart Data
  const pieData = [
    { name: 'Attended', value: attendedClasses, color: '#4A90A4' },
    { name: 'Missed', value: totalClasses - attendedClasses, color: '#E3F2F4' },
  ];

  // Risks & Safe
  const lowAttendance = MOCK_SUBJECTS.filter(s => (s.attendedClasses / s.totalClasses) < 0.75);
  const safeAttendance = MOCK_SUBJECTS.filter(s => (s.attendedClasses / s.totalClasses) >= 0.75);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur border border-gray-100 p-2 rounded-lg shadow-lg text-xs">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-attendly-aqua">{payload[0].value}% Attendance</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-attendly-slate">Hello, {MOCK_USER.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 mt-1">Here's your attendance overview for today.</p>
        </div>
        <Link to="/mark" className="bg-attendly-aqua text-white px-6 py-3 rounded-xl shadow-lg shadow-attendly-aqua/20 hover:bg-[#3d7a8b] transition-colors flex items-center gap-2 font-medium">
          Mark Attendance <ChevronRight size={18} />
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Attendance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <h3 className="text-gray-500 font-medium text-sm absolute top-6 left-6">Overall Attendance</h3>
          <div className="w-48 h-48 relative mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                    cornerRadius={10}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-4xl font-bold text-attendly-slate">{overallPercentage}%</span>
               <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Average</span>
             </div>
          </div>
        </motion.div>

        {/* Subject Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-gray-500 font-medium text-sm mb-6">Subject Performance</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SUBJECTS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{fontSize: 10, fill: '#9CA3AF'}} axisLine={false} tickLine={false} interval={0} tickFormatter={(val) => val.split(' ').map((w:string) => w[0]).join('')} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar 
                  dataKey="attendedClasses" 
                  fill="#4A90A4" 
                  radius={[4, 4, 4, 4]} 
                  barSize={30}
                  animationDuration={1500}
                >
                   {MOCK_SUBJECTS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recommendations & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Smart Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-attendly-mint/20 rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-attendly-peach/20 p-2 rounded-lg text-attendly-slate">
               <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-attendly-slate">Smart Insights</h3>
          </div>

          <div className="space-y-3">
            {lowAttendance.length > 0 ? (
              lowAttendance.map(sub => {
                const needed = Math.ceil((0.75 * sub.totalClasses - sub.attendedClasses) / 0.25); 
                // Rough formula for prediction
                return (
                  <div key={sub.id} className="flex items-start gap-3 bg-white/60 p-3 rounded-xl border border-white">
                    <AlertTriangle size={18} className="text-attendly-red shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-gray-700 font-medium">Risk in {sub.name}</p>
                      <p className="text-gray-500 text-xs mt-1">Attend <strong className="text-attendly-slate">{needed > 0 ? needed + 2 : 2} more classes</strong> to reach 75%.</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-white">
                 <CheckCircle2 size={18} className="text-attendly-green shrink-0" />
                 <p className="text-sm text-gray-700">You are safe in all subjects! Keep it up.</p>
              </div>
            )}
            
            {safeAttendance.slice(0, 1).map(sub => (
               <div key={sub.id} className="flex items-start gap-3 bg-white/60 p-3 rounded-xl border border-white">
                  <CheckCircle2 size={18} className="text-attendly-green shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-gray-700 font-medium">Doing great in {sub.name}</p>
                    <p className="text-gray-500 text-xs mt-1">Current attendance is {Math.round((sub.attendedClasses/sub.totalClasses)*100)}%.</p>
                  </div>
                </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity / Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
           <h3 className="text-gray-500 font-medium text-sm mb-4">Quick Stats</h3>
           <div className="space-y-4">
             <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-attendly-aqua/10 flex items-center justify-center text-attendly-aqua font-bold">7</div>
                 <div>
                   <p className="text-sm font-semibold text-attendly-slate">Day Streak</p>
                   <p className="text-xs text-gray-400">Personal Best</p>
                 </div>
               </div>
               <div className="text-attendly-peach group-hover:translate-x-1 transition-transform">★</div>
             </div>

             <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-attendly-green/20 flex items-center justify-center text-[#5A9A8E] font-bold">
                    {attendedClasses}
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-attendly-slate">Classes Attended</p>
                   <p className="text-xs text-gray-400">Total this semester</p>
                 </div>
               </div>
             </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;