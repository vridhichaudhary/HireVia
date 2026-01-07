"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-6 md:px-20 min-h-[70vh] flex items-center justify-center bg-[#F8F9FC]">

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            Real-time Updates
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight"
          >
            Streamline Your <br />
            <span className="text-blue-600">
              Job Search
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            A unified platform for professionals. Access curated roles
            from global networks through a single, intuitive interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/jobs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest px-10 py-4 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-900/10">
                Find Jobs
              </button>
            </Link>
            <Link href="/tracker" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-[11px] font-bold uppercase tracking-widest px-10 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                Track Applications
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
