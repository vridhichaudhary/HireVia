"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-40 pb-32 px-6 md:px-20 min-h-[85vh] flex items-center bg-[#F8F9FC]">
      {/* Background Gradients - Subtle for Light Theme */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -mr-80 -mt-80 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-[100px] -ml-40 -mb-40"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-left space-y-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600"></span>
            </span>
            The Operating System for Careers
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Built for <br />
            <span className="text-slate-900">
              Top-Tier Talent.
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            Consolidate your search, track applications, and optimize your technical profile with institutional logic—all in one professional dashboard.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link href="/jobs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-slate-900 text-white text-[12px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-200">
                Explore Marketplace
              </button>
            </Link>
            <Link href="/tracker" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 text-[12px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                Access Pipeline
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side Visual/Abstract - Dark Card to contrast light bg */}
        <motion.div
          initial={{ opacity: 0, opacity: 0 }}
          animate={{ opacity: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl skew-y-1 transform hover:skew-y-0 transition-transform duration-700">
            {/* Abstract UI representation */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <div className="h-2 w-20 bg-slate-800 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="h-24 bg-slate-800 rounded-xl w-full border border-slate-700/50"></div>
                <div className="h-24 bg-slate-800/60 rounded-xl w-full border border-slate-700/30"></div>
                <div className="h-24 bg-slate-800/40 rounded-xl w-full border border-slate-700/10"></div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
