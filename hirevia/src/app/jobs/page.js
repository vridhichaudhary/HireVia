import React from "react";
import Footer from '@/components/Footer/Footer'

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangalore, India",
    type: "Full Time",
    remote: true,
    platform: "Linkedin",
    posted: "01/05/2023",
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
    posted: "03/05/2023",
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
    posted: "05/05/2023",
    salary: "₹45,000 - ₹55,000 per month",
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'InnovationTech',
    location: 'Hyderabad, India',
    type: 'Full Time',
    remote: true,
    posted: '04/05/2023',
    platform: 'LinkedIn',
    salary: '₹15,00,000 - ₹22,00,000',
    applied: false,
  }
];

const platformColors = {
  Linkedin: "bg-[#1D4ED8]",
  Naukri: "bg-[#991B1B]",
  Internshala: "bg-green-700",
};

const SearchJobs = () => {
  return (
    <div className="min-h-screen bg-[#0D0F1C] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Search Jobs</h1>
      <p className="text-gray-400 mb-6">
        Find your next opportunity across multiple job platforms
      </p>

      
      <div className="flex items-center gap-4 max-w-8xl mb-8">
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          className="w-full px-4 py-3 rounded-md bg-[#1B1D2D] text-white focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
        />
        <button className="px-5 py-3 bg-[#56C8D8] hover:bg-[#56a8d8] rounded-md font-medium text-white">
          Search
        </button>
      </div>

      
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg">{jobs.length} Jobs Found</p>
        <div className="flex gap-6 text-sm text-gray-300">
          <span className="cursor-pointer hover:text-white">Sort by Date</span>
          <span className="cursor-pointer hover:text-white">Sort by Relevance</span>
        </div>
      </div>

      
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#141625]/60 backdrop-blur-md p-5 rounded-xl border border-gray-800 hover:shadow-[0_0_15px_#56C8D8] hover:scale-[1.02] transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base">{job.title}</h2>
                <p className="text-gray-400 text-sm">{job.company}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#1F2333] flex items-center justify-center text-sm font-bold">
                {job.company[0]}
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
      <Footer/>
    </div>
  );
};

export default SearchJobs;
