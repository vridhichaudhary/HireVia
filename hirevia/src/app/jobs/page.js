"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import { addTrackedJob, isJobTracked } from "@/utils/localStorageUtils";

const JOBS_PER_PAGE = 5;

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
      addTrackedJob({ ...job, status: "Offer", appliedOn: new Date().toISOString() });
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
    <div className="min-h-screen bg-[#0B0D14] text-white px-8 sm:px-16 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or company"
          className="w-full md:w-1/2 px-4 py-2 rounded bg-[#11131c] border border-gray-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="bg-[#11131c] border border-gray-700 text-white px-4 py-2 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {displayedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#141625]/60 backdrop-blur-md px-6 py-5 rounded-xl border border-gray-800 hover:shadow-[0_0_5px_#8B5CF6] hover:scale-[1.02] transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base">{job.title}</h2>
                <p className="text-gray-400 text-sm">{job.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <span className="bg-gray-700 px-2 py-1 rounded">{job.location}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">{job.type}</span>
              {job.remote && (
                <span className="bg-[#8B5CF6] px-2 py-1 rounded">Remote</span>
              )}
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <p className="text-gray-400">Posted {job.posted}</p>
              <span className={`text-white px-2 py-1 rounded text-xs ${platformColors[job.platform]}`}>
                {job.platform}
              </span>
            </div>
            <p className="mt-3">{job.salary}</p>
            <button
              onClick={() => handleTrack(job)}
              disabled={addedJobs.includes(job.id)}
              className={`mt-4 w-full ${
                addedJobs.includes(job.id)
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              } py-2 rounded-md text-sm font-medium`}
            >
              {addedJobs.includes(job.id) ? "Added to Tracker" : "Track Application"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10 gap-4 text-sm">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-[#1c1f2e] border border-gray-600 text-gray-400 hover:text-white"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-[#1c1f2e] border border-gray-600 text-gray-400 hover:text-white"
        >
          Next
        </button>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default SearchJobs;
