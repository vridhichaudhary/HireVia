"use client";
import Link from "next/link";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 bg-black/30 text-white shadow-md sticky top-0 z-40">
        <div className="text-2xl font-bold tracking-wide">
          Hire<span className="text-[#56C8D8]">Via</span>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-[#56C8D8]" />
            ) : (
              <FaBars className="text-2xl text-[#56C8D8]" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-[#56C8D8] transition">Home</Link>
          <Link href="/jobs" className="hover:text-[#56C8D8] transition">Search Jobs</Link>
          <Link href="/tracker" className="hover:text-[#56C8D8] transition">Application Tracker</Link>
          <Link href="/blog" className="hover:text-[#56C8D8] transition">Career Blog</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-1.5 bg-[#56C8D8] text-white text-sm font-semibold rounded hover:bg-[#56c9d8c8] transition">
            Login
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-6 bg-[#2C6B99] text-[#FFFFFF] text-sm font-medium shadow-md">
          <Link href="/" className="hover:text-white" onClick={toggleMenu}>Home</Link>
          <Link href="/jobs" className="hover:text-white" onClick={toggleMenu}>Find Jobs</Link>
          <Link href="/tracker" className="hover:text-white" onClick={toggleMenu}>Tracker</Link>
          <Link href="/blog" className="hover:text-white" onClick={toggleMenu}>Blog</Link>
          <button className="px-5 py-1.5 bg-[#56C8D8] text-black font-semibold rounded hover:bg-[#2C6B99] text-sm">
            Login
          </button>
        </div>
      )}
    </>
  );
};
export default Navbar;
