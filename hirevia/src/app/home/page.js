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
    <div className="min-h-screen overflow-hidden bg-[#F8F9FC]">
      <HeroSection />
      <FeaturedJobs />

      <section className="py-20 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black tracking-tight mb-4 text-slate-900"
            >
              Why Professionals Choose <span className="text-slate-900">HireVia</span>
            </motion.h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
              A unified platform designed to streamline your job search across multiple networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaSearch />, title: "Unified Search", desc: "Seamless integration with LinkedIn, Naukri, and Internshala." },
              { icon: <FaTasks />, title: "Application Tracker", desc: "Organize and track your applications in one professional dashboard." },
              { icon: <FaRegSmile />, title: "Smart Matching", desc: "Intelligent role recommendations based on your technical profile." },
              { icon: <FaRocket />, title: "Real-time Updates", desc: "Instant synchronization with major job platforms." },
              { icon: <FaUserShield />, title: "Data Privacy", desc: "Your professional data is encrypted and secure." },
              { icon: <FaChartLine />, title: "Market Insights", desc: "Analytics to help you understand market trends." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 bg-white rounded-xl border border-slate-200 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-700 text-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
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
            className="bg-slate-900 rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-slate-900/10"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full -mr-24 -mt-24" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Ready to advance your <br className="hidden md:block" /> professional career?
              </h3>
              <p className="text-slate-300 text-base max-w-lg mx-auto opacity-90">
                Join thousands of professionals finding their next role with HireVia.
              </p>
              <div className="pt-4">
                <Link href="/jobs">
                  <button className="bg-white text-slate-900 font-black px-10 py-3.5 rounded-lg hover:bg-slate-100 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest">
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
