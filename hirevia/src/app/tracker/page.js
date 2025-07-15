"use client";
import { FaBriefcase } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';

const ApplicationTracker = () => {
  const [trackedJobs, setTrackedJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("trackedJobs")) || [];
    setTrackedJobs(savedJobs);
  }, []);

  const removeJob = (id) => {
  const updatedJobs = trackedJobs.filter((job) => job.id !== id);
  setTrackedJobs(updatedJobs);
  localStorage.setItem("trackedJobs", JSON.stringify(updatedJobs));
};

  const statusCounts = trackedJobs.reduce((counts, job) => {
    counts[job.status] = (counts[job.status] || 0) + 1;
    return counts;
  }, {});

  return (
    <section className="bg-[#0B0D14] min-h-screen text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Application Tracker</h2>
        <p className="text-gray-400 mb-10">Track and manage your job applications</p>

        {trackedJobs.length === 0 ? (
          <div className="border border-dashed border-gray-600 rounded-lg py-16 flex flex-col items-center text-center space-y-4">
            <FaBriefcase className="text-4xl text-gray-500" />
            <h3 className="text-lg font-semibold">You have not tracked any applications yet</h3>
            <p className="text-gray-400 max-w-md">
              Start tracking your job applications to manage your job search effectively
            </p>
            <Link href="/jobs">
            <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2 rounded-md transition">
              Search Jobs
            </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            {trackedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#141625]/60 backdrop-blur-md px-6 py-5 rounded-xl border border-gray-800"
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
                  {job.remote && <span className="bg-[#8B5CF6] px-2 py-1 rounded">Remote</span>}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Salary: {job.salary}
                </p>

                <button
                  className="mt-4 w-full bg-red-800 hover:bg-red-900 text-white py-2 rounded-md text-sm font-medium"
                  onClick={() => removeJob(job.id)}
                >
                  Remove Application
                </button>
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
