"use client";
import React, { useState } from "react";
import Footer from '@/components/Footer/Footer'

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
  }
];

const platformColors = {
  Linkedin: "bg-[#1D4ED8]",
  Naukri: "bg-[#991B1B]",
  Internshala: "bg-green-700",
};

const SearchJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [filters, setFilters] = useState({ experience: [], type: [], source: [] });

  const applyFilters = () => {
    let result = [...allJobs];
    if (filters.type.length) {
      result = result.filter(job => filters.type.includes(job.type));
    }
    if (filters.source.length) {
      result = result.filter(job => filters.source.includes(job.platform));
    }
    setFilteredJobs(result);
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] text-white px-8 sm:px-16 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
      <div className="lg:w-1/5 bg-[#11131c] border border-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full px-3 py-2 rounded-md bg-[#0B0D14] border border-gray-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#56C8D8]"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Experience Level</p>
            {["Entry Level", "Mid Level", "Senior Level"].map(level => (
              <label key={level} className="flex items-center gap-2 mb-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#56C8D8] w-4 h-4 rounded focus:ring-0"
                  onChange={() => toggleFilter('experience', level)}
                />
                {level}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Job Type</p>
            {["Full Time", "Part Time", "Contract", "Internship"].map(type => (
              <label key={type} className="flex items-center gap-2 mb-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#56C8D8] w-4 h-4 rounded focus:ring-0"
                  onChange={() => toggleFilter('type', type)}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Source</p>
            {["Linkedin", "Naukri", "Internshala"].map(source => (
              <label key={source} className="flex items-center gap-2 mb-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#56C8D8] w-4 h-4 rounded focus:ring-0"
                  onChange={() => toggleFilter('source', source)}
                />
                {source}
              </label>
            ))}
          </div>

          <button
            onClick={applyFilters}
            className="w-full py-2 mt-2 text-sm bg-[#56C8D8] hover:bg-[#3ea8b8] rounded-md font-medium transition duration-200"
          >
            Apply Filters
          </button>
        </div>


        <div className="lg:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg">{filteredJobs.length} Jobs Found</p>
            <div className="flex gap-6 text-sm text-gray-300">
              <span className="cursor-pointer hover:text-white">Sort by Date</span>
              <span className="cursor-pointer hover:text-white">Sort by Relevance</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#141625]/60 backdrop-blur-md px-6 py-5 rounded-xl border border-gray-800 hover:shadow-[0_0_5px_#56C8D8] hover:scale-[1.02] transition duration-300"
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
                  {job.remote && <span className="bg-[#56C8D8] px-2 py-1 rounded">Remote</span>}
                </div>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <p className="text-gray-400">Posted {job.posted}</p>
                  <span className={`text-white px-2 py-1 rounded text-xs ${platformColors[job.platform]}`}>
                    {job.platform}
                  </span>
                </div>

                <p className="mt-3">{job.salary}</p>

                <button className="mt-4 w-full bg-[#56C8D8] hover:bg-[#56a8d8] text-white py-2 rounded-md text-sm font-medium">
                  Track Application
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-30">
        <Footer />
      </div>
    </div>
  );
};

export default SearchJobs;
