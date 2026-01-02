"use client";
import { FaBriefcase } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { getTrackedJobs, removeTrackedJob } from '@/utils/localStorageUtils';

const ApplicationTracker = () => {
  const [trackedJobs, setTrackedJobs] = useState([]);

  useEffect(() => {
    setTrackedJobs(getTrackedJobs());
  }, []);

  const removeJob = (id) => {
    const updatedJobs = removeTrackedJob(id);
    setTrackedJobs(updatedJobs);
  };

  return (
    <section className="bg-[#0B1120] min-h-screen text-white pt-28 pb-20 px-6 md:px-20 relative overflow-hidden">
      <div className="glow-mesh opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12">
          <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Application <span className="text-indigo-400">Pipeline</span></h2>
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Manage your professional acquisition funnel</p>
        </header>

        {trackedJobs.length === 0 ? (
          <div className="glass-card rounded-2xl py-20 flex flex-col items-center text-center space-y-6 border-dashed border-slate-700">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 text-2xl border border-white/5">
              <FaBriefcase />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-300">Pipeline Empty</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">
                Initialize your search by tracking premium opportunities from the marketplace.
              </p>
            </div>
            <Link href="/jobs">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all">
                Access Marketplace
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trackedJobs.map((job) => (
              <div
                key={job.id}
                className="glass-card p-6 rounded-2xl border border-white/5 relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-tight">{job.title}</h3>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{job.company}</p>
                  </div>
                  <span className="pro-badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Live
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {job.location}
                  </span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[9px] font-black uppercase tracking-widest">
                      Remote
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">
                  <span>Est. Yield: <span className="text-white">{job.salary}</span></span>
                  <span>Status: <span className="text-indigo-400">Tracked</span></span>
                </div>

                <button
                  className="w-full bg-slate-800/50 hover:bg-red-950/30 border border-slate-700/50 hover:border-red-500/30 text-slate-400 hover:text-red-400 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                  onClick={() => removeJob(job.id)}
                >
                  Decommission Entry
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default ApplicationTracker;
