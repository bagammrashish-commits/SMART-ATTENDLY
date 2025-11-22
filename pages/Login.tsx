import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, GraduationCap, Briefcase, User } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F7F8FA]">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-attendly-aqua/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-attendly-peach/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 mx-4"
      >
        {/* Glass Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-attendly-aqua/10 rounded-3xl p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-attendly-aqua to-attendly-green rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-attendly-aqua/30">
              <span className="text-3xl text-white font-bold">A</span>
            </div>
            <h2 className="text-3xl font-bold text-attendly-slate mb-2">Welcome Back</h2>
            <p className="text-gray-500">Track Better. Attend Smarter.</p>
          </div>

          {/* Role Toggle */}
          <div className="bg-white/50 p-1 rounded-xl flex mb-8 border border-gray-200/50 relative">
            <div 
              className="absolute top-1 bottom-1 bg-white shadow-sm rounded-lg transition-all duration-300 ease-in-out"
              style={{ 
                left: role === 'student' ? '4px' : '50%', 
                width: 'calc(50% - 4px)' 
              }} 
            />
            <button 
              type="button"
              onClick={() => setRole('student')}
              className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${role === 'student' ? 'text-attendly-slate' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <GraduationCap size={18} /> Student
            </button>
            <button 
              type="button"
              onClick={() => setRole('teacher')}
              className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${role === 'teacher' ? 'text-attendly-slate' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Briefcase size={18} /> Teacher
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-attendly-aqua transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-attendly-aqua/50 focus:ring-4 focus:ring-attendly-aqua/10 transition-all"
                  placeholder={role === 'student' ? "Student Name" : "Faculty Name"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 ml-1">College Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-attendly-aqua transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-attendly-aqua/50 focus:ring-4 focus:ring-attendly-aqua/10 transition-all"
                  placeholder={role === 'student' ? "student@college.edu" : "faculty@college.edu"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-attendly-aqua transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-attendly-aqua/50 focus:ring-4 focus:ring-attendly-aqua/10 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-xs font-medium text-attendly-aqua hover:underline">Forgot Password?</a>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-attendly-slate hover:bg-gray-800 text-white font-medium py-4 rounded-xl shadow-xl shadow-gray-900/10 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account? <span className="text-attendly-aqua font-medium cursor-pointer">Contact Admin</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;