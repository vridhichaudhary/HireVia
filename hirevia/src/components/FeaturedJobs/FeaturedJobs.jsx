"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addTrackedJob } from '@/utils/localStorageUtils';

const initialJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Bangalore, India',
    type: 'Full Time',
    remote: true,
    posted: '01/05/2025',
    platform: 'LinkedIn',
    salary: '₹8,00,000 - ₹12,00,000',
    applied: false,
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Mumbai, India',
    type: 'Full Time',
    remote: false,
    posted: '02/05/2025',
    platform: 'Naukri',
    salary: '₹12,00,000 - ₹18,00,000',
    applied: false,
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'CreativeMinds',
    location: 'Delhi, India',
    type: 'Internship',
    remote: true,
    posted: '03/05/2025',
    platform: 'Internshala',
    salary: '₹15,000 - ₹25,000',
    applied: false,
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'InnovationTech',
    location: 'Hyderabad, India',
    type: 'Full Time',
    remote: true,
    posted: '04/05/2025',
    platform: 'LinkedIn',
    salary: '₹15,00,000 - ₹22,00,000',
    applied: false,
  }
];

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState(initialJobs);

  const handleTrack = (jobId) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        const jobWithStatus = { ...job, appliedDate: new Date().toLocaleDateString(), status: 'Applied' };
        addTrackedJob(jobWithStatus);
        return { ...job, applied: true };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  return (
    <section className="bg-[#0B1120] text-white py-20 px-6 md:px-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <h2 className="text-3xl font-black tracking-tight">Featured <span className="text-indigo-400">Opportunities</span></h2>
            <p className="text-slate-400 text-sm font-medium">Curated roles from vetted technology partners.</p>
          </motion.div>

          <button className="px-5 py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 hover:text-white transition-all">
            View All Openings
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group h-full relative border border-white/5"
            >
              <div className="absolute top-6 right-6">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${job.platform === 'LinkedIn' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    job.platform === 'Naukri' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                  {job.platform}
                </span>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 font-bold text-lg border border-white/5">
                    {job.company[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{job.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {job.location}
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-md text-[10px] font-black uppercase tracking-wide">
                      Remote
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Est. Salary</span>
                  <p className="text-base font-black text-white">{job.salary}</p>
                </div>

                <button
                  onClick={() => handleTrack(job.id)}
                  disabled={job.applied}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${job.applied
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/10'
                    }`}
                >
                  {job.applied ? 'Tracking' : 'Quick Track'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
