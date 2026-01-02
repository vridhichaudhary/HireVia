"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, login, register, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password } = formData;

    try {
      if (isSignup) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      setShowAuthForm(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Authentication failed");
      console.error("Auth Error:", error);
    }
  };

  const openAuthForm = (signup) => {
    setIsSignup(signup);
    setShowAuthForm(true);
    setMenuOpen(false);
    setError("");
  };

  const handleLogout = () => {
    logout();
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
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-6 md:px-20 transition-all">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-600/20 group-hover:bg-indigo-500 transition-all">
              H
            </div>
            <span className="text-lg font-black tracking-tighter text-white">Hire<span className="text-indigo-400">Via</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <Link href="/jobs" className="hover:text-indigo-400 transition-colors">Platform</Link>
            <Link href="/tracker" className="hover:text-indigo-400 transition-colors">Pipeline</Link>
            <Link href="/blog" className="hover:text-indigo-400 transition-colors">Insights</Link>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 group"
                >
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name || user.email}&background=6366f1&color=fff`} className="w-8 h-8 rounded-lg border border-white/10" alt="profile" />
                  <span className="hidden sm:block text-[13px] font-bold text-slate-200 uppercase tracking-widest">{user.name?.split(' ')[0] || 'Member'}</span>
                </button>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-4 w-48 glass-card rounded-xl shadow-2xl py-2 overflow-hidden border border-white/5"
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Control Panel</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthForm(false)}
                className="px-5 py-2 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-600/10 transition-all"
              >
                Get Started
              </button>
            )}

            <button className="md:hidden" onClick={toggleMenu}>
              {menuOpen ? <FaTimes className="text-xl text-white" /> : <FaBars className="text-xl text-indigo-400" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed inset-0 z-[49] bg-[#0B1120] px-6 pt-24 space-y-8"
        >
          <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-[0.2em] text-center">
            <Link href="/" onClick={toggleMenu}>Home</Link>
            <Link href="/jobs" onClick={toggleMenu}>Development</Link>
            <Link href="/tracker" onClick={toggleMenu}>Tracking</Link>
            <Link href="/blog" onClick={toggleMenu}>Resources</Link>
          </div>
        </motion.div>
      )}

      {/* AUTH FORM MODAL */}
      {showAuthForm && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAuthForm(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm glass-card rounded-2xl p-8 space-y-6 relative z-10 shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-600"></div>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                {isSignup ? "Create Profile" : "Identity Verified"}
              </h2>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                {isSignup ? "Begin your professional journey" : "Welcome back, Engineer"}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-[10px] text-center font-bold uppercase tracking-wider"
                >
                  {error}
                </motion.div>
              )}

              {isSignup && (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Legal Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="E.g. Alan Turing"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Security Key</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-500 transition-all duration-300 mt-2 active:scale-95 shadow-lg shadow-indigo-600/20"
              >
                {isSignup ? "Initialize Account" : "Access Platform"}
              </button>
            </form>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
                <span className="bg-[#0B1120] px-3 text-slate-600">Secure SSO</span>
              </div>
            </div>

            <button
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/google`}
              className="w-full py-2.5 bg-white text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-all active:translate-y-0.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.94 0 3.51.68 4.75 1.81l3.55-3.55C18.1 1.42 15.34 0 12 0 7.37 0 3.39 2.65 1.42 6.55l3.96 3.07C6.31 7.27 8.94 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.82-.07-1.61-.21-2.37H12v4.51h6.47c-.28 1.48-1.12 2.74-2.38 3.58l3.71 2.88c2.16-1.99 3.42-4.91 3.42-8.6z" />
                <path fill="#FBBC05" d="M5.38 14.86c-.23-.69-.37-1.42-.37-2.19 0-.77.13-1.51.37-2.19L1.42 7.41C.51 9.21 0 11.04 0 12.67c0 1.63.51 3.46 1.42 5.26l3.96-3.07z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.11.75-2.54 1.2-4.22 1.2-3.26 0-6.02-2.2-7.01-5.17l-4.11 3.19C2.79 21.35 7.07 24 12 24z" />
              </svg>
              Google Authority
            </button>

            <div className="text-center">
              <button
                onClick={() => openAuthForm(!isSignup)}
                className="text-slate-500 hover:text-indigo-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
              >
                {isSignup ? "Existing Member? Authenticate" : "No Account? Join HireVia"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;
