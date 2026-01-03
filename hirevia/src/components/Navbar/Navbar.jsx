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
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-8 relative z-10 shadow-3xl overflow-hidden"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                {isSignup ? "Join the elite engineering network" : "Continue your professional journey"}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-[10px] text-center font-bold uppercase tracking-wider"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                {isSignup && (
                  <div className="grid gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                      required
                    />
                  </div>
                )}

                <div className="grid gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                    required
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Security Key</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all duration-300 mt-2 active:scale-95 shadow-xl shadow-blue-600/10"
              >
                {isSignup ? "Initialize Profile" : "Authenticate Account"}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                <span className="bg-slate-900 px-4 text-slate-600">Enterprise SSO</span>
              </div>
            </div>

            <button
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/google`}
              className="w-full py-3.5 bg-white text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:translate-y-0.5 border border-white/10"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1c0-.74.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign in with Google
            </button>

            <div className="text-center pt-2">
              <button
                onClick={() => openAuthForm(!isSignup)}
                className="text-slate-500 hover:text-blue-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
              >
                {isSignup ? "Already a member? Sign In" : "Need an account? Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;
