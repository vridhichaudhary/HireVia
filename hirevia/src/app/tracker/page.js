import { FaBriefcase } from "react-icons/fa";
import React from 'react'
import Footer from '@/components/Footer/Footer'

const ApplicationTracker = () => {
  const tabs = [
    { label: "All", count: 0 },
    { label: "Wishlist", count: 0 },
    { label: "Applied", count: 0 },
    { label: "Interview", count: 0 },
    { label: "Offer", count: 0 },
    { label: "Rejected", count: 0 },
  ];

  return (
    <section className="bg-[#0B0D14] min-h-screen text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Application Tracker</h2>
        <p className="text-gray-400 mb-10">Track and manage your job applications</p>

        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className="bg-[#151823] border border-[#56C8D8] rounded-lg py-4 text-center hover:bg-[#1F2230] cursor-pointer transition"
            >
              <h4 className="font-semibold">{tab.label}</h4>
              <p className="text-lg mt-1">{tab.count}</p>
            </div>
          ))}
        </div>

    
        <div className="border border-dashed border-gray-600 rounded-lg py-16 flex flex-col items-center text-center space-y-4">
          <FaBriefcase className="text-4xl text-gray-500" />
          <h3 className="text-lg font-semibold">You have not tracked any applications yet</h3>
          <p className="text-gray-400 max-w-md">
            Start tracking your job applications to manage your job search effectively
          </p>
          <button className="bg-[#56C8D8] hover:bg-[#56a8d8] text-white px-6 py-2 rounded-md transition">
            Search Jobs
          </button>
        </div>
        <Footer/>
      </div>
    </section>
  );
};

export default ApplicationTracker;
