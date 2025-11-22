import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, History, MessageSquare, Users } from 'lucide-react';
import { MOCK_SUBJECTS, MOCK_NOTIFICATIONS } from '../constants';

const TeacherMessages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [history, setHistory] = useState(MOCK_NOTIFICATIONS.filter(n => n.sender));
  
  const [formData, setFormData] = useState({
    targetClass: '',
    title: '',
    message: '',
    priority: 'info' as 'info' | 'warning' | 'alert'
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
        id: Math.random().toString(),
        title: formData.title,
        message: formData.message,
        type: formData.priority,
        time: 'Just now',
        sender: 'You'
    };
    
    setHistory([newMessage, ...history]);
    setShowSuccess(true);
    setFormData({ targetClass: '', title: '', message: '', priority: 'info' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-attendly-slate">Student Messaging</h1>
                <p className="text-gray-500 text-sm">Send announcements and alerts to your classes.</p>
            </div>
            
            <div className="flex p-1 bg-white rounded-xl border border-gray-100 shadow-sm">
                <button 
                    onClick={() => setActiveTab('compose')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'compose' ? 'bg-attendly-aqua text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    Compose
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-attendly-aqua text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    History
                </button>
            </div>
        </div>

        {activeTab === 'compose' && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 text-attendly-slate">
                        <div className="w-10 h-10 rounded-full bg-attendly-mint flex items-center justify-center text-attendly-aqua">
                            <MessageSquare size={20} />
                        </div>
                        <h3 className="font-bold text-lg">New Announcement</h3>
                    </div>

                    <form onSubmit={handleSend} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Select Class</label>
                                <div className="relative">
                                    <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-attendly-aqua focus:ring-4 focus:ring-attendly-aqua/10 transition-all appearance-none"
                                        value={formData.targetClass}
                                        onChange={e => setFormData({...formData, targetClass: e.target.value})}
                                    >
                                        <option value="">Choose a class...</option>
                                        {MOCK_SUBJECTS.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.batch})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Priority Level</label>
                                <div className="flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, priority: 'info'})}
                                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${formData.priority === 'info' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-500'}`}
                                    >
                                        Info
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, priority: 'warning'})}
                                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${formData.priority === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-white border-gray-200 text-gray-500'}`}
                                    >
                                        Warning
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, priority: 'alert'})}
                                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${formData.priority === 'alert' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-500'}`}
                                    >
                                        Alert
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <input 
                                type="text" 
                                required
                                placeholder="e.g. Class Cancelled Tomorrow"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua focus:ring-4 focus:ring-attendly-aqua/10 transition-all"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <textarea 
                                required
                                rows={5}
                                placeholder="Write your message here..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-attendly-aqua focus:ring-4 focus:ring-attendly-aqua/10 transition-all resize-none"
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                             {showSuccess ? (
                                 <span className="text-green-600 flex items-center gap-2 font-medium animate-pulse">
                                     <CheckCircle size={18} /> Message Sent Successfully!
                                 </span>
                             ) : <span />}

                            <button 
                                type="submit" 
                                className="bg-attendly-slate text-white px-8 py-3 rounded-xl shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 font-medium"
                            >
                                Send Message <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        )}

        {activeTab === 'history' && (
             <div className="space-y-4">
                 {history.length > 0 ? (
                     history.map((msg, idx) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                                ${msg.type === 'alert' ? 'bg-red-50 text-red-500' : msg.type === 'warning' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}
                            `}>
                                <History size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-attendly-slate">{msg.title}</h4>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{msg.time}</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{msg.message}</p>
                                <div className="mt-3 flex items-center gap-2">
                                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded 
                                        ${msg.type === 'alert' ? 'bg-red-100 text-red-600' : msg.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}
                                     `}>
                                         {msg.type}
                                     </span>
                                     <span className="text-xs text-gray-400">• Sent to CS-A</span>
                                </div>
                            </div>
                        </motion.div>
                     ))
                 ) : (
                     <div className="text-center py-20 text-gray-400">
                         <History size={48} className="mx-auto mb-4 opacity-20" />
                         <p>No messages sent yet.</p>
                     </div>
                 )}
             </div>
        )}
    </div>
  );
};

export default TeacherMessages;