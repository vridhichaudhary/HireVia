"use client";
import { FaBriefcase, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import API from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

const STAGES = ["Applied", "Interviewing", "Offer", "Rejected"];

const ApplicationTracker = () => {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchApplications();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}`, { status });
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const removeApplication = async (id) => {
    try {
      await API.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error removing application:", err);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-background text-slate-500 flex items-center justify-center uppercase font-bold tracking-widest text-xs">Synchronizing Pipeline...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold uppercase mb-4 tracking-tight">Access Restricted</h2>
        <p className="text-slate-500 uppercase text-xs font-semibold mb-8 tracking-widest">Please login to access your professional pipeline</p>
        <Link href="/auth-success">
          <button className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">Login via Gateway</button>
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-background min-h-screen text-white pt-28 pb-20 px-6 md:px-20 relative overflow-hidden">
      <div className="glow-mesh opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 uppercase">
            Application <span className="text-blue-400">Pipeline</span>
          </h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            Manage your professional acquisition funnel
          </p>
        </header>

        {applications.length === 0 ? (
          <div className="glass-card rounded-2xl py-20 flex flex-col items-center text-center space-y-6 border border-white/5">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-slate-700 text-2xl border border-white/5">
              <FaBriefcase />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold uppercase tracking-tight text-slate-400">Pipeline Empty</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto">
                No active signals detected. Initialize your search in the marketplace.
              </p>
            </div>
            <Link href="/jobs">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all">
                Access Marketplace
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {STAGES.map((stage) => (
              <div key={stage} className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${stage === 'Applied' ? 'bg-slate-500' :
                    stage === 'Interviewing' ? 'bg-blue-400' :
                      stage === 'Offer' ? 'bg-emerald-400' : 'bg-red-400'
                    }`} />
                  {stage} ({applications.filter(a => a.status === stage).length})
                </h3>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {applications.filter(a => a.status === stage).map((app) => (
                    <div
                      key={app.id}
                      className="glass-card p-6 rounded-2xl border border-white/5 relative group h-full flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-tight">
                            {app.job.title}
                          </h3>
                          <p className="text-blue-200 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                            {app.job.company}
                          </p>
                        </div>
                        <button
                          onClick={() => removeApplication(app.id)}
                          className="text-slate-700 hover:text-red-500 transition-colors text-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {app.job.location}
                        </span>
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {app.job.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Shift Stage:</span>
                        <div className="flex gap-1">
                          {STAGES.filter(s => s !== stage).map(s => (
                            <button
                              key={s}
                              onClick={() => updateStatus(app.id, s)}
                              className="px-2 py-1 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded text-[8px] font-bold uppercase tracking-tighter text-slate-400 transition-all"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
