import FeaturedJobs from '@/components/FeaturedJobs/FeaturedJobs';
import HeroSection from '@/components/HeroSection/HeroSection'
import Footer from '@/components/Footer/Footer'
import React from 'react'

import { FaSearch, FaTasks, FaRegSmile } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturedJobs/>
      <section className="bg-[#1E2532] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Use HireVia?</h2>
        <p className="text-gray-400 mb-12">
          Everything you need to streamline your job search journey
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-[#56C8D8] rounded-full p-4">
              <FaSearch className="text-2xl text-black" />
            </div>
            <h3 className="text-xl font-semibold">Unified Search</h3>
            <p className="text-gray-400 max-w-xs">
              Search across multiple job platforms in one place, saving you time and effort
            </p>
          </div>

          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-[#56C8D8] rounded-full p-4">
              <FaTasks className="text-2xl text-black" />
            </div>
            <h3 className="text-xl font-semibold">Application Tracker</h3>
            <p className="text-gray-400 max-w-xs">
              Organize your job applications with status tracking, reminders, and notes
            </p>
          </div>

          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-[#56C8D8] rounded-full p-4">
              <FaRegSmile className="text-2xl text-black" />
            </div>
            <h3 className="text-xl font-semibold">Inclusive Experience</h3>
            <p className="text-gray-400 max-w-xs">
              Customizable accessibility features to ensure everyone can use our platform
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <section className="bg-[#11131A] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#56C8D8] text-black rounded-lg px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-extrabold mb-2">Ready to find your next opportunity?</h3>
              <p>Create an account to track your applications and get personalized job recommendations</p>
            </div>
            <button className="bg-[#2D2F38] hover:bg-[#3a3d49] text-white px-6 py-3 rounded-md transition">
              Get Started
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
