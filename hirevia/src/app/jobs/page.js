"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FaSearch, FaMapMarkerAlt, FaBookmark, FaHeart, FaTimes, FaBriefcase, FaBuilding, FaDollarSign, FaExternalLinkAlt, FaChevronCircleDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/api/axios";

const JobDetailsDrawer = ({ job, onClose }) => {
  if (!job) return null;

  const handleApply = async (e) => {
    e.stopPropagation();

    // Attempt to track in backend
    try {
      await API.post("/applications", { jobId: job.id });
    } catch (error) {
      console.error("Auto-tracking failed:", error);
    }

    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Internal flow or fallback
      alert("Application successfully submitted!");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {job && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col border-l border-slate-200"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
                <div className="h-4 w-[1px] bg-slate-200" />
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-[2px]">Job Details</h2>
              </div>
              <button
                onClick={handleApply}
                className="px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-black rounded-xl text-[11px] uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                {job.applyUrl ? 'Apply Now' : 'Quick Apply'}
                <FaExternalLinkAlt size={10} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
              {/* Title & Stats */}
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-900 text-3xl shadow-sm">
                    {job.company?.[0] || job.title[0]}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-slate-500">
                      <span className="flex items-center gap-1.5 text-blue-600"><FaBuilding className="text-blue-200" /> {job.company}</span>
                      <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-slate-300" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><FaBriefcase className="text-slate-300" /> {job.type}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Salary</p>
                    <p className="text-lg font-black text-slate-900">{job.salary || 'Competitive'}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seniority Level</p>
                    <p className="text-lg font-black text-slate-900">{job.seniority || 'Mid-Level'}</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              {job.techStack && (
                <div>
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] mb-6 flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-blue-600" /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {job.techStack.split(',').map((tech, i) => (
                      <span key={i} className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[12px] font-black text-slate-700 hover:border-blue-300 transition-all cursor-default shadow-sm uppercase tracking-tight">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-6">
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] flex items-center gap-3">
                  <div className="h-1 w-1 rounded-full bg-blue-600" /> About the Role
                </h4>
                <div
                  className="text-slate-600 leading-[1.8] text-base space-y-6 prose prose-slate max-w-none font-medium"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-blue-600" /> Key Requirements
                  </h4>
                  <div className="text-slate-600 leading-relaxed text-base whitespace-pre-line p-8 bg-blue-50/30 rounded-3xl border border-blue-100/50 font-medium italic">
                    {job.requirements}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between gap-6">
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Posted Via</p>
                  <p className="text-sm font-black text-slate-900">{job.platform || 'HireVia Direct'}</p>
                </div>
                <button
                  onClick={handleApply}
                  className="px-12 py-4 bg-black hover:bg-slate-800 text-white font-black rounded-2xl text-sm uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                >
                  Apply Now
                  <FaExternalLinkAlt size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Real Filters
  const [industry, setIndustry] = useState("");
  const [seniority, setSeniority] = useState([]);
  const [techStack, setTechStack] = useState("");

  const [popularJobs, setPopularJobs] = useState([]);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        search: searchQuery,
        industry,
        techStack
      });

      // Add each seniority item as a separate parameter for prisma.in support
      seniority.forEach(s => params.append('seniority', s));

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/jobs?${params.toString()}`);

      const { jobs: fetchedJobs, pagination: pg } = response.data;
      setJobs(fetchedJobs);
      setPagination(pg);

      // Update popular jobs only on first load if empty
      if (popularJobs.length === 0) {
        setPopularJobs(fetchedJobs.slice(0, 5));
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, industry, seniority, techStack]); // Refetch on filter change or page change

  // Separate effect for search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset page on search
      fetchJobs();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleSeniority = (level) => {
    setPage(1); // Reset to page 1 on filter change
    if (seniority.includes(level)) {
      setSeniority(seniority.filter(s => s !== level));
    } else {
      setSeniority([...seniority, level]);
    }
  };

  // Helper to safely get company name
  function companyName(job) {
    return job.company || "Unknown Company";
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#F8F9FC]">
        <div className="text-slate-400 font-bold animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[#F8F9FC]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT SIDEBAR - FILTERS */}
        <div className="hidden lg:block lg:col-span-3 space-y-8">
          {/* Filters Header */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 sticky top-28 shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-900">Filters</h3>
              <button
                onClick={() => { setIndustry(""); setSeniority([]); setTechStack(""); setPage(1); }}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
              >
                Clear All
              </button>
            </div>

            {/* Industry */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Industry</label>
              <select
                value={industry}
                onChange={(e) => { setIndustry(e.target.value); setPage(1); }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="">All Industries</option>
                <option value="Software Development">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="AI / ML">AI / ML</option>
              </select>
            </div>

            {/* Seniority */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">Seniority</label>
              <div className="space-y-3">
                {["Junior", "Mid", "Senior", "Lead", "Principal"].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${seniority.includes(level) ? "bg-slate-900 border-slate-900" : "border-slate-300 bg-white group-hover:border-slate-400"}`}>
                      {seniority.includes(level) && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{level}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={seniority.includes(level)}
                      onChange={() => toggleSeniority(level)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">Tech Stack</label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="e.g. React, Python..."
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CENTER CONTENT - FEED */}
        <div className="lg:col-span-6 space-y-12">
          {/* Header / Search */}
          <div className="p-2 bg-white border border-slate-200/60 backdrop-blur-xl rounded-2xl sticky top-28 z-30 shadow-lg shadow-slate-200/40">
            <div className="flex items-center gap-4 px-4 py-2">
              <FaSearch className="text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search by job title, company, or keywords..."
                className="w-full text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Popular Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-end px-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Featured Opportunities</h2>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x pt-2">
              {popularJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="min-w-[300px] bg-white p-6 rounded-[1.5rem] flex flex-col gap-6 snap-start hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-slate-200 cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center font-black text-slate-900 text-xl shadow-sm">
                      {companyName(job)[0]}
                    </div>
                    <button className="text-slate-300 hover:text-black transition"><FaBookmark /></button>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{companyName(job)}</p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-slate-50">
                    <span className="px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      {job.type || 'Full Time'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                      className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-[10px] font-black rounded-xl transition-all shadow-md active:scale-95"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Now Hiring Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Postings</h2>
              <span className="text-sm font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">{pagination.totalCount || 0} results</span>
            </div>

            <div className="space-y-5">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white p-7 rounded-[1.5rem] border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group cursor-pointer relative"
                >
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex-shrink-0 flex items-center justify-center font-black text-slate-700 text-xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                      {companyName(job)[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-black text-lg text-slate-900 group-hover:text-blue-700 transition-colors truncate pr-8">{job.title}</h3>
                          <p className="text-sm font-bold text-slate-500">{companyName(job)}</p>
                        </div>
                        {/* Status / Date or Bookmark */}
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 px-2 py-1 rounded-md">{job.type}</span>
                      </div>

                      <div className="flex items-center gap-5 text-xs text-slate-500 font-bold mt-4 mb-5">
                        <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-slate-300" /> {job.location}</span>
                        {job.salary && (
                          <span className="flex items-center gap-2"><FaDollarSign className="text-slate-300" /> {job.salary}</span>
                        )}
                        <span className="flex items-center gap-2"><FaBriefcase className="text-slate-300" /> {job.seniority || 'Mid-Level'}</span>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-5 border-t border-slate-50">
                        <div className="flex items-center gap-2 flex-wrap">
                          {job.techStack?.split(',').slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-600">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-black text-blue-600 group-hover:underline flex items-center gap-1">Detailed View <FaChevronCircleDown /></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-bold text-slate-900">
                    Page {page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                    className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              )}

              {jobs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No jobs matching your filters.</p>
                  <button
                    onClick={() => { setIndustry(""); setSeniority([]); setTechStack(""); setSearchQuery(""); }}
                    className="mt-4 text-sm font-bold text-blue-600 hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - PROFILE */}
        <div className="hidden lg:block lg:col-span-3 space-y-8">
          {/* Simplified Profile Card */}
          <div className="dashboard-card p-8 bg-white text-center border border-slate-200 shadow-sm sticky top-28">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-50 mb-4 overflow-hidden border-4 border-white shadow-lg relative">
              <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'Guest'}&background=0f172a&color=ffffff`} alt="User" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-black text-xl text-slate-900">{user?.name || "Guest User"}</h3>
            <p className="text-xs text-slate-500 mb-6 font-bold bg-slate-50 inline-block px-3 py-1 rounded-full mt-2 uppercase tracking-wide">Job Seeker</p>

            <div className="grid grid-cols-2 gap-2 text-left mb-6">
              {/* Removed Fake Stats - replaced with Project Links potentially or just minimal info */}
            </div>

            <button className="w-full py-3.5 bg-black hover:bg-slate-800 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg active:scale-95">
              Edit Profile
            </button>
          </div>

        </div>

      </div>
      <JobDetailsDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
};

export default Jobs;
