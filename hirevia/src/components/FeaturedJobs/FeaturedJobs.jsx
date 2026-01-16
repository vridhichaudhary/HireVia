import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '@/api/axios';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/jobs?limit=3&industry=Software Development`);
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
        setLoading(false);
      }
    };
    fetchFeaturedJobs();
  }, []);

  const router = useRouter();

  const handleTrack = async (job) => {
    try {
      await API.post("/applications", { jobId: job.id });
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, applied: true } : j));
    } catch (error) {
      if (error.response?.status === 401) {
        router.push('/auth-success'); // Redirect to login
      } else {
        console.error("Tracking failed:", error);
        alert(error.response?.data?.message || "Tracking failed");
      }
    }
  };

  if (loading) {
    return (
      <section className="bg-[#0B1120] text-white py-20 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-slate-400 font-bold animate-pulse">Loading Featured Opportunities...</div>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) return null;

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

          <Link href="/jobs">
            <button className="px-5 py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 hover:text-white transition-all">
              View All Openings
            </button>
          </Link>
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
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Est. Salary</span>
                  <p className="text-base font-black text-white">{job.salary || 'Competitive'}</p>
                </div>

                <button
                  onClick={() => handleTrack(job)}
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
