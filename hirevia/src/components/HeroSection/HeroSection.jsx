"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-20 px-6 md:px-20 min-h-[60vh] flex items-center">
      {/* Background Mesh Glow */}
      <div className="glow-mesh" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Live Aggregator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight"
          >
            The Smarter Way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
              Land Your Next Role
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 text-base md:text-lg mt-6 font-medium leading-relaxed max-w-lg"
          >
            Aggregating premium opportunities from LinkedIn, Naukri, and Internshala.
            AI-driven matching tailored for the next generation of engineers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full"
          >
            <Link href="/jobs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/20">
                Explore All Jobs
              </button>
            </Link>
            <Link href="/tracker" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-slate-800/50 border border-slate-700/50 text-slate-200 font-bold px-8 py-3.5 rounded-lg hover:bg-slate-800 transition-all">
                Track Applications
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-10 flex items-center gap-4 py-4 border-t border-slate-800/50"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1120] bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Join 500+ professionals</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block relative"
        >
          <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] rounded-full" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/girl_img.png"
              alt="Hiring"
              width={500}
              height={500}
              className="relative z-10 drop-shadow-2xl brightness-95"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
