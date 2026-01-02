"use client";
import React from 'react'
import { motion } from 'framer-motion';
import FeaturedJobs from '@/components/FeaturedJobs/FeaturedJobs';
import HeroSection from '@/components/HeroSection/HeroSection'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link';

import { FaSearch, FaTasks, FaRegSmile, FaRocket, FaUserShield, FaChartLine } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-[#0B1120] overflow-hidden">
      <HeroSection />
      <FeaturedJobs />

      <section className="py-20 px-6 md:px-20 relative">
        <div className="glow-mesh opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black tracking-tight mb-3"
            >
              Why Engineers Choose <span className="text-indigo-400">HireVia</span>
            </motion.h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
              A high-performance aggregator engineered for the modern job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaSearch />, title: "Unified Dashboard", desc: "Native integration with LinkedIn, Naukri, and Internshala." },
              { icon: <FaTasks />, title: "Pipeline Tracking", desc: "Manage applications with a high-density professional tracker." },
              { icon: <FaRegSmile />, title: "Match Intelligence", desc: "Proprietary stack matching for senior engineering roles." },
              { icon: <FaRocket />, title: "Real-time Sync", desc: "Low-latency data synchronization across all top job boards." },
              { icon: <FaUserShield />, title: "Secure Protocol", desc: "Enterprise-grade encryption for your professional data." },
              { icon: <FaChartLine />, title: "Market Insights", desc: "Actionable analytics to optimize your conversion rates." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass-card p-8 rounded-2xl space-y-4 hover:bg-white/[0.04] transition-all border border-white/5"
              >
                <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center text-indigo-400 text-xl border border-indigo-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-indigo-600 rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/10 border border-white/10"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] rounded-full -mr-24 -mt-24" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[80px] rounded-full -ml-24 -mb-24" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                Ready to optimize your <br className="hidden md:block" /> professional trajectory?
              </h3>
              <p className="text-indigo-100 text-sm md:text-base max-w-xl mx-auto font-medium opacity-90">
                Join a network of high-performance engineers landing roles at elite tech firms.
              </p>
              <div className="pt-4">
                <Link href="/jobs">
                  <button className="bg-white text-indigo-600 font-black px-10 py-3.5 rounded-lg hover:bg-slate-50 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest">
                    Build Your Career
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home
