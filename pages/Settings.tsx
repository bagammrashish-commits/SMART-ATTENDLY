import React from 'react';
import { Bell, Moon, Shield, User, ChevronRight, LogOut } from 'lucide-react';
import { MOCK_USER } from '../constants';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
       <h1 className="text-2xl font-bold text-attendly-slate">Settings</h1>

       {/* Profile Section */}
       <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <img src={MOCK_USER.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          <div className="flex-1">
              <h3 className="text-lg font-bold text-attendly-slate">{MOCK_USER.name}</h3>
              <p className="text-gray-500 text-sm">{MOCK_USER.email}</p>
          </div>
          <button className="text-attendly-aqua font-medium text-sm">Edit</button>
       </div>

       {/* Options */}
       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-100">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><Bell size={18} /></div>
                 <span className="text-gray-700 font-medium">Notifications</span>
             </div>
             <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-400">On</span>
                 <ChevronRight size={18} className="text-gray-300" />
             </div>
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-100">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center"><Moon size={18} /></div>
                 <span className="text-gray-700 font-medium">Dark Mode</span>
             </div>
             <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                 <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
             </div>
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center"><Shield size={18} /></div>
                 <span className="text-gray-700 font-medium">Privacy & Security</span>
             </div>
             <ChevronRight size={18} className="text-gray-300" />
          </div>
       </div>

       <div className="flex justify-center pt-4">
           <button className="text-attendly-red flex items-center gap-2 font-medium hover:opacity-80">
               <LogOut size={18} /> Sign Out
           </button>
       </div>
    </div>
  );
};

export default Settings;