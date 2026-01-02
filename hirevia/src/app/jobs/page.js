"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import { addTrackedJob, isJobTracked } from "@/utils/localStorageUtils";

const JOBS_PER_PAGE = 6;

const platformColors = {
  Linkedin: "bg-[#1D4ED8]",
  Naukri: "bg-[#991B1B]",
  Internshala: "bg-green-700",
};

const allJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangalore, India",
    type: "Full Time",
    remote: true,
    platform: "Linkedin",
    posted: "01/05/2025",
    salary: "₹8,00,000 - ₹12,00,000",
  },
  {
    id: 2,
    title: "UI/UX Design Intern",
    company: "CreativeMinds",
    location: "Delhi, India",
    type: "Internship",
    remote: true,
    platform: "Internshala",
    posted: "03/05/2025",
    salary: "₹15,000 - ₹25,000 per month",
  },
  {
    id: 3,
    title: "Backend Developer Intern",
    company: "HireMinds",
    location: "Bangalore, India",
    type: "Internship",
    remote: true,
    platform: "Naukri",
    posted: "05/05/2025",
    salary: "₹45,000 - ₹55,000 per month",
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'InnovationTech',
    location: 'Hyderabad, India',
    type: 'Full Time',
    remote: true,
    posted: '04/05/2025',
    platform: 'Linkedin',
    salary: '₹15,00,000 - ₹22,00,000',
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Mumbai, India",
    type: "Full Time",
    remote: false,
    platform: "Naukri",
    posted: "02/05/2025",
    salary: "₹12,00,000 - ₹18,00,000",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "InsightAnalytics",
    location: "Pune, India",
    type: "Full Time",
    remote: false,
    platform: "Naukri",
    posted: "05/05/2025",
    salary: "₹6,00,000 - ₹10,00,000",
  },
  {
    id: 7,
    title: "Content Marketing Intern",
    company: "BrandBuilder",
    location: "Remote",
    type: "Internship",
    remote: true,
    platform: "Internshala",
    posted: "06/05/2025",
    salary: "₹10,000 - ₹20,000 per month",
  },
  {
    id: 8,
    title: "Machine Learning Intern",
    company: "AIMinds",
    location: "Chennai, India",
    type: "Internship",
    remote: true,
    platform: "Internshala",
    posted: "06/05/2025",
    salary: "₹20,000 - ₹30,000 per month",
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "CloudGen",
    location: "Remote",
    type: "Full Time",
    remote: true,
    platform: "Linkedin",
    posted: "06/05/2025",
    salary: "₹13,00,000 - ₹16,00,000",
  },
  {
    id: 10,
    title: "Mobile App Developer",
    company: "Appify",
    location: "Ahmedabad, India",
    type: "Full Time",
    remote: false,
    platform: "Naukri",
    posted: "06/05/2025",
    salary: "₹7,00,000 - ₹11,00,000",
  },
  {
    id: 11,
    title: "Business Analyst Intern",
    company: "BizSense",
    location: "Noida, India",
    type: "Internship",
    remote: true,
    platform: "Internshala",
    posted: "06/05/2025",
    salary: "₹15,000 - ₹25,000 per month",
  },
  {
    id: 12,
    title: "Product Manager",
    company: "JP Morgan",
    location: "Bangalore, India",
    type: "Full Time",
    remote: false,
    platform: "Linkedin",
    posted: "11/05/2025",
    salary: "₹80,000 - ₹90,000 per month",
  },
  {
    id: 13,
    title: "Content Marketing Intern",
    company: "BrandBuilder",
    location: "Gurugram, India",
    type: "Full Time",
    remote: true,
    platform: "Internshala",
    posted: "21/05/2025",
    salary: "₹30,000 - ₹40,000 per month",
  },
  {
    id: 14,
    title: "AI Engineer",
    company: "OpenAI",
    location: "California, USA",
    type: "Full Time",
    remote: false,
    platform: "Linkedin",
    posted: "06/06/2025",
    salary: "₹90,00,000 - ₹95,00,000",
  },
  {
    id: 15,
    title: "Data Analyst",
    company: "CloudGen",
    location: "Remote",
    type: "Full Time",
    remote: true,
    platform: "Internshala",
    posted: "06/05/2025",
    salary: "₹13,00,000 - ₹16,00,000",
  },
  {
    id: 16,
    title: "Marketing Head",
    company: "Genomepathra Wellness Private Limited",
    location: "Mumbai, India",
    type: "Full Time",
    remote: false,
    platform: "Linkedin",
    posted: "08/05/2025",
    salary: "₹50000 - ₹140000",
  },
  {
    id: 17,
    title: "Sales & Marketing Executive",
    company: "Srushti Realtors Private Limited",
    location: "Bangalore, India",
    type: "Full Time",
    remote: true,
    platform: "Naukri",
    posted: "21/05/2025",
    salary: "₹30000 - ₹100000",
  },
  {
    id: 18,
    title: "Oracle PL/SQL Developer",
    company: "Coforge Ltd (NIIT Technologies)",
    location: "Remote",
    type: "Internship",
    remote: true,
    platform: "Naukri",
    posted: "09/05/2025",
    salary: "₹75000 - ₹130000",
  },
  {
    id: 19,
    title: "Manager IT Recruitment",
    company: "Best Infosystems Limited",
    location: "Remote",
    type: "Full Time",
    remote: true,
    platform: "Linkedin",
    posted: "15/05/2025",
    salary: "₹100000 - ₹149000",
  },
  {
    id: 20,
    title: "Electrical Engineer",
    company: "Alps Consultant Private Limited",
    location: "Delhi, India",
    type: "Part Time",
    remote: false,
    platform: "Internshala",
    posted: "30/05/2025",
    salary: "₹90000 - ₹125000",
  },
  {
    id: 21,
    title: "Export Manager",
    company: "Kimson (India) Private Limited",
    location: "Ahmedabad, India",
    type: "Full Time",
    remote: false,
    platform: "Naukri",
    posted: "28/04/2025",
    salary: "₹10000 - ₹100000",
  }
];

const SearchJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("date");
  const [addedJobs, setAddedJobs] = useState([]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  useEffect(() => {
    applySearchAndSort();
    const tracked = allJobs.filter((job) => isJobTracked(job.id));
    setAddedJobs(tracked.map((j) => j.id));
  }, [searchQuery, sortType]);

  const applySearchAndSort = () => {
    let jobs = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortType === "date") {
      jobs = jobs.sort(
        (a, b) =>
          new Date(b.posted.split("/").reverse().join("-")) -
          new Date(a.posted.split("/").reverse().join("-"))
      );
    } else if (sortType === "salary") {
      jobs = jobs.sort((a, b) => {
        const parseSalary = (s) => {
          const nums = s.replace(/[^\d-]/g, "").split("-");
          return parseInt(nums[0]);
        };
        return parseSalary(b.salary) - parseSalary(a.salary);
      });
    }

    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  const handleTrack = (job) => {
    if (!addedJobs.includes(job.id)) {
      addTrackedJob({ ...job, status: "Applied", appliedOn: new Date().toISOString() });
      setAddedJobs((prev) => [...prev, job.id]);
    }
  };

  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 pb-20 px-6 md:px-20 relative overflow-hidden">
      <div className="glow-mesh opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10">
          <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Job <span className="text-indigo-400">Marketplace</span></h2>
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Aggregating premium opportunities in real-time</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="relative w-full md:w-1/2 group">
            <input
              type="text"
              placeholder="Search by role, company, or tech stack..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs font-bold uppercase tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Sort Options</span>
            <select
              className="w-full md:w-auto bg-slate-900/50 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all cursor-pointer"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="date">Recency</option>
              <option value="salary">Yield (Salary)</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedJobs.map((job) => (
            <div
              key={job.id}
              className="glass-card p-6 rounded-2xl border border-white/5 relative group h-full flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${job.platform === 'Linkedin' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  job.platform === 'Naukri' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                  {job.platform}
                </span>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    {job.company[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-tight">{job.title}</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{job.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {job.location}
                  </span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded text-[9px] font-black uppercase tracking-widest">
                      Remote
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Est. Salary</span>
                  <p className="text-sm font-black text-white">{job.salary.split(' - ')[0] || job.salary}</p>
                </div>

                <button
                  onClick={() => handleTrack(job)}
                  disabled={addedJobs.includes(job.id)}
                  className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-md ${addedJobs.includes(job.id)
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/10"
                    }`}
                >
                  {addedJobs.includes(job.id) ? "In Pipeline" : "Quick Track"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-12 gap-8 text-[11px] font-black uppercase tracking-widest">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          <div className="flex items-center gap-2">
            <span className="text-white bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center border border-white/5">{currentPage}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">{totalPages}</span>
          </div>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchJobs;
