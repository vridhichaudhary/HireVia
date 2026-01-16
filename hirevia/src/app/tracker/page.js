"use client";
import React, { useEffect, useState } from 'react';
import {
  FaBriefcase,
  FaChevronDown,
  FaTrash,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaExternalLinkAlt,
  FaCheckCircle
} from "react-icons/fa";
import Link from 'next/link';
import API from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  { label: "Applied", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  { label: "Interviewing", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  { label: "Offer", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { label: "Rejected", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" }
];

const StatusDropdown = ({ currentStatus, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeStage = STAGES.find(s => s.label === currentStatus) || STAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${activeStage.bg} ${activeStage.color} ${activeStage.border} hover:shadow-sm active:scale-95`}
      >
        {activeStage.label}
        <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-2 overflow-hidden"
            >
              {STAGES.map((stage) => (
                <button
                  key={stage.label}
                  onClick={() => {
                    onUpdate(stage.label);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide transition-colors hover:bg-slate-50 ${currentStatus === stage.label ? stage.color : 'text-slate-600'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full ${stage.label === 'Applied' ? 'bg-blue-400' :
                    stage.label === 'Pending' ? 'bg-amber-400' :
                      stage.label === 'Interviewing' ? 'bg-purple-400' :
                        stage.label === 'Offer' ? 'bg-emerald-400' : 'bg-rose-400'
                    }`} />
                  {stage.label}
                  {currentStatus === stage.label && <FaCheckCircle className="ml-auto text-current opacity-50" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

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
    if (!confirm("Remove this application from your tracker?")) return;
    try {
      await API.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error removing application:", err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse">Synchronizing Pipeline</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center p-6 bg-grid-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full dashboard-card p-10 text-center space-y-8 bg-white rounded-[2rem]"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 text-3xl border border-slate-100 shadow-inner">
            <FaBriefcase />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Access Restricted</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Log in to sync your professional pipeline across all your devices and manage your career growth.
            </p>
          </div>
          <Link href="/auth-success" className="block">
            <button className="w-full bg-black text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-800 active:scale-[0.98] shadow-2xl shadow-slate-200">
              Login via Gateway
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] pt-28 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">
              Professional Dashboard
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Application <span className="text-blue-600">Pipeline</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              You have <span className="text-slate-900 font-bold">{applications.length} active signals</span> in your acquisition funnel.
            </p>
          </div>

          <Link href="/jobs">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              Explore Marketplace <FaExternalLinkAlt size={10} />
            </button>
          </Link>
        </header>

        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-16 md:p-24 text-center space-y-8 border border-slate-100 shadow-sm"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200 text-4xl border border-slate-100 shadow-inner">
              <FaBriefcase />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pipeline Empty</h3>
              <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto leading-relaxed">
                Your career signals are currently flat. Visit the marketplace to initialize your search and track opportunities.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/jobs">
                <button className="bg-black text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 leading-none">
                  Open Job Marketplace
                </button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            <div className="grid grid-cols-12 px-8 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <div className="col-span-12 lg:col-span-5">Job & Company</div>
              <div className="hidden lg:block lg:col-span-3">Status & Analytics</div>
              <div className="hidden lg:block lg:col-span-2">Applied Date</div>
              <div className="hidden lg:block lg:col-span-2 text-right">Settings</div>
            </div>

            <div className="space-y-3">
              {applications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white p-6 md:px-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all grid grid-cols-1 md:grid-cols-12 items-center gap-6"
                >
                  {/* Job Info */}
                  <div className="col-span-1 md:col-span-5 flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 font-black text-xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      {app.job.company?.[0] || 'J'}
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1 capitalize">
                        {app.job.title}
                      </h4>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold uppercase tracking-tight">
                        <span className="flex items-center gap-1.5"><FaBuilding size={10} className="text-slate-300" /> {app.job.company}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1.5"><FaMapMarkerAlt size={10} className="text-slate-300" /> {app.job.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="col-span-1 md:col-span-3 flex items-center gap-4">
                    <StatusDropdown
                      currentStatus={app.status}
                      onUpdate={(s) => updateStatus(app.id, s)}
                    />
                  </div>

                  {/* Applied Date */}
                  <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-tight">
                    <FaClock className="text-slate-300" />
                    {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3">
                    {app.job.applyUrl && (
                      <a
                        href={app.job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                        title="View Original Post"
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                    <button
                      onClick={() => removeApplication(app.id)}
                      className="p-3 text-slate-400 hover:text-rose-600 bg-slate-50 rounded-xl border border-slate-100 hover:border-rose-100 hover:bg-rose-50 transition-all"
                      title="Delete Application"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationTracker;
