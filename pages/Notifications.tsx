import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Info, MessageCircle } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';

const Notifications: React.FC = () => {
  return (
    <div className="space-y-6 pb-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-attendly-slate">Notifications</h1>
          <p className="text-gray-500 text-sm">Updates, alerts and messages from faculty.</p>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 text-attendly-aqua relative">
           <Bell size={20} />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notif, index) => {
           let Icon = Info;
           let colorClass = "bg-blue-50 text-blue-500 border-blue-100";
           
           if (notif.type === 'warning') {
              Icon = AlertTriangle;
              colorClass = "bg-yellow-50 text-yellow-600 border-yellow-100";
           } else if (notif.type === 'success') {
              Icon = CheckCircle;
              colorClass = "bg-green-50 text-green-600 border-green-100";
           } else if (notif.type === 'alert') {
              Icon = MessageCircle;
              colorClass = "bg-red-50 text-red-500 border-red-100";
           }

           return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-4 relative overflow-hidden group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${colorClass}`}>
                 <Icon size={22} strokeWidth={2} />
              </div>
              
              <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h3 className="font-bold text-attendly-slate text-base mb-1">{notif.title}</h3>
                    <span className="text-xs text-gray-400 font-medium">{notif.time}</span>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed">{notif.message}</p>
                 {notif.sender && (
                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-attendly-aqua bg-attendly-aqua/5 px-2 py-1 rounded inline-block">
                       <span>From: {notif.sender}</span>
                    </div>
                 )}
              </div>

              {/* Decorative side strip */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClass.split(' ')[0].replace('bg-', 'bg-opacity-50 bg-')}`} />
            </motion.div>
           );
        })}
      </div>

      <div className="text-center mt-8">
          <button className="text-gray-400 text-sm hover:text-attendly-slate transition-colors">
              View Older Notifications
          </button>
      </div>
    </div>
  );
};

export default Notifications;