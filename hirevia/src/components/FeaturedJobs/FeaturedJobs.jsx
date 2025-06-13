import React from 'react';
import Link from 'next/link';


const jobs = [
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
  return (
    <section className="bg-[#0A0E17] text-white py-16 px-6 md:px-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold">Featured Jobs</h2>
          <p className="text-[#A0B7C2] mt-1">Explore our handpicked opportunities</p>
        </div>
        <Link href="/jobs">
        <button className="border border-[#56C8D8] px-4 py-2 rounded-md text-sm hover:bg-[#56C8D8]/10 transition">
        View All Jobs
        </button>
        </Link>

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#111827] p-6 rounded-xl shadow-md border border-[#1f2937] hover:shadow-[0_0_5px_#56C8D8] hover:scale-[1.05] transition duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-sm text-[#A0B7C2]">{job.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs mb-3">
              <span className="px-2 py-1 bg-[#1F2937] rounded-full">{job.location}</span>
              <span className="px-2 py-1 bg-[#1F2937] rounded-full">{job.type}</span>
              {job.remote && (
                <span className="px-2 py-1 bg-[#56C8D8] text-black rounded-full font-semibold">Remote</span>
              )}
            </div>

            <p className="text-sm text-[#A0B7C2] mb-3">Posted {job.posted}</p>

            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.platform === 'LinkedIn' ? 'bg-blue-900 text-blue-200' :
                  job.platform === 'Naukri' ? 'bg-red-900 text-red-200' :
                  job.platform === 'Internshala' ? 'bg-green-900 text-green-200' : 'bg-gray-700'
                }`}
              >
                {job.platform}
              </span>
            </div>

            <hr className="border-[#2C3E50] mb-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm">{job.salary}</span>
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  job.applied
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-[#56C8D8] hover:bg-[#74d6e4] transition text-black font-medium text-sm'
                }`}
                disabled={job.applied}
              >
                {job.applied ? 'Added to Tracker' : 'Track Application'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
