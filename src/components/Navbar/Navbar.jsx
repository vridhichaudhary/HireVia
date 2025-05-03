"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUserCircle, FaBars, FaTimes, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUserName(formData.name);
    setShowAuthForm(false);
    setFormData({ name: "", email: "", password: "" });
  };

  const openAuthForm = (signup) => {
    setIsSignup(signup);
    setShowAuthForm(true);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setMenuOpen(false);
    setShowDropdown(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 bg-white text-[#333333] shadow-md sticky top-0 z-40">
        <div className="text-3xl font-bold tracking-wide">
          Hire<span className="text-[#56C8D8]">Via</span>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-3xl text-[#56C8D8]" />
            ) : (
              <FaBars className="text-3xl text-[#56C8D8]" />
            )}
          </button>
        </div>
        <div className="hidden md:flex items-center gap-10 text-lg">
          <Link href="/" className="font-bold hover:text-[#56C8D8] transition">Home</Link>
          <Link href="/jobs" className="font-bold hover:text-[#56C8D8] transition">About</Link>
          <Link href="/jobs" className="font-bold hover:text-[#56C8D8] transition">Find Jobs</Link>
          <Link href="/tracker" className="font-bold hover:text-[#56C8D8] transition">Tracker</Link>
          <Link href="/blog" className="font-bold hover:text-[#56C8D8] transition">Blog</Link>
        </div>
        <div className="hidden md:flex items-center gap-6 relative">
          {isLoggedIn ? (
            <div ref={dropdownRef} className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-2">
                <FaUserCircle className="text-3xl" />
                <span className="hidden sm:inline font-semibold">{userName}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black w-48 rounded-md shadow-md py-2">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthForm(false)}
              className="px-6 py-2 bg-[#56C8D8] text-black font-semibold rounded hover:bg-[#2C6B99] transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-6 bg-[#2C6B99] text-[#FFFFFF] text-lg font-semibold shadow-md">
          <Link href="/" className="font-bold hover:text-white" onClick={toggleMenu}>Home</Link>
          <Link href="/jobs" className="font-bold hover:text-white" onClick={toggleMenu}>Find Jobs</Link>
          <Link href="/tracker" className="font-bold hover:text-white" onClick={toggleMenu}>Tracker</Link>
          <Link href="/blog" className="font-bold hover:text-white" onClick={toggleMenu}>Blog</Link>
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-2">
              <span>{userName}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => openAuthForm(false)} className="px-6 py-2 bg-[#56C8D8] text-black font-bold rounded hover:bg-[#2C6B99]">
              Login
            </button>
          )}
        </div>
      )}

      {/* Auth Form - New UI */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#2C6B99] text-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in">
            <div className="text-center text-2xl font-bold flex justify-center items-center gap-2">
              <MdWork className="text-3xl text-[#56C8D8]" />
              {isSignup ? "Create Your HireVia Account" : "Welcome Back to HireVia"}
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-[#2C6B99] text-white focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#2C6B99] text-white focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#2C6B99] text-white focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#56C8D8] text-black font-bold rounded hover:bg-[#2C6B99] transition"
              >
                {isSignup ? "Sign Up" : "Log In"}
              </button>
            </form>
            <div className="flex justify-between items-center text-sm mt-4">
              <button onClick={() => setShowAuthForm(false)} className="hover:underline text-gray-300">
                Cancel
              </button>
              <button onClick={() => openAuthForm(!isSignup)} className="text-[#56C8D8] hover:underline font-semibold">
                {isSignup ? "Already have an account?" : "Create an account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
