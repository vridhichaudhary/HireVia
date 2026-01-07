"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FaSearch, FaMapMarkerAlt, FaBookmark, FaHeart } from "react-icons/fa";

const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Real Filters
  const [industry, setIndustry] = useState("");
  const [seniority, setSeniority] = useState([]);
  const [techStack, setTechStack] = useState("");

  const [popularJobs, setPopularJobs] = useState([]);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/jobs`);
      setJobs(response.data);
      setPopularJobs(response.data.slice(0, 5)); // Just take first 5 as popular for now
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleSeniority = (level) => {
    if (seniority.includes(level)) {
      setSeniority(seniority.filter(s => s !== level));
    } else {
      setSeniority([...seniority, level]);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName(job).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = industry ? job.industry === industry : true;
    const matchesSeniority = seniority.length === 0 || (job.seniority && seniority.includes(job.seniority));
    const matchesTechStack = techStack ? job.techStack?.toLowerCase().includes(techStack.toLowerCase()) : true;

    return matchesSearch && matchesIndustry && matchesSeniority && matchesTechStack;
  });

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
    <div className="min-h-screen pt-24 pb-10 px-6 bg-[#F8F9FC]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDEBAR - FILTERS */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="dashboard-card p-6 bg-white sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900">Filters</h3>
              <button
                onClick={() => { setIndustry(""); setSeniority([]); setTechStack(""); }}
                className="text-xs text-slate-400 hover:text-black font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Industry */}
            <div className="mb-8">
              <label className="text-sm font-bold text-slate-700 mb-3 block">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-black/5"
              >
                <option value="">All Industries</option>
                <option value="Tech">Tech</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Seniority */}
            <div className="mb-8">
              <label className="text-sm font-bold text-slate-700 mb-3 block">Seniority Level</label>
              <div className="space-y-3">
                {["Junior", "Mid", "Senior", "Lead", "Principal"].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${seniority.includes(level) ? "bg-black border-black" : "border-slate-300 bg-white group-hover:border-slate-400"}`}>
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
        <div className="lg:col-span-6 space-y-8">
          {/* Header / Search */}
          <div className="dashboard-card p-4 flex items-center gap-4 bg-white sticky top-24 z-30 shadow-sm border border-slate-100/50 backdrop-blur-xl bg-white/90">
            <div className="flex-1 flex items-center gap-3 px-2">
              <FaSearch className="text-slate-400" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                className="w-full text-base font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Popular Section */}
          <div>
            <div className="flex justify-between items-end mb-4 px-1">
              <h2 className="text-xl font-bold text-slate-900">Featured Opportunities</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {popularJobs.map((job) => (
                <div key={job.id} className="min-w-[280px] dashboard-card p-5 bg-white flex flex-col gap-4 snap-start hover:shadow-lg transition border border-slate-100">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-900 text-xl">
                      {companyName(job)[0]}
                    </div>
                    <button className="text-slate-300 hover:text-black transition"><FaBookmark /></button>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1 line-clamp-1">{job.title}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{companyName(job)}</p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      {job.type || 'Full Time'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 ml-auto">
                      {job.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Now Hiring Section */}
          <div>
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-xl font-bold text-slate-900">Recent Postings</h2>
              <span className="text-sm font-bold text-slate-500">{filteredJobs.length} results</span>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="dashboard-card p-6 bg-white hover:border-slate-300 transition-all group cursor-pointer border border-transparent shadow-sm hover:shadow-md">
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-xl bg-[#F8F9FC] flex-shrink-0 flex items-center justify-center font-black text-slate-900 text-2xl border border-slate-100">
                      {companyName(job)[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors truncate pr-4">{job.title}</h3>
                          <p className="text-sm font-medium text-slate-500">{companyName(job)}</p>
                        </div>
                        <button className="text-slate-300 hover:text-black transition"><FaBookmark /></button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-3 mb-4">
                        <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-slate-300" /> {job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        {job.salary && (
                          <>
                            <span>•</span>
                            <span className="text-slate-900 font-bold">{job.salary}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {job.techStack?.split(',').slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                            {tech.trim()}
                          </span>
                        ))}
                        {job.seniority && (
                          <span className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-600">
                            {job.seniority}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredJobs.length === 0 && (
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
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          {/* Simplified Profile Card */}
          <div className="dashboard-card p-6 bg-white text-center border border-slate-100">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 mb-4 overflow-hidden border-4 border-white shadow-lg relative">
              <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'Guest'}&background=1e293b&color=ffffff`} alt="User" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">{user?.name || "Guest User"}</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium bg-slate-50 inline-block px-3 py-1 rounded-full mt-2">Job Seeker</p>

            <div className="grid grid-cols-2 gap-2 text-left mb-6">
              {/* Removed Fake Stats - replaced with Project Links potentially or just minimal info */}
            </div>

            <button className="w-full py-3 bg-black hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg">
              Edit Profile
            </button>
          </div>

          {/* Generic Promo Card */}
          <div className="dashboard-card p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-center relative overflow-hidden text-white border-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Boost Your Career</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Complete your profile to get 3x more visibility to top recruiters.
              </p>
              <button className="w-full py-3.5 bg-white text-blue-600 font-black rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-0.5">
                Complete Profile
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Jobs;
