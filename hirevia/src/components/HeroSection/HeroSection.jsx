"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 px-6 md:px-20 min-h-[70vh] flex items-center justify-center">
      {/* Background Mesh Glow */}
      <div className="glow-mesh opacity-40" />

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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            Live Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight"
          >
            Streamline Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Professional Search
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            A high-performance aggregator for elite engineers. Access curated roles
            from global platforms through a single, unified interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/jobs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest px-10 py-4 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-600/10">
                Explore Roles
              </button>
            </Link>
            <Link href="/tracker" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-slate-800/40 border border-slate-700/50 text-slate-300 text-[11px] font-black uppercase tracking-widest px-10 py-4 rounded-lg hover:bg-slate-800/60 transition-all">
                Active Pipeline
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
